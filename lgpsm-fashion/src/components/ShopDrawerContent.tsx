import type { ShopItem } from '../types';

interface ShopDrawerContentProps {
  items: ShopItem[];
  onAdd: (item: ShopItem) => void;
}

export default function ShopDrawerContent({ items, onAdd }: ShopDrawerContentProps) {
  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => (
        <div key={item.id} className="flex items-center justify-between border-b border-gray-200 pb-4 gap-3">
          <div className="flex flex-col gap-1 min-w-0 flex-1">
            <span
              className="font-jakarta text-gray-500 uppercase tracking-[0.15em] break-words"
              style={{ fontSize: 'var(--micro)' }}
            >
              {item.tag}
            </span>
            <span
              className="font-jakarta font-semibold break-words"
              style={{ fontSize: 'var(--body)' }}
            >
              {item.title}
            </span>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span
              className="font-jakarta font-medium"
              style={{ fontSize: 'var(--body)' }}
            >
              {item.price}
            </span>
            <button
              onClick={() => onAdd(item)}
              className="border px-3 py-1 rounded-md hover:bg-black hover:text-white transition-all cursor-pointer font-jakarta uppercase tracking-[0.1em] shadow-sm min-h-[44px] flex items-center"
              style={{ fontSize: 'var(--micro)', borderColor: 'var(--accent)' }}
            >
              收藏
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
