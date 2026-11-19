import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, Clock, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '../data';

interface NavbarProps {
  onOpenQuoteModal: (serviceName?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuoteModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: '5S Philosophy', href: '#philosophy' },
    { label: 'Guarantee', href: '#guarantee' },
    { label: 'About Alice Keiko', href: '#about' },
    { label: 'Before & After', href: '#showcase' },
    { label: 'Reviews', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Top micro-bar for hours and prompt response notice */}
      <div className="bg-[#0A0A0A] text-white/90 text-[11px] font-sans py-2 border-b border-white/10 hidden sm:block">
        <div className="max-w-[1160px] w-[92%] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-gray-300">
              <Clock className="w-3.5 h-3.5 text-aqua-light" />
              <span>Mon – Sun, 7:30 AM – 5:30 PM HST</span>
            </span>
            <span className="text-white/20">|</span>
            <span className="text-gray-300 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-aqua-light" />
              <span>Licensed & Insured Oʻahu</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-aqua-light font-medium">Prompt scheduling & inquiries:</span>
            <button
              type="button"
              onClick={() => onOpenQuoteModal()}
              className="text-white hover:text-aqua-light transition-colors font-bold underline cursor-pointer"
            >
              {COMPANY_INFO.phone}
            </button>
          </div>
        </div>
      </div>

      <header
        className={`fixed top-0 sm:top-[33px] left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md text-[#0A0A0A] shadow-sm py-2 !top-0'
            : 'bg-black/60 backdrop-blur-xs text-white py-2.5'
        }`}
      >
        <div className="max-w-[1180px] w-[94%] sm:w-[92%] mx-auto flex items-center justify-between gap-3 sm:gap-4">
          {/* Brand Logo Lockup: Trimmed Emblem + Company Title / Divider / Hawaiian Islands */}
          <a href="#" className="flex items-center gap-1.5 sm:gap-2.5 group py-0.5 min-w-0 shrink">
            <img
              src={
                isScrolled
                  ? 'https://res.cloudinary.com/k6gktjkm/image/upload/e_trim/v1795091695/Logotipo_Alice_Keiko_com_mapa_de_O%CA%BBahu.png'
                  : 'https://res.cloudinary.com/k6gktjkm/image/upload/e_trim/v1795092434/alice_keiko_logo_mobile_menu_escuro_transparente.png'
              }
              alt="Alice Keiko Organizing & Cleaning Services LLC"
              className="h-10 sm:h-12 lg:h-11 xl:h-[50px] w-auto shrink-0 object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />

            <div className="flex flex-col justify-center min-w-0 leading-none">
              <span
                className={`font-caps text-[7.5px] sm:text-[9px] lg:text-[8.5px] xl:text-[9.5px] font-semibold tracking-[0.5px] sm:tracking-[1.1px] xl:tracking-[1.3px] uppercase leading-[1.22] whitespace-nowrap transition-colors ${
                  isScrolled ? 'text-[#0A0A0A]' : 'text-white'
                }`}
              >
                ORGANIZING &amp; CLEANING
                <span className="block">SERVICES LLC</span>
              </span>
              <span
                className={`block w-full h-[1px] my-[3px] sm:my-[3.5px] transition-colors ${
                  isScrolled ? 'bg-[#0D9488]/60' : 'bg-white/45'
                }`}
                aria-hidden="true"
              />
              <span
                className={`font-caps text-[6.5px] sm:text-[7.5px] xl:text-[8px] font-semibold tracking-[1.3px] sm:tracking-[2px] uppercase leading-none whitespace-nowrap transition-colors ${
                  isScrolled ? 'text-[#0F766E]' : 'text-aqua-light'
                }`}
              >
                HAWAIIAN ISLANDS
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1 shrink-0">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`font-display text-[12px] xl:text-[14px] px-1 xl:px-2.5 py-1.5 transition-colors font-medium whitespace-nowrap ${
                  isScrolled
                    ? 'text-gray-700 hover:text-[#0D9488]'
                    : 'text-white/90 hover:text-aqua-light'
                }`}
              >
                {item.label}
              </a>
            ))}

            {/* Single Unified Primary CTA */}
            <button
              type="button"
              onClick={() => onOpenQuoteModal()}
              className="inline-flex items-center gap-1.5 xl:gap-2 px-3.5 xl:px-4 py-2 rounded-[8px] bg-[#0D9488] hover:bg-[#0F766E] text-white text-[11px] xl:text-xs font-caps tracking-[1.3px] xl:tracking-[1.5px] uppercase font-bold transition-all ml-2 xl:ml-3 shadow-xs cursor-pointer whitespace-nowrap"
            >
              <span>CONTACT TODAY</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </nav>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-1 sm:gap-2 lg:hidden shrink-0">
            <button
              type="button"
              onClick={() => onOpenQuoteModal()}
              className="px-2 py-2 sm:px-3 sm:py-2 rounded-[8px] bg-[#0D9488] hover:bg-[#0F766E] text-white text-[8.5px] sm:text-[11px] font-caps tracking-[0.45px] sm:tracking-[1.2px] uppercase font-bold leading-none flex items-center gap-1 cursor-pointer whitespace-nowrap"
            >
              <span>CONTACT TODAY</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-1 sm:p-2 transition-colors ${
                isScrolled ? 'text-black' : 'text-white'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden">
          <div className="fixed top-0 right-0 w-[84%] max-w-[340px] h-full bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between gap-2 pb-5 border-b border-gray-200">
                <div className="flex items-center gap-2 min-w-0">
                  <img
                    src="https://res.cloudinary.com/k6gktjkm/image/upload/e_trim/v1795091695/Logotipo_Alice_Keiko_com_mapa_de_O%CA%BBahu.png"
                    alt="Alice Keiko Organizing & Cleaning Services LLC"
                    className="h-11 w-auto shrink-0 object-contain"
                  />
                  <div className="flex flex-col justify-center min-w-0 leading-none">
                    <span className="font-caps text-[7.5px] font-semibold tracking-[0.7px] uppercase leading-[1.22] text-[#0A0A0A] whitespace-nowrap">
                      ORGANIZING &amp; CLEANING
                      <span className="block">SERVICES LLC</span>
                    </span>
                    <span className="block w-full h-[1px] my-[3px] bg-[#0D9488]/60" aria-hidden="true" />
                    <span className="font-caps text-[6.5px] font-semibold tracking-[1.5px] uppercase leading-none text-[#0F766E] whitespace-nowrap">
                      HAWAIIAN ISLANDS
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-gray-500 hover:text-black shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-5 flex flex-col space-y-3">
                {navLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-display text-lg text-gray-800 hover:text-[#0D9488] font-medium py-1 transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuoteModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-[8px] bg-[#0D9488] hover:bg-[#0F766E] text-white font-caps text-xs tracking-[1.5px] uppercase font-bold shadow-sm cursor-pointer"
              >
                <span>CONTACT TODAY</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center text-xs text-gray-500 pt-2 font-sans">
                Mon – Sun: 7:30 AM – 5:30 PM HST
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
