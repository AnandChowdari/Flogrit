// Reusable gradient section divider. Replace ALL hard <hr> or border-only section breaks.
export default function SectionDivider({ direction = 'down' }) {
  return (
    <div
      className="w-full h-24 pointer-events-none"
      style={{
        background: direction === 'down'
          ? 'linear-gradient(to bottom, #0A0A0A, transparent)'
          : 'linear-gradient(to top, #0A0A0A, transparent)',
      }}
    />
  );
}
