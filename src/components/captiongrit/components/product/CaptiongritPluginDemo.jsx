import { useState, useEffect } from 'react';

const LANGUAGES = [
  {
    id: 'teng', label: 'Tenglish', file: 'Tenglish_Clip.mp4', stt: 'Deepgram', ai: 'Groq Llama', mode: 'English Phonetic',
    captions: [
      { time: '00:00:01', text: 'Andaru ki namaste ra' },
      { time: '00:00:04', text: 'Ee video lo meeku' },
      { time: '00:00:08', text: 'Caption Flogrit chupistanu' },
      { time: '00:00:12', text: 'Chala easy ga untundi' },
      { time: '00:00:16', text: 'Thanks ra 🙌' }
    ]
  },
  {
    id: 'hing', label: 'Hinglish', file: 'Hinglish_Clip.mp4', stt: 'Deepgram', ai: 'OpenRouter', mode: 'English Phonetic',
    captions: [
      { time: '00:00:01', text: 'Kya haal hai sab' },
      { time: '00:00:04', text: 'Is video mein main' },
      { time: '00:00:08', text: 'Caption Flogrit dikhaunga' },
      { time: '00:00:12', text: 'Bahut aasaan hai yaar' },
      { time: '00:00:16', text: 'Thanks guys 🙌' }
    ]
  },
  {
    id: 'hi', label: 'Hindi', file: 'Hindi_Clip.mp4', stt: 'ElevenLabs Scribe', ai: 'Gemini Flash', mode: 'Native Script',
    captions: [
      { time: '00:00:01', text: 'नमस्ते दोस्तों' },
      { time: '00:00:04', text: 'इस वीडियो में मैं आपको' },
      { time: '00:00:08', text: 'Caption Flogrit दिखाऊँगा' },
      { time: '00:00:12', text: 'यह बहुत आसान है' },
      { time: '00:00:16', text: 'धन्यवाद 🙏' }
    ]
  },
  {
    id: 'ta', label: 'Tamil', file: 'Tamil_Clip.mp4', stt: 'Deepgram', ai: 'Groq Llama', mode: 'Native Script',
    captions: [
      { time: '00:00:01', text: 'வணக்கம் நண்பர்களே' },
      { time: '00:00:04', text: 'இந்த வீடியோவில்' },
      { time: '00:00:07', text: 'Caption Flogrit பற்றி' },
      { time: '00:00:11', text: 'உங்களுக்கு காட்டுகிறேன்' },
      { time: '00:00:15', text: 'நன்றி 🙏' }
    ]
  },
  {
    id: 'ml', label: 'Malayalam', file: 'Malayalam_Clip.mp4', stt: 'ElevenLabs Scribe', ai: 'Gemini Flash', mode: 'Native Script',
    captions: [
      { time: '00:00:01', text: 'നമസ്കാരം സുഹൃത്തുക്കളേ' },
      { time: '00:00:04', text: 'ഈ വീഡിയോയിൽ' },
      { time: '00:00:07', text: 'Caption Flogrit എങ്ങനെ' },
      { time: '00:00:11', text: 'ഉപയോഗിക്കാമെന്ന് കാണിക്കാം' },
      { time: '00:00:15', text: 'നന്ദി 🙏' }
    ]
  },
  {
    id: 'te', label: 'Telugu', file: 'Telugu_Clip.mp4', stt: 'ElevenLabs Scribe', ai: 'Gemini Flash', mode: 'Native Script',
    captions: [
      { time: '00:00:01', text: 'నమస్తే అందరికీ' },
      { time: '00:00:04', text: 'ఈ వీడియోలో మీకు' },
      { time: '00:00:08', text: 'Caption Flogrit చూపిస్తాను' },
      { time: '00:00:12', text: 'ఇది చాలా సులభం' },
      { time: '00:00:16', text: 'ధన్యవాదాలు 🙏' }
    ]
  },
  {
    id: 'en', label: 'English', file: 'English_Clip.mp4', stt: 'ElevenLabs Scribe', ai: 'Gemini Flash', mode: 'English',
    captions: [
      { time: '00:00:01', text: 'Hello everyone' },
      { time: '00:00:04', text: 'In this video' },
      { time: '00:00:08', text: "I'll show you Caption Flogrit" },
      { time: '00:00:12', text: 'It\'s incredibly easy to use' },
      { time: '00:00:16', text: 'Thank you so much 🙌' }
    ]
  }
];

