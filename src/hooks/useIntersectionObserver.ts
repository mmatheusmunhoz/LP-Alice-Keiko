import { useEffect } from 'react';

/**
 * Resilient hook to attach an IntersectionObserver that animates elements as they scroll into view.
 * Uses progressive enhancement so content is NEVER hidden if the observer has any iframe or timing delay.
 */
export function useIntersectionObserver(selector: string = '.fade-in-up-observe') {
  useEffect(() => {
    // If IntersectionObserver is not available, exit early (content is already opacity: 1 in CSS)
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));
    if (elements.length === 0) return;

    // Enable JS observer enhancements
    document.documentElement.classList.add('js-observer-active');

    const viewportHeight = window.innerHeight || 800;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('is-waiting');
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.01, // trigger immediately upon 1% entry
        rootMargin: '100px 0px 50px 0px', // generous positive margin so it triggers BEFORE hitting bottom edge
      }
    );

    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      // If already visible in the viewport or near the top fold, reveal immediately
      if (rect.top <= viewportHeight + 120) {
        el.classList.remove('is-waiting');
        el.classList.add('is-revealed');
      } else {
        // Only elements truly below the fold start waiting
        el.classList.add('is-waiting');
        observer.observe(el);
      }
    });

    // Safety fallback: ensure nothing stays invisible even if scrolling is blocked or in an iframe
    const safetyTimer = setTimeout(() => {
      elements.forEach((el) => {
        el.classList.remove('is-waiting');
        el.classList.add('is-revealed');
      });
    }, 1000);

    return () => {
      clearTimeout(safetyTimer);
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [selector]);
}
