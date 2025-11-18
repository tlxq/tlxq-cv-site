import React, { useEffect, useRef, useState } from "react";

/**
 * VideoBackground
 *
 * Provides:
 * - webm + mp4 sources
 * - IntersectionObserver pause/play
 * - respects prefers-reduced-motion
 * - subtle slow zoom (GPU-accelerated) injected as keyframes
 * - gradient + grain overlay for cinematic look
 */

export default function VideoBackground({ sources = [], poster = "", className = "" }) {
  const videoRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(true);

  const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  useEffect(() => {
    // inject slow-zoom keyframes once
    if (!document.getElementById("vb-slow-zoom-keyframes")) {
      const style = document.createElement("style");
      style.id = "vb-slow-zoom-keyframes";
      style.textContent = `
        @keyframes vb-slow-zoom {
          0% { transform: scale(1.04) translateZ(0); }
          50% { transform: scale(1.08) translateZ(0); }
          100% { transform: scale(1.04) translateZ(0); }
        }
        /* reduce motion users: disable animation */
        @media (prefers-reduced-motion: reduce) {
          video.vb-animated { animation: none !important; transform: none !important; }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsIntersecting(entry.isIntersecting);
          if (entry.isIntersecting) {
            videoRef.current?.play().catch(() => {});
          } else {
            videoRef.current?.pause();
          }
        });
      },
      { threshold: 0.25 }
    );

    obs.observe(videoRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion && videoRef.current) {
      videoRef.current.pause();
    }
  }, [prefersReducedMotion]);

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    >
      {/* Video element */}
      {!prefersReducedMotion && (
        <video
          ref={videoRef}
          className="vb-animated absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          style={{
            willChange: "transform, filter",
            filter: "brightness(0.55) contrast(1.05) saturate(1.05)",
            transformOrigin: "center center",
            animation: "vb-slow-zoom 30s linear infinite",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {sources.map((s) => (
            <source key={s.src} src={s.src} type={s.type} />
          ))}
          Your browser does not support the video tag.
        </video>
      )}

      {/* Poster fallback for reduced-motion users or missing sources */}
      {(prefersReducedMotion || !sources || sources.length === 0) && poster && (
        <img
          src={poster}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 1 }}
        />
      )}

      {/* Gradient overlay to improve text contrast */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.6) 100%)",
          mixBlendMode: "normal",
        }}
      />

      {/* Very subtle film grain using SVG */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.04, mixBlendMode: "overlay", pointerEvents: "none" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="vb-noise">
          <feTurbulence baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#vb-noise)" />
      </svg>
    </div>
  );
}