import React from 'react';
import { ArrowLeft, ArrowRight, Check, ShieldCheck, ListChecks, Sparkles, FolderKanban, Wrench } from 'lucide-react';
import { SERVICES_LIST } from '../data';

interface PageProps {
  onBackToHome: () => void;
  onOpenContact: (serviceTitle?: string) => void;
}

export const SpecializedPage: React.FC<PageProps> = ({ onBackToHome, onOpenContact }) => {
  const specializedServices = SERVICES_LIST.filter((s) => s.category === 'specialized');

  return (
    <div className="min-h-screen bg-white">
      {/* Top Banner */}
      <section className="bg-[#0A0A0A] text-white pt-24 pb-14 border-b border-white/10">
        <div className="max-w-[1160px] w-[92%] mx-auto">
          <nav aria-label="Breadcrumb">
            <a
              href="/"
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                e.preventDefault();
                onBackToHome();
              }}
              className="inline-flex items-center gap-2 text-xs font-caps tracking-[2px] uppercase text-aqua-light hover:text-white transition-colors mb-6 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>← Back to All Services & Main Page</span>
            </a>
          </nav>

          <div className="inline-block px-3 py-1 bg-[#0D9488]/20 border border-[#0D9488]/40 text-aqua-light text-xs font-caps tracking-[2.5px] uppercase font-bold mb-3">
            SPECIALIZED CRAFTSMANSHIP DIVISION
          </div>

          <h1 className="font-display text-[34px] sm:text-[44px] md:text-[50px] font-semibold leading-[1.2] tracking-[-0.02em] text-white mb-4 text-balance">
            Professional Home Organizing & Post-Construction Cleaning
          </h1>

          <p className="font-sans text-[17px] sm:text-[19px] text-gray-300 max-w-3xl leading-relaxed">
            Alice Keiko leads our home organizing service. Our team also provides final cleaning after construction and renovations across Oʻahu.
          </p>

          <div className="mt-8">
            <button
              onClick={() => onOpenContact('Professional Home Organizing')}
              type="button"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[8px] bg-[#0D9488] hover:bg-[#0F766E] text-white font-caps text-xs tracking-[1.5px] uppercase font-bold transition-colors shadow-md cursor-pointer"
            >
              <span>CONTACT TODAY</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Highlights Bar */}
      <section aria-label="Specialized service highlights" className="bg-[#F0FDFA] border-b border-[#2DD4BF]/30 py-6">
        <div className="max-w-[1160px] w-[92%] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs font-caps tracking-[1.5px] uppercase font-bold text-gray-800">
          <div className="flex items-center justify-center gap-2">
            <FolderKanban className="w-4 h-4 text-[#0D9488]" />
            <span>Sustainable Closet Systems</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Wrench className="w-4 h-4 text-[#0D9488]" />
            <span>HEPA Multi-Stage Vacuuming</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-[#0D9488]" />
            <span>Food-Safe Appliance Care</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#0D9488]" />
            <span>Final Walkthrough & Handover</span>
          </div>
        </div>
      </section>

      {/* Main Content: Services in this division */}
      <section className="max-w-[1160px] w-[92%] mx-auto py-16 sm:py-20">
        <div className="mb-14">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-black mb-3">
            Transforming Chaos into Calming Functionality
          </h2>
          <p className="font-sans text-gray-600 max-w-3xl leading-relaxed">
            Whether you need practical organization for your closets and pantry or thorough final cleaning after a renovation, our specialized team brings order, freshness, and careful finish protection to every space.
          </p>
        </div>

        {/* Detailed Service Cards */}
        <div className="space-y-16">
          {specializedServices.map((service) => (
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
                      Project Formats
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
                  {service.id === 'post-construction' && (
                    <p className="font-sans text-sm text-gray-500 leading-relaxed -mt-3 mb-6">
                      Also trusted as a referral partner by local architects and interior designers.
                    </p>
                  )}

                  {/* Checklist */}
                  <div className="bg-[#F8FAFC] border border-gray-200 p-5 mb-6">
                    <div className="flex items-center gap-2 pb-3 border-b border-gray-200 mb-3">
                      <ListChecks className="w-4 h-4 text-[#0D9488]" />
                      <span className="font-caps text-xs tracking-[1.5px] uppercase font-bold text-black">
                        Specialized Execution Checklist
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
                      <span>
                        {service.id === 'post-construction' ? 'REQUEST A QUOTE' : 'CONTACT TODAY'}
                      </span>
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
          <a
            href="/"
            onClick={(e) => {
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
              e.preventDefault();
              onBackToHome();
            }}
            className="inline-flex items-center gap-2 text-sm font-caps tracking-[2px] uppercase text-black hover:text-[#0D9488] font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to All Services & Main Experience</span>
          </a>
        </div>
      </section>
    </div>
  );
};
