const collections = [
  {
    id: 'field-education',
    title: '教育品牌 · 24 项',
    description: '主导品牌 VI、IP 形象、新媒体内容设计，实现品牌识别度与用户转化双提升。',
  },
  {
    id: 'field-auto',
    title: '汽车品牌 · 12 项',
    description: '参与产品视觉呈现、营销物料设计，平衡商业需求与视觉表达。',
  },
  {
    id: 'field-beauty',
    title: '美妆护肤 · 7 项',
    description: '负责电商平台整体美工设计、详情页与主图优化，提升商品视觉转化效率。',
  },
  {
    id: 'field-3c',
    title: '3C 数码 · 5 项',
    description: '完成品牌宣传物料、LOGO、VI 设计，制定相关设计规范，保障品牌视觉统一性。',
  },
  {
    id: 'field-tech',
    title: '科技智能 · 3 项',
    description: '负责智能科技公司品牌全案设计，统筹品牌视觉体系搭建与团队设计管理。',
  },
  {
    id: 'field-other',
    title: '其他项目 · 15 项',
    description: '覆盖多行业品牌推广、IP 策划、新媒体账号运营等综合设计服务。',
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
