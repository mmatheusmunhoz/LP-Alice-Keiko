import React from 'react';
import { ShieldCheck, Award, HeartHandshake, Sparkles, Clock, Check } from 'lucide-react';
import { COMPANY_INFO } from '../data';

export const HighlightBand: React.FC = () => {
  return (
    <section className="relative z-20 max-w-[1160px] w-[92%] mx-auto -mt-10 sm:-mt-14 mb-8">
      <div className="bg-white shadow-band px-6 sm:px-12 py-8 sm:py-10 text-center border border-black/5 relative overflow-hidden">
        {/* Subtle Alice Keiko Watermark Logo */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-80 md:w-96 aspect-square pointer-events-none select-none opacity-[0.03] z-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <img
            src="/assets/logo.webp"
            alt=""
            className="w-full h-full object-contain rounded-2xl filter grayscale"
            loading="lazy"
          />
        </div>

        <div className="relative z-10">
          {/* Title in Montserrat CAPS tracking 3px */}
          <h2 className="font-caps text-[17px] sm:text-[21px] font-bold tracking-[3px] uppercase text-[#0A0A0A]">
            PERSONALIZED HIGH-END CARE · OʻAHU, HAWAIʻI
          </h2>

          {/* Subline highlighting the client's business model */}
          <p className="font-sans text-[15px] sm:text-[16px] text-gray-600 mt-2 max-w-3xl mx-auto">
            We evaluate each property in-person to craft a customized scope. No shortcuts, no generic subcontracts—every home is cared for by Alice Keiko and her hand-trained team.
          </p>

          {/* 4 Feature Pillars */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 mt-8 pt-8 border-t border-gray-100">
            {/* Metric 1 */}
            <div className="flex flex-col items-center text-center">
              <Clock className="w-5 h-5 text-[#0D9488] mb-2" />
              <span className="font-display text-xl sm:text-2xl font-semibold text-black leading-tight">
                Since June 2023
              </span>
              <span className="font-caps text-xs sm:text-sm tracking-[1.5px] uppercase text-gray-900 mt-1.5 font-bold">
                Word-of-Mouth Trust
              </span>
              <span className="text-sm text-gray-600 font-sans mt-0.5 leading-snug">
                Client-referred islandwide
              </span>
            </div>

            {/* Metric 2 */}
            <div className="flex flex-col items-center text-center">
              <ShieldCheck className="w-5 h-5 text-[#0D9488] mb-2" />
              <span className="font-display text-2xl sm:text-3xl font-semibold text-black tabular-nums">24-Hour</span>
              <span className="font-caps text-xs sm:text-sm tracking-[1.5px] uppercase text-gray-900 mt-1 font-bold">
                Quality Guarantee
              </span>
              <span className="text-sm text-gray-600 font-sans mt-0.5">
                Prompt return & rectify
              </span>
            </div>

            {/* Metric 3 */}
            <div className="flex flex-col items-center text-center">
              <HeartHandshake className="w-5 h-5 text-[#0D9488] mb-2" />
              <span className="font-display text-xl sm:text-2xl font-semibold text-black leading-tight">
                Trained by Alice Keiko
              </span>
              <span className="font-caps text-xs sm:text-sm tracking-[1.5px] uppercase text-gray-900 mt-1.5 font-bold">
                Dedicated Team
              </span>
              <span className="text-sm text-gray-600 font-sans mt-0.5 leading-snug">
                Uniformed & supervised
              </span>
            </div>

            {/* Metric 4 */}
            <div className="flex flex-col items-center text-center">
              <Sparkles className="w-5 h-5 text-[#0D9488] mb-2" />
              <span className="font-display text-2xl sm:text-3xl font-semibold text-black">Licensed</span>
              <span className="font-caps text-xs sm:text-sm tracking-[1.5px] uppercase text-gray-900 mt-1 font-bold">
                Insured & Bonded
              </span>
              <span className="text-sm text-gray-600 font-sans mt-0.5">
                $5M liability protection
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
