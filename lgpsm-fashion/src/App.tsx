import { useRef, useState, useCallback } from 'react';
import ImageRevealBackground from './components/ImageRevealBackground';
import Header from './components/Header';
import Hero from './components/Hero';
import MobileImage from './components/MobileImage';
import Drawer from './components/Drawer';
import ShopDrawerContent from './components/ShopDrawerContent';
import CollectionsDrawerContent from './components/CollectionsDrawerContent';
import JournalDrawerContent from './components/JournalDrawerContent';
import CartDrawerContent from './components/CartDrawerContent';
import Toast from './components/Toast';
import type { CartItem, ShopItem } from './types';

const SHOP_ITEMS: ShopItem[] = [
  { id: 'cyber-tex-overcoat', title: 'CYBER-TEX OVERCOAT', price: '$850', tag: 'LIMITED EDITION' },
  { id: 'geo-mesh-hoodie', title: 'GEO-MESH TECH HOODIE', price: '$320', tag: 'NEW DROP' },
  { id: 'orbital-trousers', title: 'ORBITAL TAPERED TROUSERS', price: '$290', tag: 'IN STOCK' },
  { id: 'modular-vest', title: 'MODULAR ALL-WEATHER VEST', price: '$410', tag: 'PRE-ORDER' },
];

type DrawerType = 'shop' | 'collections' | 'journal' | 'cart' | null;

function App() {
  const [activeDrawer, setActiveDrawer] = useState<DrawerType>(null);
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
    showToast(`Added "${item.title}" to your shopping bag.`);
  }, [showToast]);

  const handleRemoveFromCart = useCallback((id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const handleCheckout = useCallback(() => {
    showToast('Order submitted successfully!');
    setCartItems([]);
    closeDrawer();
  }, [showToast, closeDrawer]);

  const handleShopNow = useCallback(() => {
    openDrawer('shop');
  }, [openDrawer]);

  const handleLogoClick = useCallback(() => {
    closeDrawer();
  }, [closeDrawer]);

  const footer = (
    <p
      className="font-jakarta text-gray-400 uppercase tracking-[0.15em] text-center"
      style={{ fontSize: 'var(--micro)' }}
    >
      LGPSM © 2026 — FUTURE FORWARD FASHION
    </p>
  );

  const cartCount = cartItems.length;

  return (
    <div className="min-h-screen bg-white text-black font-jakarta flex flex-col justify-between relative overflow-hidden antialiased">
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

      {/* Mobile image */}
      <MobileImage />

      {/* Drawers */}
      <Drawer
        isOpen={activeDrawer === 'shop'}
        onClose={closeDrawer}
        title="Catalog"
        subtitle="Featured Garments"
        footer={footer}
      >
        <ShopDrawerContent items={SHOP_ITEMS} onAdd={handleAddToCart} />
      </Drawer>

      <Drawer
        isOpen={activeDrawer === 'collections'}
        onClose={closeDrawer}
        title="Archive 2026"
        subtitle="Season Lineup"
        footer={footer}
      >
        <CollectionsDrawerContent />
      </Drawer>

      <Drawer
        isOpen={activeDrawer === 'journal'}
        onClose={closeDrawer}
        title="Editorial"
        subtitle="Latest Dispatches"
        footer={footer}
      >
        <JournalDrawerContent />
      </Drawer>

      <Drawer
        isOpen={activeDrawer === 'cart'}
        onClose={closeDrawer}
        title="Shopping Bag"
      >
        <CartDrawerContent
          items={cartItems}
          onRemove={handleRemoveFromCart}
          onCheckout={handleCheckout}
        />
      </Drawer>

      {/* Toast */}
      <Toast message={toast.message} show={toast.show} onClose={hideToast} />
    </div>
  );
}

export default App;
