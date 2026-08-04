export function WireframeGlobe({ size }: { size: string }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none">
      <circle cx="32" cy="32" r="28" stroke="black" strokeWidth="1.2" />
      <line x1="4" y1="32" x2="60" y2="32" stroke="black" strokeWidth="1.2" />
      <ellipse cx="32" cy="32" rx="12" ry="28" stroke="black" strokeWidth="1.2" />
      <ellipse cx="32" cy="32" rx="28" ry="12" stroke="black" strokeWidth="1.2" />
      <ellipse cx="32" cy="32" rx="20" ry="28" stroke="black" strokeWidth="1.2" />
      <ellipse cx="32" cy="32" rx="28" ry="20" stroke="black" strokeWidth="1.2" />
    </svg>
  );
}
