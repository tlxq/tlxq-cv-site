import React, { useEffect, useRef } from 'react';

export default function VideoBackground({
  sources = [],
  poster = '',
  className = '',
  slowMotion = false, // toggle smooth cinematic mode
}) {
  const videoRef = useRef(null);

  // Inject smooth, GPU-friendly zoom animation
  useEffect(() => {
    if (!document.getElementById('vb-zoom-keyframes')) {
      const style = document.createElement('style');
      style.id = 'vb-zoom-keyframes';
      style.textContent = `
        @keyframes vb-zoom {
          0%   { transform: scale(1.02); }
          100% { transform: scale(1.06); }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // Clean autoplay setup
  useEffect(() => {
    if (!videoRef.current) return;

    const v = videoRef.current;

    // Smooth slow-motion toggle without lag
    v.playbackRate = slowMotion ? 0.85 : 1.0;

    const playPromise = v.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  }, [slowMotion]);

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    >
      {/* VIDEO */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={poster}
        style={{
          animation: 'vb-zoom 35s ease-in-out infinite alternate',
          transformOrigin: 'center center',
          filter: 'brightness(0.85) contrast(1.05) saturate(1.1)',
          willChange: 'transform',
        }}
      >
        {sources.map((s) => (
          <source key={s.src} src={s.src} type={s.type} />
        ))}
      </video>

      {/* Poster fallback */}
      {sources.length === 0 && poster && (
        <img
          src={poster}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.8) 100%)',
        }}
      />
    </div>
  );
}
