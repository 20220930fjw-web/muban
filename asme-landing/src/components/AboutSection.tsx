import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="relative bg-black pt-32 md:pt-44 pb-10 md:pb-14 px-6 overflow-hidden"
    >
      <div className="bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03)_0%,_transparent_70%)] absolute inset-0 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-brand text-sm tracking-widest uppercase mb-6"
          style={{ color: '#d4a574' }}
        >
          About Me · 关于我
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl text-white leading-[1.1] tracking-tight"
        >
          品牌设计师 / <em className="font-instrument italic text-brand-gradient">设计经理</em>
          <br className="hidden md:block" />
          <em className="font-instrument italic text-white/60">4-5 年经验，服务 50+ 客户，完成 66+ 项目。</em>
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="divider-brand mt-10 origin-left"
        />
      </div>
    </section>
  );
}

export default AboutSection;
