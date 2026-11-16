import React from 'react';
import { MapPin, ArrowRight, Clock, ShieldCheck, UserCheck, Leaf } from 'lucide-react';

interface HeroProps {
  onOpenQuoteModal: (serviceName?: string) => void;
  onScrollToContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuoteModal, onScrollToContact }) => {
  return (
    <section
      className="relative min-h-[min(100svh,680px)] lg:min-h-[min(100svh,740px)] pt-[92px] sm:pt-[136px] lg:pt-[142px] pb-8 sm:pb-12 lg:pb-14 text-center text-white flex flex-col justify-center items-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(10, 10, 10, 0.45), rgba(10, 10, 10, 0.65)), url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85')`,
        backgroundPosition: 'center 40%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="relative z-10 max-w-[1160px] w-[92%] mx-auto flex flex-col items-center">
        {/* Geographic & Trust Badge */}
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 bg-black/60 border border-white/20 backdrop-blur-xs text-[10px] sm:text-xs font-caps tracking-[2px] sm:tracking-[2.5px] uppercase mb-3 sm:mb-4 text-white">
          <MapPin className="w-3.5 h-3.5 text-aqua-light shrink-0" />
          <span>North Shore Oʻahu · Serving All Oʻahu & Neighbor Islands</span>
        </div>

        {/* Company Signature Eyebrow in Montserrat CAPS tracking 4px */}
        <p className="font-caps text-[11px] sm:text-[15px] md:text-[17px] font-semibold tracking-[2.5px] sm:tracking-[4px] uppercase text-aqua-light mb-1.5 sm:mb-2">
          ALICE KEIKO ORGANIZING & CLEANING SERVICES LLC
        </p>

        {/* Client's core motto in Poppins Display */}
        <h1 className="font-display text-[26px] sm:text-[36px] md:text-[44px] lg:text-[48px] font-semibold leading-[1.18] sm:leading-[1.2] tracking-[-0.02em] text-white max-w-[960px] mb-3 sm:mb-3.5 text-balance">
          A trusted company that delivers what it promises and delivers quality.
        </h1>

        {/* Supporting Narrative */}
        <p className="font-sans text-[14.5px] sm:text-[16.5px] md:text-[17.5px] leading-[1.5] sm:leading-[1.6] text-white/90 max-w-[840px] font-normal mb-5 sm:mb-7">
          Specializing in high-end residential deep cleaning, consistent regular maintenance, turnkey vacation rental (Airbnb/VRBO) preparation, and professional home organizing across Oʻahu. Built on 3+ years of client referrals, punctuality, and unwavering personal integrity.
        </p>

        {/* Single Unified Primary CTA */}
        <div className="flex items-center justify-center w-full sm:w-auto">
          <button
            onClick={onScrollToContact}
            type="button"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#0D9488] hover:bg-[#0F766E] text-white font-caps font-bold text-[14px] sm:text-[15px] tracking-[2px] uppercase border border-teal-400/30 rounded-none shadow-xl transition-all duration-200 cursor-pointer group"
          >
            <span>CONTACT US TODAY</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Prompt response helper */}
        <p className="text-xs sm:text-sm text-aqua-light font-sans mt-2.5 sm:mt-3 font-medium">
          Text message (SMS) is our quickest channel for same-day coordination & scheduling.
        </p>

        {/* Trust Badges */}
        <div className="mt-5 sm:mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:gap-8 text-[11px] sm:text-[13px] font-caps tracking-[1.5px] sm:tracking-[2px] uppercase text-white/95">
          <span className="flex items-center gap-1.5 sm:gap-2">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-aqua-light stroke-[2.2]" /> 24-Hour Guarantee
          </span>
          <span className="flex items-center gap-1.5 sm:gap-2">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-aqua-light stroke-[2.2]" /> Licensed & Insured
          </span>
          <span className="flex items-center gap-1.5 sm:gap-2">
            <UserCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-aqua-light stroke-[2.2]" /> Owner-Trained Specialists
          </span>
          <span className="flex items-center gap-1.5 sm:gap-2">
            <Leaf className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-aqua-light stroke-[2.2]" /> Eco-Botanical Care
          </span>
        </div>
      </div>
    </section>
  );
};
