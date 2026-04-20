"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { courses } from "@/data/courses";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.courseId as string;
  const course = courses.find(c => c.id === courseId);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    course: courseId,
    message: "",
    startDate: ""
  });

  if (!course) {
    return (
      <div className="pt-24 pb-24 text-center">
        <h1 className="font-serif text-2xl text-charcoal">Course not found</h1>
        <Link href="/courses" className="text-sage hover:underline mt-4 inline-block">
          Back to Courses
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In production, send to API
    alert("Thank you for your enquiry! We will contact you soon.");
  };

  return (
    <div className="pt-24 pb-24">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="px-6 md:px-10 max-w-7xl mx-auto"
      >
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/courses" className="font-sans text-sm text-charcoal/60 hover:text-sage">
            ← Back to Courses
          </Link>
        </div>

        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-sage mb-4">
              {course.certification}
            </p>
            <h1 className="font-serif text-display-md text-charcoal mb-4">
              {course.title}
            </h1>
            <p className="font-sans text-lg text-charcoal/70 mb-6">
              {course.description}
            </p>
            <div className="flex flex-wrap gap-4 text-sm font-sans text-charcoal/60 mb-8">
              <span className="bg-stone/20 px-3 py-1 rounded-full">{course.duration}</span>
              <span className="bg-stone/20 px-3 py-1 rounded-full">{course.level}</span>
              <span className="bg-stone/20 px-3 py-1 rounded-full">{course.certification}</span>
            </div>
            <p className="font-sans text-4xl text-charcoal font-medium mb-2">
              From ${course.price}
            </p>
            <p className="font-sans text-sm text-charcoal/50 mb-8">per person</p>
            <a
              href="#enquire"
              className="inline-block px-8 py-4 bg-sage text-white rounded-lg font-sans text-lg hover:bg-sage/90 transition-colors"
            >
              Enquire Now
            </a>
          </div>
          <div className="bg-gradient-to-br from-sage/20 to-terracotta/20 rounded-2xl flex items-center justify-center min-h-[300px]">
            <span className="font-serif text-6xl text-sage/30">{course.shortTitle}</span>
          </div>
        </div>

        {/* What's Included */}
        <div className="mb-16">
          <h2 className="font-serif text-2xl text-charcoal mb-6">What's Included</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {course.included.map((item, idx) => (
              <div key={idx} className="bg-sage/10 p-4 rounded-xl text-center">
                <span className="font-sans text-charcoal">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Curriculum */}
        <div className="mb-16">
          <h2 className="font-serif text-2xl text-charcoal mb-6">Topics Covered</h2>
          <div className="flex flex-wrap gap-3">
            {course.topics.map((topic, idx) => (
              <span key={idx} className="bg-charcoal/5 px-4 py-2 rounded-full font-sans text-sm text-charcoal/70">
                {topic}
              </span>
            ))}
          </div>
        </div>

        {/* Daily Schedule */}
        <div className="mb-16">
          <h2 className="font-serif text-2xl text-charcoal mb-6">Sample Daily Schedule</h2>
          <div className="space-y-4">
            {course.days.slice(0, 5).map((day, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-stone/10">
                <div className="flex items-center gap-4">
                  <span className="w-12 h-12 bg-sage/20 rounded-full flex items-center justify-center font-sans text-sage font-medium">
                    {day.day}
                  </span>
                  <div>
                    <h4 className="font-sans font-medium text-charcoal">{day.title}</h4>
                    <p className="font-sans text-sm text-charcoal/60">{day.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Start Dates */}
        <div className="mb-16">
          <h2 className="font-serif text-2xl text-charcoal mb-6">Upcoming Start Dates</h2>
          <div className="flex flex-wrap gap-3">
            {course.startDates.map((date, idx) => (
              <button
                key={idx}
                onClick={() => setFormData({...formData, startDate: date})}
                className={`px-4 py-2 rounded-lg font-sans text-sm transition-colors ${
                  formData.startDate === date
                    ? "bg-sage text-white"
                    : "bg-stone/20 text-charcoal hover:bg-stone/30"
                }`}
              >
                {date}
              </button>
            ))}
          </div>
        </div>

        {/* Enquiry Form */}
        <div id="enquire" className="bg-charcoal rounded-2xl p-8 md:p-12">
          <h2 className="font-serif text-2xl text-white mb-2">Enquire About This Course</h2>
          <p className="font-sans text-white/60 mb-8">Fill in your details and we'll get back to you within 24 hours.</p>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-sans text-sm text-white/70 mb-2">Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white font-sans placeholder-white/40 focus:outline-none focus:border-sage"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block font-sans text-sm text-white/70 mb-2">Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white font-sans placeholder-white/40 focus:outline-none focus:border-sage"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block font-sans text-sm text-white/70 mb-2">Phone / WhatsApp *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white font-sans placeholder-white/40 focus:outline-none focus:border-sage"
                placeholder="+1 234 567 8900"
              />
            </div>
            <div>
              <label className="block font-sans text-sm text-white/70 mb-2">Country</label>
              <select
                value={formData.country}
                onChange={(e) => setFormData({...formData, country: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white font-sans focus:outline-none focus:border-sage [&>option]:text-charcoal"
              >
                <option value="">Select Country</option>
                <option value="US">USA</option>
                <option value="UK">UK</option>
                <option value="IN">India</option>
                <option value="AU">Australia</option>
                <option value="CA">Canada</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block font-sans text-sm text-white/70 mb-2">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white font-sans placeholder-white/40 focus:outline-none focus:border-sage resize-none"
                placeholder="Any questions or special requirements..."
              />
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-4 bg-sage text-white rounded-lg font-sans text-lg hover:bg-sage/90 transition-colors"
              >
                Send Enquiry
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}