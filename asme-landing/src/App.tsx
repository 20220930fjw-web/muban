import { useState } from 'react';
import Hero from './components/Hero';
import WorksSection from './components/WorksSection';
import ProjectDetailDrawer from './components/ProjectDetailDrawer';
import AboutSection from './components/AboutSection';
import FeaturedVideoSection from './components/FeaturedVideoSection';
import PhilosophySection from './components/PhilosophySection';
import ServicesSection from './components/ServicesSection';
import type { Project } from './data/projects-data';

function App() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    setActiveProject(project);
    setDrawerOpen(true);
  };

  const handleClose = () => {
    setDrawerOpen(false);
  };

  return (
    <div className="bg-black min-h-screen text-white relative">
      <div className="grain-overlay" />
      <Hero />
      <WorksSection onProjectClick={handleProjectClick} />
      <AboutSection />
      <FeaturedVideoSection />
      <PhilosophySection />
      <ServicesSection />
      <ProjectDetailDrawer
        project={activeProject}
        isOpen={drawerOpen}
        onClose={handleClose}
      />
    </div>
  );
}

export default App;
