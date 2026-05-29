"use client";

import { useState } from "react";

export default function PayNowButton({
  plan,
  price,
  session,
  teacher,
  time,
  class_schedule_id,
  class_date,
  student_name,
  student_email,
  student_phone,
}: {
  plan?: string;
  price?: string;
  session?: string;
  teacher?: string;
  time?: string;
  class_schedule_id?: string;
  class_date?: string;
  student_name?: string;
  student_email?: string;
  student_phone?: string;
}) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      const mode =
        plan === "Membership"
          ? "membership"
          : plan === "Private"
          ? "private"
          : plan === "Intro offer"
          ? "intro"
          : "dropin";

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          price,
          session,
          teacher,
          time,
          class_schedule_id,
          class_date,
          student_name,
          student_email,
          student_phone,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Something went wrong: " + data.error);
      }
    } catch (error) {
      alert("Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="rounded-full bg-terracotta px-6 py-3 text-sm font-sans text-white tracking-[0.08em] transition-colors duration-300 hover:bg-[#a36b5a] disabled:opacity-50"
    >
      {loading ? "Redirecting..." : "Pay now"}
    </button>
  );
}
