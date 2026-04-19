"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const SERVICES = [
  { id: "vinyasa", name: "Vinyasa Flow", duration: "60 min", price: "$32" },
  { id: "yin", name: "Yin Yoga", duration: "75 min", price: "$32" },
  { id: "restore", name: "Restorative", duration: "60 min", price: "$28" },
  { id: "private", name: "Private Session", duration: "60 min", price: "$100" },
  { id: "sound", name: "Sound Healing", duration: "90 min", price: "$45" },
  { id: "meditation", name: "Meditation", duration: "30 min", price: "$20" },
];

const TIME_SLOTS = [
  "6:30 AM", "7:00 AM", "8:00 AM", "9:00 AM", 
  "10:00 AM", "12:00 PM", "5:00 PM", "6:00 PM", "7:00 PM"
];

export default function BookingForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    notes: "",
  });

  const selectedService = SERVICES.find(s => s.id === formData.service);
  const formattedDate = formData.date ? new Date(formData.date + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  }) : "";

  const sendEmail = () => {
    const subject = `New Booking: ${formData.name} - ${selectedService?.name || 'Yoga Session'}`;
    const body = `Hi Sanctuary Team,

I'd like to book a yoga session. Here are my details:

NAME: ${formData.name}
EMAIL: ${formData.email}
PHONE: ${formData.phone || 'Not provided'}

SESSION: ${selectedService?.name} (${selectedService?.duration}) - ${selectedService?.price}
DATE: ${formattedDate}
TIME: ${formData.time || 'Flexible'}

NOTES: ${formData.notes || 'None'}

Thank you!`;

    window.location.href = `mailto:hello@sanctuary-yoga.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="max-w-xl mx-auto">
      {/* Progress */}
      <div className="flex gap-2 mb-8">
        {[1, 2, 3].map(i => (
          <div key={i} className={`h-1 flex-1 rounded-full ${i <= step ? "bg-sage" : "bg-stone/30"}`} />
        ))}
      </div>

      <div className="space-y-6">
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h3 className="font-serif text-xl text-charcoal mb-4">Choose Your Session</h3>
            <div className="grid grid-cols-1 gap-3">
              {SERVICES.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => { setFormData({...formData, service: service.id}); setStep(2); }}
                  className={`p-4 rounded-xl text-left transition-all ${
                    formData.service === service.id 
                      ? "bg-sage text-white" 
                      : "bg-stone/20 hover:bg-stone/40 text-charcoal"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-sans font-medium">{service.name}</span>
                    <span className="font-sans text-sm opacity-70">{service.price}</span>
                  </div>
                  <span className="font-sans text-sm opacity-70">{service.duration}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h3 className="font-serif text-xl text-charcoal mb-4">Your Details</h3>
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
                  onClick={() => formData.name && formData.email ? setStep(3) : alert('Please fill in your name and email')}
                  className="flex-1 py-3 rounded-xl bg-sage text-white font-sans hover:opacity-90"
                >
                  Continue
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h3 className="font-serif text-xl text-charcoal mb-4">Pick a Time</h3>
            <div className="space-y-4">
              <div>
                <label className="block font-sans text-sm text-charcoal/60 mb-2">Preferred Date</label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-stone/30 bg-transparent font-sans text-charcoal focus:border-sage focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-sans text-sm text-charcoal/60 mb-2">Preferred Time</label>
                <div className="grid grid-cols-3 gap-2">
                  {TIME_SLOTS.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setFormData({...formData, time})}
                      className={`py-2 rounded-lg text-sm font-sans transition-all ${
                        formData.time === time 
                          ? "bg-sage text-white" 
                          : "bg-stone/20 hover:bg-stone/40 text-charcoal"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block font-sans text-sm text-charcoal/60 mb-2">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-stone/30 bg-transparent font-sans text-charcoal focus:border-sage focus:outline-none resize-none"
                  placeholder="Any injuries, questions..."
                />
              </div>
              
              {/* Booking Summary */}
              <div className="p-4 bg-stone/20 rounded-xl">
                <p className="font-sans text-sm text-charcoal/60 mb-2">Booking Summary:</p>
                <p className="font-sans text-charcoal"><strong>{selectedService?.name}</strong> - {selectedService?.price}</p>
                <p className="font-sans text-sm text-charcoal/60">{formattedDate} at {formData.time || 'TBD'}</p>
              </div>

              <button
                type="button"
                onClick={sendEmail}
                className="w-full py-4 rounded-xl bg-terracotta text-white font-sans text-lg font-medium hover:bg-[#a36b5a] flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Send Booking Request
              </button>
              <p className="font-sans text-xs text-center text-charcoal/50">
                This will open your email app. Just click Send!
              </p>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full py-2 text-sm font-sans text-charcoal/50 hover:text-charcoal"
              >
                ← Go back
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}