const BG_IMAGE_1 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260802_074534_f0d9d476-3f86-4c67-9b12-dfc63d99da41.png&w=1920&q=85';

export default function MobileImage() {
  return (
    <section
      className="lg:hidden border-t border-gray-200"
      style={{ paddingInline: 'var(--pad-x)', paddingBlock: 'var(--pad-y)' }}
    >
      <div
        className="w-full aspect-[4/5] sm:aspect-[16/9] border border-gray-200 overflow-hidden"
        style={{
          backgroundImage: `url(${BG_IMAGE_1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
    </section>
  );
}
