import { motion, useMotionValue, useTransform, animate, useMotionValueEvent } from 'framer-motion';
import { useEffect, useState } from 'react';

const LoadingScreen = ({ onComplete }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayCount, setDisplayCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useMotionValueEvent(rounded, "change", (latest) => {
    setDisplayCount(latest);
  });

  useEffect(() => {
    const controls = animate(count, 100, {
      duration: 2.5,
      ease: 'easeInOut',
      onComplete: () => {
        setTimeout(() => {
          setIsFinished(true);
          setTimeout(onComplete, 800);
        }, 500);
      },
    });
    return controls.stop;
  }, [count, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isFinished ? 0 : 1 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#05050a]"
    >
      <div className="relative w-64 h-1 bg-white/5 overflow-hidden rounded-full mb-8">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 2.5, ease: 'easeInOut' }}
          className="h-full bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-500"
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="text-4xl font-bold text-white tabular-nums">
          {displayCount}
          <span className="text-violet-500">%</span>
        </div>
        <motion.span
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-xs uppercase tracking-[0.2em] text-white/40"
        >
          Initializing Nebula
        </motion.span>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
