import os

file_path = r"e:\1.Mission Money\Captiongrit\Flogrit Web\Flogrit\src\styles.css"
with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
    lines = f.readlines()

# find where it went bad
good_lines = lines[:265]

with open(file_path, "w", encoding="utf-8") as f:
    f.writelines(good_lines)
    
append_text = """
/* --- Captiongrit Theme Variables --- */
@theme {
  --color-bg-primary: #0A0A0A;
  --color-bg-secondary: #111111;
  --color-bg-tertiary: #161616;
  --color-accent-primary: #C6FF34;
  --color-accent-secondary: #A8E620;
  --color-text-primary: #FFFFFF;
  --color-text-secondary: #888888;
  --color-border-default: #1E1E1E;
}

/* --- Captiongrit Custom CSS --- */
.captiongrit-container {
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
}
.glass {
  background-color: color-mix(in srgb, white 3%, transparent);
  backdrop-filter: blur(20px);
  border: 1px solid color-mix(in srgb, white 6%, transparent);
  border-radius: 1rem;
}
.glass-card {
  background-color: color-mix(in srgb, white 2%, transparent);
  backdrop-filter: blur(12px);
  border: 1px solid color-mix(in srgb, white 6%, transparent);
  border-radius: 1rem;
  transition: all 300ms;
}
.glass-card:hover {
  background-color: color-mix(in srgb, white 4%, transparent);
  border-color: color-mix(in srgb, var(--color-accent-primary) 20%, transparent);
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 0 0 30px rgba(198, 255, 52, 0.05);
}
.glass-card-standard {
  background-color: color-mix(in srgb, white 2%, transparent);
  backdrop-filter: blur(12px);
  border: 1px solid color-mix(in srgb, white 6%, transparent);
  border-radius: 1rem;
  transition: all 300ms;
}
.glass-card-standard:hover {
  border-color: color-mix(in srgb, var(--color-accent-primary) 20%, transparent);
  transform: translateY(-4px);
  box-shadow: 0 0 32px rgba(198, 255, 52, 0.06);
}
.glow-text { text-shadow: 0 0 20px rgba(198, 255, 52, 0.3); }

@keyframes countUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
@keyframes slideUpFade { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
@keyframes glowPulse { 0%, 100% { box-shadow: 0 0 20px rgba(198,255,52,0.1); } 50% { box-shadow: 0 0 40px rgba(198,255,52,0.35); } }
@keyframes stickyDrop { from { transform: translateY(-100%); } to { transform: translateY(0); } }
@keyframes cgMarquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
@keyframes cgMarqueeReverse { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }

@utility animate-count-up { animation: countUp 2s ease-out forwards; }
@utility animate-slide-up-fade { animation: slideUpFade 0.5s ease-out forwards; }
@utility animate-glow-pulse { animation: glowPulse 3s ease-in-out infinite; }
@utility animate-sticky-drop { animation: stickyDrop 0.3s ease-out forwards; }
@utility animate-marquee { animation: cgMarquee 30s linear infinite; }
@utility animate-marquee-fast { animation: cgMarquee 25s linear infinite; }
@utility animate-marquee-reverse-fast { animation: cgMarqueeReverse 25s linear infinite; }
@utility animate-marquee-testimonials { animation: cgMarquee 45s linear infinite; }
"""
with open(file_path, "a", encoding="utf-8") as f:
    f.write(append_text)
