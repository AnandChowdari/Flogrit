import { useEffect, useRef } from "react";

/**
 * Fixed, full-viewport ambient layer: animated mesh gradient + noise + subtle
 * mouse-follow radial highlight. GPU-only transforms, respects reduced-motion,
 * disabled on coarse pointers. Never blocks clicks.
 */
export function AmbientBackground() {
  const mouseLayerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = mouseLayerRef.current;
    if (!el) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let raf = 0;
    let pending = false;

    const apply = () => {
      pending = false;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!pending) {
        pending = true;
        raf = requestAnimationFrame(apply);
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* base ink wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% -10%, color-mix(in oklab, var(--color-lime) 5%, transparent), transparent 60%), radial-gradient(80% 60% at 100% 100%, color-mix(in oklab, var(--color-purple) 7%, transparent), transparent 70%)",
        }}
      />

      {/* Mesh gradient blobs — GPU transforms only, long non-repeating loops */}
      <div
        className="absolute -top-[20vmin] -left-[10vmin] h-[70vmin] w-[70vmin] rounded-full opacity-60 blur-3xl will-change-transform"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-lime) 26%, transparent) 0%, transparent 65%)",
          animation: "mesh-drift-a 42s ease-in-out infinite alternate",
        }}
      />
      <div
        className="absolute top-[30vh] -right-[20vmin] h-[80vmin] w-[80vmin] rounded-full opacity-55 blur-3xl will-change-transform"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-purple) 30%, transparent) 0%, transparent 70%)",
          animation: "mesh-drift-b 55s ease-in-out infinite alternate",
        }}
      />
      <div
        className="absolute -bottom-[25vmin] left-[20vw] h-[75vmin] w-[75vmin] rounded-full opacity-50 blur-3xl will-change-transform"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-lime) 18%, transparent) 0%, transparent 70%)",
          animation: "mesh-drift-c 48s ease-in-out infinite alternate",
        }}
      />
      <div
        className="absolute top-[10vh] left-[35vw] h-[55vmin] w-[55vmin] rounded-full opacity-40 blur-3xl will-change-transform"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-purple) 22%, transparent) 0%, transparent 70%)",
          animation: "mesh-drift-d 62s ease-in-out infinite alternate",
        }}
      />

      {/* Mouse-follow highlight: single fixed div, CSS var drives position */}
      <div
        ref={mouseLayerRef}
        className="absolute inset-0 hidden md:block"
        style={{
          background:
            "radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklab, var(--color-lime) 6%, transparent), transparent 60%)",
          transition: "background-position 0.2s ease-out",
        }}
      />

      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.7'/></svg>\")",
        }}
      />

      {/* Faint grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in oklab, var(--color-cream) 30%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--color-cream) 30%, transparent) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
    </div>
  );
}
