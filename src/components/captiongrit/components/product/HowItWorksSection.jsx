import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// --- CONFIGURATION ---
const USE_SINGLE_VIDEO = false;
const SINGLE_VIDEO_PATH = "/videos/how_it_works_full.mp4";

const VIDEO_SOURCES = [
  "/videos/step_1.webm",
  "/videos/step_2.webm",
  "/videos/step_3.webm",
  "/videos/step_4.webm",
  "/videos/step_5.webm",
  "/videos/step_6.webm",
  "/videos/step_7.webm",
];

const STEP_DURATION = 6000;

export default function HowItWorksSection() {
  const steps = [
    {
      title: "Select Your Clip",
      description: "Choose the video clip or sequence you want to generate captions for."
    },
    {
      title: "Choose Language",
      description: "Generate captions in multiple supported languages with high transcription accuracy."
    },
    {
      title: "Select Caption Mode",
      description: "Choose from different caption styles and generation modes to match your content."
    },
    {
      title: "Translate Captions",
      description: "Automatically translate captions into multiple languages to reach a wider audience."
    },
    {
      title: "Customize Caption Flow",
      description: "Apply dynamic caption flow styles, animations, and layouts that fit your brand."
    },
    {
      title: "AI Proofreading (Pro)",
      description: "Automatically review and refine captions using AI Focus on Edit technology for enhanced accuracy."
    },
    {
      title: "Advanced Caption Editor",
      description: "Fine-tune captions, timings, formatting, and styling with powerful editing tools."
    }
  ];

  const [activeStep, setActiveStep] = useState(null);

  // CSS Mockup Fallbacks for each step
  const renderFallbackAnimation = (idx) => {
    switch (idx) {
      case 0:
        return (
          <div className="absolute inset-0 flex flex-col p-6 bg-[#0B0B0C]">
            <div className="flex-1 mb-4 bg-black/40 rounded-lg border border-accent-primary/20 relative overflow-hidden flex items-center justify-center shadow-[0_0_20px_rgba(198,255,52,0.05)]">
              <div className="absolute inset-0 bg-gradient-to-tr from-accent-primary/5 to-transparent opacity-50" />
              <div className="text-center z-10 p-4">
                <svg className="w-10 h-10 text-accent-primary/40 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m-9 1V4a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                <span className="text-xs text-white font-display font-medium block mb-1">Select Video Sequence</span>
                <span className="text-[10px] text-text-secondary">Drag and drop or select clip to transcribe</span>
              </div>
            </div>

            <div className="h-6 bg-white/[0.02] border border-white/5 rounded flex items-center justify-between px-2 text-[10px] font-mono text-text-secondary">
              <span>Selected: interview_clip_01.mp4</span>
              <span className="text-accent-primary">1080p @ 30fps</span>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="absolute inset-0 flex flex-col justify-between p-6 bg-[#0B0B0C]">
            <div className="border-b border-white/5 pb-3">
              <h4 className="text-white text-xs font-bold font-display uppercase tracking-wider text-left">Transcription Language</h4>
            </div>
            <div className="flex-grow py-4 space-y-4 text-left">
              <div className="space-y-1">
                <label className="text-[9px] text-text-secondary uppercase tracking-wider block font-bold">Target Audio Language</label>
                <div className="h-9 bg-white/[0.02] border border-white/10 rounded-lg flex items-center justify-between px-3 text-xs text-white">
                  <span className="flex items-center gap-2">
                    <span className="text-xs">🇺🇸</span> English (US / Auto-Detect)
                  </span>
                  <span className="text-accent-primary text-[10px]">▼</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-text-secondary">
                <div className="p-2 bg-white/[0.01] border border-white/5 rounded flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-primary" /> Multi-speaker Detection
                </div>
                <div className="p-2 bg-white/[0.01] border border-white/5 rounded flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-primary" /> Audio Noise Filtering
                </div>
              </div>
            </div>
            <div className="pt-2 border-t border-white/5 flex justify-end items-center">
              <span className="text-[9px] text-text-secondary font-mono mr-2">99% Transcription Accuracy</span>
              <div className="w-2.5 h-2.5 rounded-full bg-accent-primary animate-pulse" />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="absolute inset-0 flex flex-col justify-between p-6 bg-[#0B0B0C]">
            <div className="border-b border-white/5 pb-3">
              <h4 className="text-white text-xs font-bold font-display uppercase tracking-wider text-left">Caption Generation Modes</h4>
            </div>
            <div className="flex-grow py-3 text-left">
              <label className="text-[9px] text-text-secondary uppercase tracking-wider block font-bold mb-2">Preset Styles</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { name: "Karaoke Glow", color: "text-[#C6FF34]", active: true },
                  { name: "Word-by-Word", color: "text-white", active: false },
                  { name: "Natural Phrase", color: "text-blue-400", active: false }
                ].map((style, i) => (
                  <div
                    key={i}
                    className={`p-2.5 rounded-lg border text-center transition-all duration-300 ${style.active
                        ? "border-accent-primary bg-accent-primary/5 text-white"
                        : "border-white/5 bg-white/[0.01]"
                      }`}
                  >
                    <div className={`text-[11px] font-black tracking-wide ${style.color} mb-0.5`}>Captions</div>
                    <div className="text-[8px] text-text-secondary font-mono">{style.name}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[9px] text-text-secondary font-mono">
              <span>Preset Mode: Karaoke Active</span>
              <span className="text-accent-primary">TikTok/Reels optimized</span>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="absolute inset-0 flex flex-col justify-between p-6 bg-[#0B0B0C]">
            <div className="border-b border-white/5 pb-3">
              <h4 className="text-white text-xs font-bold font-display uppercase tracking-wider text-left">AI Translation Engine</h4>
            </div>
            <div className="flex-grow py-4 space-y-3">
              <div className="flex justify-between items-center text-xs text-white">
                <span className="text-text-secondary text-[10px] font-mono">Translate from: English</span>
                <span className="text-accent-primary text-[10px] font-mono">⚡ Multi-Translate</span>
              </div>
              <div className="space-y-1.5">
                {[
                  { lang: "Spanish (Español)", flag: "🇪🇸", active: true, progress: 100 },
                  { lang: "Japanese (日本語)", flag: "🇯🇵", active: true, progress: 100 },
                  { lang: "German (Deutsch)", flag: "🇩🇪", active: false, progress: 45 }
                ].map((item, i) => (
                  <div key={i} className="p-2 bg-white/[0.02] border border-white/5 rounded-lg flex items-center justify-between">
                    <span className="text-xs text-white flex items-center gap-2">
                      <span>{item.flag}</span> {item.lang}
                    </span>
                    <span className={`text-[10px] font-mono ${item.active ? 'text-accent-primary' : 'text-text-secondary'}`}>
                      {item.active ? "Ready" : `Translating... ${item.progress}%`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="absolute inset-0 flex flex-col justify-between p-6 bg-[#0B0B0C]">
            <div className="border-b border-white/5 pb-3 flex justify-between items-center">
              <h4 className="text-white text-xs font-bold font-display uppercase tracking-wider text-left">Typography & Style Editor</h4>
              <span className="text-[9px] bg-accent-primary/10 text-accent-primary px-1.5 py-0.5 rounded font-mono">V2</span>
            </div>
            <div className="flex-grow py-3 space-y-3">
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-[9px] font-mono text-text-secondary mb-1">
                    <span>FONT SIZE</span>
                    <span className="text-white">48px</span>
                  </div>
                  <div className="h-1 bg-white/10 rounded-full relative">
                    <div className="absolute left-0 top-0 bottom-0 w-3/4 bg-accent-primary rounded-full" />
                    <div className="absolute left-[75%] -top-1.5 w-4 h-4 rounded-full bg-white border border-accent-primary shadow-[0_0_8px_#C6FF34] cursor-pointer" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[9px] font-mono text-text-secondary mb-1">
                    <span>CAPTION DELAY</span>
                    <span className="text-white">0.05s</span>
                  </div>
                  <div className="h-1 bg-white/10 rounded-full relative">
                    <div className="absolute left-0 top-0 bottom-0 w-1/4 bg-accent-primary rounded-full" />
                    <div className="absolute left-[25%] -top-1.5 w-4 h-4 rounded-full bg-white border border-accent-primary shadow-[0_0_8px_#C6FF34] cursor-pointer" />
                  </div>
                </div>
              </div>
              <div className="p-2 bg-black/30 border border-white/5 rounded-lg text-center">
                <span className="text-xs font-black text-accent-primary uppercase tracking-widest font-display animate-pulse">DYNAMIC TEXT FLOW</span>
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="absolute inset-0 flex flex-col justify-between p-6 bg-[#0B0B0C]">
            <div className="border-b border-white/5 pb-3">
              <h4 className="text-white text-xs font-bold font-display uppercase tracking-wider flex items-center gap-1.5 text-left">
                <span className="text-accent-primary">✦</span> Focus on Edit Proofreading
              </h4>
            </div>
            <div className="flex-grow py-3 space-y-2.5">
              <div className="flex items-center justify-between text-[9px] font-mono text-text-secondary">
                <span>ANALYZING SPELLING & TIMINGS</span>
                <span className="text-accent-primary">ACTIVE SCAN</span>
              </div>
              <div className="space-y-1.5 font-mono text-[10px]">
                <div className="p-2 bg-red-950/20 border border-red-900/30 rounded flex justify-between items-center text-red-300">
                  <span>"I bought teh plugin"</span>
                  <span>➜</span>
                  <span className="text-green-400 font-bold">"I bought the plugin"</span>
                </div>
                <div className="p-2 bg-red-950/20 border border-red-900/30 rounded flex justify-between items-center text-red-300">
                  <span>"caption grit is fast"</span>
                  <span>➜</span>
                  <span className="text-green-400 font-bold">"CaptionGrit is fast"</span>
                </div>
              </div>
            </div>
            <div className="pt-2 border-t border-white/5 flex justify-end">
              <span className="text-[9px] text-accent-primary font-mono font-bold animate-pulse">✦ AI Autocorrections Applied</span>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="absolute inset-0 flex flex-col justify-between p-6 bg-[#0B0B0C] overflow-hidden">
            <div className="flex-1 flex flex-col items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-accent-primary/5 to-transparent opacity-20" />
              <div className="w-48 h-24 bg-black rounded-lg border border-white/5 relative overflow-hidden flex flex-col items-center justify-end pb-4">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-3">
                  <svg className="w-4 h-4 text-accent-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: [0.95, 1.05, 0.95] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="px-2.5 py-1 rounded bg-[#C6FF34] text-black font-black text-[9px] uppercase tracking-wider shadow-[0_0_12px_rgba(198,255,52,0.3)]"
                >
                  EDIT TIMELINE BLOCKS
                </motion.div>
              </div>
            </div>

            <div className="space-y-1 font-mono text-[9px] mt-2 border-t border-white/5 pt-3">
              <div className="flex gap-2 items-center">
                <span className="w-8 text-accent-primary font-bold">Timeline</span>
                <div className="flex-1 flex gap-1 h-3">
                  <div className="w-[20%] bg-accent-primary border border-accent-primary/30 rounded" />
                  <div className="w-[10%] bg-white/10 border border-white/20 rounded animate-pulse" />
                  <div className="w-[25%] bg-accent-primary border border-accent-primary/30 rounded" />
                  <div className="w-[45%] bg-accent-primary border border-accent-primary/30 rounded" />
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="how-it-works" className="py-24 sm:py-32 px-5 sm:px-6 bg-bg-secondary relative border-y border-white/5 overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-16 text-center"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight">
            From footage to captions in <span className="font-accent text-accent-primary">7 steps</span>
          </h2>
          <p className="text-base sm:text-lg font-body text-text-secondary max-w-2xl mx-auto">
            Pixel-perfect animated captions delivered straight to your timeline. No manual syncing, no external tools.
          </p>
        </motion.div>

        {/* Two-column on desktop: step list + sticky preview. Stacked on mobile. */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-6 lg:gap-10 items-start">
          {/* Step list */}
          <div className="flex flex-col gap-2">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onMouseEnter={() => setActiveStep(idx)}
                  onFocus={() => setActiveStep(idx)}
                  onClick={() => setActiveStep((prev) => (prev === idx ? null : idx))}
                  className={`group relative w-full text-left rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isActive
                      ? 'bg-white/[0.04] border-accent-primary/25 shadow-[0_10px_30px_rgba(0,0,0,0.4),0_0_24px_rgba(198,255,52,0.05)]'
                      : 'bg-white/[0.01] border-white/[0.06] hover:border-white/15 hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="flex items-start gap-4 p-5 sm:p-6">
                    <div
                      className={`w-10 h-10 shrink-0 rounded-full border flex items-center justify-center font-display font-bold text-base transition-all duration-300 ${
                        isActive
                          ? 'bg-accent-primary border-accent-primary text-black shadow-[0_0_15px_rgba(198,255,52,0.3)]'
                          : 'bg-white/5 border-white/10 text-text-secondary group-hover:text-white'
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3
                        className={`text-base sm:text-lg font-display font-bold tracking-tight transition-colors ${
                          isActive ? 'text-white' : 'text-text-primary/80 group-hover:text-white'
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p className="text-sm text-text-secondary leading-relaxed mt-1">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Mobile inline preview when active */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                        className="lg:hidden overflow-hidden"
                      >
                        <div className="px-5 pb-5">
                          <PreviewFrame idx={idx} total={steps.length} renderFallback={renderFallbackAnimation} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>

          {/* Desktop sticky preview */}
          <div className="hidden lg:block sticky top-28">
            <PreviewFrame
              idx={activeStep ?? 0}
              total={steps.length}
              renderFallback={renderFallbackAnimation}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function PreviewFrame({ idx, total, renderFallback }) {
  return (
    <div className="w-full aspect-[16/10] bg-[#0E0E10] rounded-2xl border border-accent-primary/20 overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(198,255,52,0.15)] flex flex-col relative group">
      {/* Optional Top Glow on hover */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

      <div className="flex-grow relative overflow-hidden bg-black/60">
        {!USE_SINGLE_VIDEO ? (
          <video
            key={idx}
            autoPlay
            playsInline
            muted
            loop
            className={`absolute inset-0 w-full h-full ${idx === 5 ? 'object-contain' : 'object-cover'}`}
            onError={(e) => {
              e.target.style.display = 'none';
              if (e.target.nextSibling) e.target.nextSibling.style.display = 'block';
            }}
          >
            <source src={VIDEO_SOURCES[idx]} type="video/webm" />
          </video>
        ) : (
          <video
            autoPlay
            playsInline
            muted
            loop
            src={SINGLE_VIDEO_PATH}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 w-full h-full" style={{ display: 'none' }}>
          {renderFallback(idx)}
        </div>
      </div>

      <div className="px-4 sm:px-5 py-3 border-t border-white/5 bg-[#0B0B0C] flex items-center justify-between text-xs font-mono select-none shrink-0">
        <div className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center border border-white/5 text-white/60">
          <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
            <rect x="4" y="4" width="4" height="16" />
            <rect x="16" y="4" width="4" height="16" />
          </svg>
        </div>
        <div className="text-text-secondary text-[11px] font-semibold flex items-center gap-2">
          <span className="text-accent-primary">0{idx + 1}</span>
          <span className="opacity-30">/</span>
          <span className="opacity-50">0{total}</span>
        </div>
      </div>
    </div>
  );
}
