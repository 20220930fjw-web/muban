const journalEntries = [
  {
    id: 'job-shanghai',
    date: '2025.02 - 至今',
    title: '品牌设计师 / 设计经理 · 上海商睿智能科技',
    readTime: '统筹品牌视觉体系',
  },
  {
    id: 'job-guangzhou',
    date: '2023.02 - 2024.11',
    title: '品牌设计师 / 新媒体运营设计师 · 广州云创软件',
    readTime: '教育品牌 VI + IP',
  },
  {
    id: 'job-haocheng',
    date: '2022.09 - 2022.12',
    title: '平面设计师 · 广州皓程生物科技',
    readTime: '物料 / VI / 包装',
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
