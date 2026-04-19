"use client";

import { useState } from "react";

export default function PayNowButton() {
  const [paid, setPaid] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setPaid(true)}
      className="rounded-full bg-terracotta px-6 py-3 text-sm font-sans text-white tracking-[0.08em] transition-colors duration-300 hover:bg-[#a36b5a]"
    >
      {paid ? "Payment completed" : "Pay now"}
    </button>
  );
}
