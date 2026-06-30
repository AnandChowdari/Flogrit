"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Flogrit hero — calm cinematic loop.
 *
 * 18s loop, single light pulse, four beats:
 *   1. enter:   intake → core             (0 .. 0.30)
 *   2. think:   core gently brighter      (0.30 .. 0.42)
 *   3. branch:  3 endpoints, one at a time (0.42 .. 0.78)
 *   4. wave:    soft ring washes outward  (0.72 .. 0.96)
 *   restart:    next intake spawns inside the wave fade (0.92+)
 *
 * Everything is a pure function of loopT ∈ [0,1) → seamless wrap, no resets.
 */

const VB_W = 820;
const VB_H = 560;
const LOOP_MS = 18000;

// ── nodes ────────────────────────────────────────────────────────────────
const N = {
  intake: { x: 90, y: 280, r: 14 },
  core:   { x: 410, y: 280, r: 56 },
  e1:     { x: 700, y: 140, r: 18 }, // upper
  e2:     { x: 740, y: 290, r: 18 }, // middle
  e3:     { x: 700, y: 430, r: 18 }, // lower
} as const;
type NKey = keyof typeof N;
const ENDS: NKey[] = ["e1", "e2", "e3"];

// ── paths (cubic beziers) ────────────────────────────────────────────────
const P = {
  intake: `M ${N.intake.x} ${N.intake.y} C 180 270, 290 280, ${N.core.x} ${N.core.y}`,
  e1:     `M ${N.core.x} ${N.core.y} C 510 230, 590 170, ${N.e1.x} ${N.e1.y}`,
  e2:     `M ${N.core.x} ${N.core.y} C 540 285, 640 290, ${N.e2.x} ${N.e2.y}`,
  e3:     `M ${N.core.x} ${N.core.y} C 510 330, 590 400, ${N.e3.x} ${N.e3.y}`,
} as const;

// ── timing windows (in loop fractions) ───────────────────────────────────
const T = {
  enterStart: 0.00, enterEnd: 0.30,
  thinkStart: 0.28, thinkPeak: 0.36, thinkEnd: 0.46,
  // branches arrive one at a time, gently overlapping
  b1Start: 0.42, b1End: 0.58,
  b2Start: 0.50, b2End: 0.66,
  b3Start: 0.58, b3End: 0.74,
  waveStart: 0.72, waveEnd: 0.98,
};

// easing
const easeInOut = (x: number) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);
const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);
const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);

/** map a sub-window [a,b] of loopT to a local 0..1 progress */
const win = (lt: number, a: number, b: number) => clamp01((lt - a) / (b - a));

/** triangle window: rises to 1 at midpoint, returns to 0 — for transient glows */
const pulseWin = (lt: number, a: number, peak: number, b: number) => {
  if (lt < a || lt > b) return 0;
  return lt < peak ? (lt - a) / (peak - a) : 1 - (lt - peak) / (b - peak);
};

