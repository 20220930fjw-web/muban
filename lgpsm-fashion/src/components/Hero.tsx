import { ArrowUpRight } from 'lucide-react';
import { CheckeredIcon } from './CheckeredIcon';
import { WireframeGlobe } from './WireframeGlobe';
import { CornerBracket } from './CornerBracket';
import type { RefObject } from 'react';

interface HeroProps {
  shopNowRef: RefObject<HTMLButtonElement | null>;
  onShopNow: () => void;
}

export default function Hero({ shopNowRef, onShopNow }: HeroProps) {
  return (
    <main
      className="flex-1"
      style={{
        paddingInline: 'var(--pad-x)',
        paddingBlock: 'var(--main-py)',
      }}
    >
      <div className="flex flex-col lg:flex-row justify-between w-full h-full">
        {/* Left block */}
        <div className="flex flex-col justify-center">
          {/* Top-left corner bracket */}
          <div className="relative" style={{ height: 'var(--corner)', marginBottom: 'calc(var(--corner) * 0.8)' }}>
            <CornerBracket position="tl" size="var(--corner)" />
          </div>

          {/* Headline */}
          <h1
            className="font-orbitron font-extrabold uppercase tracking-[0.08em] leading-[1.05]"
            style={{ fontSize: 'var(--headline)' }}
          >
            FUTURE
            <br />
            FORWARD
            <br />
            <span className="inline-flex items-center gap-2">
              FASHION
              <CheckeredIcon width="var(--checker-w)" height="var(--checker-h)" />
            </span>
          </h1>

          {/* Bottom-left corner bracket */}
          <div className="relative" style={{ height: 'var(--corner)', marginTop: 'calc(var(--corner) * 0.8)' }}>
            <CornerBracket position="bl" size="var(--corner)" />
          </div>

          {/* CTA Button */}
          <div className="mt-8">
            <button
              ref={shopNowRef}
              onClick={onShopNow}
              className="group inline-flex items-center gap-2 border border-gray-400 rounded-md hover:bg-black hover:text-white hover:border-black transition-all duration-300 cursor-pointer"
              style={{
                paddingInline: 'var(--btn-px)',
                paddingBlock: 'var(--btn-py)',
                fontSize: 'var(--body)',
              }}
            >
              <span className="font-jakarta uppercase tracking-[0.18em]">SHOP NOW</span>
              <ArrowUpRight
                strokeWidth={1.5}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                style={{ width: 'calc(var(--body) * 1.1)', height: 'calc(var(--body) * 1.1)' }}
              />
            </button>
          </div>
        </div>

        {/* Right lower feature block */}
        <div className="self-end mt-8 lg:mt-0">
          <div
            className="relative border border-black"
            style={{
              minWidth: 'var(--feature-min)',
              padding: 'var(--feature-pad)',
            }}
          >
            <CornerBracket position="tl" size="calc(var(--corner) * 0.9)" />
            <CornerBracket position="tr" size="calc(var(--corner) * 0.9)" />
            <CornerBracket position="bl" size="calc(var(--corner) * 0.9)" />
            <CornerBracket position="br" size="calc(var(--corner) * 0.9)" />

            <div className="flex flex-col items-center text-center">
              <WireframeGlobe size="var(--globe)" />
              <div
                className="font-jakarta font-semibold uppercase tracking-[0.18em] mt-4"
                style={{ fontSize: 'var(--body)', lineHeight: '1.8' }}
              >
                <div>BEYOND TRENDS.</div>
                <div>BUILT FOR TOMORROW.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
