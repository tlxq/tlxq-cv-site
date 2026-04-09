import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { 
  Code2, 
  Terminal, 
  Layers, 
  BookOpen, 
  Settings, 
  Globe2, 
  Heart, 
  Zap, 
  Cat 
} from 'lucide-react';

const Sidebar = () => {
  const { t } = useLanguage();

  const sections = [
    {
      title: t('sections.stack'),
      icon: <Layers className="w-4 h-4" />,
      content: [
        { label: t('sidebar.stack.frontend'), items: 'React, Next.js, TypeScript, Tailwind CSS' },
        { label: t('sidebar.stack.backend'), items: 'Node.js, Supabase, PostgreSQL, REST APIs' },
        { label: t('sidebar.stack.devops'), items: 'Docker, Git, Linux, Bash, CI/CD' }
      ]
    },
    {
      title: t('sections.courses'),
      icon: <BookOpen className="w-4 h-4" />,
      content: [
        'JavaScript-ramverk (React)',
        'Node.js (Backend)',
        'Databasteknik (Arkitektur)',
        'UX (Interaktionsdesign)',
        'Agila metoder'
      ]
    },
    {
      title: t('sections.tools'),
      icon: <Settings className="w-4 h-4" />,
      content: [
        { label: 'Plattformar:', items: 'Vercel, Supabase' },
        { label: 'Verktyg:', items: 'Postman, Figma, Git' },
        { label: 'Metodik:', items: 'Scrum, Kanban, GitHub Projects' }
      ]
    },
    {
      title: t('sections.languages'),
      icon: <Globe2 className="w-4 h-4" />,
      content: [
        t('sidebar.languages.swedish'),
        t('sidebar.languages.english')
      ]
    },
    {
      title: t('sections.outside'),
      icon: <Heart className="w-4 h-4" />,
      content: [
        { icon: <Zap className="w-3 h-3 text-violet-500" />, text: t('sidebar.outside.football') },
        { icon: <Zap className="w-3 h-3 text-violet-500" />, text: t('sidebar.outside.gym') },
        { icon: <Cat className="w-3 h-3 text-violet-500" />, text: t('sidebar.outside.cats') }
      ]
    }
  ];

  return (
    <aside className="space-y-8">
      {/* Profile Image */}
      <div className="glass p-6 rounded-3xl flex flex-col items-center text-center overflow-hidden group">
        <div className="relative w-48 h-48 mb-6 rounded-full overflow-hidden border-2 border-white/5 p-1">
          <img 
            src="/profile.png" 
            alt="Tom Larsson" 
            className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-700"
          />
        </div>
        <h2 className="text-xl font-bold mb-1">{t('name')}</h2>
        <p className="text-violet-400 text-xs font-bold uppercase tracking-widest">{t('title')}</p>
      </div>

      {/* Sidebar Sections */}
      <div className="space-y-6">
        {sections.map((section, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * idx }}
            className="glass p-6 rounded-3xl"
          >
            <div className="flex items-center gap-2 mb-4 text-violet-400">
              {section.icon}
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">
                {section.title}
              </h3>
            </div>
            <ul className="space-y-3">
              {section.content.map((item, i) => (
                <li key={i} className="text-sm">
                  {typeof item === 'string' ? (
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-1.5" />
                      <span className="text-white/70">{item}</span>
                    </div>
                  ) : item.icon ? (
                    <div className="flex gap-2">
                      <div className="mt-1 shrink-0">{item.icon}</div>
                      <span className="text-white/70">{item.text}</span>
                    </div>
                  ) : (
                    <div className="space-y-0.5">
                      <div className="font-bold text-white/90">{item.label}</div>
                      <div className="text-white/60">{item.items}</div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
