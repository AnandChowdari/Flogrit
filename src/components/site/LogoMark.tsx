type Props = { className?: string };

export function LogoMark({ className }: Props) {
  return (
    <img
      src="/flogrit-logo.png"
      alt=""
      aria-hidden="true"
      className={className}
      draggable={false}
      style={{ objectFit: "contain" }}
    />
  );
}
