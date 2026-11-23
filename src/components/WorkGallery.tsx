import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';

interface WorkGalleryProps {
  onScrollToContact?: () => void;
}

interface WorkPhoto {
  id: string;
  src: string;
  alt: string;
}

const ALICE_WORK_PHOTOS: WorkPhoto[] = [
  {
    id: 'work-01',
    src: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794870152/1.jpg',
    alt: 'Alice Keiko residential cleaning and detailing project 01 on Oʻahu',
  },
  {
    id: 'work-02',
    src: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794870152/2.jpg',
    alt: 'Alice Keiko residential cleaning and detailing project 02 on Oʻahu',
  },
  {
    id: 'work-03',
    src: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794870151/7.jpg',
    alt: 'Alice Keiko residential cleaning and detailing project 03 on Oʻahu',
  },
  {
    id: 'work-04',
    src: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794870150/8.jpg',
    alt: 'Alice Keiko residential cleaning and detailing project 04 on Oʻahu',
  },
  {
    id: 'work-05',
    src: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794870153/5.jpg',
    alt: 'Alice Keiko residential cleaning and detailing project 05 on Oʻahu',
  },
  {
    id: 'work-06',
    src: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794870152/3.jpg',
    alt: 'Alice Keiko residential cleaning and detailing project 06 on Oʻahu',
  },
  {
    id: 'work-07',
    src: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794870153/4.jpg',
    alt: 'Alice Keiko residential cleaning and detailing project 07 on Oʻahu',
  },
  {
    id: 'work-08',
    src: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794858943/WhatsApp_Image_2026-11-11_at_13.27.47.jpg',
    alt: 'Alice Keiko residential cleaning and detailing project 08 on Oʻahu',
  },
  {
    id: 'work-09',
    src: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794870154/9.jpg',
    alt: 'Alice Keiko residential cleaning and detailing project 09 on Oʻahu',
  },
  {
    id: 'work-10',
    src: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1795097125/WhatsApp_Image_2026-11-18_at_01.32.18_7.jpg',
    alt: 'Alice Keiko residential cleaning and detailing project 10 on Oʻahu',
  },
  {
    id: 'work-11',
    src: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1795097126/WhatsApp_Image_2026-11-18_at_01.32.18_2.jpg',
    alt: 'Alice Keiko residential cleaning and detailing project 11 on Oʻahu',
  },
  {
    id: 'work-12',
    src: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1795097126/WhatsApp_Image_2026-11-18_at_01.32.18_1.jpg',
    alt: 'Alice Keiko residential cleaning and detailing project 12 on Oʻahu',
  },
  {
    id: 'work-13',
    src: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1795097127/WhatsApp_Image_2026-11-18_at_01.32.18.jpg',
    alt: 'Alice Keiko residential cleaning and detailing project 13 on Oʻahu',
  },
];

