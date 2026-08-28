import { useState, useEffect } from 'react';
import { Calendar, User, Clock, Layers, CheckCircle2 } from 'lucide-react';
import { getCategoryById, type Project } from '../data/projects-data';

interface ProjectDrawerContentProps {
  project: Project | null;
}

function ProjectDrawerContent({ project }: ProjectDrawerContentProps) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    setCurrentImage(0);
  }, [project]);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16">
        <p className="font-jakarta text-gray-500" style={{ fontSize: 'var(--body)' }}>
          请选择一个项目查看详情
        </p>
      </div>
    );
  }

  const category = getCategoryById(project.categoryId);
  const hasImage = [
    'youman-brand', 'youjob-brand', 'youman-ip', 'youman-ai', 'profilm-brand', 'yuanshuai',
    'chando', 'chando-promo', 'ai-concept1', 'ai-concept2', 'pack1-tech', 'logo-custom',
    'ip-series3', '3d-poster1', 'youman-poster', 'wanshun', 'hanshan', 'amazon',
  ].includes(project.id);

  const galleryImages = hasImage ? [`/assets/projects/${project.id}/cover.jpg`] : [];
  const num = String(project.id.length).padStart(3, '0');

  return (
    <div className="flex flex-col gap-5">
      {/* Gallery */}
      {galleryImages.length > 0 ? (
        <div className="relative aspect-[4/3] w-full border-2 border-black overflow-hidden bg-[#f5f0ea]">
          <img
            src={galleryImages[currentImage]}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-black text-white font-orbitron font-bold text-[0.65rem] tracking-[0.18em] uppercase">
            {category?.name}
          </div>
          <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-white text-black font-orbitron font-bold text-[0.65rem] tracking-[0.12em]">
            #{num}
          </div>
        </div>
      ) : (
        <div className="aspect-[4/3] w-full border-2 border-black flex items-center justify-center bg-[#f5f0ea]">
          <span className="text-6xl opacity-25">{category?.icon || '✦'}</span>
        </div>
      )}

      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <div className="flex items-center justify-between gap-3 mb-3" style={{ fontSize: 'var(--micro)' }}>
          <span className="font-jakarta font-bold tracking-[0.2em] text-[#b8895a] uppercase">
            {category?.name} · {project.year}
          </span>
          <span className="font-orbitron font-bold opacity-30">#{num}</span>
        </div>
        <h3 className="font-jakarta font-bold break-words" style={{ fontSize: 'var(--body)' }}>
          {project.title}
        </h3>
      </div>

      {/* Description */}
      <p className="font-jakarta text-gray-700 leading-relaxed break-words" style={{ fontSize: 'var(--body)' }}>
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-jakarta font-semibold text-[0.65rem] uppercase tracking-[0.06em] px-2.5 py-1 border border-black"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Meta */}
      <div className="grid grid-cols-2 gap-3 p-4 border-2 border-black bg-white">
        <MetaItem icon={<User size={12} />} label="客户" value={project.client} />
        <MetaItem icon={<Calendar size={12} />} label="年份" value={project.year} />
        <MetaItem icon={<Clock size={12} />} label="周期" value={project.duration} />
        <MetaItem icon={<Layers size={12} />} label="范围" value={project.scope.slice(0, 2).join(' / ')} />
      </div>

      {/* Scope */}
      <div>
        <h4 className="font-jakarta font-bold uppercase tracking-[0.15em] mb-2 text-xs">
          项目范围
        </h4>
        <div className="flex flex-wrap gap-2">
          {project.scope.map((s) => (
            <span
              key={s}
              className="font-jakarta text-xs px-3 py-1.5 border border-gray-300 text-gray-700"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Highlights */}
      <div>
        <h4 className="font-jakarta font-bold uppercase tracking-[0.15em] mb-3 text-xs">
          项目亮点
        </h4>
        <ul className="space-y-2">
          {project.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 font-jakarta text-sm text-gray-700">
              <CheckCircle2 size={14} className="text-[#b8895a] flex-shrink-0 mt-1" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
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
    <div className="flex flex-col gap-1 min-w-0">
      <div className="flex items-center gap-1.5 font-jakarta text-[0.7rem] uppercase tracking-[0.12em] font-bold text-[#b8895a]">
        {icon}
        {label}
      </div>
      <span className="font-jakarta text-sm break-words">{value}</span>
    </div>
  );
}

export default ProjectDrawerContent;
