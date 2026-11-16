import React, { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
}

const BEFORE_AFTER_GALLERY: GalleryItem[] = [
  {
    id: 'ba-01',
    src: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794854700/01.png',
    alt: 'Alice Keiko Before & After home transformation 01 on Oʻahu',
  },
  {
    id: 'ba-02',
    src: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794854698/02.jpg',
    alt: 'Alice Keiko Before & After home transformation 02 on Oʻahu',
  },
  {
    id: 'ba-03',
    src: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794854700/03.jpg',
    alt: 'Alice Keiko Before & After home transformation 03 on Oʻahu',
  },
  {
    id: 'ba-04',
    src: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794854700/04.jpg',
    alt: 'Alice Keiko Before & After home transformation 04 on Oʻahu',
  },
  {
    id: 'ba-05',
    src: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794854699/05.jpg',
    alt: 'Alice Keiko Before & After home transformation 05 on Oʻahu',
  },
  {
    id: 'ba-06',
    src: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794854699/06.jpg',
    alt: 'Alice Keiko Before & After home transformation 06 on Oʻahu',
  },
  {
    id: 'ba-07',
    src: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794854700/07.jpg',
    alt: 'Alice Keiko Before & After home transformation 07 on Oʻahu',
  },
  {
    id: 'ba-08',
    src: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794854698/08.jpg',
    alt: 'Alice Keiko Before & After home transformation 08 on Oʻahu',
  },
  {
    id: 'ba-09',
    src: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794854699/09.jpg',
    alt: 'Alice Keiko Before & After home transformation 09 on Oʻahu',
  },
  {
    id: 'ba-10',
    src: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794854702/10.jpg',
    alt: 'Alice Keiko Before & After home transformation 10 on Oʻahu',
  },
];

export const BeforeAfterSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const currentItem = BEFORE_AFTER_GALLERY[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : BEFORE_AFTER_GALLERY.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < BEFORE_AFTER_GALLERY.length - 1 ? prev + 1 : 0));
  };

  const handleScrollToContact = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="showcase" className="py-20 md:py-28 bg-white border-b border-gray-200">
      <div className="max-w-[1160px] w-[92%] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 fade-in-up-observe">
          <span className="font-caps text-xs sm:text-sm font-bold tracking-[4px] uppercase text-[#0D9488] block mb-3">
            VERIFIED CRAFTSMANSHIP
          </span>
          <h2 className="font-display text-[32px] sm:text-[40px] md:text-[44px] font-semibold leading-[1.2] text-[#0A0A0A] tracking-[-0.02em] text-balance">
            Before & After Gallery
          </h2>
          <div className="w-16 h-[2px] bg-[#0D9488] mx-auto mt-4" />
        </div>

        {/* 2-Column Editorial Gallery Layout (Desktop side-by-side, Mobile stacked) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center fade-in-up-observe">
          {/* Left Column: Alice Keiko Editorial Narrative + CTA */}
          <div className="lg:col-span-5 text-center lg:text-left">
            <h3 className="font-display text-[26px] sm:text-[32px] font-semibold leading-[1.2] text-[#0A0A0A] tracking-[-0.02em] mb-5 text-balance">
              Visible Care. Quiet Luxury.
            </h3>

            <p className="font-sans text-[16px] sm:text-[17px] text-gray-600 leading-[1.75] mb-5">
              A glimpse into the Oʻahu residences and vacation retreats we’re trusted to transform—each restored with our Japanese 5S discipline, respect, and meticulous attention to detail.
            </p>

            <p className="font-sans text-[16px] sm:text-[17px] text-gray-600 leading-[1.75] mb-8">
              From deep kitchen and bath resets to serene closet and living space organization, these before-and-after results reflect the personal pride Alice Keiko and her team bring to every home.
            </p>

            <div className="flex items-center justify-center lg:justify-start">
              <button
                type="button"
                onClick={handleScrollToContact}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-[#0A0A0A] hover:bg-[#0D9488] text-white font-caps text-xs sm:text-[13px] tracking-[2px] uppercase font-bold transition-colors cursor-pointer shadow-xs"
              >
                <span>CONTACT TODAY</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Main Before/After Display + 10-Photo Thumbnail Strip */}
          <div className="lg:col-span-7 w-full">
            {/* Main Showcase Frame */}
            <div className="relative aspect-[4/3] sm:aspect-[16/11] bg-[#F8FAFC] border border-gray-200 overflow-hidden shadow-xs group">
              <img
                src={currentItem.src}
                alt={currentItem.alt}
                className="w-full h-full object-contain transition-opacity duration-300"
              />

              {/* Left / Right Navigation Arrows */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous before and after photo"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-[#0D9488] text-black hover:text-white border border-gray-200 shadow-md flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next before and after photo"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-[#0D9488] text-black hover:text-white border border-gray-200 shadow-md flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Thumbnail Strip: Horizontal Scroll on Mobile, Clean 10-Tile Row on Desktop */}
            <div
              className="mt-3 flex lg:grid lg:grid-cols-10 gap-2 lg:gap-1.5 overflow-x-auto pb-1 lg:pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              role="tablist"
              aria-label="Before and after transformation gallery thumbnails"
            >
              {BEFORE_AFTER_GALLERY.map((item, idx) => {
                const isSelected = activeIndex === idx;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    aria-label={`View Before & After photo ${idx + 1}`}
                    onClick={() => setActiveIndex(idx)}
                    className={`relative w-16 h-16 sm:w-[72px] sm:h-[72px] lg:w-full lg:h-auto lg:aspect-square shrink-0 overflow-hidden border transition-all duration-200 cursor-pointer bg-gray-100 ${
                      isSelected
                        ? 'border-[#0D9488] ring-2 ring-[#0D9488] opacity-100'
                        : 'border-gray-200 opacity-60 hover:opacity-100 hover:border-gray-400'
                    }`}
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
