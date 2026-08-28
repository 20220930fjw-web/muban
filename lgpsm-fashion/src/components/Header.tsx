import { ShoppingBag } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onLogoClick: () => void;
  onNavClick: (drawer: 'shop' | 'collections' | 'journal' | 'cart') => void;
}

export default function Header({ cartCount, onLogoClick, onNavClick }: HeaderProps) {
  return (
    <header
      className="relative z-20 flex items-center justify-between"
      style={{
        paddingInline: 'var(--pad-x)',
        paddingTop: 'var(--header-pt)',
        paddingBottom: 'var(--section-gap)',
      }}
    >
      {/* Logo */}
      <button
        onClick={onLogoClick}
        className="font-orbitron font-black tracking-[0.15em] hover:opacity-80 transition-opacity cursor-pointer flex items-baseline min-h-[44px]"
        style={{ fontSize: 'var(--logo)' }}
      >
        HUGO
        <span
          className="font-orbitron ml-0.5 text-accent"
          style={{ fontSize: 'var(--logo-deg)', marginTop: '-0.125rem' }}
        >
          ˚
        </span>
      </button>

      {/* Nav */}
      <nav className="flex items-center" style={{ gap: 'var(--gap-nav)' }}>
        <button
          onClick={() => onNavClick('shop')}
          className="font-jakarta font-medium uppercase tracking-[0.2em] hover:opacity-50 transition-opacity cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
          style={{ fontSize: 'var(--nav)' }}
        >
          技能
        </button>
        <button
          onClick={() => onNavClick('collections')}
          className="font-jakarta font-medium uppercase tracking-[0.2em] hover:opacity-50 transition-opacity cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
          style={{ fontSize: 'var(--nav)' }}
        >
          项目
        </button>
        <button
          onClick={() => onNavClick('journal')}
          className="font-jakarta font-medium uppercase tracking-[0.2em] hover:opacity-50 transition-opacity cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
          style={{ fontSize: 'var(--nav)' }}
        >
          经历
        </button>

        <span className="text-gray-300" style={{ fontSize: 'var(--nav)' }}>|</span>

        <button
          onClick={() => onNavClick('cart')}
          className="relative hover:opacity-50 transition-opacity cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="合作意向"
        >
          <ShoppingBag
            strokeWidth={1.5}
            style={{ width: 'var(--icon)', height: 'var(--icon)' }}
          />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-black text-white rounded-full min-w-[16px] h-[16px] flex items-center justify-center text-[10px] font-medium px-1">
              {cartCount}
            </span>
          )}
        </button>
      </nav>
    </header>
  );
}
