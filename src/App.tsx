/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HighlightBand } from './components/HighlightBand';
import { ServicesSection } from './components/ServicesSection';
import { JapanesePhilosophySection } from './components/JapanesePhilosophySection';
import { DifferentialsGuarantee } from './components/DifferentialsGuarantee';
import { AboutSection } from './components/AboutSection';
import { BeforeAfterSection } from './components/BeforeAfterSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { ResidentialPage } from './pages/ResidentialPage';
import { VacationRentalPage } from './pages/VacationRentalPage';
import { SpecializedPage } from './pages/SpecializedPage';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';

// Distinct SEO Metadata configuration for Google search visibility
interface PageSEO {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  canonicalPath: string;
  serviceCategory: string;
}

const PAGE_SEO_CONFIG: Record<'home' | 'residential' | 'vacation' | 'specialized', PageSEO> = {
  home: {
    title: 'Alice Keiko Organizing & Cleaning Services LLC | Oahu Luxury & Vacation Care',
    description:
      'Premier high-end residential, professional organizing, and turnkey Airbnb/vacation rental cleaning across Oahu. Licensed, insured, owner-trained team with a 24-hour satisfaction guarantee.',
    ogTitle: 'Alice Keiko Organizing & Cleaning Services LLC | Oahu Luxury & Vacation Care',
    ogDescription:
      'Premier high-end residential, professional organizing, and turnkey Airbnb/vacation rental cleaning across Oahu. Licensed, insured, owner-trained team with a 24-hour satisfaction guarantee.',
    canonicalPath: '',
    serviceCategory: 'Residential & Vacation Rental Cleaning',
  },
  residential: {
    title: 'Residential Deep & Maintenance Cleaning Oahu | Alice Keiko LLC',
    description:
      'White-glove estate deep cleaning, recurring weekly maintenance, and move-in/out detailing across Oahu. Meticulous Japanese 5S care with a 24h guarantee.',
    ogTitle: 'Residential Deep & Maintenance Cleaning Oahu | Alice Keiko LLC',
    ogDescription:
      'White-glove estate deep cleaning, recurring weekly maintenance, and move-in/out detailing across Oahu. Meticulous Japanese 5S care with a 24h guarantee.',
    canonicalPath: '#residential',
    serviceCategory: 'Residential Cleaning Services',
  },
  vacation: {
    title: 'Oahu Vacation Rental & Airbnb Turnover Cleaning | Alice Keiko',
    description:
      'Same-day 5-star turnover cleaning, hotel-standard linen laundering, and damage reports for luxury North Shore and Waikiki Airbnb & VRBO properties.',
    ogTitle: 'Oahu Vacation Rental & Airbnb Turnover Cleaning | Alice Keiko',
    ogDescription:
      'Same-day 5-star turnover cleaning, hotel-standard linen laundering, and damage reports for luxury North Shore and Waikiki Airbnb & VRBO properties.',
    canonicalPath: '#vacation',
    serviceCategory: 'Vacation Rental Turnover Services',
  },
  specialized: {
    title: 'Home Organizing & Post-Construction Cleaning Oahu | Alice Keiko',
    description:
      'Personalized closet & pantry organization, heavy renovation dust extraction, and appliance detailing on Oahu. Inspiring serenity and functional order.',
    ogTitle: 'Home Organizing & Post-Construction Cleaning Oahu | Alice Keiko',
    ogDescription:
      'Personalized closet & pantry organization, heavy renovation dust extraction, and appliance detailing on Oahu. Inspiring serenity and functional order.',
    canonicalPath: '#specialized',
    serviceCategory: 'Specialized Home Organizing & Post-Construction Cleaning',
  },
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'residential' | 'vacation' | 'specialized'>('home');
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState<string>('Deep Cleaning');

  // Dynamically update meta titles, descriptions, and Schema.org structured data on page switch
  useEffect(() => {
    const seo = PAGE_SEO_CONFIG[currentPage] || PAGE_SEO_CONFIG.home;

    // 1. Update Document Title
    document.title = seo.title;

    // 2. Helper to update or inject meta tags
    const setMetaTag = (selector: string, attribute: string, value: string, createTag: () => HTMLElement) => {
      let tag = document.querySelector(selector);
      if (!tag) {
        tag = createTag();
        document.head.appendChild(tag);
      }
      tag.setAttribute(attribute, value);
    };

    // Standard Meta Description
    setMetaTag('meta[name="description"]', 'content', seo.description, () => {
      const el = document.createElement('meta');
      el.setAttribute('name', 'description');
      return el;
    });

    const ogImageUrl = 'https://alicekeikocleaning.com/assets/photos/IMG_6591.jpg';

    // OpenGraph Type, Site Name, Locale, Title, Description & Image
    setMetaTag('meta[property="og:type"]', 'content', 'website', () => {
      const el = document.createElement('meta');
      el.setAttribute('property', 'og:type');
      return el;
    });

    setMetaTag('meta[property="og:site_name"]', 'content', 'Alice Keiko Organizing & Cleaning Services LLC', () => {
      const el = document.createElement('meta');
      el.setAttribute('property', 'og:site_name');
      return el;
    });

    setMetaTag('meta[property="og:locale"]', 'content', 'en_US', () => {
      const el = document.createElement('meta');
      el.setAttribute('property', 'og:locale');
      return el;
    });

    setMetaTag('meta[property="og:title"]', 'content', seo.ogTitle, () => {
      const el = document.createElement('meta');
      el.setAttribute('property', 'og:title');
      return el;
    });

    setMetaTag('meta[property="og:description"]', 'content', seo.ogDescription, () => {
      const el = document.createElement('meta');
      el.setAttribute('property', 'og:description');
      return el;
    });

    setMetaTag('meta[property="og:image"]', 'content', ogImageUrl, () => {
      const el = document.createElement('meta');
      el.setAttribute('property', 'og:image');
      return el;
    });

    // Twitter Card Metadata
    setMetaTag('meta[name="twitter:card"]', 'content', 'summary_large_image', () => {
      const el = document.createElement('meta');
      el.setAttribute('name', 'twitter:card');
      return el;
    });

    setMetaTag('meta[name="twitter:title"]', 'content', seo.title, () => {
      const el = document.createElement('meta');
      el.setAttribute('name', 'twitter:title');
      return el;
    });

    setMetaTag('meta[name="twitter:description"]', 'content', seo.description, () => {
      const el = document.createElement('meta');
      el.setAttribute('name', 'twitter:description');
      return el;
    });

    setMetaTag('meta[name="twitter:image"]', 'content', ogImageUrl, () => {
      const el = document.createElement('meta');
      el.setAttribute('name', 'twitter:image');
      return el;
    });

    // Canonical Link URL (preserves official domain cleanly without hash pollution)
    const productionOrigin = 'https://alicekeikocleaning.com';
    const isCustomDomain =
      typeof window !== 'undefined' && window.location.hostname.includes('alicekeikocleaning.com');
    const canonicalOrigin = isCustomDomain ? window.location.origin : productionOrigin;
    const canonicalPathname = isCustomDomain ? window.location.pathname || '/' : '/';
    const canonicalUrl = `${canonicalOrigin}${canonicalPathname}`;

    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', canonicalUrl);

    setMetaTag('meta[property="og:url"]', 'content', canonicalUrl, () => {
      const el = document.createElement('meta');
      el.setAttribute('property', 'og:url');
      return el;
    });

    // 3. Schema.org JSON-LD Structured Data for Google Rich Snippets
    let schemaScript = document.getElementById('schema-structured-data');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.setAttribute('type', 'application/ld+json');
      schemaScript.setAttribute('id', 'schema-structured-data');
      document.head.appendChild(schemaScript);
    }

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'CleaningService',
      name: 'Alice Keiko Organizing and Cleaning Services, LLC',
      alternateName: 'Alice Keiko Cleaning Oahu',
      image: 'https://alicekeikocleaning.com/assets/logo.webp',
      telephone: '+1-808-218-2515',
      email: 'Keikomcd@gmail.com',
      url: canonicalUrl,
      priceRange: '$$$',
      areaServed: [
        { '@type': 'AdministrativeArea', name: 'Oahu' },
        { '@type': 'Place', name: 'North Shore, Hawaii' },
        { '@type': 'Place', name: 'The Ritz-Carlton O‘ahu, Turtle Bay, 57-091 Kamehameha Highway, Kahuku, HI 96731, USA' },
        { '@type': 'Place', name: 'Honolulu, Hawaii' },
        { '@type': 'Place', name: 'Kahala, Hawaii' },
        { '@type': 'Place', name: 'Lanikai, Hawaii' },
        { '@type': 'Place', name: 'Waikiki, Hawaii' },
      ],
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'HI',
        addressCountry: 'US',
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '07:30',
        closes: '17:30',
      },
      serviceType: seo.serviceCategory,
      description: seo.description,
    };

    schemaScript.textContent = JSON.stringify(structuredData);
  }, [currentPage]);

  // Sync with browser URL hash
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'residential' || hash === 'vacation' || hash === 'specialized') {
        setCurrentPage(hash as any);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (
        hash === '' ||
        hash === 'home' ||
        hash === 'services' ||
        hash === 'checklists' ||
        hash === 'philosophy' ||
        hash === 'guarantee' ||
        hash === 'about' ||
        hash === 'showcase' ||
        hash === 'testimonials' ||
        hash === 'faq' ||
        hash === 'contact'
      ) {
        setCurrentPage('home');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateToPage = (page: 'home' | 'residential' | 'vacation' | 'specialized') => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Trigger fade-in-up animation on scroll for each section safely
  useIntersectionObserver('.fade-in-up-observe');

  const handleScrollToContact = (serviceTitle?: string) => {
    if (serviceTitle) {
      setSelectedServiceForQuote(serviceTitle);
    }

    if (currentPage !== 'home') {
      navigateToPage('home');
      setTimeout(() => {
        const contactElem = document.getElementById('contact');
        if (contactElem) {
          contactElem.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const contactElem = document.getElementById('contact');
      if (contactElem) {
        contactElem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#71717A] font-sans selection:bg-[#0D9488] selection:text-white flex flex-col">
      {/* Sticky Top Navigation */}
      <Navbar onOpenQuoteModal={handleScrollToContact} />

      {/* Main View Area: Conditionally load respective dedicated pages */}
      <main className="flex-1">
        {currentPage === 'residential' && (
          <ResidentialPage
            onBackToHome={() => navigateToPage('home')}
            onOpenContact={handleScrollToContact}
          />
        )}

        {currentPage === 'vacation' && (
          <VacationRentalPage
            onBackToHome={() => navigateToPage('home')}
            onOpenContact={handleScrollToContact}
          />
        )}

        {currentPage === 'specialized' && (
          <SpecializedPage
            onBackToHome={() => navigateToPage('home')}
            onOpenContact={handleScrollToContact}
          />
        )}

        {currentPage === 'home' && (
          <>
            {/* 1. Hero with client motto & direct SMS CTA */}
            <Hero
              onOpenQuoteModal={handleScrollToContact}
              onScrollToContact={() => handleScrollToContact()}
            />

            {/* 2. Floating Highlight Band with credentials */}
            <HighlightBand />

            {/* 3. Priority Block 1: 9 Services with Detailed Inclusion Checklists & Category Page Links */}
            <ServicesSection
              onSelectServiceForQuote={handleScrollToContact}
              onNavigateToPage={navigateToPage}
            />

            {/* 4. Special Feature: Inspired by Japanese Philosophy (5S Method) */}
            <JapanesePhilosophySection />

            {/* 5. Priority Block 2: Differentials & 24-Hour Quality Guarantee */}
            <DifferentialsGuarantee onScrollToContact={() => handleScrollToContact()} />

            {/* 6. Priority Block 3: About Alice Keiko & the 5-Person Specialist Team */}
            <AboutSection onScrollToContact={() => handleScrollToContact()} />

            {/* 7. Priority Block 5: Interactive Before & After Showcase */}
            <BeforeAfterSection />

            {/* 8. Priority Block 4: Word-of-Mouth Client Acclaim & Reviews */}
            <TestimonialsSection />

            {/* 9. Frequently Asked Questions inspired by malama reference */}
            <FAQSection />

            {/* 10. Contact & In-Person Assessment Request with 1-click SMS */}
            <ContactSection initialService={selectedServiceForQuote} />
          </>
        )}
      </main>

      {/* Official Footer with Licensed & Insured notice & Privacy policy modal */}
      <Footer onScrollToContact={() => handleScrollToContact()} />

      {/* Back to top helper */}
      <BackToTop />
    </div>
  );
}
