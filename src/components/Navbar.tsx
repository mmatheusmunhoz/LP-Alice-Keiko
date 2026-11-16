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
    { label: 'About Alice', href: '#about' },
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
            ? 'bg-white/95 backdrop-blur-md text-[#0A0A0A] shadow-sm py-3 !top-0'
            : 'bg-black/60 backdrop-blur-xs text-white py-4'
        }`}
      >
        <div className="max-w-[1160px] w-[92%] mx-auto flex items-center justify-between">
          {/* Brand Logo with Client Transparent PNG Logo */}
          <a href="#" className="flex items-center group py-0.5">
            <img
              src="https://res.cloudinary.com/k6gktjkm/image/upload/v1794336325/Logotipo_havaiano_de_organizac%CC%A7a%CC%83o_e_limpeza.png"
              alt="Alice Keiko Organizing & Cleaning Services LLC"
              className="h-11 sm:h-13 md:h-14 w-auto object-contain transition-transform duration-200 group-hover:scale-102"
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`font-display text-[14.5px] px-3 py-1.5 transition-colors font-medium whitespace-nowrap ${
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
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-caps tracking-[1.5px] uppercase font-bold transition-all ml-3 shadow-xs cursor-pointer whitespace-nowrap"
            >
              <span>CONTACT TODAY</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </nav>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => onOpenQuoteModal()}
              className="px-3 py-2 bg-[#0D9488] hover:bg-[#0F766E] text-white text-[11px] font-caps tracking-[1.2px] uppercase font-bold flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <span>CONTACT TODAY</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 transition-colors ${
                isScrolled ? 'text-black' : 'text-white'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden">
          <div className="fixed top-0 right-0 w-[84%] max-w-[340px] h-full bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-gray-200">
                <img
                  src="https://res.cloudinary.com/k6gktjkm/image/upload/v1794336325/Logotipo_havaiano_de_organizac%CC%A7a%CC%83o_e_limpeza.png"
                  alt="Alice Keiko Organizing & Cleaning Services LLC"
                  className="h-10 w-auto object-contain"
                />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-gray-500 hover:text-black"
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
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#0D9488] hover:bg-[#0F766E] text-white font-caps text-xs tracking-[1.5px] uppercase font-bold shadow-sm cursor-pointer"
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
