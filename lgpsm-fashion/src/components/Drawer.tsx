import { X } from 'lucide-react';
import type { ReactNode } from 'react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export default function Drawer({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
}: DrawerProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full bg-white border-l border-gray-200 z-50 flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          maxWidth: 'var(--drawer-max)',
          width: '100%',
          padding: 'var(--drawer-pad)',
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="font-orbitron font-bold uppercase tracking-[0.08em]" style={{ fontSize: 'var(--body)' }}>
              {title}
            </h2>
            {subtitle && (
              <p className="font-jakarta text-gray-500 mt-1" style={{ fontSize: 'var(--micro)' }}>
                {subtitle}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:opacity-50 transition-opacity cursor-pointer"
            aria-label="Close"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="mt-auto pt-4 border-t border-gray-200">{footer}</div>
        )}
      </div>
    </>
  );
}
