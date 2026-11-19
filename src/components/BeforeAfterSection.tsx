import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
}

const BEFORE_AFTER_GALLERY: GalleryItem[] = [
  {
    id: 'ba-01',
    src: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794873594/0.1.jpg',
    alt: 'Alice Keiko Before & After home transformation 01 on Oʻahu',
  },
  {
    id: 'ba-02',
    src: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794873596/0.2.jpg',
    alt: 'Alice Keiko Before & After home transformation 02 on Oʻahu',
  },
  {
    id: 'ba-03',
    src: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794873596/0.3.jpg',
    alt: 'Alice Keiko Before & After home transformation 03 on Oʻahu',
  },
  {
    id: 'ba-04',
    src: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794873595/0.4.jpg',
    alt: 'Alice Keiko Before & After home transformation 04 on Oʻahu',
  },
  {
    id: 'ba-05',
    src: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794873599/0.5.jpg',
    alt: 'Alice Keiko Before & After home transformation 05 on Oʻahu',
  },
  {
    id: 'ba-06',
    src: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794873600/0.6.jpg',
    alt: 'Alice Keiko Before & After home transformation 06 on Oʻahu',
  },
  {
    id: 'ba-07',
    src: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794873598/0.7.jpg',
    alt: 'Alice Keiko Before & After home transformation 07 on Oʻahu',
  },
  {
    id: 'ba-08',
    src: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794873604/0.8.jpg',
    alt: 'Alice Keiko Before & After home transformation 08 on Oʻahu',
  },
  {
    id: 'ba-09',
    src: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794873603/0.9.jpg',
    alt: 'Alice Keiko Before & After home transformation 09 on Oʻahu',
  },
  {
    id: 'ba-10',
    src: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1795096562/WhatsApp_Image_2026-11-18_at_01.32.17.jpg',
    alt: 'Alice Keiko Before & After home transformation 10 on Oʻahu',
  },
  {
    id: 'ba-11',
    src: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1795096865/before.after.AliceKeiko.jpg',
    alt: 'Alice Keiko Before & After home transformation 11 on Oʻahu',
  },
  {
    id: 'ba-12',
    src: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1795096866/before.after.AliceKeiko2.jpg',
    alt: 'Alice Keiko Before & After home transformation 12 on Oʻahu',
  },
];

