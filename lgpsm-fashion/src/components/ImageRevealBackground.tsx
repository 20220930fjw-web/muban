import { useEffect, useRef } from 'react';

const BG_IMAGE_1 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260802_074534_f0d9d476-3f86-4c67-9b12-dfc63d99da41.png&w=1920&q=85';
const BG_IMAGE_2 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260802_075145_1b557479-775b-43af-8270-f45d79d97d5a.png&w=1920&q=85';

export default function ImageRevealBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const smoothRef = useRef({ x: -9999, y: -9999 });
  const parallaxRef = useRef({ x: 0, y: 0 });
  const revealLayerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<SVGSVGElement>(null);
  const cellRef = useRef(48);

  useEffect(() => {
    const updateCell = () => {
      cellRef.current = Math.round(
        Math.min(64, Math.max(36, window.innerWidth * 0.028))
      );
      if (gridRef.current) {
        const cell = cellRef.current;
        const pattern = gridRef.current.querySelector('pattern');
        if (pattern) {
          pattern.setAttribute('width', String(cell));
          pattern.setAttribute('height', String(cell));
          const path = pattern.querySelector('path');
          if (path) {
            path.setAttribute('d', `M ${cell} 0 L 0 0 0 ${cell}`);
          }
        }
      }
    };

    updateCell();
    window.addEventListener('resize', updateCell);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (smoothRef.current.x === -9999) {
        smoothRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;

    let rafId: number;

    const render = () => {
      smoothRef.current.x += (mouseRef.current.x - smoothRef.current.x) * 0.1;
      smoothRef.current.y += (mouseRef.current.y - smoothRef.current.y) * 0.1;

      const container = containerRef.current;
      if (!container) {
        rafId = requestAnimationFrame(render);
        return;
      }

      const rect = container.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) {
        rafId = requestAnimationFrame(render);
        return;
      }

      const relX = (smoothRef.current.x - rect.left) / rect.width;
      const relY = (smoothRef.current.y - rect.top) / rect.height;
      const cx = Math.max(-0.5, Math.min(0.5, relX - 0.5));
      const cy = Math.max(-0.5, Math.min(0.5, relY - 0.5));

      parallaxRef.current.x += cx * 16 - parallaxRef.current.x * 0.06;
      parallaxRef.current.y += cy * 16 - parallaxRef.current.y * 0.06;

      if (gridRef.current) {
        const pattern = gridRef.current.querySelector('pattern');
        if (pattern) {
          pattern.setAttribute('x', String(parallaxRef.current.x));
          pattern.setAttribute('y', String(parallaxRef.current.y));
        }
      }

      const radius = Math.round(
        Math.min(420, Math.max(160, window.innerWidth * 0.16))
      );
      const canvasCx = Math.max(0, Math.min(512, (smoothRef.current.x - rect.left) / rect.width * 512));
      const canvasCy = Math.max(0, Math.min(512, (smoothRef.current.y - rect.top) / rect.height * 512));
      const scaledRadius = Math.max(10, radius * (512 / rect.width));

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, 512, 512);
        const grad = ctx.createRadialGradient(
          canvasCx, canvasCy, 0,
          canvasCx, canvasCy, scaledRadius
        );
        grad.addColorStop(0, 'rgba(255,255,255,1)');
        grad.addColorStop(0.4, 'rgba(255,255,255,1)');
        grad.addColorStop(0.6, 'rgba(255,255,255,0.75)');
        grad.addColorStop(0.75, 'rgba(255,255,255,0.4)');
        grad.addColorStop(0.88, 'rgba(255,255,255,0.12)');
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 512, 512);
      }

      if (revealLayerRef.current) {
        const dataUrl = canvas.toDataURL();
        revealLayerRef.current.style.maskImage = `url(${dataUrl})`;
        revealLayerRef.current.style.webkitMaskImage = `url(${dataUrl})`;
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateCell);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="hidden lg:block fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${BG_IMAGE_1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <div
        ref={revealLayerRef}
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${BG_IMAGE_2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          maskSize: '100% 100%',
          WebkitMaskSize: '100% 100%',
        }}
      />

      <svg
        ref={gridRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.10 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid-pattern"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
            x="0"
            y="0"
          >
            <path
              d="M 48 0 L 0 0 0 48"
              fill="none"
              stroke="#64748b"
              strokeWidth="0.6"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>
    </div>
  );
}
