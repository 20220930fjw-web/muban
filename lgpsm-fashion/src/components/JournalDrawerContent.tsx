const journalEntries = [
  {
    id: 'aug-2026',
    date: 'AUG 2026',
    title: 'THE ARCHITECTURE OF NEXT-GEN TEXTILES',
    readTime: '4 MIN READ',
  },
  {
    id: 'jul-2026',
    date: 'JUL 2026',
    title: 'CIRCULAR DESIGN IN HIGH-END APPAREL',
    readTime: '6 MIN READ',
  },
  {
    id: 'jun-2026',
    date: 'JUN 2026',
    title: 'MINIMALISM AS A FUNCTIONAL STATEMENT',
    readTime: '3 MIN READ',
  },
];

export default function JournalDrawerContent() {
  return (
    <div className="flex flex-col gap-5">
      {journalEntries.map((entry) => (
        <div key={entry.id} className="border-b border-gray-200 pb-4">
          <div
            className="flex items-center justify-between mb-2"
            style={{ fontSize: 'var(--micro)' }}
          >
            <span className="font-jakarta text-gray-500 uppercase tracking-[0.15em]">
              {entry.date}
            </span>
            <span className="font-jakarta text-gray-400 uppercase tracking-[0.1em]">
              {entry.readTime}
            </span>
          </div>
          <h3
            className="font-jakarta font-semibold"
            style={{ fontSize: 'var(--body)' }}
          >
            {entry.title}
          </h3>
        </div>
      ))}
    </div>
  );
}
