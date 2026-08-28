import { useRef, useState, useCallback } from 'react';
import ImageRevealBackground from './components/ImageRevealBackground';
import Header from './components/Header';
import Hero from './components/Hero';
import MobileImage from './components/MobileImage';
import ProjectsSection from './components/ProjectsSection';
import Drawer from './components/Drawer';
import ShopDrawerContent from './components/ShopDrawerContent';
import CollectionsDrawerContent from './components/CollectionsDrawerContent';
import JournalDrawerContent from './components/JournalDrawerContent';
import CartDrawerContent from './components/CartDrawerContent';
import ProjectDrawerContent from './components/ProjectDrawerContent';
import Toast from './components/Toast';
import type { CartItem, ShopItem } from './types';
import type { Project } from './data/projects-data';
import { getCategoryById } from './data/projects-data';

const SHOP_ITEMS: ShopItem[] = [
  { id: 'photoshop', title: 'Photoshop', price: '95%', tag: '精通' },
  { id: 'illustrator', title: 'Illustrator', price: '90%', tag: '精通' },
  { id: 'figma', title: 'Figma', price: '85%', tag: '熟练' },
  { id: 'midjourney', title: 'Midjourney', price: '85%', tag: '熟练' },
  { id: 'stable-diffusion', title: 'Stable Diffusion', price: '80%', tag: '熟练' },
  { id: 'after-effects', title: 'After Effects', price: '70%', tag: '掌握' },
];

type DrawerType = 'shop' | 'collections' | 'journal' | 'cart' | 'project' | null;

function App() {
  const [activeDrawer, setActiveDrawer] = useState<DrawerType>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [toast, setToast] = useState({ show: false, message: '' });
  const shopNowRef = useRef<HTMLButtonElement>(null);

  const openDrawer = useCallback((drawer: Exclude<DrawerType, null>) => {
    setActiveDrawer(drawer);
  }, []);

  const closeDrawer = useCallback(() => {
    setActiveDrawer(null);
  }, []);

  const showToast = useCallback((message: string) => {
    setToast({ show: true, message });
  }, []);

  const hideToast = useCallback(() => {
    setToast({ show: false, message: '' });
  }, []);

  const handleAddToCart = useCallback((item: ShopItem) => {
    setCartItems((prev) => [
      ...prev,
      { id: `${item.id}-${Date.now()}`, title: item.title, price: item.price },
    ]);
    showToast(`已收藏技能"${item.title}"。`);
  }, [showToast]);

  const handleRemoveFromCart = useCallback((id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const handleCheckout = useCallback(() => {
    showToast('已收到你的需求，期待与您合作！');
    setCartItems([]);
    closeDrawer();
  }, [showToast, closeDrawer]);

  const handleShopNow = useCallback(() => {
    openDrawer('shop');
  }, [openDrawer]);

  const handleProjectClick = useCallback((project: Project) => {
    setActiveProject(project);
    setActiveDrawer('project');
  }, []);

  const handleLogoClick = useCallback(() => {
    closeDrawer();
  }, [closeDrawer]);

  const footer = (
    <p
      className="font-jakarta text-gray-400 uppercase tracking-[0.15em] text-center"
      style={{ fontSize: 'var(--micro)' }}
    >
      HUGO © 2026 — BRAND & AIGC DESIGN
    </p>
  );

  const cartCount = cartItems.length;

  return (
    <div className="min-h-screen bg-[#fafaf9] text-black font-jakarta flex flex-col justify-between relative overflow-hidden antialiased">
      {/* Gradient mesh background */}
      <div className="gradient-mesh" />
      {/* Grain texture overlay */}
      <div className="grain-overlay" />
      {/* Desktop interactive background */}
      <ImageRevealBackground />

      {/* Header */}
      <Header
        cartCount={cartCount}
        onLogoClick={handleLogoClick}
        onNavClick={openDrawer}
      />

      {/* Hero */}
      <Hero shopNowRef={shopNowRef} onShopNow={handleShopNow} />

      {/* Projects Section */}
      <ProjectsSection onProjectClick={handleProjectClick} />

      {/* Mobile image */}
      <MobileImage />

      {/* Drawers */}
      <Drawer
        isOpen={activeDrawer === 'shop'}
        onClose={closeDrawer}
        title="技能展示"
        subtitle="Skills & Tools"
        footer={footer}
      >
        <ShopDrawerContent items={SHOP_ITEMS} onAdd={handleAddToCart} />
      </Drawer>

      <Drawer
        isOpen={activeDrawer === 'collections'}
        onClose={closeDrawer}
        title="项目领域"
        subtitle="Project Fields"
        footer={footer}
      >
        <CollectionsDrawerContent />
      </Drawer>

      <Drawer
        isOpen={activeDrawer === 'journal'}
        onClose={closeDrawer}
        title="工作经历"
        subtitle="Experience"
        footer={footer}
      >
        <JournalDrawerContent />
      </Drawer>

      <Drawer
        isOpen={activeDrawer === 'cart'}
        onClose={closeDrawer}
        title="合作意向"
      >
        <CartDrawerContent
          items={cartItems}
          onRemove={handleRemoveFromCart}
          onCheckout={handleCheckout}
        />
      </Drawer>

      <Drawer
        isOpen={activeDrawer === 'project'}
        onClose={closeDrawer}
        title={activeProject?.title || '项目详情'}
        subtitle={activeProject ? `${getCategoryById(activeProject.categoryId)?.name} · ${activeProject.year}` : 'Project Detail'}
      >
        <ProjectDrawerContent project={activeProject} />
      </Drawer>

      {/* Toast */}
      <Toast message={toast.message} show={toast.show} onClose={hideToast} />
    </div>
  );
}

export default App;
