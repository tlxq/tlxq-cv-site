import { motion } from 'framer-motion';
import Button from './Button';
import VideoBackground from './VideoBackground';
import smoke from '../video/smoke.mp4';

export default function FrontPage({ onEnter }) {
  const videoSources = [{ src: smoke, type: 'video/mp4' }];

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center text-gray-500 overflow-hidden bg-black">
      {/* Background video (absolute) */}
      <VideoBackground
        sources={videoSources}
        poster="/images/hero-poster.jpg"
      />

      {/* Foreground content (z-10 ensures it's above the video) */}
      <div className="relative z-10 flex flex-col items-center justify-center h-screen text-center px-6">
        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: -20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1 }}
          className="font-orbit uppercase md:text-4xl font-extrabold tracking-[0.35em] mb-4 drop-shadow-lg cursor-none"
        >
          Tom Larsson
        </motion.h1>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mr-dafoe-regular text-3xl md:text-5xl text-gray-200 mb-10"
        ></motion.h2>
      </div>
      {/* Button */}
      <div className="absolute bottom-20 w-full flex justify-center z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Button onEnter={onEnter} />
        </motion.div>
      </div>
    </div>
  );
}
