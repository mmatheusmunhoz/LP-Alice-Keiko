import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  UserCheck,
  Clock,
  Leaf,
  HeartHandshake,
  Award,
} from 'lucide-react';
import { DIFFERENTIALS_DATA } from '../data';
import { WorkGallery } from './WorkGallery';

const DIFFERENTIAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  UserCheck,
  Clock,
  ShieldCheck,
  Leaf,
  HeartHandshake,
  Award,
};

interface DifferentialsGuaranteeProps {
  onScrollToContact?: () => void;
}

export const DifferentialsGuarantee: React.FC<DifferentialsGuaranteeProps> = ({
  onScrollToContact,
}) => {
  const handleContactClick = () => {
    if (onScrollToContact) {
      onScrollToContact();
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <section id="guarantee" className="py-24 md:py-32 bg-white border-b border-gray-100">
      <div className="max-w-[1180px] w-[92%] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 fade-in-up-observe">
          <span className="font-caps text-xs sm:text-sm font-bold tracking-[3.5px] uppercase text-[#0D9488] block mb-3">
            UNCOMPROMISING INTEGRITY
          </span>
          <h2 className="font-display text-[32px] sm:text-[40px] md:text-[44px] font-semibold leading-[1.2] text-[#0A0A0A] tracking-[-0.02em] text-balance">
            Why Oʻahu Estate Owners & Hosts Choose Alice Keiko
          </h2>
          <div className="w-16 h-[2px] bg-[#0D9488] mx-auto mt-4 mb-5" />
          <p className="font-sans text-[16px] sm:text-[18px] text-gray-700 leading-relaxed">
            We do not compete on volume or the cheapest shortcut; we compete on the highest quality, punctuality, and true peace of mind.
          </p>
        </div>

        {/* Feature Hero Card: The 24-Hour Quality Guarantee */}
        <div className="bg-[#F0FDFA] border border-[#2DD4BF]/60 p-8 sm:p-12 mb-16 shadow-xs fade-in-up-observe">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#0D9488] text-white text-xs font-caps tracking-[2px] uppercase font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>OUR QUALITY PLEDGE</span>
              </div>

              <h3 className="font-display text-[26px] sm:text-[32px] text-black font-semibold leading-tight">
                Our 24-Hour Return & Rectify Guarantee
              </h3>

              <p className="font-sans text-[16px] sm:text-[18px] text-gray-800 leading-relaxed">
                If any aspect of the service does not meet what was agreed upon during your consultation, simply notify us. <strong className="text-black font-semibold">We return to your property within 24 hours to perfect it at zero additional charge.</strong>
              </p>

              <div className="pt-2 flex flex-wrap gap-5 text-sm font-caps tracking-[1px] uppercase text-gray-800 font-bold">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0D9488]" /> No Excuses
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0D9488]" /> Swift 24h Response
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0D9488]" /> 100% Free of Charge
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white p-7 border border-[#2DD4BF]/40 text-center shadow-xs">
              <span className="font-caps text-xs tracking-[2px] uppercase text-gray-600 font-bold block mb-2">
                SPEAK DIRECTLY WITH ALICE
              </span>
              <p className="font-display text-2xl sm:text-3xl text-black font-semibold mb-1 tabular-nums">
                (808) 218-2515
              </p>
              <p className="text-sm text-gray-600 font-sans mb-4">
                Call or Text Message SMS
              </p>
              <button
                type="button"
                onClick={handleContactClick}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-[#0D9488] hover:bg-[#0F766E] text-white font-caps text-xs sm:text-[13px] tracking-[1.5px] uppercase font-bold transition-colors cursor-pointer"
              >
                <span>CONTACT TODAY</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 6 Core Differentials Grid - Airy, Comfortable Readability */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DIFFERENTIALS_DATA.map((diff) => {
            const IconComponent = DIFFERENTIAL_ICONS[diff.icon] ?? CheckCircle2;
            return (
              <div
                key={diff.title}
                className="bg-white border border-gray-200/80 p-8 shadow-xs hover:shadow-lg transition-all duration-300 fade-in-up-observe flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center mb-5">
                    <IconComponent className="w-5 h-5 stroke-[2]" />
                  </div>

                <h4 className="font-display text-[20px] sm:text-[22px] text-black font-semibold mb-3 leading-snug">
                  {diff.title}
                </h4>

                <p className="font-sans text-[15px] sm:text-[16px] text-gray-700 leading-relaxed">
                  {diff.description}
                </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Alice Keiko Work Portfolio Gallery */}
        <WorkGallery />
      </div>
    </section>
  );
};
