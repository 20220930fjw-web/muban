import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const PHILOSOPHY_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4';

function PhilosophySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="relative bg-black py-28 md:py-40 px-6 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl text-white tracking-tight mb-16 md:mb-24 glow-soft"
        >
          设计 <em className="font-instrument italic text-brand-gradient">理念</em>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Left: Video */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-3xl overflow-hidden aspect-[4/3]"
          >
            <video
              src={PHILOSOPHY_VIDEO}
              className="w-full h-full object-cover"
              style={{ transform: 'translateZ(0)' }}
              muted
              autoPlay
              loop
              playsInline
              preload="metadata"
            />
          </motion.div>

          {/* Right: Text blocks */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col justify-center"
          >
            {/* Block 1 */}
            <div>
              <p className="text-xs tracking-widest uppercase mb-4" style={{ color: '#d4a574' }}>
                策略先行 · Strategy First
              </p>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                设计不是凭空想象的艺术创作，而是基于品牌战略的视觉表达。每一次设计前，我都会深入了解品牌定位、目标受众与市场竞争，确保方案有理有据、精准有效，让设计服务于品牌长期价值。
              </p>
            </div>

            <div className="w-full h-px bg-white/10 my-8" />

            {/* Block 2 */}
            <div>
              <p className="text-xs tracking-widest uppercase mb-4" style={{ color: '#d4a574' }}>
                细节至上 · Detail Driven
              </p>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                魔鬼藏在细节中。从字间距的微调、色彩饱和度的把控，到设计规范的落地与项目节点的推进，每一个细节都影响最终品质。我追求像素级的精准，重视流程中的细节管理。
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default PhilosophySection;
