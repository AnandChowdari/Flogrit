import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CaptionModesSection() {
  const modes = [
    {
      title: "Natural Phrase",
      desc: "flowing conversational captions"
    },
    {
      title: "Word by Word",
      desc: "one word at a time, TikTok style"
    },
    {
      title: "Phonetic Mode",
      desc: "Telugu / Hindi / Tamil / Malayalam"
    }
  ];

  // Active Card Border Switch Loop
  const [activeCard, setActiveCard] = useState(1); // Default to matching second card active state

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 3);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // --- Animation State 1: Natural Phrase ---
  const [phrase1Visible, setPhrase1Visible] = useState([]);
  useEffect(() => {
    let active = true;
    const parts = [
      { text: "AI captions are ", hl: false },
      { text: "taking", hl: true },
      { text: " ", hl: false },
      { text: "over", hl: true },
      { text: " the world.", hl: false }
    ];
    
    function run() {
      if (!active) return;
      setPhrase1Visible([]);
      let i = 0;
      
      function next() {
        if (!active) return;
        if (i > parts.length) {
          setTimeout(() => {
            if (active) run();
          }, 1400);
          return;
        }
        setPhrase1Visible(parts.slice(0, i));
        i++;
        setTimeout(next, i <= 1 ? 350 : 230);
      }
      next();
    }
    run();
    return () => { active = false; };
  }, []);

  // --- Animation State 2: Word by Word ---
  const wbwWords = ["AI", "captions", "are", "taking", "over", "the", "world."];
  const wbwHL = [false, false, false, true, false, false, false];
  const [wbwIndex, setWbwIndex] = useState(0);

  useEffect(() => {
    let active = true;
    function nextWord() {
      if (!active) return;
      setWbwIndex((prev) => {
        const nextIdx = prev + 1;
        if (nextIdx > wbwWords.length) {
          setTimeout(() => {
            if (active) setWbwIndex(0);
          }, 1000);
          return prev;
        }
        setTimeout(nextWord, nextIdx === 1 ? 550 : 380);
        return nextIdx;
      });
    }
    
    const timer = setTimeout(nextWord, 550);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [wbwIndex === 0]);

  // --- Animation State 3: Phonetic Mode ---
  const phonetics = [
    { lang: "Telugu", parts: [{ text: "Nenu AI use ", hl: false }, { text: "chestunnanu", hl: true }, { text: " .", hl: false }] },
    { lang: "Hindi", parts: [{ text: "Main AI se ", hl: false }, { text: "seekh raha", hl: true }, { text: " hoon .", hl: false }] },
    { lang: "Tamil", parts: [{ text: "Naan AI ", hl: false }, { text: "upayogikkirean", hl: true }, { text: " .", hl: false }] },
    { lang: "Malayalam", parts: [{ text: "Njaan AI ", hl: false }, { text: "upayogikkunnu", hl: true }, { text: " .", hl: false }] }
  ];
  const [phoneticIdx, setPhoneticIdx] = useState(0);
  const [phoneticVisible, setPhoneticVisible] = useState([]);
  const [phoneticFade, setPhoneticFade] = useState(true);

  useEffect(() => {
    let active = true;
    const current = phonetics[phoneticIdx % phonetics.length];
    
    setPhoneticFade(true);
    setPhoneticVisible([]);
    
    let i = 0;
    function next() {
      if (!active) return;
      if (i > current.parts.length) {
        setTimeout(() => {
          if (!active) return;
          setPhoneticFade(false);
          setTimeout(() => {
            if (active) {
              setPhoneticIdx((prev) => prev + 1);
            }
          }, 350);
        }, 1400);
        return;
      }
      setPhoneticVisible(current.parts.slice(0, i));
      i++;
      setTimeout(next, i <= 1 ? 350 : 230);
    }
    
    const initialTimer = setTimeout(next, 350);
    return () => {
      active = false;
      clearTimeout(initialTimer);
    };
  }, [phoneticIdx]);

  return (
    <section className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-white tracking-tight"><span className="font-accent">Three Ways</span> to Caption</h2>
          <p className="text-base font-body text-text-secondary">Choose the style that fits your video's vibe.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {modes.map((mode, idx) => {
            const isActive = activeCard === idx;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`bg-white/[0.03] backdrop-blur-[20px] p-8 flex flex-col items-center text-center rounded-2xl transition-all duration-500 border-2 ${
                  isActive ? 'border-accent-primary shadow-[0_0_25px_rgba(198,255,52,0.15)]' : 'border-white/[0.06] hover:border-white/10'
                }`}
              >
                <h3 className="font-display font-bold text-lg mb-1.5 text-white">{mode.title}</h3>
                <p className="text-xs text-text-secondary mb-8 leading-relaxed">{mode.desc}</p>
                
                <div className="w-full bg-[#0d0d0d] rounded-xl p-6 border border-white/5 relative overflow-hidden min-h-[130px] flex flex-col items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 pointer-events-none" />
                  
                  {idx === 0 && (
                    <p className="font-display font-bold text-[15px] relative z-10 leading-relaxed text-center">
                      {phrase1Visible.map((part, pIdx) => (
                        <span 
                          key={pIdx} 
                          className={part.hl ? 'text-accent-primary glow-text font-bold' : 'text-[#d0d0d0]'}
                        >
                          {part.text}
                        </span>
                      ))}
                    </p>
                  )}

                  {idx === 1 && (
                    <p className="font-display font-bold text-[15px] relative z-10 leading-relaxed text-center">
                      {wbwWords.map((w, j) => {
                        const isPassed = j < wbwIndex;
                        const isCurrent = j === wbwIndex;
                        if (isPassed) {
                          return <span key={j} className="text-[#888]">{w} </span>;
                        } else if (isCurrent) {
                          return (
                            <span 
                              key={j} 
                              className={`text-[16px] ${wbwHL[j] ? 'text-accent-primary glow-text' : 'text-white'}`}
                            >
                              {w}{' '}
                            </span>
                          );
                        } else {
                          return <span key={j} className="text-[#444]">| {w} </span>;
                        }
                      })}
                    </p>
                  )}

                  {idx === 2 && (
                    <div className={`transition-all duration-300 flex flex-col items-center gap-1.5 ${phoneticFade ? 'opacity-100' : 'opacity-0'}`}>
                      <span className="text-[10px] text-white/40 uppercase font-semibold tracking-widest font-mono">
                        {phonetics[phoneticIdx % phonetics.length].lang}
                      </span>
                      <p className="font-display font-bold text-[15px] relative z-10 leading-relaxed text-center">
                        {phoneticVisible.map((part, pIdx) => (
                          <span 
                            key={pIdx} 
                            className={part.hl ? 'text-accent-primary glow-text font-bold' : 'text-[#d0d0d0]'}
                          >
                            {part.text}
                          </span>
                        ))}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
