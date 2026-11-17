import React from 'react';
import { MessageSquare, Phone, Mail } from 'lucide-react';
import { COMPANY_INFO } from '../data';

interface ContactSectionProps {
  initialService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialService }) => {
  return (
    <section id="contact" className="py-24 md:py-32 bg-white">
      <div className="max-w-[1100px] w-[92%] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-10 md:gap-12 lg:gap-16 fade-in-up-observe">
          {/* Left / Center: Editorial Overlapping Heading + Feature Photo */}
          <div className="md:col-span-7 md:pl-16 lg:pl-24 relative">
            <h2 className="font-display text-[42px] sm:text-[54px] lg:text-[64px] font-semibold leading-none tracking-[-0.03em] text-[#0A0A0A] mb-5 md:mb-0 md:absolute md:left-0 lg:left-2 md:top-10 z-10 md:[text-shadow:0_2px_18px_rgba(255,255,255,0.85)]">
              Contact
            </h2>

            <div className="w-full aspect-square max-h-[520px] overflow-hidden bg-gray-100">
              <img
                src="/assets/photos/IMG_6591.jpg"
                alt="Alice Keiko Organizing & Cleaning Services LLC — Immaculate Oʻahu property care"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column: Clean Editorial Contact Details */}
          <div className="md:col-span-5 max-w-[380px] w-full">
            <div className="pb-5 border-b border-gray-200">
              <p className="font-caps text-[22px] sm:text-[26px] font-light tracking-[2px] uppercase text-[#0A0A0A] leading-tight">
                CONTACT FOR A
              </p>
              <p className="font-caps text-[22px] sm:text-[26px] font-bold tracking-[2px] uppercase text-[#0A0A0A] leading-tight mt-0.5">
                FREE QUOTE
              </p>
              {initialService && (
                <p className="font-sans text-xs text-[#0D9488] font-medium mt-2">
                  Service inquiry: {initialService}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="py-5 border-b border-gray-200">
              <h3 className="font-display text-[20px] font-semibold text-[#0A0A0A] mb-2">
                Phone
              </h3>
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="font-sans text-[17px] text-gray-800 hover:text-[#0D9488] transition-colors inline-flex items-center gap-2 font-medium"
              >
                <Phone className="w-4 h-4 text-[#0D9488]" />
                <span>{COMPANY_INFO.phone}</span>
              </a>

              <p className="mt-2 inline-flex items-center gap-1.5 font-sans text-[13px] text-[#0F766E] font-medium">
                <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                <span>Text messages (SMS) welcome for quickest response</span>
              </p>
            </div>

            {/* Email */}
            <div className="py-5 border-b border-gray-200">
              <h3 className="font-display text-[20px] font-semibold text-[#0A0A0A] mb-2">
                Email
              </h3>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="font-sans text-[17px] text-gray-800 hover:text-[#0D9488] transition-colors inline-flex items-center gap-2 break-all"
              >
                <Mail className="w-4 h-4 text-[#0D9488] shrink-0" />
                <span>{COMPANY_INFO.email}</span>
              </a>
            </div>

            {/* Business Hours & Service Area */}
            <div className="pt-5">
              <h3 className="font-display text-[20px] font-semibold text-[#0A0A0A] mb-1.5">
                Hours
              </h3>
              <p className="font-sans text-[15px] text-gray-700 leading-relaxed">
                {COMPANY_INFO.businessHours}
              </p>
              <p className="font-sans text-[13.5px] text-gray-500 mt-1">
                {COMPANY_INFO.location}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