// ────────────────────────────────────────────────────────────────────────
export function HeroFlowAnimation() {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // path refs (for getPointAtLength)
  const refIntake = useRef<SVGPathElement | null>(null);
  const refE1 = useRef<SVGPathElement | null>(null);
  const refE2 = useRef<SVGPathElement | null>(null);
  const refE3 = useRef<SVGPathElement | null>(null);
  const lens = useRef({ intake: 0, e1: 0, e2: 0, e3: 0 });

  // pulse circles
  const pulseMain = useRef<SVGCircleElement | null>(null);
  const pulseB1 = useRef<SVGCircleElement | null>(null);
  const pulseB2 = useRef<SVGCircleElement | null>(null);
  const pulseB3 = useRef<SVGCircleElement | null>(null);

  // node halo refs (opacity targets)
  const haloCore = useRef<SVGCircleElement | null>(null);
  const haloE1 = useRef<SVGCircleElement | null>(null);
  const haloE2 = useRef<SVGCircleElement | null>(null);
  const haloE3 = useRef<SVGCircleElement | null>(null);
  const haloIntake = useRef<SVGCircleElement | null>(null);

  // wave ring
  const waveRing = useRef<SVGCircleElement | null>(null);
  const waveOverlay = useRef<SVGGElement | null>(null);

  const rafRef = useRef(0);
  const visibleRef = useRef(true);
  const [reduced, setReduced] = useState(false);

  // measure paths
  useEffect(() => {
    if (refIntake.current) lens.current.intake = refIntake.current.getTotalLength();
    if (refE1.current) lens.current.e1 = refE1.current.getTotalLength();
    if (refE2.current) lens.current.e2 = refE2.current.getTotalLength();
    if (refE3.current) lens.current.e3 = refE3.current.getTotalLength();
  }, []);

  // reduced motion
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    const fn = () => setReduced(m.matches);
    m.addEventListener?.("change", fn);
    return () => m.removeEventListener?.("change", fn);
  }, []);

  // visibility pause
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const io = new IntersectionObserver(([e]) => {
      visibleRef.current = e?.isIntersecting ?? true;
    });
    io.observe(wrap);
    return () => io.disconnect();
  }, []);

  // ── frame loop ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (reduced) {
      // render a clean resting frame: pulse parked at core, soft halo lift.
      applyState(0.30, refs());
      return;
    }
    const epoch = performance.now();
    const tick = (now: number) => {
      if (!visibleRef.current) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      const lt = ((now - epoch) % LOOP_MS) / LOOP_MS;
      applyState(lt, refs());
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  const refs = () => ({
    lens: lens.current,
    paths: {
      intake: refIntake.current,
      e1: refE1.current, e2: refE2.current, e3: refE3.current,
    },
    pulses: {
      main: pulseMain.current,
      b1: pulseB1.current, b2: pulseB2.current, b3: pulseB3.current,
    },
    halos: {
      intake: haloIntake.current, core: haloCore.current,
      e1: haloE1.current, e2: haloE2.current, e3: haloE3.current,
    },
    wave: { ring: waveRing.current, overlay: waveOverlay.current },
  });

  return (
    <div
      ref={wrapRef}
      className="relative h-full w-full"
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 h-full w-full overflow-visible"
      >
        <defs>
          <radialGradient id="coreFill" cx="50%" cy="45%" r="65%">
            <stop offset="0%" stopColor="oklch(0.32 0.06 124)" stopOpacity="1" />
            <stop offset="100%" stopColor="oklch(0.14 0 0)" stopOpacity="1" />
          </radialGradient>
          <radialGradient id="nodeFill" cx="50%" cy="40%" r="70%">
            <stop offset="0%" stopColor="oklch(0.28 0.03 124)" stopOpacity="1" />
            <stop offset="100%" stopColor="oklch(0.14 0 0)" stopOpacity="1" />
          </radialGradient>
          <radialGradient id="halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.92 0.22 124)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="oklch(0.92 0.22 124)" stopOpacity="0" />
          </radialGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connection paths — calm, low-opacity */}
        <g
          fill="none"
          stroke="oklch(0.92 0.22 124)"
          strokeOpacity="0.18"
          strokeWidth="1.2"
          strokeLinecap="round"
        >
          <path ref={refIntake} d={P.intake} />
          <path ref={refE1} d={P.e1} />
          <path ref={refE2} d={P.e2} />
          <path ref={refE3} d={P.e3} />
        </g>

        {/* Wave overlay — brighter pass of the same paths, opacity driven per-frame */}
        <g
          ref={waveOverlay}
          fill="none"
          stroke="oklch(0.92 0.22 124)"
          strokeOpacity="0"
          strokeWidth="1.4"
          strokeLinecap="round"
          style={{ pointerEvents: "none" }}
        >
          <path d={P.intake} />
          <path d={P.e1} />
          <path d={P.e2} />
          <path d={P.e3} />
        </g>

        {/* Nodes */}
        {(Object.keys(N) as NKey[]).map((k) => {
          const n = N[k];
          const isCore = k === "core";
          const haloRef =
            k === "core" ? haloCore :
            k === "e1" ? haloE1 :
            k === "e2" ? haloE2 :
            k === "e3" ? haloE3 : haloIntake;
          return (
            <g key={k}>
              {/* halo (opacity driven per-frame) */}
              <circle
                ref={haloRef}
                cx={n.x}
                cy={n.y}
                r={n.r * 2.2}
                fill="url(#halo)"
                opacity={isCore ? 0.22 : 0.10}
              />
              {/* body */}
              <circle
                cx={n.x}
                cy={n.y}
                r={n.r}
                fill={isCore ? "url(#coreFill)" : "url(#nodeFill)"}
                stroke="oklch(0.92 0.22 124)"
                strokeOpacity={isCore ? 0.45 : 0.28}
                strokeWidth="1"
              />
              {/* inner hairline */}
              <circle
                cx={n.x}
                cy={n.y}
                r={n.r - 5}
                fill="none"
                stroke="oklch(1 0 0)"
                strokeOpacity="0.05"
              />
            </g>
          );
        })}

        {/* Soft expanding wave ring — opacity & r driven per-frame */}
        <circle
          ref={waveRing}
          cx={N.core.x}
          cy={N.core.y}
          r={0}
          fill="none"
          stroke="oklch(0.92 0.22 124)"
          strokeWidth="1.2"
          strokeOpacity="0"
        />

        {/* Pulses (glow filter) */}
        <g filter="url(#glow)">
          <circle ref={pulseMain} r="4.5" fill="oklch(0.96 0.22 124)" opacity="0" />
          <circle ref={pulseB1} r="3.5" fill="oklch(0.92 0.22 124)" opacity="0" />
          <circle ref={pulseB2} r="3.5" fill="oklch(0.92 0.22 124)" opacity="0" />
          <circle ref={pulseB3} r="3.5" fill="oklch(0.92 0.22 124)" opacity="0" />
        </g>
      </svg>
    </div>
  );
}

