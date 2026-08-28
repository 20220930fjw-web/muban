import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import {
  CATEGORIES,
  PROJECTS,
  FEATURED_PROJECTS,
  getProjectsByCategory,
  type Project,
} from '../data/projects-data';

interface WorksSectionProps {
  onProjectClick: (project: Project) => void;
}

function WorksSection({ onProjectClick }: WorksSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeSubCategory, setActiveSubCategory] = useState<string>('all');
  const [showAll, setShowAll] = useState(false);

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
      return showAll ? PROJECTS : FEATURED_PROJECTS;
    }
    const catProjects = getProjectsByCategory(activeCategory);
    if (activeSubCategory === 'all') return catProjects;
    return catProjects.filter((p) => p.subCategoryId === activeSubCategory);
  }, [activeCategory, activeSubCategory, showAll]);

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    setActiveSubCategory('all');
  };

  return (
    <section id="works" className="relative py-24 px-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, var(--color-brand-glow), transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-16">
          <span className="text-brand text-xs font-bold tracking-[0.25em] uppercase mb-4 block">
            Portfolio · 作品集
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-instrument tracking-tight mb-6">
            Selected <em className="italic text-brand-gradient">Projects</em>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            跨越教育、汽车、美妆、3C、科技、创意六大领域的品牌设计作品，从战略到落地的完整视觉表达。
          </p>
        </div>

        {/* Featured horizontal scroll (only when All + featured) */}
        {activeCategory === 'all' && !showAll && (
          <div className="mb-20">
            <div className="flex items-baseline justify-between mb-6">
              <h3 className="text-2xl font-instrument text-white/90">
                精选 <em className="italic text-brand-gradient">代表作</em>
              </h3>
              <span className="text-white/40 text-sm">{FEATURED_PROJECTS.length} Featured</span>
            </div>
            <div className="overflow-x-auto pb-4 -mx-6 px-6 scroll-smooth">
              <div className="flex gap-5 w-max">
                {FEATURED_PROJECTS.map((project, i) => (
                  <FeaturedCard
                    key={project.id}
                    project={project}
                    index={i}
                    onClick={() => onProjectClick(project)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main Category Cards */}
        <div className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <CategoryCard
              active={activeCategory === 'all'}
              icon="✦"
              name="全部"
              count={PROJECTS.length}
              onClick={() => handleCategoryChange('all')}
            />
            {CATEGORIES.map((cat) => (
              <CategoryCard
                key={cat.id}
                active={activeCategory === cat.id}
                icon={cat.icon}
                name={cat.name}
                count={cat.count}
                onClick={() => handleCategoryChange(cat.id)}
              />
            ))}
          </div>
        </div>

        {/* Sub Category Chips */}
        {currentCategory && subCategories.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mb-10 p-4 rounded-2xl liquid-glass">
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

        {/* Featured/All Switch (only when All) */}
        {activeCategory === 'all' && (
          <div className="flex justify-center mb-10">
            <div className="inline-flex liquid-glass rounded-full p-1">
              <button
                onClick={() => setShowAll(false)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all min-h-[44px] flex items-center ${
                  !showAll ? 'bg-brand text-black' : 'text-white/70 hover:text-white'
                }`}
              >
                精选 {FEATURED_PROJECTS.length}
              </button>
              <button
                onClick={() => setShowAll(true)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all min-h-[44px] flex items-center ${
                  showAll ? 'bg-brand text-black' : 'text-white/70 hover:text-white'
                }`}
              >
                全部 {PROJECTS.length}
              </button>
            </div>
          </div>
        )}

        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <div className="text-center py-20 text-white/40">
            暂无项目，请选择其他分类
          </div>
        )}

        {/* CTA */}
        <div className="mt-20 text-center">
          <p className="text-white/60 mb-4 text-sm">有设计需求？</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 liquid-glass rounded-full px-6 py-3 text-white text-sm font-medium hover:scale-105 transition-transform min-h-[44px]"
          >
            开始合作
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onClick={onClick}
      className="group relative w-[280px] flex-shrink-0 text-left cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-2xl aspect-[3/4] border border-white/10 bg-gradient-to-br from-white/5 to-transparent">
        <img
          src={project.id.startsWith('youman') || project.id.startsWith('profilm') || project.id.startsWith('yuanshuai') || project.id.startsWith('chando') || project.id.startsWith('ai-concept') || project.id.startsWith('pack1') || project.id.startsWith('logo') || project.id.startsWith('ip-series') || project.id.startsWith('3d-poster') || project.id.startsWith('wanshun') || project.id.startsWith('hanshan') || project.id.startsWith('amazon') ? `/assets/projects/${project.id}/cover.jpg` : ''}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-brand text-[0.65rem] font-bold tracking-[0.12em] uppercase">
          {project.tags[0]}
        </div>
      </div>
      <div className="mt-3">
        <h4 className="font-instrument text-xl text-white/90 group-hover:text-brand-glow transition-colors leading-tight">
          {project.title}
        </h4>
        <p className="text-white/50 text-xs mt-1 line-clamp-1">{project.description}</p>
      </div>
    </motion.button>
  );
}

function CategoryCard({
  active,
  icon,
  name,
  count,
  onClick,
}: {
  active: boolean;
  icon: string;
  name: string;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-2xl border text-center cursor-pointer transition-all min-h-[88px] flex flex-col items-center justify-center ${
        active
          ? 'border-brand/60 bg-brand/10 shadow-[0_10px_30px_rgba(212,165,116,0.08)]'
          : 'border-white/10 bg-white/[0.03] hover:border-white/30 hover:bg-white/5'
      }`}
    >
      <span className="text-2xl mb-1">{icon}</span>
      <span className="text-white text-xs font-semibold">{name}</span>
      <span className="text-white/40 text-[0.65rem] mt-0.5">{count} 项</span>
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
      className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer min-h-[36px] flex items-center ${
        active
          ? 'bg-gradient-to-r from-[#e8b88a] to-[#b8895a] text-black'
          : 'border border-white/15 text-white/70 hover:text-white hover:border-white/40'
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

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
      onClick={onClick}
      className="group relative text-left cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] hover:border-brand/40 hover:shadow-[0_16px_40px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1"
    >
      <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-white/5 to-transparent">
        {hasImage ? (
          <img
            src={`/assets/projects/${project.id}/cover.jpg`}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-30">
            {project.tags[0]?.slice(0, 1) || '✦'}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-5">
        <div className="text-brand text-[0.65rem] font-bold tracking-[0.18em] uppercase mb-2">
          {project.tags[0]}
        </div>
        <h4 className="text-white font-semibold text-base mb-2 leading-snug group-hover:text-brand-glow transition-colors">
          {project.title}
        </h4>
        <p className="text-white/60 text-xs leading-relaxed line-clamp-2 mb-3">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[0.65rem] px-2 py-0.5 rounded-full bg-brand/10 text-[#a8937b]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
        <div className="w-9 h-9 rounded-full bg-brand text-black flex items-center justify-center">
          <ChevronRight size={16} />
        </div>
      </div>
    </motion.button>
  );
}

export default WorksSection;
