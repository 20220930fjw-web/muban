import { X, Maximize2, Minimize2 } from 'lucide-react';
import type { ReactNode } from 'react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  fullscreen?: boolean;
  onToggleFullscreen?: () => void;
  showFullscreenToggle?: boolean;
}

export default function Drawer({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  fullscreen = false,
  onToggleFullscreen,
  showFullscreenToggle = false,
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
        className={`fixed top-0 right-0 h-full bg-white border-l border-gray-200 z-50 flex flex-col transition-all duration-300 ease-out overflow-hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          maxWidth: fullscreen ? '100%' : 'var(--drawer-max)',
          width: '100%',
          padding: fullscreen ? '0' : 'var(--drawer-pad)',
        }}
      >
        {/* Header */}
        <div
          className={`flex items-start justify-between mb-6 gap-3 ${fullscreen ? 'p-6 md:p-8 border-b border-gray-200' : ''}`}
        >
          <div className="min-w-0 flex-1">
            <h2 className="font-orbitron font-bold uppercase tracking-[0.08em] break-words" style={{ fontSize: fullscreen ? 'var(--display)' : 'var(--body)' }}>
              {title}
            </h2>
            {subtitle && (
              <p className="font-jakarta text-gray-500 mt-1 break-words" style={{ fontSize: 'var(--micro)' }}>
                {subtitle}
              </p>
            )}
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            {showFullscreenToggle && onToggleFullscreen && (
              <button
                onClick={onToggleFullscreen}
                className="p-1 hover:opacity-50 transition-opacity cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label={fullscreen ? '退出全屏' : '全屏查看'}
              >
                {fullscreen ? <Minimize2 size={18} strokeWidth={1.5} /> : <Maximize2 size={18} strokeWidth={1.5} />}
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 hover:opacity-50 transition-opacity cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className={`flex-1 overflow-y-auto overflow-x-hidden min-w-0 ${fullscreen ? 'px-6 md:px-8 pb-8' : ''}`}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className={`mt-auto pt-4 border-t border-gray-200 ${fullscreen ? 'px-6 md:px-8' : ''}`}>
            {footer}
          </div>
        )}
      </div>
    </>
  );
}