export const BeforeAfterSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const thumbStripRef = useRef<HTMLDivElement | null>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const currentItem = BEFORE_AFTER_GALLERY[activeIndex];
  const activeLightboxItem =
    lightboxIndex !== null ? BEFORE_AFTER_GALLERY[lightboxIndex] : null;

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null ? null : prev > 0 ? prev - 1 : BEFORE_AFTER_GALLERY.length - 1
        );
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : prev < BEFORE_AFTER_GALLERY.length - 1 ? prev + 1 : 0
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  // Smoothly keep the active thumbnail visible inside the 1-row horizontal carousel
  useEffect(() => {
    const container = thumbStripRef.current;
    const activeThumb = thumbRefs.current[activeIndex];
    if (!container || !activeThumb) return;

    const targetLeft =
      activeThumb.offsetLeft - (container.clientWidth - activeThumb.clientWidth) / 2;
    container.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: 'smooth',
    });
  }, [activeIndex]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : BEFORE_AFTER_GALLERY.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < BEFORE_AFTER_GALLERY.length - 1 ? prev + 1 : 0));
  };

  const scrollThumbStrip = (direction: 'prev' | 'next') => {
    const container = thumbStripRef.current;
    if (!container) return;
    const step = Math.max(220, container.clientWidth * 0.65);
    container.scrollBy({
      left: direction === 'next' ? step : -step,
      behavior: 'smooth',
    });
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

          {/* Right Column: Main Before/After Display + 1-Row Carousel Thumbnail Strip */}
          <div className="lg:col-span-7 w-full min-w-0">
            {/* Main Showcase Frame */}
            <div className="relative aspect-[2400/1792] bg-[#F8FAFC] border border-gray-200 overflow-hidden shadow-xs group">
              <img
                src={currentItem.src}
                alt={currentItem.alt}
                onClick={() => setLightboxIndex(activeIndex)}
                className="w-full h-full object-contain transition-opacity duration-300 cursor-zoom-in"
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

              {/* Full-screen expand trigger matching WorkGallery */}
              <button
                type="button"
                onClick={() => setLightboxIndex(activeIndex)}
                aria-label="Inspect before and after photo in full screen"
                className="absolute bottom-3 right-3 w-8 h-8 bg-white/90 hover:bg-[#0D9488] text-black hover:text-white border border-gray-200 shadow-xs flex items-center justify-center transition-colors cursor-pointer"
              >
                <Expand className="w-4 h-4" />
              </button>
            </div>

            {/* Single-Row Thumbnail Carousel (Mobile & Desktop) */}
            <div className="mt-3 flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollThumbStrip('prev')}
                aria-label="Scroll thumbnails left"
                className="hidden lg:flex w-8 h-14 shrink-0 bg-white hover:bg-[#0D9488] text-gray-700 hover:text-white border border-gray-200 items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div
                ref={thumbStripRef}
                className="flex flex-nowrap gap-2 overflow-x-auto py-0.5 flex-1 scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                role="tablist"
                aria-label="Before and after transformation gallery thumbnails"
              >
                {BEFORE_AFTER_GALLERY.map((item, idx) => {
                  const isSelected = activeIndex === idx;
                  return (
                    <button
                      key={item.id}
                      ref={(el) => {
                        thumbRefs.current[idx] = el;
                      }}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      aria-label={`View Before & After photo ${idx + 1}`}
                      onClick={() => setActiveIndex(idx)}
                      className={`relative w-20 sm:w-24 lg:w-[88px] aspect-[2400/1792] shrink-0 overflow-hidden border transition-all duration-200 cursor-pointer bg-[#F8FAFC] ${
                        isSelected
                          ? 'border-[#0D9488] ring-2 ring-[#0D9488] opacity-100'
                          : 'border-gray-200 opacity-60 hover:opacity-100 hover:border-gray-400'
                      }`}
                    >
                      <img
                        src={item.src}
                        alt={item.alt}
                        loading="lazy"
                        className="w-full h-full object-contain"
                      />
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => scrollThumbStrip('next')}
                aria-label="Scroll thumbnails right"
                className="hidden lg:flex w-8 h-14 shrink-0 bg-white hover:bg-[#0D9488] text-gray-700 hover:text-white border border-gray-200 items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Screen Lightbox Viewer matching WorkGallery */}
      {activeLightboxItem && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xs flex flex-col items-center justify-center p-4 sm:p-6"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Before and after photo lightbox viewer"
        >
          {/* Top Bar */}
          <div
            className="w-full max-w-5xl flex items-center justify-between text-white mb-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="font-caps text-xs tracking-[2px] uppercase font-bold text-aqua-light tabular-nums">
                {String(lightboxIndex + 1).padStart(2, '0')} / {String(BEFORE_AFTER_GALLERY.length).padStart(2, '0')}
              </span>
              <span className="text-white/30">|</span>
              <span className="font-display text-sm sm:text-base font-medium text-white/90">
                Alice Keiko Before & After
              </span>
            </div>

            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close gallery viewer"
              className="w-9 h-9 bg-white/10 hover:bg-white hover:text-black text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Image Stage */}
          <div
            className="relative w-full max-w-5xl flex-1 max-h-[72vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() =>
                setLightboxIndex((prev) =>
                  prev === null ? 0 : prev > 0 ? prev - 1 : BEFORE_AFTER_GALLERY.length - 1
                )
              }
              aria-label="Previous photo"
              className="absolute left-2 sm:left-4 z-10 w-10 h-10 bg-black/70 hover:bg-[#0D9488] text-white border border-white/20 flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <img
              src={activeLightboxItem.src}
              alt={activeLightboxItem.alt}
              className="max-w-full max-h-[72vh] object-contain shadow-2xl"
            />

            <button
              type="button"
              onClick={() =>
                setLightboxIndex((prev) =>
                  prev === null ? 0 : prev < BEFORE_AFTER_GALLERY.length - 1 ? prev + 1 : 0
                )
              }
              aria-label="Next photo"
              className="absolute right-2 sm:right-4 z-10 w-10 h-10 bg-black/70 hover:bg-[#0D9488] text-white border border-white/20 flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Single-Row Thumbnail Strip inside Lightbox */}
          <div
            className="mt-4 flex items-center gap-2 overflow-x-auto max-w-full pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {BEFORE_AFTER_GALLERY.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setLightboxIndex(idx)}
                aria-label={`Select Before & After photo ${idx + 1}`}
                className={`w-16 sm:w-20 aspect-[2400/1792] shrink-0 overflow-hidden border transition-all cursor-pointer bg-black/40 ${
                  lightboxIndex === idx
                    ? 'border-[#2DD4BF] ring-2 ring-[#2DD4BF] opacity-100'
                    : 'border-white/20 opacity-50 hover:opacity-90'
                }`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-contain"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
