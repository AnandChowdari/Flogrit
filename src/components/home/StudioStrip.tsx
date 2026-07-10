import { reels } from "@/lib/data";
import { motion } from "motion/react";
import { Play } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";

const verticalVideos = [
  "Nested Sequence 03.mp4", "Nested Sequence 04.mp4", "Nested Sequence 05.mp4",
  "Nested Sequence 06.mp4", "Nested Sequence 07.mp4", "Nested Sequence 08.mp4",
  "Nested Sequence 09.mp4", "Nested Sequence 10.mp4", "Nested Sequence 11.mp4",
  "Nested Sequence 12 1.mp4", "Nested Sequence 14.mp4", "Nested Sequence 15.mp4",
  "Nested Sequence 17.mp4", "Nested Sequence 18.mp4", "Nested Sequence 19.mp4",
  "Nested Sequence 20.mp4", "Nested Sequence 21.mp4"
];

export function StudioStrip() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Attention, in motion
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.02em] md:text-5xl">
              The output of the first pillar.
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              A snapshot of recent work — the content that earns the room before any system gets to do its job.
            </p>
          </div>
          <div className="hidden font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground md:block">
            12M+ views · 36 pieces shipped this quarter
          </div>
        </div>

        <div className="relative mt-10 h-px w-full bg-border">
          <motion.div
            initial={{ x: "-10%" }}
            whileInView={{ x: "110%" }}
            viewport={{ once: false, margin: "-30%" }}
            transition={{ duration: 6, ease: "linear", repeat: Infinity }}
            className="absolute top-1/2 size-2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_20px_var(--color-lime)]"
          />
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4">
          {reels.map((r, i) => (
            <ReelCard key={r.id} reel={r} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReelCard({ reel, index }: { reel: typeof reels[number]; index: number }) {
  const tall = index % 3 === 0;
  const videoSrc = `/portfolio/vertical/${verticalVideos[index % verticalVideos.length]}`;
  const webmSrc = videoSrc.replace('.mp4', '.webm');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.figure
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
          className={`group relative overflow-hidden rounded-xl border border-border bg-card cursor-pointer ${tall ? "row-span-2 aspect-[9/20]" : "aspect-[9/14]"}`}
        >
          <video
            src={webmSrc}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent pointer-events-none" />

          <div className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/70 text-foreground backdrop-blur opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {index % 2 === 0 ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
            )}
          </div>

          <div className="absolute left-1/2 top-1/2 z-10 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary/90 text-primary-foreground opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
            <Play size={18} fill="currentColor" />
          </div>
        </motion.figure>
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