export const WorkGallery: React.FC<WorkGalleryProps> = ({ onScrollToContact }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const thumbStripRef = useRef<HTMLDivElement | null>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const currentPhoto = ALICE_WORK_PHOTOS[activeIdx];

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null ? null : prev > 0 ? prev - 1 : ALICE_WORK_PHOTOS.length - 1
        );
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : prev < ALICE_WORK_PHOTOS.length - 1 ? prev + 1 : 0
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const handlePrev = () => {
    setActiveIdx((prev) => (prev > 0 ? prev - 1 : ALICE_WORK_PHOTOS.length - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev < ALICE_WORK_PHOTOS.length - 1 ? prev + 1 : 0));
  };

  const handleContactClick = () => {
    if (onScrollToContact) {
      onScrollToContact();
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const container = thumbStripRef.current;
    const activeThumb = thumbRefs.current[activeIdx];
    if (!container || !activeThumb) return;

    const targetLeft =
      activeThumb.offsetLeft - (container.clientWidth - activeThumb.clientWidth) / 2;
    container.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: 'smooth',
    });
  }, [activeIdx]);

  const scrollThumbStrip = (direction: 'prev' | 'next') => {
    const container = thumbStripRef.current;
    if (!container) return;
    const step = Math.max(220, container.clientWidth * 0.65);
    container.scrollBy({
      left: direction === 'next' ? step : -step,
      behavior: 'smooth',
    });
  };

  const activeLightboxPhoto =
    lightboxIndex !== null ? ALICE_WORK_PHOTOS[lightboxIndex] : null;

  return (
    <div className="mt-20 pt-16 border-t border-gray-200/80 fade-in-up-observe">
      {/* Centered Section Header matching Before & After Gallery */}
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
        <span className="font-caps text-xs sm:text-sm font-bold tracking-[4px] uppercase text-[#0D9488] block mb-3">
          IN THE FIELD · RECENT PROJECTS
        </span>
        <h3 className="font-display text-[32px] sm:text-[40px] md:text-[44px] font-semibold leading-[1.2] text-[#0A0A0A] tracking-[-0.02em] text-balance">
          Work Completed by Alice Keiko & Her Team
        </h3>
        <div className="w-16 h-[2px] bg-[#0D9488] mx-auto mt-4" />
      </div>

      {/* 2-Column Editorial Gallery Layout (Desktop side-by-side, Mobile stacked) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Column: Editorial Narrative + Unified CTA */}
        <div className="lg:col-span-5 text-center lg:text-left">
          <h4 className="font-display text-[26px] sm:text-[32px] font-semibold leading-[1.2] text-[#0A0A0A] tracking-[-0.02em] mb-5 text-balance">
            Precision Care. Proven Results.
          </h4>

          <p className="font-sans text-[16px] sm:text-[17px] text-gray-600 leading-[1.75] mb-5">
            A candid look inside the private Oʻahu estates, oceanfront residences, and vacation retreats cared for daily by Alice Keiko and her dedicated team.
          </p>

          <p className="font-sans text-[16px] sm:text-[17px] text-gray-600 leading-[1.75] mb-8">
            Every finished kitchen, spa bath, floor, and living area reflects consistent Japanese 5S discipline, eco-botanical care, and our 24-hour satisfaction pledge.
          </p>

          <div className="flex items-center justify-center lg:justify-start">
            <button
              type="button"
              onClick={handleContactClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-[#0A0A0A] hover:bg-[#0D9488] text-white font-caps text-xs sm:text-[13px] tracking-[2px] uppercase font-bold transition-colors cursor-pointer shadow-xs"
            >
              <span>CONTACT TODAY</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Main Showcase Display + 1-Row Carousel Thumbnail Strip */}
        <div className="lg:col-span-7 w-full min-w-0">
          {/* Main Showcase Frame */}
          <div className="relative aspect-[4/3] bg-gray-100 border border-gray-200 overflow-hidden shadow-xs group">
            <img
              src={currentPhoto.src}
              alt={currentPhoto.alt}
              onClick={() => setLightboxIndex(activeIdx)}
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02] cursor-zoom-in"
            />

            {/* Left / Right Navigation Arrows */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous project photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-[#0D9488] text-black hover:text-white border border-gray-200 shadow-md flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next project photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-[#0D9488] text-black hover:text-white border border-gray-200 shadow-md flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Full-screen expand trigger */}
            <button
              type="button"
              onClick={() => setLightboxIndex(activeIdx)}
              aria-label="Inspect project photo in full screen"
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
              aria-label="Scroll project thumbnails left"
              className="hidden lg:flex w-8 h-16 shrink-0 bg-white hover:bg-[#0D9488] text-gray-700 hover:text-white border border-gray-200 items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div
              ref={thumbStripRef}
              className="flex flex-nowrap gap-2 overflow-x-auto py-0.5 flex-1 scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              role="tablist"
              aria-label="Completed project photos thumbnails"
            >
              {ALICE_WORK_PHOTOS.map((photo, idx) => {
                const isSelected = activeIdx === idx;
                return (
                  <button
                    key={photo.id}
                    ref={(el) => {
                      thumbRefs.current[idx] = el;
                    }}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    aria-label={`View project photo ${idx + 1}`}
                    onClick={() => setActiveIdx(idx)}
                    className={`relative w-16 h-16 sm:w-[72px] sm:h-[72px] lg:w-16 lg:h-16 shrink-0 overflow-hidden border transition-all duration-200 cursor-pointer bg-gray-100 ${
                      isSelected
                        ? 'border-[#0D9488] ring-2 ring-[#0D9488] opacity-100'
                        : 'border-gray-200 opacity-60 hover:opacity-100 hover:border-gray-400'
                    }`}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => scrollThumbStrip('next')}
              aria-label="Scroll project thumbnails right"
              className="hidden lg:flex w-8 h-16 shrink-0 bg-white hover:bg-[#0D9488] text-gray-700 hover:text-white border border-gray-200 items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Full-Screen Lightbox Viewer */}
      {activeLightboxPhoto && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xs flex flex-col items-center justify-center p-4 sm:p-6"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Project photo lightbox viewer"
        >
          {/* Top Bar */}
          <div
            className="w-full max-w-5xl flex items-center justify-between text-white mb-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="font-caps text-xs tracking-[2px] uppercase font-bold text-aqua-light tabular-nums">
                {String(lightboxIndex + 1).padStart(2, '0')} / {String(ALICE_WORK_PHOTOS.length).padStart(2, '0')}
              </span>
              <span className="text-white/30">|</span>
              <span className="font-display text-sm sm:text-base font-medium text-white/90">
                Alice Keiko Completed Project
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
                  prev === null ? 0 : prev > 0 ? prev - 1 : ALICE_WORK_PHOTOS.length - 1
                )
              }
              aria-label="Previous photo"
              className="absolute left-2 sm:left-4 z-10 w-10 h-10 bg-black/70 hover:bg-[#0D9488] text-white border border-white/20 flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <img
              src={activeLightboxPhoto.src}
              alt={activeLightboxPhoto.alt}
              className="max-w-full max-h-[72vh] object-contain shadow-2xl"
            />

            <button
              type="button"
              onClick={() =>
                setLightboxIndex((prev) =>
                  prev === null ? 0 : prev < ALICE_WORK_PHOTOS.length - 1 ? prev + 1 : 0
                )
              }
              aria-label="Next photo"
              className="absolute right-2 sm:right-4 z-10 w-10 h-10 bg-black/70 hover:bg-[#0D9488] text-white border border-white/20 flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Thumbnail Strip inside Lightbox */}
          <div
            className="mt-4 flex items-center gap-2 overflow-x-auto max-w-full pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {ALICE_WORK_PHOTOS.map((photo, idx) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => setLightboxIndex(idx)}
                aria-label={`Select photo ${idx + 1}`}
                className={`w-12 h-12 sm:w-14 sm:h-14 shrink-0 overflow-hidden border transition-all cursor-pointer ${
                  lightboxIndex === idx
                    ? 'border-[#2DD4BF] ring-2 ring-[#2DD4BF] opacity-100'
                    : 'border-white/20 opacity-50 hover:opacity-90'
                }`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
