type CornerPosition = 'tl' | 'tr' | 'bl' | 'br';

export function CornerBracket({
  position,
  size,
  strokeWidth = 1.5,
}: {
  position: CornerPosition;
  size: string;
  strokeWidth?: number;
}) {
  const pathMap: Record<CornerPosition, string> = {
    tl: 'M0 11.5V0.5H11.5',
    tr: 'M0.5 0.5H11.5V11.5',
    bl: 'M0 0.5V11.5H11.5',
    br: 'M0.5 11.5H11.5V0.5',
  };

  const posClasses: Record<CornerPosition, string> = {
    tl: 'top-0 left-0',
    tr: 'top-0 right-0',
    bl: 'bottom-0 left-0',
    br: 'bottom-0 right-0',
  };

  return (
    <svg
      viewBox="0 0 12 12"
      width={size}
      height={size}
      className={`absolute ${posClasses[position]}`}
      fill="none"
      stroke="black"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    >
      <path d={pathMap[position]} />
    </svg>
  );
}