const WAVE_HEIGHTS = [6, 10, 18, 24, 30, 26, 16, 22, 32, 28, 20, 12, 8, 18, 28, 34, 26, 20, 14, 24, 30, 22, 18, 10, 20, 28, 24, 16, 12, 8, 22, 30, 18, 14, 26, 20, 16, 10, 24, 28];

export default function CaptiongritPluginDemo() {
  const [accentColor] = useState('#c6f135');

  // Simulation State Machine
  const [currentIdx, setCurrentIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(-1); // -1 = idle, 0 = scanning, 1 = transcribing, 2 = formatting, 3 = generating
  const [statusText, setStatusText] = useState('Initializing...');
  const [statusState, setStatusState] = useState('running'); // 'running' | 'done' | ''
  const [captionLogs, setCaptionLogs] = useState([]);
  const [activeCaption, setActiveCaption] = useState('');
  const [activeWordIndex, setActiveWordIndex] = useState(-1);

  // Auto-scroll logic for log container
  useEffect(() => {
    const el = document.getElementById('caption-log-container');
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [captionLogs]);

  // Main simulation sequencer effect
  useEffect(() => {
    if (paused) {
      setStatusText('Paused');
      setStatusState('');
      return;
    }

    const lang = LANGUAGES[currentIdx];
    
    // Reset state for new language run
    setCaptionLogs([]);
    setActiveCaption('');
    setActiveWordIndex(-1);
    setProgress(0);
    setStep(0);
    setStatusText('Reading audio track...');
    setStatusState('running');

    let timers = [];
    let intervals = [];

    // Phase 1: Waveform scan simulation
    let pct = 0;
    const scanInterval = setInterval(() => {
      pct += 2.5;
      setProgress(Math.min(pct, 100));
      if (pct >= 100) {
        clearInterval(scanInterval);
        
        // Phase 2: STT Transcription
        setStep(1);
        setStatusText(`Transcribing via ${lang.stt}...`);
        
        const phase2Timeout = setTimeout(() => {
          // Phase 3: AI formatting
          setStep(2);
          setStatusText(`Applying AI formatting (${lang.ai})...`);
          
          const phase3Timeout = setTimeout(() => {
            // Phase 4: Caption Generation
            setStep(3);
            setStatusText('Generating captions...');
            
            let captionIdx = 0;
            const showNextCaption = () => {
              if (captionIdx >= lang.captions.length) {
                const totalLines = lang.captions.length;
                setStatusText(`${totalLines} captions exported ✓`);
                setStatusState('done');
                
                // Pause briefly before advancing to next language
                const nextLangTimeout = setTimeout(() => {
                  setCurrentIdx((prev) => (prev + 1) % LANGUAGES.length);
                }, 2200);
                timers.push(nextLangTimeout);
                return;
              }

              const cap = lang.captions[captionIdx];
              setCaptionLogs((prev) => [...prev, cap]);
              setActiveCaption(cap.text);
              
              // Sync timeline progress
              setProgress(((captionIdx + 1) / lang.captions.length) * 100);

              // Highlight active word
              const words = cap.text.split(' ');
              let wIdx = 0;
              setActiveWordIndex(0);
              
              const wordInterval = setInterval(() => {
                wIdx++;
                if (wIdx < words.length) {
                  setActiveWordIndex(wIdx);
                } else {
                  clearInterval(wordInterval);
                }
              }, 700 / Math.max(words.length, 1));
              intervals.push(wordInterval);

              captionIdx++;
              const nextCapTimeout = setTimeout(showNextCaption, 700);
              timers.push(nextCapTimeout);
            };

            const initialCapTimeout = setTimeout(showNextCaption, 300);
            timers.push(initialCapTimeout);

          }, 800);
          timers.push(phase3Timeout);

        }, 900);
        timers.push(phase2Timeout);
      }
    }, 35);
    intervals.push(scanInterval);

    return () => {
      intervals.forEach(clearInterval);
      timers.forEach(clearTimeout);
    };
  }, [currentIdx, paused]);

  const activeLanguage = LANGUAGES[currentIdx];

  return (
    <div className="w-full bg-[#111111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col font-sans text-white text-left select-none">
      
      {/* 1. macOS Style Header Bar */}
      <div className="bg-[#18181b] px-4 py-3 border-b border-white/5 flex items-center justify-between shrink-0">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
        </div>
        <div className="bg-black/40 border border-white/5 rounded-md text-[10px] text-text-secondary px-6 py-1 font-mono tracking-wide w-48 text-center shrink-0">
          premiere://localhost/workspace
        </div>
        <div className="w-12" />
      </div>

      {/* 2. Main Workspace Frame */}
      <div className="flex flex-col lg:flex-row h-auto lg:h-[550px]">
        
        {/* Left Side: Program Monitor Video Screen + Timeline */}
        <div className="flex-1 flex flex-col bg-[#141416] border-b lg:border-b-0 lg:border-r border-white/5">
          
          {/* Program Monitor (Video Mock Screen) */}
          <div className="flex-1 min-h-[280px] relative overflow-hidden flex items-center justify-center p-4 bg-[#0d0d0f]">
            <img 
              src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800" 
              alt="Speaking Host" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
            
            {/* Flashing Recording Indicator */}
            {!paused && (
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/40 px-2.5 py-1 rounded border border-white/10 z-20">
                <span className="w-2 h-2 rounded-full bg-[#ff4949] animate-pulse" />
                <span className="text-[10px] font-mono tracking-wider text-white">LIVE 00:00:18</span>
              </div>
            )}

            {/* Play Overlay */}
            {paused && (
              <div className="w-12 h-12 rounded-full bg-black/50 border border-white/20 flex items-center justify-center backdrop-blur-sm cursor-pointer hover:bg-black/60 transition-all z-10">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" className="text-white ml-0.5">
                  <polygon points="5 3 19 12 5 21 5 3" fill="currentColor"/>
                </svg>
              </div>
            )}

            {/* Captions overlay on screen */}
            {activeCaption && (
              <div className="absolute bottom-6 left-4 right-4 text-center z-20">
                <div 
                  className="inline-block px-4 py-2 rounded-lg bg-black/75 backdrop-blur-sm border border-white/15 text-sm sm:text-base font-extrabold tracking-wide text-white shadow-2xl animate-[popIn_0.2s_ease_forwards] font-sans"
                >
                  {activeCaption.split(' ').map((word, wIdx) => (
                    <span 
                      key={wIdx} 
                      className="mx-1 transition-colors duration-150 inline-block"
                      style={{ color: wIdx === activeWordIndex ? accentColor : '#ffffff' }}
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Video Control Bar */}
          <div className="bg-[#18181b] border-t border-white/5 px-4 py-2 flex items-center justify-between text-[11px] text-text-secondary select-none">
            <div className="flex items-center gap-3">
              <button className="hover:text-white transition-colors">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="11 19 2 12 11 5 11 19" fill="currentColor"/>
                  <polygon points="22 19 13 12 22 5 22 19" fill="currentColor"/>
                </svg>
              </button>
              <span className="font-mono">00:00:18:12</span>
            </div>
            
            {/* Waveform Sweep bar */}
            <div className="flex-grow mx-4 h-1 bg-white/5 rounded-full relative overflow-hidden">
              <div 
                className="h-full transition-all duration-75 ease-linear" 
                style={{ width: `${progress}%`, backgroundColor: accentColor }}
              />
            </div>
            <span className="font-mono">00:00:30:00</span>
          </div>

          {/* Timeline & Waveform Track */}
          <div className="bg-[#121214] p-4 border-t border-white/5 flex flex-col justify-end h-[100px] relative select-none">
            <div className="text-[9px] text-[#555] font-bold uppercase tracking-widest mb-2">Audio Track v1</div>
            
            <div className="relative flex items-end justify-between h-11 pr-4">
              
              {/* Playhead marker */}
              <div 
                className="absolute top-0 bottom-0 w-0.5 bg-[#ff4949] z-20 pointer-events-none transition-all duration-[80ms] ease-linear"
                style={{ left: `${progress}%` }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#ff4949] absolute -top-[3px] -left-[2px]" />
              </div>

              {WAVE_HEIGHTS.map((h, i) => {
                const activeIndex = Math.floor((progress / 100) * WAVE_HEIGHTS.length);
                const isPassed = i < activeIndex;
                return (
                  <div 
                    key={i}
                    className="w-1.5 rounded-full shrink-0 transition-colors duration-200"
                    style={{
                      height: `${h}px`,
                      backgroundColor: isPassed ? accentColor : '#2b3b5c'
                    }}
                  />
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Side: Captiongrit Extension Panel */}
        <div className="w-full lg:w-[350px] bg-[#111111] flex flex-col shrink-0">
          
          {/* Extension Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#161618] border-b border-[#222]">
            <div className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full flex items-center justify-center transition-colors duration-300"
                style={{ backgroundColor: accentColor }}
              >
                <svg viewBox="0 0 10 10" className="w-2 h-2" fill="none">
                  <polygon points="3.5,2.5 7.5,5 3.5,7.5" fill="#0a1200"/>
                </svg>
              </div>
              <span className="text-[11px] font-bold tracking-wider text-text-secondary uppercase">Captiongrit CEP</span>
            </div>
            <span 
              className="text-[10px] font-bold transition-colors duration-300"
              style={{ color: accentColor }}
            >
              v1.0
            </span>
          </div>

          {/* Scrollable CEP Panel Content */}
          <div className="flex-grow overflow-y-auto min-h-0 bg-[#111] flex flex-col">
            <div className="flex flex-col text-left">
                
                {/* 1. Source Language Cycle List */}
                <div 
                  className="text-[9px] font-bold uppercase tracking-widest px-4 pt-3 pb-1.5 flex items-center gap-1 transition-colors duration-300 animate-[fade_0.3s]"
                  style={{ color: accentColor }}
                >
                  • Source Language
                </div>
                <div className="flex gap-1.5 px-4 pb-3 overflow-x-auto scrollbar-none select-none">
                  {LANGUAGES.map((l, idx) => {
                    const isActive = idx === currentIdx;
                    const isDone = idx < currentIdx;
                    return (
                      <span
                        key={l.id}
                        className={`px-3 py-1.5 rounded-full border text-[10px] font-bold tracking-wide transition-all shrink-0 ${
                          isActive
                            ? 'bg-accent-primary border-accent-primary text-black font-extrabold shadow-[0_0_8px_rgba(198,255,52,0.25)]'
                            : isDone
                            ? 'border-accent-primary/20 text-accent-primary/60'
                            : 'border-white/10 text-white/40'
                        }`}
                        style={isActive ? { backgroundColor: accentColor, borderColor: accentColor, color: '#0a1200' } : isDone ? { borderColor: `${accentColor}20`, color: `${accentColor}90` } : {}}
                      >
                        {l.label}
                      </span>
                    );
                  })}
                </div>

                {/* 2. Clip Box */}
                <div 
                  className="text-[9px] font-bold uppercase tracking-widest px-4 pt-2 pb-1.5 flex items-center gap-1 transition-colors duration-300"
                  style={{ color: accentColor }}
                >
                  • Selected Clip
                </div>
                <div className="mx-4 mb-3 bg-[#161618] border border-white/5 rounded-xl py-2.5 px-3.5 flex items-center justify-between">
                  <span className="text-xs text-white/80 font-mono font-medium">{activeLanguage.file}</span>
                  <span 
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-accent-primary/5 text-accent-primary font-mono"
                    style={{ borderColor: accentColor, color: accentColor, backgroundColor: `${accentColor}10` }}
                  >
                    {activeLanguage.label}
                  </span>
                </div>

                {/* 3. Waveform scanning panel visual */}
                <div className="mx-4 my-2 bg-[#161618] rounded-xl p-3 border border-white/5">
                  <div className="text-[9px] text-white/30 font-bold uppercase tracking-wider mb-2 font-mono">Audio Waveform</div>
                  <div className="flex gap-[2px] items-center h-8 mb-2">
                    {WAVE_HEIGHTS.map((h, i) => {
                      const activeIndex = Math.floor((progress / 100) * WAVE_HEIGHTS.length);
                      const isScanned = i < activeIndex - 1;
                      const isActive = i === activeIndex - 1;
                      return (
                        <div
                          key={i}
                          className="flex-grow rounded-full transition-colors duration-100"
                          style={{
                            height: `${h}px`,
                            backgroundColor: isActive
                              ? '#ffffff'
                              : isScanned
                              ? accentColor
                              : `${accentColor}20`,
                          }}
                        />
                      );
                    })}
                  </div>
                  <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all duration-75 ease-linear"
                      style={{ width: `${progress}%`, backgroundColor: accentColor }}
                    />
                  </div>
                </div>

                {/* 4. STT / AI Info pills */}
                <div className="flex gap-2 px-4 py-2 flex-wrap">
                  <div 
                    className={`text-[10px] px-2.5 py-1 rounded-lg border flex items-center gap-1.5 font-medium transition-all ${
                      step >= 1 ? 'text-white/85 border-white/10' : 'text-white/20 border-white/5'
                    }`}
                  >
                    <span 
                      className="w-1.5 h-1.5 rounded-full transition-colors" 
                      style={{ backgroundColor: step >= 1 ? accentColor : '#333' }}
                    />
                    <span>STT: {activeLanguage.stt}</span>
                  </div>
                  <div 
                    className={`text-[10px] px-2.5 py-1 rounded-lg border flex items-center gap-1.5 font-medium transition-all ${
                      step >= 2 ? 'text-white/85 border-white/10' : 'text-white/20 border-white/5'
                    }`}
                  >
                    <span 
                      className="w-1.5 h-1.5 rounded-full transition-colors" 
                      style={{ backgroundColor: step >= 2 ? accentColor : '#333' }}
                    />
                    <span>AI: {activeLanguage.ai}</span>
                  </div>
                  <div 
                    className={`text-[10px] px-2.5 py-1 rounded-lg border flex items-center gap-1.5 font-medium transition-all ${
                      step >= 3 ? 'text-white/85 border-white/10' : 'text-white/20 border-white/5'
                    }`}
                  >
                    <span 
                      className="w-1.5 h-1.5 rounded-full transition-colors" 
                      style={{ backgroundColor: step >= 3 ? accentColor : '#333' }}
                    />
                    <span>Output: {activeLanguage.mode}</span>
                  </div>
                </div>

                {/* 5. Progress steps line */}
                <div className="flex gap-1.5 px-4 py-2 items-center">
                  {[0, 1, 2, 3].map((s) => {
                    const isDone = s < step;
                    const isActive = s === step;
                    return (
                      <div
                        key={s}
                        className="h-1 flex-grow rounded-full transition-colors duration-300"
                        style={{
                          backgroundColor: isDone
                            ? accentColor
                            : isActive
                            ? `${accentColor}60`
                            : '#1e1e1e',
                        }}
                      />
                    );
                  })}
                </div>

                {/* 6. Status Bar */}
                <div className="flex items-center gap-2 px-4 py-1.5 select-none text-left">
                  <div
                    className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${
                      statusState === 'running' ? 'animate-pulse' : ''
                    }`}
                    style={{
                      backgroundColor:
                        statusState === 'running'
                          ? accentColor
                          : statusState === 'done'
                          ? '#22c47a'
                          : '#333',
                    }}
                  />
                  <span className="text-[10px] text-white/40 font-mono font-bold uppercase tracking-wider">
                    {statusText}
                  </span>
                </div>

                {/* 7. Generated Captions Container */}
                <div 
                  className="text-[9px] font-bold uppercase tracking-widest px-4 pt-3 pb-1.5 flex items-center gap-1 transition-colors duration-300"
                  style={{ color: accentColor }}
                >
                  • Caption Output
                </div>
                <div className="mx-4 mb-3 bg-[#161618] border border-white/5 rounded-xl overflow-hidden flex flex-col font-mono">
                  <div className="px-4 py-2 border-b border-white/5 bg-[#121214] flex justify-between items-center">
                    <span className="text-[9px] text-white/30 font-bold uppercase tracking-wider">Generated Captions</span>
                    <span className="text-[10px] font-bold" style={{ color: accentColor }}>
                      {captionLogs.length > 0 ? `${captionLogs.length} lines` : ''}
                    </span>
                  </div>
                  <div 
                    className="p-1 flex flex-col gap-0 min-h-[120px] max-h-[140px] overflow-y-auto scrollbar-none"
                    id="caption-log-container"
                  >
                    {captionLogs.length === 0 ? (
                      <div className="text-center py-8 text-[11px] text-white/20 italic font-mono select-none">
                        Waiting for engine...
                      </div>
                    ) : (
                      captionLogs.map((c, i) => (
                        <div
                          key={i}
                          className="flex gap-3 items-start p-2 border-b border-white/[0.03] last:border-b-0 animate-[popIn_0.25s_ease_forwards] text-left"
                        >
                          <span className="text-[10px] font-mono font-semibold shrink-0 mt-0.5" style={{ color: accentColor }}>
                            {c.time}
                          </span>
                          <span className="text-xs text-white/80 leading-relaxed font-sans">{c.text}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* 8. Loop Dot indicator */}
                <div className="flex items-center justify-center gap-2 py-1 select-none">
                  <span className="text-[9px] text-white/25 uppercase tracking-widest font-bold font-mono">Auto-looping</span>
                  <div className="flex gap-1">
                    {LANGUAGES.map((_, idx) => (
                      <div
                        key={idx}
                        className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
                        style={{
                          backgroundColor: idx === currentIdx ? accentColor : '#1e1e1e',
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* 9. Control button */}
                <div className="px-4 pt-2 pb-4">
                  <button
                    onClick={() => setPaused(!paused)}
                    className="w-full text-black font-extrabold text-xs py-3 px-4 rounded-xl tracking-wider uppercase transition-all duration-300 transform active:scale-[0.98] select-none cursor-pointer"
                    style={{ backgroundColor: accentColor }}
                  >
                    {paused ? '▶ Resume Demo' : '⏸ Pause Demo'}
                  </button>
                </div>

              </div>
          </div>

        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.97) translateY(4px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}} />
    </div>
  );
}
