import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const SERVICES_VIDEO_1 =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4';
const SERVICES_VIDEO_2 =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4';

const stagger = 0.15;

function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.3 + i * stagger },
    }),
  };

  return (
    <section
      ref={ref}
      className="relative bg-black py-28 md:py-40 px-6 overflow-hidden"
    >
      <div className="bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_60%)] absolute inset-0 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-center justify-between mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl text-white tracking-tight">
            What we do
          </h2>
          <p className="text-white/40 text-sm hidden md:block">Our services</p>
        </motion.div>

        {/* Two-card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Card 1 */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="liquid-glass rounded-3xl overflow-hidden group"
          >
            <div className="relative aspect-video overflow-hidden">
              <video
                src={SERVICES_VIDEO_1}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ transform: 'translateZ(0)' }}
                muted
                autoPlay
                loop
                playsInline
                preload="metadata"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between mb-3">
                <span className="uppercase tracking-widest text-white/40 text-xs">
                  Strategy
                </span>
                <div className="liquid-glass rounded-full p-2">
                  <ArrowUpRight size={18} className="text-white" />
                </div>
              </div>
              <h3 className="text-white text-xl md:text-2xl mb-3 tracking-tight">
                Research & Insight
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                We dig deep into data, culture, and human behavior to surface the insights that drive meaningful, lasting change.
              </p>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="liquid-glass rounded-3xl overflow-hidden group"
          >
            <div className="relative aspect-video overflow-hidden">
              <video
                src={SERVICES_VIDEO_2}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ transform: 'translateZ(0)' }}
                muted
                autoPlay
                loop
                playsInline
                preload="metadata"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between mb-3">
                <span className="uppercase tracking-widest text-white/40 text-xs">
                  Craft
                </span>
                <div className="liquid-glass rounded-full p-2">
                  <ArrowUpRight size={18} className="text-white" />
                </div>
              </div>
              <h3 className="text-white text-xl md:text-2xl mb-3 tracking-tight">
                Design & Execution
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                From concept to launch, we obsess over every detail to deliver experiences that feel effortless and look extraordinary.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
