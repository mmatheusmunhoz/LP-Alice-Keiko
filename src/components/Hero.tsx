import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';

interface HeroProps {
  onOpenQuoteModal?: (serviceName?: string) => void;
  onScrollToContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToContact }) => {
  return (
    <section
      className="relative min-h-[min(90svh,580px)] lg:min-h-[min(90svh,660px)] pt-[96px] sm:pt-[136px] lg:pt-[144px] pb-16 sm:pb-20 lg:pb-24 text-center text-white flex flex-col justify-center items-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(10, 10, 10, 0.45), rgba(10, 10, 10, 0.65)), url('/assets/photos/hero-oahu.jpg')`,
        backgroundPosition: 'center 40%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="relative z-10 max-w-[1040px] w-[92%] mx-auto flex flex-col items-center">
        {/* Geographic Badge */}
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 bg-black/60 border border-white/20 backdrop-blur-xs text-[10px] sm:text-xs font-caps tracking-[2px] sm:tracking-[2.5px] uppercase mb-3 sm:mb-4 text-white">
          <MapPin className="w-3.5 h-3.5 text-aqua-light shrink-0" />
          <span>North Shore (Mokulēʻia to Lāʻie) · Honolulu · Kailua</span>
        </div>

        {/* Company Signature Eyebrow */}
        <p className="font-caps text-[11px] sm:text-[14px] md:text-[16px] font-semibold tracking-[2.5px] sm:tracking-[4px] uppercase text-aqua-light mb-2">
          ALICE KEIKO ORGANIZING & CLEANING SERVICES LLC
        </p>

        {/* Core Motto Headline */}
        <h1 className="font-display text-[28px] sm:text-[38px] md:text-[46px] lg:text-[50px] font-semibold leading-[1.16] sm:leading-[1.18] tracking-[-0.02em] text-white max-w-[900px] mb-3.5 sm:mb-4 text-balance">
          Discreet, detail-oriented cleaning you can count on
        </h1>

        {/* Concise Supporting Line (non-redundant with HighlightBand below) */}
        <p className="font-sans text-[15px] sm:text-[17px] md:text-[18px] leading-[1.55] text-white/90 max-w-[700px] font-normal mb-6 sm:mb-8">
          Our trained, fully insured team provides professional cleaning and organizing for private homes and vacation rentals across Oʻahu.
        </p>

        {/* Single Unified Primary CTA */}
        <div className="flex items-center justify-center w-full sm:w-auto">
          <button
            onClick={onScrollToContact}
            type="button"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#0D9488] hover:bg-[#0F766E] text-white font-caps font-bold text-[14px] sm:text-[15px] tracking-[2px] uppercase border border-teal-400/30 rounded-[8px] shadow-xl transition-all duration-200 cursor-pointer group"
          >
            <span>CONTACT US TODAY</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
