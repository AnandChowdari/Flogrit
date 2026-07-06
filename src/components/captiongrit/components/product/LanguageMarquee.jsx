export default function LanguageMarquee() {
  // Roman name + native script pairs
  const row1 = [
    { roman: "English", native: "English" },
    { roman: "Telugu", native: "తెలుగు" },
    { roman: "Hindi", native: "हिन्दी" },
    { roman: "Tamil", native: "தமிழ்" },
    { roman: "Kannada", native: "ಕನ್ನಡ" },
    { roman: "Malayalam", native: "മലയാളം" },
    { roman: "Marathi", native: "मराठी" },
    { roman: "Bengali", native: "বাংলা" },
    { roman: "Gujarati", native: "ગુજરાતી" },
    { roman: "Punjabi", native: "ਪੰਜਾਬੀ" },
    { roman: "Odia", native: "ଓଡ଼ିଆ" },
    { roman: "Spanish", native: "Español" },
  ];
  const row2 = [
    { roman: "French", native: "Français" },
    { roman: "German", native: "Deutsch" },
    { roman: "Japanese", native: "日本語" },
    { roman: "Korean", native: "한국어" },
    { roman: "Portuguese", native: "Português" },
    { roman: "Arabic", native: "العربية" },
    { roman: "Italian", native: "Italiano" },
    { roman: "Dutch", native: "Nederlands" },
    { roman: "Russian", native: "Русский" },
    { roman: "Turkish", native: "Türkçe" },
    { roman: "Vietnamese", native: "Tiếng Việt" },
    { roman: "Indonesian", native: "Bahasa" },
  ];

  const Chip = ({ lang, rot }) => (
    <div
      className={`inline-flex items-center gap-2 px-5 py-2.5 mx-2 rounded-xl border-2 border-white/10 bg-[#13131A] whitespace-nowrap hover:border-[#3B82F6]/60 hover:rotate-0 transition-all transform ${rot}`}
    >
      <span className="font-display font-black text-sm text-white">{lang.roman}</span>
      <span className="text-sm text-[#60A5FA]/80 font-medium">{lang.native}</span>
    </div>
  );

  return (
    <section id="languages" className="py-16 border-y border-white/5 bg-bg-secondary overflow-hidden relative flex flex-col gap-6">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-bg-secondary to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-bg-secondary to-transparent z-10 pointer-events-none" />

      {/* Row 1 */}
      <div className="flex w-max animate-marquee-fast whitespace-nowrap py-2">
        {[...row1, ...row1].map((lang, idx) => (
          <Chip key={`r1-${idx}`} lang={lang} rot={idx % 2 === 0 ? '-rotate-2' : 'rotate-2'} />
        ))}
      </div>

      {/* Row 2 */}
      <div className="flex w-max animate-marquee-reverse-fast whitespace-nowrap py-2">
        {[...row2, ...row2].map((lang, idx) => (
          <Chip key={`r2-${idx}`} lang={lang} rot={idx % 2 === 0 ? 'rotate-2' : '-rotate-2'} />
        ))}
      </div>
    </section>
  );
}
