import React, { useState, useEffect, useRef } from 'react';

export const JapanesePhilosophySection: React.FC = () => {
  const fiveSPrinciples = [
    {
      step: '01',
      japanese: '整理',
      name: 'Seiri',
      translation: 'Organization & Decluttering',
      image: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794870659/0101.jpg',
      isPhoto: true,
      description: 'Clearing physical and mental clutter, distinguishing what is essential from what is excess to bring visual calm.',
    },
    {
      step: '02',
      japanese: '整頓',
      name: 'Seiton',
      translation: 'Order & Systematic Placement',
      image: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794871511/WhatsApp_Image_2026-10-30_at_10.48.12_1.jpg',
      isPhoto: true,
      description: 'Arranging closets, pantries, and living spaces so every single item has an intuitive, permanent home.',
    },
    {
      step: '03',
      japanese: '清掃',
      name: 'Seiso',
      translation: 'Cleanliness & Mindful Care',
      image: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794870660/0303.webp',
      isPhoto: true,
      description: 'Caring deeply for every detail—polishing glass, descaling fixtures, and inspecting the home’s overall health.',
    },
    {
      step: '04',
      japanese: '清潔',
      name: 'Seiketsu',
      translation: 'Standardization & High Quality',
      image: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794870660/0404.jpg',
      isPhoto: true,
      description: 'Through owner-trained specialists and checklists, ensuring an identical standard of perfection on every visit.',
    },
    {
      step: '05',
      japanese: '躾',
      name: 'Shitsuke',
      translation: 'Discipline & Daily Habit',
      image: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794870668/0505.jpg',
      isPhoto: true,
      description: 'Practicing punctuality, honesty, and personal pride so that excellence becomes an enduring everyday practice.',
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

        {/* Sticky Stacking Cards Container */}
        <div className="w-full max-w-3xl mx-auto mb-16">
          {/* Sticky Progress Bar + Counter */}
          <div className="sticky top-[72px] md:top-[82px] z-30 bg-[#FAFAFA]/95 backdrop-blur-xs pt-3 pb-4 mb-5">
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

          {/* Sticky Stacked 5 Principles Cards */}
          <div className="relative pb-6">
            {fiveSPrinciples.map((item, idx) => {
              const isActive = activeIdx === idx;
              const isBehind = activeIdx > idx;

              return (
                <div
                  key={item.name}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  className="sticky transition-all duration-200"
                  style={{
                    top: `${136 + idx * 12}px`,
                    zIndex: idx + 10,
                    marginBottom: idx === fiveSPrinciples.length - 1 ? '0px' : '56px',
                  }}
                >
                  <div
                    className={`border p-6 sm:p-8 transition-all duration-300 ${
                      isActive
                        ? 'bg-white border-[#0D9488]/60 shadow-[0_14px_32px_-8px_rgba(13,148,136,0.14),0_4px_12px_rgba(0,0,0,0.06)]'
                        : isBehind
                        ? 'bg-[#F0FDFA] border-[#2DD4BF]/50 shadow-[0_4px_12px_rgba(0,0,0,0.03)]'
                        : 'bg-white border-gray-200/80 shadow-xs'
                    }`}
                  >
                    {/* Card Top: Step indicator */}
                    <div className="flex items-center justify-between pb-3.5 border-b border-gray-100 mb-5">
                      <div className="flex items-center gap-3">
                        <span
                          className={`font-caps text-xs tracking-[2px] uppercase font-bold px-2.5 py-1 transition-colors ${
                            isActive
                              ? 'bg-[#0D9488]/10 text-[#0D9488]'
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          STEP {item.step}
                        </span>
                      </div>

                      <span className="font-caps text-xs tracking-[1.5px] text-gray-400 font-bold tabular-nums">
                        {idx + 1}/{fiveSPrinciples.length}
                      </span>
                    </div>

                    {/* Card Content: Illustration + Text */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                      <div
                        className={`w-32 h-32 sm:w-40 sm:h-40 shrink-0 flex items-center justify-center bg-[#F8FAFC] border border-gray-100 overflow-hidden ${
                          'isPhoto' in item && item.isPhoto ? '' : 'p-3'
                        }`}
                      >
                        <img
                          src={item.image}
                          alt={`${item.name} - ${item.translation}`}
                          loading="lazy"
                          className={
                            'isPhoto' in item && item.isPhoto
                              ? 'w-full h-full object-cover object-center'
                              : 'max-h-full max-w-full object-contain'
                          }
                        />
                      </div>

                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="font-display text-2xl sm:text-[26px] text-black font-semibold leading-tight mb-1.5">
                          {item.name}
                        </h3>
                        <span className="font-caps text-xs tracking-[1.5px] uppercase text-[#0D9488] font-bold block mb-3.5">
                          {item.translation}
                        </span>

                        <p className="font-sans text-[15px] sm:text-[16px] text-gray-700 leading-relaxed pt-3.5 border-t border-gray-100">
                          {item.description}
                        </p>
                      </div>
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
                To us, cleaning is never simply about wiping a counter or vacuuming a rug. It is about honoring the private sanctuary where your life unfolds, protecting delicate architectural stones and finishes, and releasing the burden of daily maintenance so you can fully enjoy living in Hawaiʻi.
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
