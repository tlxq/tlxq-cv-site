import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

const CVLayout = () => {
  const { lang, toggleLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-nebula-950 text-white selection:bg-violet-500/30">
      {/* Background radial gradient */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_#1e1b4b_0%,_#05050a_100%)] pointer-events-none" />

      {/* Language Switcher */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleLanguage}
          className="glass px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:border-violet-500/50 transition-colors"
        >
          {lang === 'sv' ? 'EN' : 'SV'}
        </button>
      </div>

      <main className="relative z-10 container mx-auto px-4 py-8 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8"
        >
          {/* Left Column: Sidebar */}
          <Sidebar />

          {/* Right Column: Main Content */}
          <MainContent />
        </motion.div>
      </main>

      <footer className="relative z-10 text-center py-12 text-white/20 text-xs">
        &copy; {new Date().getFullYear()} Tom Larsson. Built with React & Tailwind 4.
      </footer>
    </div>
  );
};

export default CVLayout;
