import React, { useState, useEffect, useRef } from 'react';

export const JapanesePhilosophySection: React.FC = () => {
  const fiveSPrinciples = [
    {
      step: '01',
      japanese: '整理',
      name: 'Seiri',
      translation: 'Sort & Decluttering',
      image: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1795107076/organizing-alice-keiko.jpg',
      isPhoto: true,
      description: 'Separating what is truly needed from what can be donated, discarded, or stored elsewhere so every space holds only what serves your home.',
    },
    {
      step: '02',
      japanese: '整頓',
      name: 'Seiton',
      translation: 'Set in Order',
      image: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794871511/WhatsApp_Image_2026-10-30_at_10.48.12_1.jpg',
      isPhoto: true,
      description: 'Arranging closets, pantries, and living spaces so every item that stays has a defined place—easy to find, use, and put back.',
    },
    {
      step: '03',
      japanese: '清掃',
      name: 'Seiso',
      translation: 'Shine & Mindful Care',
      image: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794870659/0101.jpg',
      isPhoto: true,
      description: 'Cleaning every space with care—polishing glass, descaling fixtures, and noticing when any area needs extra attention.',
    },
    {
      step: '04',
      japanese: '清潔',
      name: 'Seiketsu',
      translation: 'Standardize & Consistency',
      image: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794870668/0505.jpg',
      isPhoto: true,
      description: 'Using clear routines and checklists so our team maintains a consistent standard of cleanliness and organization on every visit.',
    },
    {
      step: '05',
      japanese: '躾',
      name: 'Shitsuke',
      translation: 'Discipline & Daily Habit',
      image: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794870660/0404.jpg',
      isPhoto: true,
      description: 'Turning the first four steps into lasting habits so your home stays clean, organized, and effortless to maintain over time.',
    },
  ];

  const [activeIdx, setActiveIdx] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const baseThreshold = 148;
      let currentActive = 0;

      cardRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        // Marks card active when its top reaches its progressive sticky stop
        if (rect.top <= baseThreshold + index * 12) {
          currentActive = index;
        }
      });

      setActiveIdx(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [fiveSPrinciples.length]);

  return (
    <section id="philosophy" className="py-24 md:py-32 bg-[#FAFAFA] border-b border-gray-100 relative overflow-x-clip">
      {/* Subtle Japanese Minimalist Aesthetic Accents */}
      <div className="absolute top-12 right-12 text-[120px] sm:text-[180px] font-display font-light text-black/[0.02] select-none pointer-events-none leading-none">
        調和
      </div>

      <div className="max-w-[1180px] w-[92%] mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 fade-in-up-observe">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#0D9488]/10 text-[#0D9488] text-xs font-caps tracking-[2.5px] uppercase font-bold mb-3 border border-[#0D9488]/20">
            <span>CULTURAL HERITAGE · THE 5S METHOD</span>
          </div>

          <h2 className="font-display text-[32px] sm:text-[40px] md:text-[44px] font-semibold leading-[1.2] text-[#0A0A0A] tracking-[-0.02em] mb-4 text-balance">
            Inspired by Japanese Philosophy
          </h2>
          <div className="w-16 h-[2px] bg-[#0D9488] mx-auto mt-2 mb-6" />

          <p className="font-sans text-[16px] sm:text-[18px] text-gray-700 leading-relaxed">
            Rooted in owner Alice Keiko’s Japanese ancestry, our service is guided by traditional principles of discipline, deep respect, and meticulous attention to detail.
          </p>
        </div>

        {/* 5S Cards Showcase: Mobile Sticky Portrait Deck (~360x540) · Desktop 330x440 Editorial Grid */}
        <div className="w-full max-w-[390px] lg:max-w-[1060px] mx-auto mb-16">
          {/* Sticky Progress Bar + Counter (Mobile / Tablet Sticky Stack) */}
          <div className="lg:hidden sticky top-[72px] md:top-[82px] z-30 bg-[#FAFAFA]/95 backdrop-blur-xs pt-3 pb-4 mb-5">
            <div className="flex items-center justify-between mb-2.5 px-0.5">
              <span className="font-caps text-xs tracking-[2px] uppercase text-gray-600 font-bold">
                THE 5S METHOD
              </span>
              <span className="font-caps text-xs tracking-[2px] text-[#0D9488] font-bold tabular-nums">
                {activeIdx + 1} / {fiveSPrinciples.length}
              </span>
            </div>

            {/* Segmented Progress Bar */}
            <div
              className="grid gap-2"
              style={{ gridTemplateColumns: `repeat(${fiveSPrinciples.length}, minmax(0, 1fr))` }}
              aria-hidden="true"
            >
              {fiveSPrinciples.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 transition-all duration-300 ${
                    i === activeIdx
                      ? 'bg-[#0D9488]'
                      : i < activeIdx
                      ? 'bg-[#0D9488]/40'
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* 5 Full-Bleed Photo Cards */}
          <div className="relative pb-6 lg:pb-0 lg:flex lg:flex-wrap lg:justify-center lg:gap-7">
            {fiveSPrinciples.map((item, idx) => {
              const isActive = activeIdx === idx;

              return (
                <div
                  key={item.name}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  className="sticky lg:static transition-all duration-200 mb-10 last:mb-0 lg:mb-0 lg:w-[330px]"
                  style={{
                    top: `${132 + idx * 10}px`,
                    zIndex: idx + 10,
                  }}
                >
                  <div
                    className={`relative w-full min-h-[520px] sm:min-h-[540px] lg:min-h-[440px] rounded-[22px] overflow-hidden flex flex-col justify-between bg-[#031B1D] border transition-all duration-300 group ${
                      isActive
                        ? 'border-[#2DD4BF]/50 shadow-[0_22px_46px_-14px_rgba(3,27,29,0.5),0_6px_18px_rgba(0,0,0,0.16)]'
                        : 'border-white/15 shadow-[0_14px_34px_-12px_rgba(3,27,29,0.38)]'
                    } lg:border-white/15 lg:shadow-[0_18px_40px_-14px_rgba(3,27,29,0.42)] lg:hover:-translate-y-1 lg:hover:shadow-[0_26px_52px_-14px_rgba(3,27,29,0.55)]`}
                  >
                    {/* Full-Bleed Background Photo (keeps face & action framed in upper half) */}
                    <img
                      src={item.image}
                      alt={`${item.name} - ${item.translation}`}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                    />

                    {/* Subtle Top Vignette for Badge & Counter Legibility */}
                    <div
                      className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#031B1D]/70 via-[#031B1D]/25 to-transparent pointer-events-none"
                      aria-hidden="true"
                    />

                    {/* Petrol-Teal Bottom Gradient for Crisp Overlaid Typography */}
                    <div
                      className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-[#02191B] via-[#042B2E]/95 via-45% to-transparent pointer-events-none"
                      aria-hidden="true"
                    />

                    {/* Top Bar: Step Badge + Counter */}
                    <div className="relative z-10 flex items-center justify-between p-5">
                      <span className="inline-flex items-center px-3.5 py-1.5 rounded-[7px] bg-[#074446]/90 backdrop-blur-xs border border-white/15 font-caps text-[11px] sm:text-xs tracking-[2px] uppercase font-bold text-white shadow-xs">
                        STEP {item.step}
                      </span>

                      <span className="font-caps text-sm font-bold tracking-[1.5px] text-white tabular-nums [text-shadow:0_1px_6px_rgba(0,0,0,0.45)]">
                        {idx + 1}/{fiveSPrinciples.length}
                      </span>
                    </div>

                    {/* Visual Breathing Space Preserving Upper-Half Photo Focus */}
                    <div className="flex-1 min-h-[210px] sm:min-h-[225px] lg:min-h-[155px]" aria-hidden="true" />

                    {/* Bottom Overlaid Text Content (HTML/CSS adapts cleanly to longer descriptions) */}
                    <div className="relative z-10 px-6 pb-7 pt-3 text-left">
                      <h3 className="font-display text-[32px] sm:text-[34px] lg:text-[30px] text-white font-semibold leading-[1.1] tracking-[-0.02em] mb-1.5">
                        {item.name}
                      </h3>
                      <span className="font-caps text-[11.5px] sm:text-[12px] tracking-[2px] uppercase text-[#5EEAD4] font-bold block mb-3">
                        {item.translation}
                      </span>
                      <p className="font-sans text-[14.5px] sm:text-[15px] lg:text-[14px] text-white/95 leading-[1.55] font-normal">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Meaning Behind the Philosophy: Connecting to Our Service */}
        <div className="bg-white border border-gray-200/80 p-8 sm:p-12 shadow-float fade-in-up-observe relative overflow-hidden">
          {/* Subtle Alice Keiko Watermark Logo - matching the discreet Japanese kanji watermark aesthetic */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 md:w-[460px] aspect-square pointer-events-none select-none opacity-[0.035] z-0 flex items-center justify-center"
            aria-hidden="true"
          >
            <img
              src="https://res.cloudinary.com/k6gktjkm/image/upload/v1794336325/Logotipo_havaiano_de_organizac%CC%A7a%CC%83o_e_limpeza.png"
              alt=""
              className="w-full h-full object-contain filter grayscale"
              loading="lazy"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Narrative text (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              <span className="font-caps text-xs sm:text-sm tracking-[2.5px] uppercase text-[#0D9488] font-bold block">
                THE SOUL OF OUR CRAFTSMANSHIP
              </span>

              <h3 className="font-display text-[26px] sm:text-[32px] text-black font-semibold leading-tight">
                More Than Removing Dust: Caring for the Space You Love
              </h3>

              <p className="font-sans text-[16px] sm:text-[18px] text-gray-700 leading-relaxed max-w-2xl">
                To us, cleaning is never simply about wiping a counter or vacuuming a rug. It is about clearing physical and mental clutter, honoring the private sanctuary where your life unfolds, protecting delicate architectural stones and finishes, and releasing the burden of daily maintenance.
              </p>
            </div>

            {/* Impactful Quote Frame (4 cols) */}
            <div className="lg:col-span-4 bg-[#F0FDFA] p-8 border border-[#2DD4BF] text-center relative flex flex-col justify-center shadow-xs">
              <div className="w-8 h-8 rounded-full bg-[#0D9488] text-white flex items-center justify-center mx-auto mb-4 font-display text-lg font-semibold">
                “
              </div>

              <blockquote className="font-display text-[19px] sm:text-[21px] text-black font-medium leading-[1.4] mb-4">
                We don’t just clean spaces. We create harmony, comfort, and peace of mind.
              </blockquote>

              <div className="w-10 h-[1px] bg-[#0D9488] mx-auto mb-2" />

              <span className="font-caps text-xs tracking-[2px] uppercase text-[#0F766E] font-bold">
                Alice Keiko · Owner & Founder
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
