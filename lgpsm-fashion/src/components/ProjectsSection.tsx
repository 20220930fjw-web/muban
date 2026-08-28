import { useState, useMemo } from 'react';
import {
  CATEGORIES,
  PROJECTS,
  FEATURED_PROJECTS,
  getProjectsByCategory,
  type Project,
} from '../data/projects-data';

interface ProjectsSectionProps {
  onProjectClick: (project: Project) => void;
}

function ProjectsSection({ onProjectClick }: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeSubCategory, setActiveSubCategory] = useState<string>('all');

  const currentCategory = useMemo(
    () => CATEGORIES.find((c) => c.id === activeCategory),
    [activeCategory],
  );

  const subCategories = useMemo(() => {
    if (!currentCategory) return [];
    return currentCategory.subCategories;
  }, [currentCategory]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') {
      return FEATURED_PROJECTS;
    }
    const catProjects = getProjectsByCategory(activeCategory);
    if (activeSubCategory === 'all') return catProjects;
    return catProjects.filter((p) => p.subCategoryId === activeSubCategory);
  }, [activeCategory, activeSubCategory]);

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    setActiveSubCategory('all');
  };

  return (
    <section
      id="projects"
      className="relative w-full px-6 md:px-12 py-20 md:py-32 z-10"
    >
      {/* Hero with brackets */}
      <div className="relative max-w-6xl mx-auto">
        <span className="absolute -top-2 -left-2 w-7 h-7 border-l-2 border-t-2 border-black" />
        <span className="absolute -bottom-2 -right-2 w-7 h-7 border-r-2 border-b-2 border-black" />
        <div className="px-6 md:px-10 py-8">
          <span className="font-orbitron font-bold text-xs md:text-sm tracking-[0.2em] text-[#b8895a] uppercase block mb-3">
            Projects · 项目作品
          </span>
          <h2 className="font-orbitron font-black text-3xl md:text-5xl leading-[1.05] tracking-[0.04em]">
            BRAND &amp; AIGC
            <br />
            <span className="text-accent-gradient">WORKS SHOWCASE</span>
          </h2>
          <p className="font-jakarta text-gray-600 mt-4 max-w-xl text-sm md:text-base leading-relaxed">
            {PROJECTS.length}+ 个项目经验，覆盖教育品牌 / 汽车 / 3C数码 / 美妆 / 科技智能 / 创意概念 六大领域。
          </p>
        </div>
      </div>

      {/* Category Boxes */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-12 max-w-6xl mx-auto">
        <CategoryBox
          active={activeCategory === 'all'}
          name="全部"
          count={`Featured ${FEATURED_PROJECTS.length}`}
          onClick={() => handleCategoryChange('all')}
        />
        {CATEGORIES.map((cat) => (
          <CategoryBox
            key={cat.id}
            active={activeCategory === cat.id}
            name={cat.name}
            count={`${String(cat.count).padStart(2, '0')} Projects`}
            icon={cat.icon}
            onClick={() => handleCategoryChange(cat.id)}
          />
        ))}
      </div>

      {/* Sub-category chips */}
      {currentCategory && subCategories.length > 1 && (
        <div className="flex flex-wrap gap-2 justify-center mt-8 mb-10">
          <SubChip
            active={activeSubCategory === 'all'}
            label={`全部 · ${currentCategory.count}`}
            onClick={() => setActiveSubCategory('all')}
          />
          {subCategories.map((sub) => (
            <SubChip
              key={sub.id}
              active={activeSubCategory === sub.id}
              label={`${sub.name} · ${sub.count}`}
              onClick={() => setActiveSubCategory(sub.id)}
            />
          ))}
        </div>
      )}

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 max-w-6xl mx-auto">
        {filteredProjects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            onClick={() => onProjectClick(project)}
          />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-20 text-gray-400 font-jakarta">
          暂无项目，请选择其他分类
        </div>
      )}
    </section>
  );
}

function CategoryBox({
  active,
  name,
  count,
  icon,
  onClick,
}: {
  active: boolean;
  name: string;
  count: string;
  icon?: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative p-4 md:p-5 border-2 cursor-pointer transition-all duration-300 min-h-[88px] flex flex-col items-center justify-center text-center group ${
        active
          ? 'bg-black text-white border-black'
          : 'bg-white text-black border-black hover:bg-black hover:text-white hover:-translate-y-1'
      }`}
    >
      {icon && <span className="text-2xl mb-1">{icon}</span>}
      <span className="font-orbitron font-bold text-xs md:text-sm tracking-[0.04em] mb-1">
        {name}
      </span>
      <span className="font-orbitron font-bold text-[0.65rem] tracking-[0.1em] opacity-60 uppercase">
        {count}
      </span>
    </button>
  );
}

function SubChip({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-xs font-jakarta font-medium uppercase tracking-[0.1em] cursor-pointer transition-all min-h-[36px] flex items-center ${
        active
          ? 'bg-black text-white'
          : 'border border-black text-black hover:bg-black hover:text-white'
      }`}
    >
      {label}
    </button>
  );
}

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  const hasImage = [
    'youman-brand', 'youjob-brand', 'youman-ip', 'youman-ai', 'profilm-brand', 'yuanshuai',
    'chando', 'chando-promo', 'ai-concept1', 'ai-concept2', 'pack1-tech', 'logo-custom',
    'ip-series3', '3d-poster1', 'youman-poster', 'wanshun', 'hanshan', 'amazon',
  ].includes(project.id);

  const num = String(index + 1).padStart(3, '0');

  return (
    <button
      onClick={onClick}
      className="group relative w-full text-left border-2 border-black bg-white cursor-pointer transition-all duration-300 hover:shadow-[8px_8px_0_#000] hover:-translate-x-1 hover:-translate-y-1"
    >
      {/* Cover */}
      <div className="relative aspect-[16/10] border-b-2 border-black overflow-hidden bg-[#f5f0ea]">
        {hasImage ? (
          <img
            src={`./assets/projects/${project.id}/cover.jpg`}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-25">
            {project.tags[0]?.slice(0, 1) || '✦'}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5">
        {/* Meta row */}
        <div className="flex items-center justify-between mb-2">
          <span className="font-orbitron font-bold text-[0.65rem] tracking-[0.2em] text-[#b8895a] uppercase">
            {project.tags[0]}
          </span>
          <span className="font-orbitron font-bold text-xs opacity-30">{num}</span>
        </div>

        {/* Title */}
        <h3 className="font-jakarta font-bold text-base md:text-lg mb-2 leading-snug group-hover:text-[#b8895a] transition-colors break-words">
          {project.title}
        </h3>

        {/* Description */}
        <p className="font-jakarta text-gray-600 text-sm leading-relaxed line-clamp-2 mb-3 break-words">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-jakarta font-semibold text-[0.65rem] uppercase tracking-[0.06em] px-2 py-1 border border-black"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}

export default ProjectsSection;
