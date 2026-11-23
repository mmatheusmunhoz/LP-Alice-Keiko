import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ShieldCheck, MessageSquare, Phone, Mail, Clock, MapPin, X } from 'lucide-react';
import { COMPANY_INFO } from '../data';
import { CareersModal } from './CareersModal';

interface FooterProps {
  onScrollToContact?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToContact }) => {
  const [modalPolicy, setModalPolicy] = useState<'privacy' | 'terms' | null>(null);
  const [isCareersOpen, setIsCareersOpen] = useState<boolean>(false);
  const careersLinkRef = useRef<HTMLAnchorElement>(null);

  const openCareersModal = useCallback(() => {
    setIsCareersOpen(true);
    try {
      if (window.location.hash !== '#careers') {
        window.history.replaceState(null, '', '#careers');
      }
    } catch {
      // Ignore history errors in restricted preview origins
    }
  }, []);

  const closeCareersModal = useCallback(() => {
    setIsCareersOpen(false);
    try {
      if (window.location.hash.toLowerCase() === '#careers') {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    } catch {
      // Ignore history errors in restricted preview origins
    }
  }, []);

  useEffect(() => {
    const syncCareersHash = () => {
      if (window.location.hash.toLowerCase() === '#careers') {
        setIsCareersOpen(true);
      }
    };

    syncCareersHash();
    window.addEventListener('hashchange', syncCareersHash);
    return () => window.removeEventListener('hashchange', syncCareersHash);
  }, []);

  const handleContactClick = () => {
    if (onScrollToContact) {
      onScrollToContact();
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0A0A0A] text-white/80 border-t border-white/10 pt-16 md:pt-20 pb-10">
      <div className="max-w-[1160px] w-[92%] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/logo.webp"
                alt="Alice Keiko Organizing & Cleaning Services LLC"
                className="h-12 w-12 rounded-xl object-cover border border-white/15 shrink-0"
              />
              <div>
                <span className="font-display text-lg font-semibold text-white block leading-tight">
                  Alice Keiko
                </span>
                <span className="font-caps text-[10px] tracking-[1.5px] uppercase text-aqua-light block">
                  Organizing & Cleaning Services LLC
                </span>
              </div>
            </div>

            <p className="font-sans text-[15px] leading-relaxed text-gray-400 max-w-sm">
              Dedicated to high-end residential deep cleaning, consistent maintenance, turnkey vacation rental staging, and professional home organizing across Oʻahu.
            </p>

            <div className="p-3 bg-white/5 border border-white/10 text-xs font-sans text-gray-300 space-y-1">
              <div className="flex items-center gap-2 text-aqua-light font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Licensed & Insured in the State of Hawaiʻi</span>
              </div>
              <p className="text-[11px] text-gray-400">
                General Liability Insurance & Bonding · Background-Checked Staff
              </p>
            </div>
          </div>

          {/* Quick Nav (2 cols) */}
          <div className="md:col-span-2">
            <h4 className="font-caps text-xs tracking-[2px] uppercase text-white font-bold mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 font-sans text-[14.5px]">
              <li><a href="#services" className="hover:text-aqua-light transition-colors">Services</a></li>
              <li><a href="#philosophy" className="hover:text-aqua-light transition-colors">5S Philosophy</a></li>
              <li><a href="#guarantee" className="hover:text-aqua-light transition-colors">24h Guarantee</a></li>
              <li><a href="#about" className="hover:text-aqua-light transition-colors">About Alice Keiko</a></li>
              <li><a href="#showcase" className="hover:text-aqua-light transition-colors">Before & After</a></li>
              <li><a href="#testimonials" className="hover:text-aqua-light transition-colors">Reviews</a></li>
              <li><a href="#faq" className="hover:text-aqua-light transition-colors">FAQ</a></li>
              <li><a href="#contact" className="hover:text-aqua-light transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Service Area (3 cols) */}
          <div className="md:col-span-3">
            <h4 className="font-caps text-xs tracking-[2px] uppercase text-white font-bold mb-4">
              Island Service Regions
            </h4>
            <p className="text-xs text-gray-400 font-sans mb-3">
              Headquartered on the North Shore, proudly serving:
            </p>
            <ul className="space-y-1.5 font-sans text-[14px] text-gray-300">
              <li>• North Shore (from Mokulēʻia to Lāʻie)</li>
              <li>• Honolulu</li>
              <li>• Kailua</li>
            </ul>
          </div>

          {/* Direct Public Contacts (2 cols) */}
          <div className="md:col-span-2">
            <h4 className="font-caps text-xs tracking-[2px] uppercase text-white font-bold mb-4">
              Direct Contact
            </h4>
            <div className="space-y-3 font-sans text-[14px]">
              <div>
                <span className="text-[10px] font-caps tracking-[1px] uppercase text-gray-400 block">
                  Call & Text (SMS):
                </span>
                <button
                  type="button"
                  onClick={handleContactClick}
                  className="text-white hover:text-aqua-light font-bold block cursor-pointer text-left"
                >
                  {COMPANY_INFO.phone}
                </button>
              </div>

              <div>
                <span className="text-[10px] font-caps tracking-[1px] uppercase text-gray-400 block">
                  WhatsApp:
                </span>
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-aqua-light block text-xs"
                >
                  +1 (415) 660-6374
                </a>
              </div>

              <div>
                <span className="text-[10px] font-caps tracking-[1px] uppercase text-gray-400 block">
                  Email:
                </span>
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="text-white hover:text-aqua-light break-all text-xs block"
                >
                  {COMPANY_INFO.email}
                </a>
              </div>

              <div className="text-[11px] text-gray-400 pt-1">
                Mon – Sun: 7:30 AM – 5:30 PM HST
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Legal Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400">
          <div>
            © {new Date().getFullYear()} Alice Keiko Organizing and Cleaning Services, LLC. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-4 sm:mt-0">
            <a
              ref={careersLinkRef}
              href="#careers"
              onClick={(e) => {
                e.preventDefault();
                openCareersModal();
              }}
              className="text-white/[0.78] hover:text-aqua-light transition-colors cursor-pointer"
            >
              Careers — Join our team
            </a>
            <span>•</span>
            <button
              onClick={() => setModalPolicy('privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => setModalPolicy('terms')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Service Terms & Guarantee
            </button>
          </div>
        </div>
      </div>

      {/* Careers Lazy-Loaded Jotform Modal */}
      <CareersModal
        isOpen={isCareersOpen}
        onClose={closeCareersModal}
        returnFocusRef={careersLinkRef}
      />

      {/* Legal & Policy Advisory Modal */}
      {modalPolicy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-white text-black p-8 shadow-2xl border border-gray-300 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-4">
              <h3 className="font-display text-2xl font-semibold text-black">
                {modalPolicy === 'privacy'
                  ? 'Client Privacy & Confidentiality Protocol'
                  : 'Service Agreement & 24-Hour Guarantee Standards'}
              </h3>
              <button
                onClick={() => setModalPolicy(null)}
                className="p-1 text-gray-400 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 font-sans text-sm text-gray-700 leading-relaxed">
              {modalPolicy === 'privacy' ? (
                <>
                  <p>
                    <strong>1. Client Confidentiality:</strong> Alice Keiko Organizing and Cleaning Services, LLC adheres to strict privacy ethics. Our team members do not take unauthorized photos of private personal belongings, documents, or estate areas.
                  </p>
                  <p>
                    <strong>2. Vacation Rental Photo Reports:</strong> For Airbnb and vacation rentals, inspection photos are taken strictly for inventory verification, linen staging, and departure damage documentation sent directly to the verified property owner or authorized asset manager.
                  </p>
                  <p>
                    <strong>3. Personal Information:</strong> Phone numbers, email addresses, gate codes, and property blueprints provided for estimates are never sold, rented, or shared with third parties.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>1. 24-Hour Quality Guarantee:</strong> If any specific service item agreed upon during your in-person evaluation was not completed to our mutual standard, notify us within 24 hours of service completion. We will review the situation and dispatch our team within 24 hours to re-clean and rectify the area at zero additional charge.
                  </p>
                  <p>
                    <strong>2. Licensed & Insured:</strong> We maintain comprehensive general liability insurance in the State of Hawaiʻi covering accidental property damage.
                  </p>
                  <p>
                    <strong>3. Supplies & Equipment:</strong> We supply all professional commercial vacuums, microfiber cleaning gear, and certified eco-botanical cleansers.
                  </p>
                  <p>
                    <strong>4. Cancellation & Access:</strong> Because our schedule is reserved exclusively for your home, we appreciate at least 48 hours notice for schedule adjustments.
                  </p>
                </>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200 text-right">
              <button
                onClick={() => setModalPolicy(null)}
                className="px-6 py-2 rounded-[8px] bg-black text-white font-caps text-xs tracking-[1px] uppercase font-bold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
