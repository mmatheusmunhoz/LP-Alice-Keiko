import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';

interface WorkPhoto {
  id: string;
  src: string;
  alt: string;
}

const ALICE_WORK_PHOTOS: WorkPhoto[] = [
  {
    id: 'work-01',
    src: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794858929/IMG_7067.jpg',
    alt: 'Alice Keiko residential cleaning and detailing project 01 on Oʻahu',
  },
  {
    id: 'work-02',
    src: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794858927/IMG_6588.jpg',
    alt: 'Alice Keiko residential cleaning and detailing project 02 on Oʻahu',
  },
  {
    id: 'work-03',
    src: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794858927/IMG_1565.jpg',
    alt: 'Alice Keiko residential cleaning and detailing project 03 on Oʻahu',
  },
  {
    id: 'work-04',
    src: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794858929/IMG_6591.jpg',
    alt: 'Alice Keiko residential cleaning and detailing project 04 on Oʻahu',
  },
  {
    id: 'work-05',
    src: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794858928/IMG_6944.jpg',
    alt: 'Alice Keiko residential cleaning and detailing project 05 on Oʻahu',
  },
  {
    id: 'work-06',
    src: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794858943/WhatsApp_Image_2026-11-11_at_13.27.47.jpg',
    alt: 'Alice Keiko residential cleaning and detailing project 06 on Oʻahu',
  },
  {
    id: 'work-07',
    src: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794858929/IMG_0375.jpg',
    alt: 'Alice Keiko residential cleaning and detailing project 07 on Oʻahu',
  },
  {
    id: 'work-08',
    src: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794858929/IMG_6711.jpg',
    alt: 'Alice Keiko residential cleaning and detailing project 08 on Oʻahu',
  },
  {
    id: 'work-09',
    src: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794858933/IMG_6937.jpg',
    alt: 'Alice Keiko residential cleaning and detailing project 09 on Oʻahu',
  },
];

