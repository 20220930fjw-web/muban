import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Minimize2, Calendar, User, Clock, Layers, CheckCircle2 } from 'lucide-react';
import { getCategoryById, type Project } from '../data/projects-data';

interface ProjectDetailDrawerProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

function ProjectDetailDrawer({ project, isOpen, onClose }: ProjectDetailDrawerProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    setCurrentImage(0);
    setFullscreen(false);
  }, [project]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const category = project ? getCategoryById(project.categoryId) : null;
  const hasImage = project && [
    'youman-brand', 'youjob-brand', 'youman-ip', 'youman-ai', 'profilm-brand', 'yuanshuai',
    'chando', 'chando-promo', 'ai-concept1', 'ai-concept2', 'pack1-tech', 'logo-custom',
    'ip-series3', '3d-poster1', 'youman-poster', 'wanshun', 'hanshan', 'amazon',
  ].includes(project.id);

  const galleryImages = hasImage
    ? [`./assets/projects/${project!.id}/cover.jpg`]
    : [];

  return (
    <AnimatePresence>
      {isOpen && project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className={`fixed top-0 right-0 h-full bg-[#0f0f17] border-l border-white/10 z-50 flex flex-col overflow-hidden transition-[max-width] duration-300 ${
              fullscreen ? 'w-full max-w-full' : 'w-full sm:max-w-[520px]'
            }`}
          >
            {/* Top-right buttons */}
            <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
              <button
                onClick={() => setFullscreen((v) => !v)}
                aria-label={fullscreen ? '退出全屏' : '全屏查看'}
                className="w-11 h-11 rounded-full liquid-glass text-white flex items-center justify-center hover:scale-110 transition-transform min-h-[44px] min-w-[44px]"
              >
                {fullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>
              <button
                onClick={onClose}
                aria-label="Close"
                className="w-11 h-11 rounded-full liquid-glass text-white flex items-center justify-center hover:scale-110 transition-transform min-h-[44px] min-w-[44px]"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden">
              {/* Gallery */}
              {galleryImages.length > 0 ? (
                <div className="relative aspect-[4/3] w-full bg-gradient-to-br from-white/5 to-transparent overflow-hidden">
                  <img
                    src={galleryImages[currentImage]}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f17] via-transparent to-transparent" />
                  {galleryImages.length > 1 && (
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {galleryImages.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentImage(i)}
                          aria-label={`Image ${i + 1}`}
                          className={`h-1.5 rounded-full transition-all min-w-[44px] flex items-center justify-center ${
                            i === currentImage ? 'w-8 bg-brand' : 'w-4 bg-white/30'
                          }`}
                        >
                          <span className="block h-1.5 w-4 rounded-full" style={{ background: i === currentImage ? 'var(--color-brand)' : 'rgba(255,255,255,0.3)' }} />
                        </button>
                      ))}
                    </div>
                  )}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-brand text-[0.65rem] font-bold tracking-[0.12em] uppercase">
                    {category?.name}
                  </div>
                </div>
              ) : (
                <div className="aspect-[4/3] w-full flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent">
                  <span className="text-6xl opacity-30">{category?.icon || '✦'}</span>
                </div>
              )}

              {/* Content */}
              <div className="p-6 md:p-8">
                <div className="text-brand text-xs font-bold tracking-[0.2em] uppercase mb-3">
                  {category?.name} · {project.year}
                </div>
                <h2 className="font-instrument text-3xl md:text-4xl text-white mb-4 leading-tight">
                  {project.title}
                </h2>
                <p className="text-white/70 leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-brand/10 text-[#a8937b]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Meta */}
                <div className="grid grid-cols-2 gap-4 mb-8 p-5 rounded-2xl liquid-glass">
                  <MetaItem icon={<User size={14} />} label="客户" value={project.client} />
                  <MetaItem icon={<Calendar size={14} />} label="年份" value={project.year} />
                  <MetaItem icon={<Clock size={14} />} label="周期" value={project.duration} />
                  <MetaItem icon={<Layers size={14} />} label="范围" value={project.scope.slice(0, 2).join(' / ')} />
                </div>

                {/* Scope */}
                <div className="mb-8">
                  <h3 className="text-white text-sm font-bold mb-3 uppercase tracking-[0.15em]">
                    项目范围
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.scope.map((s) => (
                      <span
                        key={s}
                        className="text-xs px-3 py-1.5 rounded-lg border border-white/10 text-white/70"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-8">
                  <h3 className="text-white text-sm font-bold mb-3 uppercase tracking-[0.15em]">
                    项目亮点
                  </h3>
                  <ul className="space-y-2">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-white/70 text-sm">
                        <CheckCircle2 size={16} className="text-brand flex-shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="pt-4 border-t border-white/10">
                  <p className="text-white/60 text-sm mb-4">
                    想了解更多关于此类项目的设计服务？
                  </p>
                  <a
                    href="#contact"
                    onClick={onClose}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand text-black text-sm font-medium hover:scale-105 transition-transform min-h-[44px]"
                  >
                    联系合作
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function MetaItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1.5 text-brand text-[0.7rem] uppercase tracking-[0.12em] font-semibold">
        {icon}
        {label}
      </div>
      <span className="text-white text-sm">{value}</span>
    </div>
  );
}

export default ProjectDetailDrawer;