// ── per-frame state application (pure-ish) ───────────────────────────────
type Refs = ReturnType<ReturnType<typeof useRefsTypeHelper>>;
// helper type only — we infer Refs from the inner function in the component.
function useRefsTypeHelper() {
  return () => ({
    lens: { intake: 0, e1: 0, e2: 0, e3: 0 },
    paths: {
      intake: null as SVGPathElement | null,
      e1: null as SVGPathElement | null,
      e2: null as SVGPathElement | null,
      e3: null as SVGPathElement | null,
    },
    pulses: {
      main: null as SVGCircleElement | null,
      b1: null as SVGCircleElement | null,
      b2: null as SVGCircleElement | null,
      b3: null as SVGCircleElement | null,
    },
    halos: {
      intake: null as SVGCircleElement | null,
      core: null as SVGCircleElement | null,
      e1: null as SVGCircleElement | null,
      e2: null as SVGCircleElement | null,
      e3: null as SVGCircleElement | null,
    },
    wave: {
      ring: null as SVGCircleElement | null,
      overlay: null as SVGGElement | null,
    },
  });
}

function placePulse(
  pathEl: SVGPathElement | null,
  len: number,
  pulseEl: SVGCircleElement | null,
  t: number,
  opacity: number,
) {
  if (!pathEl || !pulseEl) return;
  if (opacity <= 0.001) {
    pulseEl.setAttribute("opacity", "0");
    return;
  }
  const tt = clamp01(t);
  const pt = pathEl.getPointAtLength(tt * len);
  pulseEl.setAttribute("cx", String(pt.x));
  pulseEl.setAttribute("cy", String(pt.y));
  pulseEl.setAttribute("opacity", String(opacity));
}

