export default function LanguageMarquee() {
  const row1 = [
    "English", "Telugu", "Hindi", "Tamil", "Kannada", "Malayalam", 
    "Marathi", "Bengali", "Gujarati", "Punjabi", "Odia", "Spanish"
  ];
  const row2 = [
    "French", "German", "Japanese", "Korean", "Portuguese", "Arabic", 
    "Italian", "Dutch", "Russian", "Turkish", "Vietnamese", "Indonesian"
  ];

  return (
    <section id="languages" className="py-16 border-y border-white/5 bg-bg-secondary overflow-hidden relative flex flex-col gap-6">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-bg-secondary to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-bg-secondary to-transparent z-10 pointer-events-none" />
      
      {/* Row 1: Left moving fast */}
      <div className="flex w-max animate-marquee-fast whitespace-nowrap py-2">
        {[...row1, ...row1].map((lang, idx) => {
          const rot = idx % 2 === 0 ? '-rotate-2' : 'rotate-2';
          return (
            <div
              key={idx}
              className={`inline-flex items-center justify-center px-6 py-2.5 mx-2 rounded-xl border-2 border-white/10 bg-[#13131A] text-white/80 font-black text-sm whitespace-nowrap hover:border-[#3B82F6]/60 hover:text-white hover:rotate-0 transition-all transform ${rot}`}
            >
              {lang}
            </div>
          );
        })}
      </div>

      {/* Row 2: Right moving fast */}
      <div className="flex w-max animate-marquee-reverse-fast whitespace-nowrap py-2">
        {[...row2, ...row2].map((lang, idx) => {
          const rot = idx % 2 === 0 ? 'rotate-2' : '-rotate-2';
          return (
            <div
              key={idx}
              className={`inline-flex items-center justify-center px-6 py-2.5 mx-2 rounded-xl border-2 border-white/10 bg-[#13131A] text-white/80 font-black text-sm whitespace-nowrap hover:border-accent-primary/60 hover:text-white hover:rotate-0 transition-all transform ${rot}`}
            >
              {lang}
            </div>
          );
        })}
      </div>
    </section>
  );
}
