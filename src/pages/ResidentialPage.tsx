import React from 'react';
import { ArrowLeft, ArrowRight, Check, ShieldCheck, Clock, ListChecks, Sparkles, Star } from 'lucide-react';
import { SERVICES_LIST } from '../data';

interface PageProps {
  onBackToHome: () => void;
  onOpenContact: (serviceTitle?: string) => void;
}

export const ResidentialPage: React.FC<PageProps> = ({ onBackToHome, onOpenContact }) => {
  const residentialServices = SERVICES_LIST.filter((s) => s.category === 'residential');

  return (
    <div className="min-h-screen bg-white">
      {/* Top Banner / Breadcrumb */}
      <div className="bg-[#0A0A0A] text-white pt-24 pb-14 border-b border-white/10">
        <div className="max-w-[1160px] w-[92%] mx-auto">
          <button
            onClick={onBackToHome}
            type="button"
            className="inline-flex items-center gap-2 text-xs font-caps tracking-[2px] uppercase text-aqua-light hover:text-white transition-colors mb-6 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Back to All Services & Main Page</span>
          </button>

          <div className="inline-block px-3 py-1 bg-[#0D9488]/20 border border-[#0D9488]/40 text-aqua-light text-xs font-caps tracking-[2.5px] uppercase font-bold mb-3">
            DEDICATED DIVISION
          </div>

          <h1 className="font-display text-[34px] sm:text-[44px] md:text-[50px] font-semibold leading-[1.2] tracking-[-0.02em] text-white mb-4 text-balance">
            Residential & Deep Cleaning Care
          </h1>

          <p className="font-sans text-[17px] sm:text-[19px] text-gray-300 max-w-3xl leading-relaxed">
            Elevating private estates, family homes, and executive residences across Oʻahu. We specialize in comprehensive initial Deep Cleans and consistent, worry-free recurring maintenance.
          </p>

          <div className="mt-8">
            <button
              onClick={() => onOpenContact('Deep Cleaning')}
              type="button"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[8px] bg-[#0D9488] hover:bg-[#0F766E] text-white font-caps text-xs tracking-[1.5px] uppercase font-bold transition-colors shadow-md cursor-pointer"
            >
              <span>CONTACT TODAY</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Trust Highlights */}
      <div className="bg-[#F0FDFA] border-b border-[#2DD4BF]/30 py-6">
        <div className="max-w-[1160px] w-[92%] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs font-caps tracking-[1.5px] uppercase font-bold text-gray-800">
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#0D9488]" />
            <span>24-Hour Return Guarantee</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-[#0D9488]" />
            <span>Eco-Botanical & Pet Safe</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Clock className="w-4 h-4 text-[#0D9488]" />
            <span>Weekly, Bi-Weekly, Monthly</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Star className="w-4 h-4 text-[#E0A526] fill-[#E0A526]" />
            <span>Owner-Supervised Team</span>
          </div>
        </div>
      </div>

      {/* Main Content: Services in this division */}
      <div className="max-w-[1160px] w-[92%] mx-auto py-16 sm:py-20">
        <div className="mb-14">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-black mb-3">
            Why We Recommend Starting with a Deep Clean
          </h2>
          <p className="font-sans text-gray-600 max-w-3xl leading-relaxed">
            Our Deep Cleaning resets all the challenging areas that accumulate over time—sliding door tracks, baseboards, window sills, ceiling fans, and deep shower soap scum. Once this high standard is established, our weekly or bi-weekly maintenance visits keep your residence effortlessly pristine.
          </p>
        </div>

        {/* Detailed Service Cards */}
        <div className="space-y-16">
          {residentialServices.map((service) => (
            <div key={service.id} className="bg-white border border-gray-200 shadow-float p-6 sm:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5 space-y-4">
                  <div className="relative aspect-[16/11] overflow-hidden bg-gray-100 border border-gray-100">
                    <img
                      src={service.image}
                      alt={service.imageAlt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-black/85 text-white px-3 py-1 font-caps text-[10px] tracking-[1.5px] uppercase font-bold">
                      {service.badge}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 border border-gray-200">
                    <span className="font-caps text-[10px] tracking-[2px] uppercase text-gray-700 font-bold block mb-1">
                      Available Intervals
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {service.frequencyOptions.map((f) => (
                        <span key={f} className="text-xs bg-white px-2.5 py-1 border border-gray-200 font-medium">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <span className="font-caps text-xs tracking-[2px] uppercase text-[#0D9488] font-bold block mb-1">
                    {service.subtitle}
                  </span>
                  <h3 className="font-display text-[26px] sm:text-[30px] text-black font-semibold mb-3">
                    {service.title}
                  </h3>
                  <p className="font-sans text-[16px] text-gray-600 leading-relaxed mb-6">
                    {service.fullDescription}
                  </p>

                  {/* Checklist */}
                  <div className="bg-[#F8FAFC] border border-gray-200 p-5 mb-6">
                    <div className="flex items-center gap-2 pb-3 border-b border-gray-200 mb-3">
                      <ListChecks className="w-4 h-4 text-[#0D9488]" />
                      <span className="font-caps text-xs tracking-[1.5px] uppercase font-bold text-black">
                        Complete Inclusions Checklist
                      </span>
                    </div>

                    <ul className="space-y-2">
                      {service.checklist.map((c, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-gray-800">
                          <Check className="w-4 h-4 text-[#0D9488] flex-shrink-0 mt-0.5 stroke-[2.5]" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <button
                      onClick={() => onOpenContact(service.title)}
                      type="button"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-[8px] bg-[#0D9488] hover:bg-[#0F766E] text-white font-caps text-xs tracking-[1.5px] uppercase font-bold transition-colors shadow-xs cursor-pointer"
                    >
                      <span>CONTACT TODAY</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA to return */}
        <div className="mt-16 text-center pt-8 border-t border-gray-200">
          <button
            onClick={onBackToHome}
            type="button"
            className="inline-flex items-center gap-2 text-sm font-caps tracking-[2px] uppercase text-black hover:text-[#0D9488] font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to All Services & Main Experience</span>
          </button>
        </div>
      </div>
    </div>
  );
};
