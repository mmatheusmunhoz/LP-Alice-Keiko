import React from 'react';
import { Star, Check } from 'lucide-react';
import { TESTIMONIALS_LIST } from '../data';

export const TestimonialsSection: React.FC = () => {
  return (
    <section
      id="testimonials"
      className="py-20 md:py-28 bg-gradient-to-b from-[#F0FDFA] via-[#F6FEFC] to-[#F0FDFA] border-b border-[#2DD4BF]/20"
    >
      <div className="max-w-[1180px] w-[92%] mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14 fade-in-up-observe">
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

        {/* 3-Column Grid of Rounded Premium Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7">
          {TESTIMONIALS_LIST.map((t) => (
            <article
              key={t.id}
              className="bg-white rounded-[24px] p-7 sm:p-8 border border-teal-900/[0.06] text-left flex flex-col justify-between shadow-[0_14px_38px_-14px_rgba(13,148,136,0.12),0_4px_14px_-4px_rgba(10,10,10,0.04)] hover:-translate-y-1 hover:shadow-[0_22px_48px_-14px_rgba(13,148,136,0.18),0_8px_20px_-6px_rgba(10,10,10,0.06)] transition-all duration-300 fade-in-up-observe"
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

        {/* Subtle reassurance line */}
        <div className="mt-12 text-center fade-in-up-observe">
          <p className="text-xs font-caps tracking-[2px] uppercase text-gray-500">
            REFERENCES AVAILABLE UPON REQUEST FOR HIGH-PROFILE ESTATES & PRIVATE CLIENTS
          </p>
        </div>
      </div>
    </section>
  );
};
