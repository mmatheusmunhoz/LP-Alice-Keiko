import React, { useState } from 'react';
import { ChevronDown, ArrowRight, HelpCircle } from 'lucide-react';
import { FAQ_LIST } from '../data';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // first item open by default

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 md:py-32 bg-[#F8FAFC] border-b border-gray-100">
      <div className="max-w-[1180px] w-[92%] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Context & Direct Contact (4 cols) */}
          <div className="lg:col-span-4 fade-in-up-observe">
            <span className="font-caps text-xs sm:text-sm font-bold tracking-[3.5px] uppercase text-[#0D9488] block mb-3">
              CLEAR & HONEST ANSWERS
            </span>

            <h2 className="font-display text-[30px] sm:text-[38px] font-semibold leading-[1.2] text-[#0A0A0A] tracking-[-0.02em] mb-4 text-balance">
              Frequently Asked Questions
            </h2>

            <p className="font-sans text-[16px] sm:text-[18px] text-gray-700 leading-relaxed mb-6">
              Inviting a team into your private sanctuary or high-yield vacation rental requires complete confidence. Here are answers to our clients' most common inquiries.
            </p>

            <div className="bg-white p-7 border border-gray-200/80 shadow-xs space-y-4">
              <span className="font-caps text-xs sm:text-sm tracking-[1.5px] uppercase text-black font-bold block">
                Have a unique property or specific requirement?
              </span>
              <p className="font-sans text-sm sm:text-[15px] text-gray-700 leading-relaxed">
                Alice Keiko answers questions personally and can discuss delicate antiques, stone care, or custom recurring intervals.
              </p>
              <button
                type="button"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-[8px] bg-[#0D9488] hover:bg-[#0F766E] text-white font-caps text-xs sm:text-[13px] tracking-[1.5px] uppercase font-bold transition-colors cursor-pointer"
              >
                <span>CONTACT TODAY</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Accordion Questions (8 cols) */}
          <div className="lg:col-span-8 space-y-3 fade-in-up-observe">
            {FAQ_LIST.map((faq, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 shadow-xs overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFAQ(idx)}
                    type="button"
                    className={`w-full flex items-center justify-between p-5 sm:p-6 text-left transition-colors cursor-pointer ${
                      isOpen ? 'bg-[#F0FDFA]' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start gap-3.5 pr-4">
                      <HelpCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isOpen ? 'text-[#0D9488]' : 'text-gray-400'}`} />
                      <span className="font-display text-[16px] sm:text-[17px] font-semibold text-black leading-snug">
                        {faq.question}
                      </span>
                    </div>

                    <div
                      className={`w-7 h-7 rounded-none flex items-center justify-center transition-transform duration-200 flex-shrink-0 ${
                        isOpen ? 'bg-[#0D9488] text-white rotate-180' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="p-6 pt-2 font-sans text-[16px] text-gray-700 leading-relaxed border-t border-gray-100 bg-white shadow-inset">
                      <p className="whitespace-pre-line">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
