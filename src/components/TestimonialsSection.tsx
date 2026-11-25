import React, { useState, useRef } from 'react';
import { Star, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS_LIST } from '../data';

export const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  const handleScroll = () => {
    const container = carouselRef.current;
    if (!container) return;
    const containerCenter = container.scrollLeft + container.clientWidth / 2;

    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  };

  const scrollToCard = (index: number) => {
    const clamped = Math.max(0, Math.min(index, TESTIMONIALS_LIST.length - 1));
    const card = cardRefs.current[clamped];
    const container = carouselRef.current;
    setActiveIndex(clamped);

    if (card && container) {
      const targetScrollLeft =
        card.offsetLeft - (container.clientWidth - card.offsetWidth) / 2;
      container.scrollTo({
        left: Math.max(0, targetScrollLeft),
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="testimonials"
      className="py-20 md:py-28 bg-gradient-to-b from-[#F0FDFA] via-[#F6FEFC] to-[#F0FDFA] border-b border-[#2DD4BF]/20 overflow-x-clip"
    >
      <div className="max-w-[1180px] w-[92%] mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-14 fade-in-up-observe">
          <span className="font-caps text-xs sm:text-sm font-bold tracking-[3.5px] uppercase text-[#0D9488] block mb-2.5">
            CLIENT ACCLAIM & WORD-OF-MOUTH TRUST
          </span>
          <h2 className="font-display text-[32px] sm:text-[40px] md:text-[44px] font-semibold leading-[1.2] text-[#0A0A0A] tracking-[-0.02em] mb-3 text-balance">
            What Our Oʻahu Clients Say
          </h2>
          <p className="font-sans text-[15.5px] sm:text-[17px] text-gray-600 leading-relaxed">
            Real reviews from homeowners and vacation rental hosts across Oʻahu—grown over 3+ years through personal referrals.
          </p>
        </div>

        {/* Mobile Carousel Cue */}
        <div className="md:hidden mb-3.5 flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <span className="font-caps tracking-[2px] uppercase font-bold text-[#0D9488] tabular-nums">
              {String(activeIndex + 1).padStart(2, '0')} / {String(TESTIMONIALS_LIST.length).padStart(2, '0')}
            </span>
            <span className="text-teal-900/20">|</span>
            <span className="font-sans text-[13px] text-gray-700 font-medium">
              Swipe or tap arrows to read all reviews
            </span>
          </div>
        </div>

        {/* Mobile Horizontal Scroll-Snap Carousel · Desktop 3-Column Grid */}
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          role="region"
          aria-label="Client testimonials"
          className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 lg:gap-7 overflow-x-auto md:overflow-visible snap-x snap-mandatory -mx-[4vw] px-[6vw] md:mx-0 md:px-0 pb-3 md:pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {TESTIMONIALS_LIST.map((t, index) => (
            <article
              key={t.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="w-[86vw] max-w-[380px] shrink-0 snap-center md:w-auto md:max-w-none md:shrink bg-white rounded-[24px] p-7 sm:p-8 border border-teal-900/[0.06] text-left flex flex-col justify-between shadow-[0_14px_38px_-14px_rgba(13,148,136,0.12),0_4px_14px_-4px_rgba(10,10,10,0.04)] hover:-translate-y-1 hover:shadow-[0_22px_48px_-14px_rgba(13,148,136,0.18),0_8px_20px_-6px_rgba(10,10,10,0.06)] transition-all duration-300 fade-in-up-observe"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-[#E0A526] mb-5" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-[18px] h-[18px] fill-[#E0A526] stroke-[#E0A526]" />
                  ))}
                </div>

                {/* Quote */}
                <p className="font-sans text-[15px] sm:text-[15.5px] text-[#1E293B] leading-[1.7] font-normal">
                  “{t.quote}”
                </p>
              </div>

              {/* Author & Verified Metadata Footer */}
              <div className="pt-7 mt-auto">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-display text-[15.5px] font-semibold text-[#0A0A0A]">
                    {t.author}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ECFDF5] text-[#047857] text-[11.5px] font-sans font-semibold whitespace-nowrap">
                    <Check className="w-3 h-3 stroke-[2.75]" />
                    <span>Verified Client</span>
                  </span>
                </div>

                <div className="font-sans text-[12.5px] text-gray-500 mt-1.5 leading-snug">
                  {t.serviceUsed} <span aria-hidden="true">·</span> {t.location}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile Carousel Controls: Arrows + Synced Dots */}
        <div className="md:hidden mt-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => scrollToCard(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="Previous review"
            className="w-10 h-10 bg-white border border-teal-900/15 flex items-center justify-center text-[#0A0A0A] disabled:opacity-35 hover:border-[#0D9488] hover:text-[#0D9488] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            {TESTIMONIALS_LIST.map((t, idx) => (
              <button
                key={t.id}
                type="button"
                onClick={() => scrollToCard(idx)}
                aria-label={`Read review by ${t.author}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === idx
                    ? 'w-7 bg-[#0D9488]'
                    : 'w-2 bg-[#0D9488]/25 hover:bg-[#0D9488]/45'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollToCard(activeIndex + 1)}
            disabled={activeIndex === TESTIMONIALS_LIST.length - 1}
            aria-label="Next review"
            className="w-10 h-10 bg-white border border-teal-900/15 flex items-center justify-center text-[#0A0A0A] disabled:opacity-35 hover:border-[#0D9488] hover:text-[#0D9488] transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Subtle reassurance line */}
        <div className="mt-10 md:mt-12 text-center fade-in-up-observe">
          <p className="text-xs font-caps tracking-[2px] uppercase text-gray-500">
            REFERENCES AVAILABLE UPON REQUEST FOR HIGH-PROFILE ESTATES & PRIVATE CLIENTS
          </p>
        </div>
      </div>
    </section>
  );
};
