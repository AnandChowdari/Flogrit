import { motion } from "motion/react";
import { Play } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { reels } from "@/lib/data";

/**
 * Looping reel "preview" gallery. Each card is a CSS/SVG mock of a video player —
 * scrubber animates, waveform pulses — now using real video assets.
 */
const verticalVideos = [
  "Nested Sequence 03.mp4", "Nested Sequence 04.mp4", "Nested Sequence 05.mp4",
  "Nested Sequence 06.mp4", "Nested Sequence 07.mp4", "Nested Sequence 08.mp4",
  "Nested Sequence 09.mp4", "Nested Sequence 10.mp4", "Nested Sequence 11.mp4",
  "Nested Sequence 12 1.mp4", "Nested Sequence 14.mp4", "Nested Sequence 15.mp4",
  "Nested Sequence 17.mp4", "Nested Sequence 18.mp4", "Nested Sequence 19.mp4",
  "Nested Sequence 20.mp4", "Nested Sequence 21.mp4"
];

export function ReelGallery() {
  const row1 = [...reels, ...reels];
  return (
    <section className="relative overflow-hidden border-y border-border bg-background py-20 lg:py-28">
      <div className="mx-auto mb-12 max-w-7xl px-5 lg:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          The reel wall
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-4xl font-semibold tracking-[-0.02em] md:text-5xl">
          What "edited by Flogrit" actually looks like.
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          A live wall of shipped edits — hooks, cuts, color, motion. Hover any reel to pause and peek.
        </p>
      </div>

      {/* Marquee row */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <div className="marquee-track flex w-max gap-5 pr-5">
          {row1.map((r, i) => (
            <ReelCard key={`${r.id}-${i}`} reel={r} index={i} />
          ))}
        </div>
      </div>

      {/* Static grid below */}
      <div className="mx-auto mt-14 grid max-w-7xl gap-5 px-5 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {reels.slice(0, 4).map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
          >
            <ReelCard reel={r} large index={i + row1.length} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ReelCard({ reel, large = false, index = 0 }: { reel: (typeof reels)[number]; large?: boolean; index?: number }) {
  const w = large ? "w-full" : "w-[260px]";
  const h = large ? "aspect-[9/14]" : "h-[360px] w-[260px]";
  
  const videoSrc = `/portfolio/vertical/${verticalVideos[index % verticalVideos.length]}`;
  const webmSrc = videoSrc.replace('.mp4', '.webm');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={`hover-glow group relative ${w} ${h} shrink-0 overflow-hidden rounded-2xl border border-border bg-card cursor-pointer`}
        >
          {/* background video (fast loading webm) */}
          <video
            src={webmSrc}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            autoPlay
            muted
            loop
            playsInline
          />

          {/* dark gradient overlay for text readability (optional, kept for hover play button) */}
          <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20 pointer-events-none" />

          {/* Platform Icon */}
          <div className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/70 text-foreground backdrop-blur opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {index % 2 === 0 ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
            )}
          </div>

          {/* play badge */}
          <div className="absolute left-1/2 top-1/2 z-10 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/40 text-primary backdrop-blur-md transition-transform group-hover:scale-110 opacity-0 group-hover:opacity-100">
            <Play size={20} fill="currentColor" />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[400px] border-none bg-transparent p-0 shadow-none">
        <DialogTitle className="sr-only">Video presentation</DialogTitle>
        <video
          src={videoSrc}
          className="w-full h-auto rounded-2xl"
          autoPlay
          controls
          playsInline
        />
      </DialogContent>
    </Dialog>
  );
}
