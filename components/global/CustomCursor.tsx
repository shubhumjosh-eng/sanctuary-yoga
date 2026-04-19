"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const ringPosRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const onEnterLink = () => {
      dot.classList.add("cursor-hover");
      ring.classList.add("cursor-hover");
    };
    const onLeaveLink = () => {
      dot.classList.remove("cursor-hover");
      ring.classList.remove("cursor-hover");
    };

    document.addEventListener("mousemove", onMove);

    const links = document.querySelectorAll("a, button, [data-cursor-hover]");
    links.forEach((el) => {
      el.addEventListener("mouseenter", onEnterLink);
      el.addEventListener("mouseleave", onLeaveLink);
    });

    const animate = () => {
      // Dot follows instantly
      dot.style.transform = `translate(${posRef.current.x - 4}px, ${posRef.current.y - 4}px)`;
      // Ring has lerp
      ringPosRef.current.x += (posRef.current.x - ringPosRef.current.x) * 0.14;
      ringPosRef.current.y += (posRef.current.y - ringPosRef.current.y) * 0.14;
      ring.style.transform = `translate(${ringPosRef.current.x - 16}px, ${ringPosRef.current.y - 16}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
      links.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterLink);
        el.removeEventListener("mouseleave", onLeaveLink);
      });
    };
  }, []);

  return (
    <>
      <style>{`
        .cursor-dot {
          position: fixed;
          top: 0; left: 0;
          width: 8px; height: 8px;
          background: #1C1C1C;
          border-radius: 50%;
          pointer-events: none;
          z-index: 99999;
          will-change: transform;
          transition: width 0.25s, height 0.25s, background 0.25s;
        }
        .cursor-ring {
          position: fixed;
          top: 0; left: 0;
          width: 32px; height: 32px;
          border: 0.8px solid rgba(28,28,28,0.4);
          border-radius: 50%;
          pointer-events: none;
          z-index: 99998;
          will-change: transform;
          transition: width 0.3s cubic-bezier(0.16,1,0.3,1), height 0.3s cubic-bezier(0.16,1,0.3,1), border-color 0.3s;
        }
        .cursor-dot.cursor-hover {
          width: 12px; height: 12px;
          background: #7C8B7A;
        }
        .cursor-ring.cursor-hover {
          width: 52px; height: 52px;
          border-color: rgba(124,139,122,0.5);
        }
        @media (max-width: 768px) {
          .cursor-dot, .cursor-ring { display: none; }
        }
      `}</style>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
