import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const FEATURED_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4';

function FeaturedVideoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="relative bg-black pt-6 md:pt-10 pb-20 md:pb-32 px-6 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="relative rounded-3xl overflow-hidden aspect-video"
        >
          <video
            src={FEATURED_VIDEO}
            className="w-full h-full object-cover"
            style={{ transform: 'translateZ(0)' }}
            muted
            autoPlay
            loop
            playsInline
            preload="metadata"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Bottom overlay content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-end">
              <div className="liquid-glass rounded-2xl p-6 md:p-8 max-w-md">
                <p className="text-xs tracking-widest uppercase mb-3" style={{ color: '#d4a574' }}>
                  我的故事 · My Story
                </p>
                <p className="text-white text-sm md:text-base leading-relaxed">
                  我是冯江威，设计圈内以"HUGO"为人所知。先后任职于广州皓程、广州云创与上海商睿，从电商设计实战到教育品牌 VI、汽车视觉，再到品牌视觉体系统筹与团队管理，始终相信好的设计是品牌战略的视觉化表达。
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium whitespace-nowrap"
              >
                了解更多
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturedVideoSection;
