const collections = [
  {
    id: 'series-01',
    title: 'SERIES 01 — SYNTHETIC HORIZONS',
    description:
      'Ultra-durable weather-sealed fabrics with minimalist silhouette architecture.',
  },
  {
    id: 'series-02',
    title: 'SERIES 02 — KINETIC FORM',
    description:
      'Ergonomic streetwear designed for maximum mobility and temperature equilibrium.',
  },
  {
    id: 'series-03',
    title: 'SERIES 03 — MONOCHROME ZERO',
    description:
      'Pure black and white structural tailoring crafted from 100% recycled polymers.',
  },
];

export default function CollectionsDrawerContent() {
  return (
    <div className="flex flex-col gap-5">
      {collections.map((collection) => (
        <div key={collection.id} className="border-b border-gray-200 pb-5">
          <h3
            className="font-jakarta font-semibold mb-2"
            style={{ fontSize: 'var(--body)' }}
          >
            {collection.title}
          </h3>
          <p
            className="font-jakarta text-gray-500 leading-relaxed"
            style={{ fontSize: 'var(--micro)' }}
          >
            {collection.description}
          </p>
        </div>
      ))}
    </div>
  );
}
