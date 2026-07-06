export default function LanguageMarquee() {
  const row1 = [
    { roman: 'English', native: 'English' },
    { roman: 'Telugu', native: 'తెలుగు' },
    { roman: 'Hindi', native: 'हिन्दी' },
    { roman: 'Tamil', native: 'தமிழ்' },
    { roman: 'Kannada', native: 'ಕನ್ನಡ' },
    { roman: 'Malayalam', native: 'മലയാളം' },
    { roman: 'Marathi', native: 'मराठी' },
    { roman: 'Bengali', native: 'বাংলা' },
    { roman: 'Gujarati', native: 'ગુજરાતી' },
    { roman: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
    { roman: 'Odia', native: 'ଓଡ଼ିଆ' },
    { roman: 'Spanish', native: 'Español' },
  ];
  const row2 = [
    { roman: 'French', native: 'Français' },
    { roman: 'German', native: 'Deutsch' },
    { roman: 'Japanese', native: '日本語' },
    { roman: 'Korean', native: '한국어' },
    { roman: 'Portuguese', native: 'Português' },
    { roman: 'Arabic', native: 'العربية' },
    { roman: 'Italian', native: 'Italiano' },
    { roman: 'Dutch', native: 'Nederlands' },
    { roman: 'Russian', native: 'Русский' },
    { roman: 'Turkish', native: 'Türkçe' },
    { roman: 'Vietnamese', native: 'Tiếng Việt' },
    { roman: 'Indonesian', native: 'Bahasa' },
  ];

  const Chip = ({ lang }) => (
    <div className="inline-flex items-center gap-2 px-4 py-2 mx-1.5 rounded-lg border border-white/[0.08] bg-white/[0.02] whitespace-nowrap transition-colors hover:border-white/20">
      <span className="font-display text-sm font-medium text-white/85">{lang.roman}</span>
      <span className="text-sm text-white/40">{lang.native}</span>
    </div>
  );

  return (
    <section id="languages" className="py-16 border-y border-white/[0.06] overflow-hidden relative flex flex-col gap-4">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-bg-primary to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-bg-primary to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee-fast whitespace-nowrap py-1">
        {[...row1, ...row1].map((lang, idx) => (
          <Chip key={`r1-${idx}`} lang={lang} />
        ))}
      </div>
      <div className="flex w-max animate-marquee-reverse-fast whitespace-nowrap py-1">
        {[...row2, ...row2].map((lang, idx) => (
          <Chip key={`r2-${idx}`} lang={lang} />
        ))}
      </div>
    </section>
  );
}
