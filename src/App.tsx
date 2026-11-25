/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
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
import {
  PageKey,
  PAGE_SEO_CONFIG,
  ROUTE_PATHS,
  OG_IMAGE_URL,
  resolvePageFromLocation,
  buildStructuredData,
} from './seo';

interface AppProps {
  initialPath?: string;
}

export default function App({ initialPath }: AppProps = {}) {
  const [currentPage, setCurrentPage] = useState<PageKey>(() => {
    if (initialPath) {
      return resolvePageFromLocation(initialPath);
    }
    if (typeof window !== 'undefined') {
      return resolvePageFromLocation(window.location.pathname, window.location.hash);
    }
    return 'home';
  });
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState<string>('Deep Cleaning');

  // Keep document metadata, canonical, OpenGraph, and JSON-LD in sync during client-side navigation
  useEffect(() => {
    const seo = PAGE_SEO_CONFIG[currentPage] || PAGE_SEO_CONFIG.home;

    document.title = seo.title;

    const setMetaTag = (
      selector: string,
      attribute: string,
      value: string,
      createTag: () => HTMLElement
    ) => {
      let tag = document.querySelector(selector);
      if (!tag) {
        tag = createTag();
        document.head.appendChild(tag);
      }
      tag.setAttribute(attribute, value);
    };

    setMetaTag('meta[name="description"]', 'content', seo.description, () => {
      const el = document.createElement('meta');
      el.setAttribute('name', 'description');
      return el;
    });

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

    setMetaTag('meta[property="og:image"]', 'content', OG_IMAGE_URL, () => {
      const el = document.createElement('meta');
      el.setAttribute('property', 'og:image');
      return el;
    });

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

    setMetaTag('meta[name="twitter:image"]', 'content', OG_IMAGE_URL, () => {
      const el = document.createElement('meta');
      el.setAttribute('name', 'twitter:image');
      return el;
    });

    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', seo.canonicalUrl);

    setMetaTag('meta[property="og:url"]', 'content', seo.canonicalUrl, () => {
      const el = document.createElement('meta');
      el.setAttribute('property', 'og:url');
      return el;
    });

    let schemaScript = document.getElementById('schema-structured-data');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.setAttribute('type', 'application/ld+json');
      schemaScript.setAttribute('id', 'schema-structured-data');
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify(buildStructuredData(currentPage));
  }, [currentPage]);

  // Sync with real URL paths (History API popstate) and legacy hashes
  useEffect(() => {
    const syncFromLocation = () => {
      const resolved = resolvePageFromLocation(window.location.pathname, window.location.hash);
      setCurrentPage(resolved);

      // Normalize legacy hash routes (#residential, #vacation, #specialized) to real URLs
      const cleanHash = window.location.hash.replace(/^#/, '').toLowerCase();
      if (
        resolved !== 'home' &&
        (cleanHash === 'residential' || cleanHash === 'vacation' || cleanHash === 'vacation-rental' || cleanHash === 'specialized')
      ) {
        try {
          window.history.replaceState({}, '', ROUTE_PATHS[resolved]);
        } catch {
          // Ignore in restricted preview origins
        }
      }
    };

    syncFromLocation();
    window.addEventListener('popstate', syncFromLocation);
    window.addEventListener('hashchange', syncFromLocation);
    return () => {
      window.removeEventListener('popstate', syncFromLocation);
      window.removeEventListener('hashchange', syncFromLocation);
    };
  }, []);

  const navigateToPage = useCallback((page: PageKey) => {
    const targetPath = ROUTE_PATHS[page];
    setCurrentPage(page);
    try {
      if (window.location.pathname !== targetPath || window.location.hash) {
        window.history.pushState({}, '', targetPath);
      }
    } catch {
      // Ignore history errors in restricted origins
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const navigateToHomeSection = useCallback(
    (sectionId?: string) => {
      if (!sectionId) {
        navigateToPage('home');
        return;
      }

      if (currentPage !== 'home') {
        setCurrentPage('home');
        try {
          window.history.pushState({}, '', `/#${sectionId}`);
        } catch {
          // Ignore
        }
        window.setTimeout(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        try {
          window.history.replaceState({}, '', `/#${sectionId}`);
        } catch {
          // Ignore
        }
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [currentPage, navigateToPage]
  );

  // Trigger fade-in-up animation on scroll for each section safely
  useIntersectionObserver('.fade-in-up-observe');

  const handleScrollToContact = useCallback(
    (serviceTitle?: string) => {
      if (serviceTitle) {
        setSelectedServiceForQuote(serviceTitle);
      }
      navigateToHomeSection('contact');
    },
    [navigateToHomeSection]
  );

  return (
    <div className="min-h-screen bg-white text-[#71717A] font-sans selection:bg-[#0D9488] selection:text-white flex flex-col">
      {/* Sticky Top Navigation */}
      <Navbar
        onOpenQuoteModal={handleScrollToContact}
        onNavigateHomeSection={navigateToHomeSection}
      />

      {/* Main View Area: Real URL routes (/, /residential, /vacation-rental, /specialized) */}
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

            {/* 6. Priority Block 3: About Alice Keiko & Her Dedicated Team */}
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
      <Footer
        onScrollToContact={() => handleScrollToContact()}
        onNavigateHomeSection={navigateToHomeSection}
      />

      {/* Back to top helper */}
      <BackToTop />
    </div>
  );
}
