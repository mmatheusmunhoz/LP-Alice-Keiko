import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

interface AboutSectionProps {
  onScrollToContact: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onScrollToContact }) => {
  return (
    <section id="about" className="py-24 md:py-32 bg-[#0A0A0A] text-white relative overflow-hidden">
      {/* Decorative subtle ambient tint */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0D9488]/10 blur-3xl pointer-events-none" />

      <div className="max-w-[1180px] w-[92%] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Column 1: Image Showcase (5 cols) */}
          <div className="lg:col-span-5 fade-in-up-observe">
            <div className="relative aspect-[4/5] overflow-hidden border border-white/20 shadow-2xl">
              <img
                src="https://res.cloudinary.com/k6gktjkm/image/upload/v1794345449/WhatsApp_Image_2026-10-30_at_10.48.11_1.jpg"
                alt="Alice Keiko quality standards and team precision on Oahu"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 p-5 bg-black/80 backdrop-blur-xs border border-white/20">
                <span className="font-caps text-xs tracking-[2px] uppercase text-aqua-light block font-bold mb-1">
                  ESTABLISHED ON OʻAHU · 3+ YEARS OF TRUST
                </span>
                <p className="font-display text-lg sm:text-xl text-white font-semibold">
                  Alice Keiko & Her 5-Person Specialist Team
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Story and Owner's Philosophy (7 cols) */}
          <div className="lg:col-span-7 fade-in-up-observe">
            <span className="font-caps text-xs sm:text-sm font-bold tracking-[3.5px] uppercase text-aqua-light block mb-3">
              ABOUT ALICE KEIKO & THE TEAM
            </span>

            <h2 className="font-display text-[30px] sm:text-[40px] md:text-[44px] font-semibold leading-[1.2] text-white tracking-[-0.02em] mb-6 text-balance">
              Built on Word-of-Mouth, Personal Integrity, and Flawless Standards
            </h2>

            <div className="space-y-5 font-sans text-[16px] sm:text-[18px] leading-[1.75] text-white/90">
              <p>
                Founded on the North Shore over 3 years ago, <strong className="text-white">Alice Keiko Organizing & Cleaning Services LLC</strong> has grown almost entirely through the personal recommendations of discerning homeowners and luxury vacation rental hosts.
              </p>

              <p>
                We do not believe in cut-rate shortcuts or rotating strangers. Our boutique team of <strong className="text-white">5 specialists is personally trained and supervised by Alice</strong>. We arrive on time, respect your home’s privacy, and protect delicate custom marble, travertine, and architectural cabinetry with eco-botanical solutions.
              </p>
            </div>

            {/* Credential Checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-8 pt-6 border-t border-white/15">
              <div className="flex items-center gap-2.5 text-[15px] text-gray-200">
                <Check className="w-4 h-4 text-aqua-light stroke-[3]" />
                <span>Personally Trained & Uniformed Staff</span>
              </div>
              <div className="flex items-center gap-2.5 text-[15px] text-gray-200">
                <Check className="w-4 h-4 text-aqua-light stroke-[3]" />
                <span>Full $5M Liability & Bonding</span>
              </div>
              <div className="flex items-center gap-2.5 text-[15px] text-gray-200">
                <Check className="w-4 h-4 text-aqua-light stroke-[3]" />
                <span>North Shore HQ · Islandwide Service</span>
              </div>
              <div className="flex items-center gap-2.5 text-[15px] text-gray-200">
                <Check className="w-4 h-4 text-aqua-light stroke-[3]" />
                <span>24-Hour Return & Rectify Guarantee</span>
              </div>
            </div>

            {/* Single Unified CTA */}
            <div className="pt-2">
              <button
                onClick={onScrollToContact}
                type="button"
                className="inline-flex items-center gap-2.5 px-7 py-4 bg-[#0D9488] hover:bg-[#0F766E] text-white font-caps text-xs sm:text-[13px] tracking-[1.5px] uppercase font-bold transition-all shadow-md cursor-pointer"
              >
                <span>CONTACT TODAY</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
