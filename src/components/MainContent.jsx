import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Github, 
  Linkedin, 
  ExternalLink,
  Briefcase,
  GraduationCap,
  Code2,
  Users
} from 'lucide-react';

const MainContent = () => {
  const { t } = useLanguage();

  const contactInfo = [
    { icon: <Mail className="w-4 h-4" />, text: 'tom@ttdevs.com', link: 'mailto:tom@ttdevs.com' },
    { icon: <Phone className="w-4 h-4" />, text: '072 212 13 01', link: 'tel:0722121301' },
    { icon: <MapPin className="w-4 h-4" />, text: t('contact.location') },
    { icon: <Globe className="w-4 h-4" />, text: 'ttdevs.com', link: 'https://ttdevs.com' },
    { icon: <Github className="w-4 h-4" />, text: 'github.com/tlxq', link: 'https://github.com/tlxq' },
    { icon: <Linkedin className="w-4 h-4" />, text: 'linkedin.com/in/tlxq', link: 'https://linkedin.com/in/tlxq' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="glass p-8 lg:p-12 rounded-3xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 text-white/10 font-bold text-4xl hidden lg:block">
          {t('lia_period')}
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl lg:text-7xl font-bold mb-4 tracking-tight">
            <span className="text-gradient leading-tight block">{t('name')}</span>
          </h1>
          <div className="flex flex-wrap items-center gap-4">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-white/60">
              {t('title')}
            </h2>
            <div className="lg:hidden text-xs font-bold text-violet-400 border border-violet-500/30 px-2 py-1 rounded">
              {t('lia_period')}
            </div>
          </div>
        </div>
        
        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 pt-12 border-t border-white/5">
          {contactInfo.map((info, idx) => (
            <div key={idx} className="flex items-center gap-3 text-sm text-white/50 group/item">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-violet-400 group-hover/item:bg-violet-500 group-hover/item:text-white transition-colors">
                {info.icon}
              </div>
              {info.link ? (
                <a href={info.link} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  {info.text}
                </a>
              ) : (
                <span>{info.text}</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Profil */}
      <section className="glass p-8 lg:p-12 rounded-3xl">
        <div className="flex items-center gap-3 mb-8">
          <Users className="w-5 h-5 text-violet-400" />
          <h2 className="text-xs font-bold uppercase tracking-[0.2em]">{t('sections.profile')}</h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent ml-4" />
        </div>
        <p className="text-white/70 leading-relaxed text-lg italic font-light">
          "{t('profile_summary')}"
        </p>
      </section>

      {/* Tekniska Projekt */}
      <section className="glass p-8 lg:p-12 rounded-3xl">
        <div className="flex items-center gap-3 mb-10">
          <Code2 className="w-5 h-5 text-violet-400" />
          <h2 className="text-xs font-bold uppercase tracking-[0.2em]">{t('sections.projects')}</h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent ml-4" />
        </div>
        
        <div className="space-y-12">
          {['tt_pulse', 'ttdevs'].map((id) => (
            <div key={id} className="relative pl-8 border-l border-white/5 hover:border-violet-500/30 transition-colors">
              <div className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
                <h3 className="text-2xl font-bold">
                  <a 
                    href={t(`projects.${id}.repo_url`)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-violet-400 transition-colors group/title"
                  >
                    {t(`projects.${id}.title`)}
                    <Github className="w-4 h-4 text-white/20 group-hover/title:text-violet-400 transition-colors" />
                  </a>
                </h3>
                <span className="text-xs font-bold uppercase tracking-widest text-violet-400 bg-violet-500/10 px-3 py-1 rounded-full">
                  {t(`projects.${id}.subtitle`)}
                </span>
              </div>
              <p className="text-white/60 mb-6 font-light">{t(`projects.${id}.description`)}</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {t(`projects.${id}.points`).map((point, i) => {
                  const [label, ...desc] = point.split(': ');
                  return (
                    <li key={i} className="text-sm bg-white/3 p-4 rounded-2xl border border-white/5 hover:bg-white/5 transition-colors">
                      <span className="font-bold text-white block mb-1">{label}</span>
                      <span className="text-white/60">{desc.join(': ')}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Utbildning & Erfarenhet Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Utbildning */}
        <section className="glass p-8 rounded-3xl">
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className="w-5 h-5 text-violet-400" />
            <h2 className="text-xs font-bold uppercase tracking-[0.2em]">{t('sections.education')}</h2>
          </div>
          <div className="space-y-6">
            <div className="relative pl-6 border-l border-white/5">
              <div className="absolute -left-1 w-2 h-2 rounded-full bg-violet-500" />
              <h3 className="font-bold text-lg">{t('education.degree')}</h3>
              <div className="flex items-center justify-between text-xs font-bold text-white/40 uppercase tracking-wider mt-1 mb-4">
                <span>{t('education.school')}</span>
                <span>{t('education.date')}</span>
              </div>
              <p className="text-sm text-white/60">{t('education.description')}</p>
            </div>
          </div>
        </section>

        {/* Erfarenhet */}
        <section className="glass p-8 rounded-3xl">
          <div className="flex items-center gap-3 mb-8">
            <Briefcase className="w-5 h-5 text-violet-400" />
            <h2 className="text-xs font-bold uppercase tracking-[0.2em]">{t('sections.experience')}</h2>
          </div>
          <div className="space-y-8">
            {['operator', 'sales'].map((id) => (
              <div key={id} className="relative pl-6 border-l border-white/5">
                <div className="absolute -left-1 w-2 h-2 rounded-full bg-violet-500" />
                <h3 className="font-bold text-lg">{t(`experience.${id}.title`)}</h3>
                <div className="flex flex-wrap items-center justify-between gap-x-4 text-xs font-bold text-white/40 uppercase tracking-wider mt-1 mb-3">
                  <span>{t(`experience.${id}.company`)}</span>
                  <span>{t(`experience.${id}.date`)}</span>
                </div>
                <p className="text-xs text-white/60 leading-relaxed">{t(`experience.${id}.description`)}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MainContent;
