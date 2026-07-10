import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';

/**
 * DemoVideo — reusable, lazy-mounted, poster-first video card.
 *
 * Props:
 *   src        MP4/WebM URL (optional; if omitted, renders poster only)
 *   poster     Poster image URL (required)
 *   title      Accessible label / tooltip
 *   className  Wrapper class overrides
 */
export default function DemoVideo({ src, poster, title = 'Product demo', className = '' }) {
  const wrapRef = useRef(null);
  const videoRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      { rootMargin: '200px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const handlePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
    setPlaying(true);
  };

  return (
    <div
      ref={wrapRef}
      className={`relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] ${className}`}
    >
      {/* Poster */}
      {!playing && (
        <img
          src={poster}
          alt={title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Video mounts only when in view + user pressed play */}
      {inView && src && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          playsInline
          muted
          controls={playing}
          preload="metadata"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
            playing ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        />
      )}

      {/* Play overlay */}
      {!playing && (
        <button
          type="button"
          onClick={handlePlay}
          disabled={!src}
          aria-label={src ? `Play ${title}` : 'Video coming soon'}
          className="group absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-colors hover:from-black/70 disabled:cursor-default"
        >
          <motion.span
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            className="grid h-16 w-16 place-items-center rounded-full border border-white/20 bg-[#C6FF34] text-black shadow-[0_0_40px_rgba(198,255,52,0.35)] transition-transform"
          >
            <Play className="h-6 w-6 translate-x-0.5" fill="currentColor" />
          </motion.span>
          <span className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-black/50 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/80 backdrop-blur">
            {src ? 'Play demo' : 'Demo · coming soon'}
          </span>
        </button>
      )}
    </div>
  );
}