export const WorkGallery: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);

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

  const handleTrackScroll = () => {
    const container = trackRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const center = containerRect.left + containerRect.width / 2;
    let closest = 0;
    let minDistance = Number.POSITIVE_INFINITY;

    cardRefs.current.forEach((el, idx) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const dist = Math.abs(center - cardCenter);
      if (dist < minDistance) {
        minDistance = dist;
        closest = idx;
      }
    });

    if (closest !== activeIdx) {
      setActiveIdx(closest);
    }
  };

  const scrollToPhoto = (index: number) => {
    const clamped = Math.max(0, Math.min(index, ALICE_WORK_PHOTOS.length - 1));
    setActiveIdx(clamped);

    const container = trackRef.current;
    const card = cardRefs.current[clamped];
    if (container && card) {
      const containerRect = container.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const targetLeft =
        container.scrollLeft +
        (cardRect.left - containerRect.left) -
        (containerRect.width - cardRect.width) / 2;

      container.scrollTo({ left: targetLeft, behavior: 'smooth' });
    }
  };

  const activeLightboxPhoto =
    lightboxIndex !== null ? ALICE_WORK_PHOTOS[lightboxIndex] : null;

  return (
    <div className="mt-20 pt-16 border-t border-gray-200/80 fade-in-up-observe">
      {/* Gallery Header */}
      <div className="mb-8">
        <div className="max-w-2xl">
          <span className="font-caps text-xs sm:text-sm font-bold tracking-[3.5px] uppercase text-[#0D9488] block mb-2.5">
            IN THE FIELD · RECENT PROJECTS
          </span>
          <h3 className="font-display text-[28px] sm:text-[34px] font-semibold leading-[1.2] text-[#0A0A0A] tracking-[-0.02em] text-balance">
            Work Completed by Alice & Her Team
          </h3>
          <p className="font-sans text-[15.5px] sm:text-[16.5px] text-gray-600 leading-relaxed mt-2.5">
            A real look at residences, vacation rentals, and detail finishes delivered across Oʻahu. Tap any photograph to inspect full screen.
          </p>
        </div>
      </div>

      {/* Unified Horizontal Scroll-Snap Carousel (Mobile & Desktop) */}
      <div>
        <div className="flex items-center justify-between mb-3.5 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-caps tracking-[1.8px] uppercase font-bold text-[#0D9488] tabular-nums">
              {String(activeIdx + 1).padStart(2, '0')} / {String(ALICE_WORK_PHOTOS.length).padStart(2, '0')}
            </span>
            <span className="text-gray-300">|</span>
            <span className="font-sans text-gray-500">
              Swipe or use arrows · Click any photo to enlarge
            </span>
          </div>
        </div>

        <div className="relative">
          {/* Floating Left Arrow */}
          <button
            type="button"
            onClick={() => scrollToPhoto(activeIdx - 1)}
            disabled={activeIdx === 0}
            aria-label="Previous project photo"
            className={`hidden sm:flex absolute -left-3 lg:-left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 backdrop-blur-xs border border-gray-200 shadow-lg items-center justify-center text-black transition-all cursor-pointer ${
              activeIdx === 0
                ? 'opacity-0 pointer-events-none'
                : 'opacity-100 hover:bg-[#0D9488] hover:text-white hover:border-[#0D9488]'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Floating Right Arrow */}
          <button
            type="button"
            onClick={() => scrollToPhoto(activeIdx + 1)}
            disabled={activeIdx === ALICE_WORK_PHOTOS.length - 1}
            aria-label="Next project photo"
            className={`hidden sm:flex absolute -right-3 lg:-right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 backdrop-blur-xs border border-gray-200 shadow-lg items-center justify-center text-black transition-all cursor-pointer ${
              activeIdx === ALICE_WORK_PHOTOS.length - 1
                ? 'opacity-0 pointer-events-none'
                : 'opacity-100 hover:bg-[#0D9488] hover:text-white hover:border-[#0D9488]'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Carousel Track */}
          <div
            ref={trackRef}
            onScroll={handleTrackScroll}
            className="flex overflow-x-auto snap-x snap-mandatory gap-3.5 sm:gap-4 lg:gap-5 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="region"
            aria-label="Completed project photos carousel"
          >
            {ALICE_WORK_PHOTOS.map((photo, idx) => (
              <button
                key={photo.id}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                type="button"
                onClick={() => setLightboxIndex(idx)}
                className="w-[78vw] max-w-[310px] sm:w-[320px] md:w-[340px] lg:w-[360px] sm:max-w-none shrink-0 snap-center relative aspect-[4/3] bg-gray-100 border border-gray-200/90 overflow-hidden group text-left cursor-pointer shadow-xs hover:shadow-lg transition-shadow duration-300"
                aria-label={`View project photo ${idx + 1} in full screen`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute bottom-2.5 right-2.5 w-8 h-8 bg-white/95 text-black flex items-center justify-center shadow-xs group-hover:bg-[#0D9488] group-hover:text-white transition-colors">
                  <Expand className="w-4 h-4" />
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Carousel Controls: Arrows + Synced Dots (Mobile & Desktop) */}
        <div className="flex items-center justify-between mt-4">
          <button
            type="button"
            onClick={() => scrollToPhoto(activeIdx - 1)}
            disabled={activeIdx === 0}
            aria-label="Previous photo"
            className="w-9 h-9 sm:w-10 sm:h-10 bg-white border border-gray-200 flex items-center justify-center text-black disabled:opacity-35 hover:border-[#0D9488] hover:text-[#0D9488] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {ALICE_WORK_PHOTOS.map((photo, idx) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => scrollToPhoto(idx)}
                aria-label={`Jump to photo ${idx + 1}`}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIdx === idx
                    ? 'w-6 sm:w-7 bg-[#0D9488]'
                    : 'w-1.5 sm:w-2 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollToPhoto(activeIdx + 1)}
            disabled={activeIdx === ALICE_WORK_PHOTOS.length - 1}
            aria-label="Next photo"
            className="w-9 h-9 sm:w-10 sm:h-10 bg-white border border-gray-200 flex items-center justify-center text-black disabled:opacity-35 hover:border-[#0D9488] hover:text-[#0D9488] transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
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