function applyState(lt: number, r: Refs) {
  // ── BEAT 1 — pulse enters intake → core ──────────────────────────────
  const entW = win(lt, T.enterStart, T.enterEnd);
  const entT = easeInOut(entW);
  // primary pulse is visible during enter; fade in first 8%, hold, fade slightly approaching core
  const entOp =
    entW <= 0 ? 0 :
    entW < 0.08 ? entW / 0.08 :
    entW > 0.96 ? Math.max(0, 1 - (entW - 0.96) / 0.04) : 1;
  placePulse(r.paths.intake, r.lens.intake, r.pulses.main, entT, entOp);

  // intake node halo gently lifts as pulse enters and fades after
  if (r.halos.intake) {
    const lift = pulseWin(lt, T.enterStart, T.enterStart + 0.04, T.enterEnd) * 0.25;
    r.halos.intake.setAttribute("opacity", String(0.08 + lift));
  }

  // ── BEAT 2 — core "thinks" ────────────────────────────────────────────
  if (r.halos.core) {
    const think = pulseWin(lt, T.thinkStart, T.thinkPeak, T.thinkEnd);
    const restCore = 0.22;
    r.halos.core.setAttribute("opacity", String(restCore + easeInOut(think) * 0.32));
  }

  // ── BEAT 3 — branches arrive one at a time ────────────────────────────
  const branchSpec: Array<[SVGPathElement | null, number, SVGCircleElement | null, SVGCircleElement | null, number, number]> = [
    [r.paths.e1, r.lens.e1, r.pulses.b1, r.halos.e1, T.b1Start, T.b1End],
    [r.paths.e2, r.lens.e2, r.pulses.b2, r.halos.e2, T.b2Start, T.b2End],
    [r.paths.e3, r.lens.e3, r.pulses.b3, r.halos.e3, T.b3Start, T.b3End],
  ];

  for (const [pathEl, len, pulseEl, haloEl, a, b] of branchSpec) {
    const w = win(lt, a, b);
    const tt = easeInOut(w);
    // opacity: fade in at start, hold, fade out at end
    let op = 0;
    if (w > 0 && w < 1) {
      op = w < 0.1 ? w / 0.1 : w > 0.85 ? Math.max(0, 1 - (w - 0.85) / 0.15) : 1;
    }
    placePulse(pathEl, len, pulseEl, tt, op);

    // endpoint halo lift triggered as pulse approaches end of its branch
    if (haloEl) {
      const arrivalCenter = b - 0.02;
      const lift = pulseWin(lt, b - 0.10, arrivalCenter, b + 0.08) * 0.40;
      haloEl.setAttribute("opacity", String(0.10 + lift));
    }
  }

  // ── BEAT 4 — soft wave washes outward from core ──────────────────────
  const waveW = win(lt, T.waveStart, T.waveEnd);
  if (r.wave.ring) {
    if (waveW <= 0 || waveW >= 1) {
      r.wave.ring.setAttribute("opacity", "0");
    } else {
      const radius = easeOut(waveW) * 520; // grows past the endpoints
      // opacity: ramp up fast, fade out slow
      const op = waveW < 0.2 ? (waveW / 0.2) * 0.45 : Math.max(0, 0.45 * (1 - (waveW - 0.2) / 0.8));
      r.wave.ring.setAttribute("r", String(radius));
      r.wave.ring.setAttribute("opacity", String(op));
    }
  }
  if (r.wave.overlay) {
    // the connection paths brighten under the wave, then fade
    const op = waveW <= 0 || waveW >= 1
      ? 0
      : waveW < 0.25 ? (waveW / 0.25) * 0.35 : Math.max(0, 0.35 * (1 - (waveW - 0.25) / 0.75));
    r.wave.overlay.setAttribute("stroke-opacity", String(op));
  }

  // ── seamless wrap: next-cycle pulse spawns during wave fade ──────────
  // If we're past 0.92, also start drawing the next intake pulse fading in.
  if (lt > 0.92 && r.pulses.main && r.paths.intake) {
    // overlay a second pre-pulse using same main element only if there's no current enter pulse drawn.
    // entOp already gates the main pulse. The next loop's lt=0 will take over visually.
    // (Nothing else to do — purity of loopT handles it.)
  }
}
