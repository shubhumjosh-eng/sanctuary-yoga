"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAY_FULL = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

interface ClassSession {
  id: string;
  title: string;
  description: string;
  yoga_style: string;
  level: string;
  duration_minutes: number;
  capacity: number;
  price: number;
  instructor_name: string;
  schedules: {
    day_of_week: number;
    start_time: string;
    end_time: string;
    location: string;
  }[];
}

function formatTime(time: string): string {
  const [hours, minutes] = time.split(":");
  const h = parseInt(hours);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${minutes || "00"} ${ampm}`;
}

function getNextOccurrence(dayOfWeek: number): Date {
  const today = new Date();
  const result = new Date(today);
  result.setDate(today.getDate() + (dayOfWeek - today.getDay() + 7) % 7);
  if (result <= today) {
    result.setDate(result.getDate() + 7);
  }
  return result;
}

export default function BookingForm() {
  const [classes, setClasses] = useState<ClassSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ClassSession | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  useEffect(() => {
    fetch("/api/classes")
      .then(res => res.json())
      .then(data => {
        console.log('[BookingForm] API response:', data);
        if (data.error) {
          setError(data.error + (data.details ? ` (${data.details})` : ''));
        } else {
          const classList = data.classes || data;
          const mapped = classList.map((c: any) => ({
            id: c.id,
            title: c.title,
            description: c.description,
            yoga_style: c.yoga_style,
            level: c.level,
            duration_minutes: c.duration_minutes,
            capacity: c.capacity,
            price: c.price,
            instructor_name: c.instructors?.name || "TBA",
            schedules: c.class_schedules || [],
          }));
          setClasses(mapped);
        }
      })
      .catch(() => setError("Unable to load classes"))
      .finally(() => setLoading(false));
  }, []);

  const groupedClasses = classes.reduce((acc: any, cls) => {
    cls.schedules.forEach((schedule: any) => {
      const key = `${cls.yoga_style}-${schedule.day_of_week}`;
      if (!acc[key]) {
        acc[key] = {
          yoga_style: cls.yoga_style,
          day_of_week: schedule.day_of_week,
          day_name: DAY_FULL[schedule.day_of_week],
          sessions: [],
        };
      }
      acc[key].sessions.push({
        ...cls,
        schedule,
        start_time: schedule.start_time,
        end_time: schedule.end_time,
        location: schedule.location,
      });
    });
    return acc;
  }, {});

  const groupList = Object.values(groupedClasses).sort((a: any, b: any) => a.day_of_week - b.day_of_week);

  const handleSubmit = async () => {
    if (!selectedClass || !selectedSchedule) return;
    setSubmitting(true);
    setError("");

    const classDate = getNextOccurrence(selectedSchedule.day_of_week);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          class_schedule_id: selectedSchedule.id,
          class_date: classDate.toISOString().split("T")[0],
          student_name: formData.name,
          student_email: formData.email,
          student_phone: formData.phone,
          notes: formData.notes,
        }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setSuccess(true);
      }
    } catch {
      setError("Booking failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-serif text-2xl text-charcoal mb-2">Booking Confirmed!</h3>
        <p className="font-sans text-charcoal/60 mb-4">
          Check your email for confirmation details.
        </p>
        <button
          onClick={() => { setSuccess(false); setStep(1); setSelectedClass(null); setSelectedSchedule(null); }}
          className="text-sage hover:underline font-sans"
        >
          Book another class
        </button>
      </motion.div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="w-8 h-8 border-2 border-sage border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="font-sans text-charcoal/60 mt-4">Loading classes...</p>
      </div>
    );
  }

  if (error && classes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-terracotta font-sans">{error}</p>
        <button
          onClick={() => { setLoading(true); setError(""); window.location.reload(); }}
          className="mt-4 text-sage hover:underline font-sans"
        >
          Retry
        </button>
      </div>
    );
  }

  if (classes.length > 0 && groupList.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-terracotta font-sans">No class schedules found. Please add class times in Supabase.</p>
        <p className="font-sans text-sm text-charcoal/60 mt-2">Add entries to class_schedules table.</p>
        <button
          onClick={() => { setLoading(true); setError(""); window.location.reload(); }}
          className="mt-4 text-sage hover:underline font-sans"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex gap-2 mb-8">
        {[1, 2, 3].map(i => (
          <div key={i} className={`h-1 flex-1 rounded-full ${i <= step ? "bg-sage" : "bg-stone/30"}`} />
        ))}
      </div>

      {step === 1 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <h3 className="font-serif text-xl text-charcoal mb-4">Choose a Class</h3>
          <p className="font-sans text-sm text-charcoal/60 mb-6">
            Select a yoga style and time that works for you.
          </p>
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {groupList.map((group: any) => (
              <div key={group.day_of_week} className="border border-stone/20 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-sage/20 text-sage px-2 py-1 rounded text-xs font-sans uppercase">
                    {group.day_name}
                  </span>
                </div>
                <div className="space-y-2">
                  {group.sessions.map((session: any) => (
                    <button
                      key={session.schedule.id}
                      onClick={() => {
                        setSelectedClass(session);
                        setSelectedSchedule(session.schedule);
                        setStep(2);
                      }}
                      className="w-full p-3 rounded-lg text-left bg-stone/10 hover:bg-sage/10 transition-all"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-sans text-charcoal font-medium">{session.title}</span>
                        <span className="font-sans text-sage">${session.price}</span>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="font-sans text-sm text-charcoal/60">
                          {formatTime(session.start_time)} - {formatTime(session.end_time)}
                        </span>
                        <span className="font-sans text-xs text-charcoal/50">{session.location}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {step === 2 && selectedClass && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <h3 className="font-serif text-xl text-charcoal mb-4">Your Details</h3>
          <div className="p-4 bg-sage/10 rounded-xl mb-4">
            <p className="font-sans text-charcoal font-medium">{selectedClass.title}</p>
            <p className="font-sans text-sm text-charcoal/60">
              {DAY_NAMES[selectedSchedule.day_of_week]}s at {formatTime(selectedSchedule.start_time)}
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block font-sans text-sm text-charcoal/60 mb-2">Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-stone/30 bg-transparent font-sans text-charcoal focus:border-sage focus:outline-none"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block font-sans text-sm text-charcoal/60 mb-2">Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-stone/30 bg-transparent font-sans text-charcoal focus:border-sage focus:outline-none"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block font-sans text-sm text-charcoal/60 mb-2">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-stone/30 bg-transparent font-sans text-charcoal focus:border-sage focus:outline-none"
                placeholder="(415) 555-1234"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 py-3 rounded-xl border border-stone/30 font-sans text-charcoal hover:bg-stone/20"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => formData.name && formData.email ? setStep(3) : alert("Please fill in your name and email")}
                className="flex-1 py-3 rounded-xl bg-sage text-white font-sans hover:opacity-90"
              >
                Continue
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {step === 3 && selectedClass && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <h3 className="font-serif text-xl text-charcoal mb-4">Confirm Booking</h3>
          <div className="p-4 bg-sage/10 rounded-xl mb-4">
            <p className="font-sans text-charcoal font-medium">{selectedClass.title}</p>
            <p className="font-sans text-sm text-charcoal/60">
              {DAY_NAMES[selectedSchedule.day_of_week]}s at {formatTime(selectedSchedule.start_time)} - {formatTime(selectedSchedule.end_time)}
            </p>
            <p className="font-sans text-sm text-charcoal/60">{selectedSchedule.location}</p>
            <p className="font-sans text-sage font-medium mt-2">${selectedClass.price}</p>
          </div>
          <div>
            <label className="block font-sans text-sm text-charcoal/60 mb-2">Notes (optional)</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-stone/30 bg-transparent font-sans text-charcoal focus:border-sage focus:outline-none resize-none"
              placeholder="Any injuries, preferences..."
            />
          </div>
          {error && <p className="text-terracotta text-sm mt-2">{error}</p>}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full mt-4 py-4 rounded-xl bg-terracotta text-white font-sans text-lg font-medium hover:bg-[#a36b5a] disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Booking...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Confirm Booking
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => setStep(2)}
            className="w-full py-2 text-sm font-sans text-charcoal/50 hover:text-charcoal"
          >
            ← Go back
          </button>
        </motion.div>
      )}
    </div>
  );
}