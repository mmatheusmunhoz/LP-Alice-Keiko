import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface CareersModalProps {
  isOpen: boolean;
  onClose: () => void;
  returnFocusRef?: React.RefObject<HTMLElement | null>;
}

const JOTFORM_IFRAME_ID = 'JotFormIFrame-263263661194662';
const JOTFORM_URL = 'https://form.jotform.com/263263661194662';
const JOTFORM_SCRIPT_SRC = 'https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js';

declare global {
  interface Window {
    jotformEmbedHandler?: (selector: string, baseUrl: string) => void;
  }
}

export const CareersModal: React.FC<CareersModalProps> = ({
  isOpen,
  onClose,
  returnFocusRef,
}) => {
  const [hasActivated, setHasActivated] = useState(false);
  const [isFormLoaded, setIsFormLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [iframeHeight, setIframeHeight] = useState<number>(620);

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const hasInjectedScriptRef = useRef(false);
  const wasOpenRef = useRef(false);

  // Activate lazy mount on very first open and manage 200ms fade visibility
  useEffect(() => {
    if (isOpen) {
      setHasActivated(true);
      const raf = window.requestAnimationFrame(() => {
        setIsVisible(true);
      });
      return () => window.cancelAnimationFrame(raf);
    }

    setIsVisible(false);
  }, [isOpen]);

  // Inject Jotform embed handler script ONLY on first open & sync Jotform resize messages
  useEffect(() => {
    if (!hasActivated) return;

    const initEmbedHandler = () => {
      try {
        if (typeof window.jotformEmbedHandler === 'function') {
          window.jotformEmbedHandler(
            `iframe[id='${JOTFORM_IFRAME_ID}']`,
            'https://form.jotform.com/'
          );
        }
      } catch {
        // Ignore handler initialization errors so the iframe continues working cleanly
      }
    };

    if (!hasInjectedScriptRef.current) {
      hasInjectedScriptRef.current = true;

      const existingScript = document.querySelector<HTMLScriptElement>(
        `script[src="${JOTFORM_SCRIPT_SRC}"]`
      );

      if (existingScript) {
        if (typeof window.jotformEmbedHandler === 'function') {
          initEmbedHandler();
        } else {
          existingScript.addEventListener('load', initEmbedHandler, { once: true });
        }
      } else {
        const script = document.createElement('script');
        script.src = JOTFORM_SCRIPT_SRC;
        script.async = true;
        script.onload = initEmbedHandler;
        document.body.appendChild(script);
      }
    }

    // Listen to Jotform postMessage height updates & mark loaded as soon as Jotform communicates
    const handleJotformMessage = (event: MessageEvent) => {
      if (!event.origin || !event.origin.includes('jotform.com')) return;

      if (typeof event.data === 'string') {
        const args = event.data.split(':');
        if (args[0] === 'setHeight') {
          const parsedHeight = parseInt(args[1], 10);
          if (!Number.isNaN(parsedHeight) && parsedHeight >= 300) {
            setIframeHeight(parsedHeight);
          }
          setIsFormLoaded(true);
        }
      }
    };

    window.addEventListener('message', handleJotformMessage);

    // Safety fallback so "Loading form…" never blocks a rendered form if load event is delayed
    const fallbackTimer = window.setTimeout(() => {
      setIsFormLoaded(true);
    }, 5000);

    return () => {
      window.removeEventListener('message', handleJotformMessage);
      window.clearTimeout(fallbackTimer);
    };
  }, [hasActivated]);

  // Body scroll lock, Escape key, focus management & Tab focus trap
  useEffect(() => {
    if (!isOpen) {
      if (wasOpenRef.current) {
        wasOpenRef.current = false;
        returnFocusRef?.current?.focus();
      }
      return;
    }

    wasOpenRef.current = true;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 20);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => el.offsetParent !== null);

        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey) {
          if (
            document.activeElement === first ||
            !dialogRef.current.contains(document.activeElement)
          ) {
            event.preventDefault();
            last.focus();
          }
        } else {
          if (
            document.activeElement === last ||
            !dialogRef.current.contains(document.activeElement)
          ) {
            event.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, returnFocusRef]);

  // Zero DOM or network footprint until the user opens the modal for the first time
  if (!hasActivated || typeof document === 'undefined') return null;

  return createPortal(
    <div
      aria-hidden={!isOpen}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className={`fixed inset-0 z-[100] flex items-center justify-center p-0 min-[641px]:p-6 bg-[rgba(11,11,11,0.72)] transition-[opacity,visibility] duration-200 motion-reduce:transition-none ${
        isOpen && isVisible
          ? 'opacity-100 visible pointer-events-auto'
          : 'opacity-0 invisible pointer-events-none'
      }`}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="careers-modal-title"
        className="relative w-full h-full min-[641px]:h-auto min-[641px]:max-w-[640px] min-[641px]:max-h-[90vh] bg-white text-[#3A3F3E] border-0 min-[641px]:border min-[641px]:border-[#E4E8E7] rounded-none overflow-y-auto flex flex-col"
      >
        {/* Sticky Top Bar (keeps × button fixed at top on mobile <= 640px) */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 min-[641px]:px-9 pt-5 min-[641px]:pt-7 pb-3 bg-white/95 backdrop-blur-xs border-b border-[#E4E8E7]/70 min-[641px]:border-b-0">
          <span className="font-caps text-[13px] font-medium uppercase tracking-[0.24em] text-[#1E7F7C]">
            CAREERS
          </span>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close Careers dialog"
            className="w-9 h-9 flex items-center justify-center text-[#161616] hover:text-[#1E7F7C] hover:bg-[#F4F8F7] border border-transparent hover:border-[#E4E8E7] rounded-none transition-colors cursor-pointer focus:outline-2 focus:outline-offset-2 focus:outline-[#1E7F7C]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-6 min-[641px]:px-9 pt-4 min-[641px]:pt-1 pb-8 flex-1">
          <h2
            id="careers-modal-title"
            className="font-display text-[32px] min-[641px]:text-[40px] font-normal leading-[1.15] tracking-[-0.01em] text-[#161616] mb-3"
          >
            Join our team
          </h2>

          <p className="font-sans text-[16px] min-[641px]:text-[17px] leading-[1.65] text-[#3A3F3E] mb-6">
            We are looking for honest, punctual and detail-oriented people to grow with us on Oʻahu. Send your details and résumé (PDF, up to 5 MB) and we will get in touch.
          </p>

          <div className="relative border-t border-[#E4E8E7] pt-4 min-h-[620px]">
            {!isFormLoaded && (
              <div
                role="status"
                aria-live="polite"
                className="absolute inset-x-0 top-4 bottom-0 z-10 flex items-start justify-center pt-10 bg-white font-sans text-sm text-[#6B7271] pointer-events-none"
              >
                Loading form…
              </div>
            )}

            <iframe
              ref={iframeRef}
              id={JOTFORM_IFRAME_ID}
              title="Careers - Alice Keiko"
              {...({ allowtransparency: 'true' } as Record<string, string>)}
              allow="geolocation; microphone; camera; fullscreen"
              data-src={JOTFORM_URL}
              src={JOTFORM_URL}
              scrolling="no"
              onLoad={() => setIsFormLoaded(true)}
              style={{
                width: '100%',
                minWidth: '100%',
                border: 0,
                height: `${iframeHeight}px`,
                minHeight: '620px',
                display: 'block',
              }}
            />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
