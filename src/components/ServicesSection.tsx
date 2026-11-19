import React, { useState, useRef } from 'react';
import {
  Check,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ListChecks,
  X,
} from 'lucide-react';
import { SERVICES_LIST } from '../data';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectServiceForQuote: (serviceTitle: string) => void;
  onNavigateToPage?: (pageId: 'residential' | 'vacation' | 'specialized') => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForQuote,
  onNavigateToPage,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'residential' | 'vacation' | 'specialized'>('all');
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  const [desktopActiveIndex, setDesktopActiveIndex] = useState(0);
  const [modalService, setModalService] = useState<ServiceItem | null>(null);

  const mobileTopRef = useRef<HTMLDivElement | null>(null);
  const mobileCarouselRef = useRef<HTMLDivElement | null>(null);
  const mobileCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const filteredServices =
    activeCategory === 'all'
      ? SERVICES_LIST
      : SERVICES_LIST.filter((s) => s.category === activeCategory);

  const handleCategoryClick = (tabId: string) => {
    if (tabId === 'all') {
      setActiveCategory('all');
      setMobileActiveIndex(0);
      setDesktopActiveIndex(0);
    } else {
      if (onNavigateToPage) {
        onNavigateToPage(tabId as 'residential' | 'vacation' | 'specialized');
      } else {
        setActiveCategory(tabId as 'residential' | 'vacation' | 'specialized');
        setMobileActiveIndex(0);
        setDesktopActiveIndex(0);
      }
    }
  };

  // JS scroll synchronization for the Mobile Peek Carousel
  const handleMobileScroll = () => {
    const container = mobileCarouselRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    let closestIdx = 0;
    let minDistance = Number.POSITIVE_INFINITY;

    mobileCardRefs.current.forEach((cardEl, idx) => {
      if (!cardEl) return;
      const cardRect = cardEl.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIdx = idx;
      }
    });

    if (closestIdx !== mobileActiveIndex) {
      setMobileActiveIndex(closestIdx);
    }
  };

  const scrollToMobileCard = (index: number) => {
    const clampedIndex = Math.max(0, Math.min(index, filteredServices.length - 1));
    setMobileActiveIndex(clampedIndex);

    const container = mobileCarouselRef.current;
    const targetCard = mobileCardRefs.current[clampedIndex];
    if (container && targetCard) {
      const containerRect = container.getBoundingClientRect();
      const cardRect = targetCard.getBoundingClientRect();
      const targetLeft =
        container.scrollLeft +
        (cardRect.left - containerRect.left) -
        (containerRect.width - cardRect.width) / 2;

      container.scrollTo({
        left: targetLeft,
        behavior: 'smooth',
      });
    }

    // Ensure the card starts cleanly at the top (badge + full image + title) below the fixed navbar
    const topAnchor = mobileTopRef.current;
    if (topAnchor) {
      const topRect = topAnchor.getBoundingClientRect();
      const navbarOffset = 92;
      if (topRect.top < navbarOffset) {
        window.scrollTo({
          top: window.scrollY + topRect.top - navbarOffset,
          behavior: 'smooth',
        });
      }
    }
  };

  const activeDesktopService = filteredServices[desktopActiveIndex] || filteredServices[0];

  return (
    <section id="services" className="py-24 md:py-32 bg-[#F8FAFC] border-y border-gray-100 overflow-x-clip">
      <div className="max-w-[1260px] w-[92%] mx-auto">
        {/* Section Header - Clean, Uncluttered, Editorial */}
        <div className="text-center max-w-3xl mx-auto mb-12 fade-in-up-observe">
          <span className="font-caps text-xs sm:text-sm font-bold tracking-[3.5px] uppercase text-[#0D9488] block mb-3">
            TAILORED PROPERTY CARE
          </span>
          <h2 className="font-display text-[32px] sm:text-[40px] md:text-[44px] font-semibold leading-[1.2] text-[#0A0A0A] tracking-[-0.02em] text-balance">
            Bespoke Services & Care Checklists
          </h2>
          <div className="w-16 h-[2px] bg-[#0D9488] mx-auto mt-4 mb-5" />
          <p className="font-sans text-[16px] sm:text-[18px] text-gray-700 leading-relaxed">
            Every home and vacation retreat on Oʻahu receives an individualized in-person assessment. Explore our 9 specialized services below or open a dedicated category guide.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mb-12 fade-in-up-observe">
          {[
            { id: 'all', label: 'All Services (9)', isPage: false },
            { id: 'residential', label: 'Residential Care', isPage: true },
            { id: 'vacation', label: 'Vacation Rentals', isPage: true },
            { id: 'specialized', label: 'Organizing & Post-Build', isPage: true },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleCategoryClick(tab.id)}
              className={`px-5 py-3 rounded-[8px] font-caps text-xs sm:text-[13px] tracking-[1.5px] uppercase font-bold transition-all border cursor-pointer flex items-center gap-2 ${
                activeCategory === tab.id
                  ? 'bg-black text-white border-black shadow-sm'
                  : 'bg-white text-gray-800 border-gray-200 hover:border-[#0D9488] hover:text-[#0D9488]'
              }`}
              title={tab.isPage ? `Load dedicated ${tab.label} page` : 'Show all services'}
            >
              <span>{tab.label}</span>
              {tab.isPage && (
                <span className="text-xs text-[#0D9488] font-normal">↗</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div id="checklists">
        {/* ===================================================================== */}
        {/* 1. MOBILE & TABLET VIEW: Horizontal Scroll-Snap Carousel (Peek)       */}
        {/* ===================================================================== */}
        <div className="lg:hidden">
          {/* Top Swipe Cue (matches Desktop indicator style) */}
          <div
            ref={mobileTopRef}
            className="max-w-[1260px] w-[92%] mx-auto mb-3.5 flex items-center justify-between text-xs text-gray-600"
          >
            <div className="flex items-center gap-2">
              <span className="font-caps tracking-[2px] uppercase font-bold text-[#0D9488]">
                {String(mobileActiveIndex + 1).padStart(2, '0')} / {String(filteredServices.length).padStart(2, '0')}
              </span>
              <span className="text-gray-300">|</span>
              <span className="font-sans text-[13px] text-gray-700 font-medium">
                Swipe or tap arrows to explore all {filteredServices.length} services
              </span>
            </div>
          </div>

          <div className="relative">
            {/* Floating Left Arrow on Card Edge */}
            <button
              type="button"
              onClick={() => scrollToMobileCard(mobileActiveIndex - 1)}
              disabled={mobileActiveIndex === 0}
              aria-label="Previous service"
              className={`absolute left-2 top-[34%] -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/95 backdrop-blur-xs border border-gray-200 shadow-lg flex items-center justify-center text-black transition-all cursor-pointer ${
                mobileActiveIndex === 0
                  ? 'opacity-0 pointer-events-none'
                  : 'opacity-100 hover:bg-[#0D9488] hover:text-white hover:border-[#0D9488]'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Floating Right Arrow on Card Edge */}
            <button
              type="button"
              onClick={() => scrollToMobileCard(mobileActiveIndex + 1)}
              disabled={mobileActiveIndex === filteredServices.length - 1}
              aria-label="Next service"
              className={`absolute right-2 top-[34%] -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/95 backdrop-blur-xs border border-gray-200 shadow-lg flex items-center justify-center text-black transition-all cursor-pointer ${
                mobileActiveIndex === filteredServices.length - 1
                  ? 'opacity-0 pointer-events-none'
                  : 'opacity-100 hover:bg-[#0D9488] hover:text-white hover:border-[#0D9488]'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div
              ref={mobileCarouselRef}
              onScroll={handleMobileScroll}
              className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-[7vw] sm:px-8 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              role="region"
              aria-label="Services carousel"
            >
              {filteredServices.map((service, index) => {
                const isCardActive = mobileActiveIndex === index;

                return (
                  <div
                    key={service.id}
                    ref={(el) => {
                      mobileCardRefs.current[index] = el;
                    }}
                    className={`relative w-[86vw] max-w-[360px] min-h-[540px] sm:min-h-[560px] shrink-0 snap-center rounded-[22px] overflow-hidden flex flex-col justify-between bg-[#031B1D] border transition-all duration-300 ${
                      isCardActive
                        ? 'border-[#2DD4BF]/50 shadow-[0_22px_46px_-14px_rgba(3,27,29,0.5),0_6px_18px_rgba(0,0,0,0.16)]'
                        : 'border-white/15 shadow-[0_14px_34px_-12px_rgba(3,27,29,0.38)]'
                    }`}
                  >
                    {/* Full-Bleed Background Photo */}
                    <img
                      src={service.image}
                      alt={service.imageAlt}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover object-center"
                    />

                    {/* Subtle Top Vignette for Badge & Counter Legibility */}
                    <div
                      className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#031B1D]/70 via-[#031B1D]/25 to-transparent pointer-events-none"
                      aria-hidden="true"
                    />

                    {/* Petrol-Teal Bottom Gradient for Crisp Overlaid Typography & Actions */}
                    <div
                      className="absolute inset-x-0 bottom-0 h-[74%] bg-gradient-to-t from-[#02191B] via-[#042B2E]/95 via-55% to-transparent pointer-events-none"
                      aria-hidden="true"
                    />

                    {/* Top Bar: Service Badge + Counter */}
                    <div className="relative z-10 flex items-center justify-between p-5">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-[7px] bg-[#074446]/90 backdrop-blur-xs border border-white/15 font-caps text-[10.5px] tracking-[1.8px] uppercase font-bold text-white shadow-xs">
                        {service.badge}
                      </span>

                      <span className="font-caps text-sm font-bold tracking-[1.5px] text-white tabular-nums [text-shadow:0_1px_6px_rgba(0,0,0,0.45)]">
                        {index + 1}/{filteredServices.length}
                      </span>
                    </div>

                    {/* Visual Breathing Space Preserving Upper Photo Focus */}
                    <div className="flex-1 min-h-[175px] sm:min-h-[195px]" aria-hidden="true" />

                    {/* Bottom Overlaid Text Content & Responsive Actions */}
                    <div className="relative z-10 px-5 pb-6 pt-3 text-left flex flex-col">
                      <h3 className="font-display text-[25px] sm:text-[27px] text-white font-semibold leading-[1.12] tracking-[-0.02em] mb-1.5">
                        {service.title}
                      </h3>
                      <span className="font-caps text-[11px] sm:text-[11.5px] tracking-[2px] uppercase text-[#5EEAD4] font-bold block mb-2.5">
                        {service.subtitle}
                      </span>
                      <p className="font-sans text-[14px] sm:text-[14.5px] text-white/95 leading-[1.55] font-normal mb-4">
                        {service.shortDescription}
                      </p>

                      <button
                        type="button"
                        onClick={() => setModalService(service)}
                        className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3.5 rounded-[8px] bg-white/10 hover:bg-white/15 backdrop-blur-xs border border-[#5EEAD4]/40 text-[#5EEAD4] hover:text-white font-caps text-[11px] tracking-[1.3px] uppercase font-bold transition-colors cursor-pointer mb-2.5"
                      >
                        <ListChecks className="w-4 h-4 text-[#5EEAD4]" />
                        <span>View Full Checklist ({service.checklist.length} tasks)</span>
                      </button>

                      <button
                        onClick={() => onSelectServiceForQuote(service.title)}
                        type="button"
                        className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-[8px] bg-[#0D9488] hover:bg-[#0F766E] text-white font-caps text-[11px] tracking-[1.5px] uppercase font-bold transition-colors cursor-pointer shadow-sm"
                      >
                        <span>CONTACT TODAY</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      {onNavigateToPage && (
                        <button
                          onClick={() => onNavigateToPage(service.category)}
                          type="button"
                          className="w-full mt-2.5 text-center font-caps text-[11px] tracking-[1.5px] uppercase text-white/80 hover:text-[#5EEAD4] font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                        >
                          <span>Open Dedicated Page</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Carousel Controls: Arrows + Synced Dots */}
        <div className="max-w-[1260px] w-[92%] mx-auto mt-5 flex items-center justify-between">
          <button
            type="button"
            onClick={() => scrollToMobileCard(mobileActiveIndex - 1)}
            disabled={mobileActiveIndex === 0}
            aria-label="Previous service"
            className="w-10 h-10 bg-white border border-gray-200 flex items-center justify-center text-black disabled:opacity-35 hover:border-[#0D9488] hover:text-[#0D9488] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            {filteredServices.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => scrollToMobileCard(idx)}
                aria-label={`View ${s.title}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  mobileActiveIndex === idx
                    ? 'w-7 bg-[#0D9488]'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollToMobileCard(mobileActiveIndex + 1)}
            disabled={mobileActiveIndex === filteredServices.length - 1}
            aria-label="Next service"
            className="w-10 h-10 bg-white border border-gray-200 flex items-center justify-center text-black disabled:opacity-35 hover:border-[#0D9488] hover:text-[#0D9488] transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 2. DESKTOP VIEW: Horizontal Expanding Accordion / Spotlight Gallery   */}
      {/* ===================================================================== */}
      <div className="hidden lg:block max-w-[1260px] w-[92%] mx-auto">
        <div className="flex items-stretch gap-3 xl:gap-4 h-[450px] xl:h-[470px]">
          {filteredServices.map((service, index) => {
            const isActive = desktopActiveIndex === index;

            return (
              <div
                key={service.id}
                role="button"
                tabIndex={0}
                onMouseEnter={() => setDesktopActiveIndex(index)}
                onClick={() => setDesktopActiveIndex(index)}
                onFocus={() => setDesktopActiveIndex(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setDesktopActiveIndex(index);
                  }
                }}
                aria-expanded={isActive}
                className={`relative overflow-hidden cursor-pointer transition-all duration-500 ease-out flex flex-col justify-end border border-gray-200/80 shadow-xs focus:outline-none ${
                  isActive
                    ? 'flex-[4.2] shadow-2xl border-black/20'
                    : 'flex-[0.75] hover:flex-[0.92]'
                }`}
              >
                {/* Full-Bleed Background Image */}
                <img
                  src={service.image}
                  alt={service.imageAlt}
                  loading="lazy"
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${
                    isActive ? 'scale-105' : 'scale-100'
                  }`}
                />

                {/* Editorial Dark Gradient Scrim for Maximum Text Legibility */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    isActive
                      ? 'bg-gradient-to-t from-black/92 via-black/60 to-black/15'
                      : 'bg-gradient-to-t from-black/90 via-black/45 to-black/35'
                  }`}
                />

                {/* COLLAPSED STATE: Vertical Slice Label + Step Index */}
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-between py-6 px-2 transition-opacity duration-300 pointer-events-none ${
                    isActive ? 'opacity-0' : 'opacity-100'
                  }`}
                >
                  <span className="font-caps text-xs tracking-[2px] text-aqua-light font-bold">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <span className="[writing-mode:vertical-rl] rotate-180 font-display text-[15px] xl:text-base font-medium text-white/95 tracking-wide whitespace-nowrap drop-shadow-sm">
                    {service.title}
                  </span>

                  <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
                </div>

                {/* EXPANDED STATE: Top Badge & Category Link */}
                <div
                  className={`absolute top-5 left-6 right-6 flex items-center justify-between gap-3 transition-all duration-500 z-20 ${
                    isActive
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 -translate-y-2 pointer-events-none'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="bg-black/80 text-aqua-light px-2.5 py-1 font-caps text-xs tracking-[2px] font-bold border border-white/15">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="bg-[#0D9488] text-white px-3 py-1 font-caps text-[11px] tracking-[1.5px] uppercase font-bold shadow-xs">
                      {service.badge}
                    </span>
                  </div>

                  {onNavigateToPage && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigateToPage(service.category);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[8px] bg-black/75 hover:bg-white hover:text-black text-white border border-white/25 font-caps text-[11px] tracking-[1.2px] uppercase font-bold transition-colors cursor-pointer"
                    >
                      <span>Full Guide</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* EXPANDED STATE: Bottom Content Reveal with max-h & opacity */}
                <div
                  className={`relative z-20 w-full p-6 xl:p-8 transition-all duration-500 overflow-hidden ${
                    isActive
                      ? 'max-h-[340px] opacity-100'
                      : 'max-h-0 opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="min-w-[340px]">
                    <span className="font-caps text-xs tracking-[2px] uppercase text-aqua-light font-bold block mb-1.5">
                      {service.subtitle}
                    </span>

                    <h3 className="font-display text-[24px] xl:text-[28px] text-white font-semibold leading-tight mb-2">
                      {service.title}
                    </h3>

                    <p className="font-sans text-[15px] xl:text-[15.5px] text-white/90 leading-relaxed mb-4">
                      {service.shortDescription}
                    </p>

                    <div className="mb-4">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalService(service);
                        }}
                        className="inline-flex items-center gap-2 py-2 px-3.5 rounded-[8px] bg-white/10 hover:bg-white/20 border border-white/20 font-caps text-xs tracking-[1.2px] uppercase text-aqua-light hover:text-white font-bold transition-colors cursor-pointer"
                      >
                        <ListChecks className="w-4 h-4" />
                        <span>View Full Checklist ({service.checklist.length} tasks)</span>
                      </button>
                    </div>

                    {/* Action Bar */}
                    <div onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => onSelectServiceForQuote(service.title)}
                        className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-[8px] bg-[#0D9488] hover:bg-[#0F766E] text-white font-caps text-xs tracking-[1.5px] uppercase font-bold transition-colors shadow-md cursor-pointer"
                      >
                        <span>CONTACT TODAY</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop Subtle Navigation Footer */}
        <div className="mt-5 flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-3">
            <span className="font-caps text-xs tracking-[2px] uppercase font-bold text-[#0D9488]">
              {String(desktopActiveIndex + 1).padStart(2, '0')} / {String(filteredServices.length).padStart(2, '0')}
            </span>
            <span className="text-gray-300">|</span>
            <span className="font-display text-base font-semibold text-[#0A0A0A]">
              {activeDesktopService?.title}
            </span>
            <span className="text-xs text-gray-500 hidden xl:inline">
              — Hover or click any panel to expand
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                setDesktopActiveIndex((prev) =>
                  prev > 0 ? prev - 1 : filteredServices.length - 1
                )
              }
              aria-label="Previous service"
              className="w-9 h-9 bg-white border border-gray-200 flex items-center justify-center text-black hover:border-[#0D9488] hover:text-[#0D9488] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() =>
                setDesktopActiveIndex((prev) =>
                  prev < filteredServices.length - 1 ? prev + 1 : 0
                )
              }
              aria-label="Next service"
              className="w-9 h-9 bg-white border border-gray-200 flex items-center justify-center text-black hover:border-[#0D9488] hover:text-[#0D9488] transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      </div>

      {/* Bottom Reassurance Banner */}
      <div className="max-w-[1260px] w-[92%] mx-auto">
        <div className="mt-14 p-8 bg-white border border-gray-200/80 text-center max-w-2xl mx-auto shadow-xs fade-in-up-observe">
          <p className="font-display text-xl font-semibold text-black mb-2">
            Why We Always Assess In-Person First
          </p>
          <p className="font-sans text-[15px] sm:text-[16px] text-gray-600 leading-relaxed">
            Every residence in Oahu has unique architectural finishes, custom stone, and coastal salt exposure. Alice Keiko visits your home personally to provide an honest, accurate, and fair proposal without hidden costs.
          </p>
        </div>
      </div>

      {/* Clean Full Checklist Modal for Desktop Inspection */}
      {modalService && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setModalService(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-service-title"
        >
          <div
            className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-52 sm:h-60 overflow-hidden bg-gray-100">
              <img
                src={modalService.image}
                alt={modalService.imageAlt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <button
                type="button"
                onClick={() => setModalService(null)}
                aria-label="Close checklist"
                className="absolute top-4 right-4 w-9 h-9 bg-black/75 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="font-caps text-xs tracking-[2px] uppercase text-aqua-light font-bold block mb-1">
                  {modalService.subtitle}
                </span>
                <h3 id="modal-service-title" className="font-display text-2xl sm:text-3xl font-semibold">
                  {modalService.title}
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <p className="font-sans text-[16px] text-gray-700 leading-relaxed">
                {modalService.fullDescription}
              </p>

              {/* Frequency options */}
              <div>
                <span className="font-caps text-xs tracking-[1.5px] uppercase text-gray-500 font-bold block mb-2">
                  Available Schedules
                </span>
                <div className="flex flex-wrap gap-2">
                  {modalService.frequencyOptions.map((freq) => (
                    <span
                      key={freq}
                      className="text-xs font-sans font-semibold bg-[#F0FDFA] text-[#0F766E] border border-[#2DD4BF]/40 px-3 py-1.5"
                    >
                      {freq}
                    </span>
                  ))}
                </div>
              </div>

              {/* Full Checklist */}
              <div className="bg-[#F8FAFC] border border-gray-200/80 p-5">
                <div className="flex items-center gap-2 mb-3.5 pb-2.5 border-b border-gray-200">
                  <ListChecks className="w-4 h-4 text-[#0D9488]" />
                  <span className="font-caps text-xs tracking-[1.5px] uppercase text-black font-bold">
                    Complete Service Checklist ({modalService.checklist.length} Tasks)
                  </span>
                </div>
                <ul className="space-y-2.5">
                  {modalService.checklist.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-[15px] text-gray-800">
                      <Check className="w-4 h-4 text-[#0D9488] flex-shrink-0 mt-1 stroke-[2.5]" />
                      <span className="font-sans leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-sm text-gray-500 font-sans italic">
                Recommended for: {modalService.recommendedFor}
              </p>

              {/* Modal Actions */}
              <div className="pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    const title = modalService.title;
                    setModalService(null);
                    onSelectServiceForQuote(title);
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-[8px] bg-[#0D9488] hover:bg-[#0F766E] text-white font-caps text-xs tracking-[1.5px] uppercase font-bold transition-colors cursor-pointer"
                >
                  <span>CONTACT TODAY</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
