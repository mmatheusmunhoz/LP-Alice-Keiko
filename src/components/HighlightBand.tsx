import React from 'react';
import { ShieldCheck, Award, HeartHandshake, Sparkles, Clock, Check } from 'lucide-react';
import { COMPANY_INFO } from '../data';

export const HighlightBand: React.FC = () => {
  return (
    <section className="relative z-20 max-w-[1160px] w-[92%] mx-auto -mt-10 sm:-mt-14 mb-8">
      <div className="bg-gradient-to-br from-white via-[#F6FCFB] to-[#EAF7F5] shadow-[0_22px_54px_-16px_rgba(4,43,46,0.14),0_6px_20px_-6px_rgba(13,148,136,0.08)] ring-1 ring-inset ring-white/85 px-6 sm:px-12 py-8 sm:py-10 text-center border border-[#0D9488]/15 relative overflow-hidden">
        {/* Delicate Luxury Top Accent Hairline */}
        <div
          className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#0D9488]/65 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Soft Ambient Light Washes for Subtle Depth */}
        <div
          className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(13,148,136,0.09)_0%,rgba(13,148,136,0)_70%)] pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-28 -right-24 w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(4,43,46,0.06)_0%,rgba(4,43,46,0)_70%)] pointer-events-none"
          aria-hidden="true"
        />

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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 mt-8 pt-8 border-t border-[#0D9488]/15">
            {/* Metric 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0D9488]/15 to-[#0D9488]/5 border border-[#0D9488]/20 flex items-center justify-center mb-2.5 shadow-[0_2px_10px_rgba(13,148,136,0.08)]">
                <Clock className="w-4.5 h-4.5 text-[#0D9488]" />
              </div>
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
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0D9488]/15 to-[#0D9488]/5 border border-[#0D9488]/20 flex items-center justify-center mb-2.5 shadow-[0_2px_10px_rgba(13,148,136,0.08)]">
                <ShieldCheck className="w-4.5 h-4.5 text-[#0D9488]" />
              </div>
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
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0D9488]/15 to-[#0D9488]/5 border border-[#0D9488]/20 flex items-center justify-center mb-2.5 shadow-[0_2px_10px_rgba(13,148,136,0.08)]">
                <HeartHandshake className="w-4.5 h-4.5 text-[#0D9488]" />
              </div>
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
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0D9488]/15 to-[#0D9488]/5 border border-[#0D9488]/20 flex items-center justify-center mb-2.5 shadow-[0_2px_10px_rgba(13,148,136,0.08)]">
                <Sparkles className="w-4.5 h-4.5 text-[#0D9488]" />
              </div>
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
