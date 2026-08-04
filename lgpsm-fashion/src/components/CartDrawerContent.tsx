import { ShoppingBag, ChevronRight } from 'lucide-react';
import type { CartItem } from '../types';

interface CartDrawerContentProps {
  items: CartItem[];
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

export default function CartDrawerContent({
  items,
  onRemove,
  onCheckout,
}: CartDrawerContentProps) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16">
        <ShoppingBag size={32} strokeWidth={1.2} className="text-gray-400" />
        <p
          className="font-jakarta text-gray-500"
          style={{ fontSize: 'var(--body)' }}
        >
          Your shopping bag is empty.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col gap-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between border-b border-gray-200 pb-4">
            <div className="flex flex-col gap-1">
              <span
                className="font-jakarta font-semibold"
                style={{ fontSize: 'var(--body)' }}
              >
                {item.title}
              </span>
              <span
                className="font-jakarta text-gray-500"
                style={{ fontSize: 'var(--micro)' }}
              >
                {item.price}
              </span>
            </div>
            <button
              onClick={() => onRemove(item.id)}
              className="text-gray-400 hover:text-black transition-colors uppercase tracking-[0.1em] font-jakarta cursor-pointer"
              style={{ fontSize: 'var(--micro)' }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={onCheckout}
        className="w-full bg-black text-white py-3 rounded-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mt-auto cursor-pointer font-jakarta uppercase tracking-[0.15em]"
        style={{ fontSize: 'var(--body)' }}
      >
        CHECKOUT NOW
        <ChevronRight size={16} strokeWidth={1.5} />
      </button>
    </div>
  );
}
