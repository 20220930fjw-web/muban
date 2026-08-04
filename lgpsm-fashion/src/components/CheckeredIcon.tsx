export function CheckeredIcon({
  width,
  height,
}: {
  width: string;
  height: string;
}) {
  const size = 3.8;
  const gap = 0;
  const rowShift = 2.25;
  const rows = [0, 1, 2, 3];

  return (
    <svg
      viewBox="0 0 36 18"
      width={width}
      height={height}
      style={{ transform: 'translateY(2px)' }}
    >
      {rows.map((row) => {
        const y = row * (size + gap);
        const shift = row % 2 === 0 ? 0 : rowShift;
        return (
          <g key={row}>
            <rect
              x={shift}
              y={y}
              width={size}
              height={size}
              fill="black"
            />
            <rect
              x={shift + size * 2 + gap}
              y={y}
              width={size}
              height={size}
              fill="black"
            />
          </g>
        );
      })}
    </svg>
  );
}
