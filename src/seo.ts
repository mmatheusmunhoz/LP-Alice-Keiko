import { COMPANY_INFO, SERVICES_LIST, FAQ_LIST } from './data';

export type PageKey = 'home' | 'residential' | 'vacation' | 'specialized';

export const PRODUCTION_ORIGIN = 'https://alicekeikocleaning.com';
export const OG_IMAGE_URL = `${PRODUCTION_ORIGIN}/assets/photos/IMG_6591.jpg`;
export const BUSINESS_ID = `${PRODUCTION_ORIGIN}/#business`;

// Add verified Instagram, Facebook, Yelp, or Google Business Profile URLs here when available.
export const SOCIAL_SAME_AS: string[] = [];

export const ROUTE_PATHS: Record<PageKey, string> = {
  home: '/',
  residential: '/residential',
  vacation: '/vacation-rental',
  specialized: '/specialized',
};

export const PRERENDER_ROUTES: string[] = [
  ROUTE_PATHS.home,
  ROUTE_PATHS.residential,
  ROUTE_PATHS.vacation,
  ROUTE_PATHS.specialized,
];

export interface PageSEO {
  page: PageKey;
  path: string;
  canonicalUrl: string;
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  serviceCategory: string;
  breadcrumbName: string;
}

export const PAGE_SEO_CONFIG: Record<PageKey, PageSEO> = {
  home: {
    page: 'home',
    path: '/',
    canonicalUrl: `${PRODUCTION_ORIGIN}/`,
    title: 'Alice Keiko Organizing & Cleaning Services LLC | Oahu Luxury & Vacation Care',
    description:
      'Premier high-end residential, professional organizing, and turnkey Airbnb/vacation rental cleaning across Oahu. Licensed, insured, owner-trained team with a 24-hour satisfaction guarantee.',
    ogTitle: 'Alice Keiko Organizing & Cleaning Services LLC | Oahu Luxury & Vacation Care',
    ogDescription:
      'Premier high-end residential, professional organizing, and turnkey Airbnb/vacation rental cleaning across Oahu. Licensed, insured, owner-trained team with a 24-hour satisfaction guarantee.',
    serviceCategory: 'Residential & Vacation Rental Cleaning',
    breadcrumbName: 'Home',
  },
  residential: {
    page: 'residential',
    path: '/residential',
    canonicalUrl: `${PRODUCTION_ORIGIN}/residential`,
    title: 'Residential Deep & Maintenance Cleaning Oahu | Alice Keiko LLC',
    description:
      'White-glove estate deep cleaning, recurring weekly maintenance, and move-in/out detailing across Oahu. Meticulous Japanese 5S care with a 24h guarantee.',
    ogTitle: 'Residential Deep & Maintenance Cleaning Oahu | Alice Keiko LLC',
    ogDescription:
      'White-glove estate deep cleaning, recurring weekly maintenance, and move-in/out detailing across Oahu. Meticulous Japanese 5S care with a 24h guarantee.',
    serviceCategory: 'Residential Cleaning Services',
    breadcrumbName: 'Residential & Deep Cleaning Care',
  },
  vacation: {
    page: 'vacation',
    path: '/vacation-rental',
    canonicalUrl: `${PRODUCTION_ORIGIN}/vacation-rental`,
    title: 'Oahu Vacation Rental & Airbnb Turnover Cleaning | Alice Keiko',
    description:
      'Same-day 5-star turnover cleaning, hotel-standard linen laundering, and damage reports for luxury North Shore, Honolulu, and Kailua Airbnb & VRBO properties.',
    ogTitle: 'Oahu Vacation Rental & Airbnb Turnover Cleaning | Alice Keiko',
    ogDescription:
      'Same-day 5-star turnover cleaning, hotel-standard linen laundering, and damage reports for luxury North Shore, Honolulu, and Kailua Airbnb & VRBO properties.',
    serviceCategory: 'Vacation Rental Turnover Services',
    breadcrumbName: 'Vacation Rental & Airbnb Luxe Turnover',
  },
  specialized: {
    page: 'specialized',
    path: '/specialized',
    canonicalUrl: `${PRODUCTION_ORIGIN}/specialized`,
    title: 'Home Organizing & Post-Construction Cleaning Oahu | Alice Keiko',
    description:
      'Personalized closet & pantry organization, final cleaning after construction and renovations, and appliance detailing on Oahu. Inspiring serenity and functional order.',
    ogTitle: 'Home Organizing & Post-Construction Cleaning Oahu | Alice Keiko',
    ogDescription:
      'Personalized closet & pantry organization, final cleaning after construction and renovations, and appliance detailing on Oahu. Inspiring serenity and functional order.',
    serviceCategory: 'Specialized Home Organizing & Post-Construction Cleaning',
    breadcrumbName: 'Professional Home Organizing & Post-Construction Cleaning',
  },
};

export function resolvePageFromLocation(pathname: string, hash: string = ''): PageKey {
  const normalizedPath = (pathname || '/').replace(/\/+$/, '').toLowerCase() || '/';

  if (normalizedPath === '/residential') return 'residential';
  if (normalizedPath === '/vacation-rental' || normalizedPath === '/vacation') return 'vacation';
  if (normalizedPath === '/specialized') return 'specialized';

  // Backwards compatibility for legacy hash URLs
  const cleanHash = (hash || '').replace(/^#/, '').toLowerCase();
  if (cleanHash === 'residential') return 'residential';
  if (cleanHash === 'vacation' || cleanHash === 'vacation-rental') return 'vacation';
  if (cleanHash === 'specialized') return 'specialized';

  return 'home';
}

const AREA_SERVED = [
  { '@type': 'Place', name: 'North Shore (from Mokulēʻia to Lāʻie), Oʻahu, Hawaii' },
  { '@type': 'Place', name: 'Honolulu, Hawaii' },
  { '@type': 'Place', name: 'Kailua, Hawaii' },
];

export function buildStructuredData(page: PageKey) {
  const seo = PAGE_SEO_CONFIG[page];

  const pageServices =
    page === 'home'
      ? SERVICES_LIST
      : SERVICES_LIST.filter((service) => service.category === page);

  const serviceNodes = pageServices.map((service) => ({
    '@type': 'Service',
    '@id': `${PRODUCTION_ORIGIN}${ROUTE_PATHS[service.category]}#${service.id}`,
    name: service.title,
    serviceType: service.subtitle,
    description: service.fullDescription,
    url: `${PRODUCTION_ORIGIN}${ROUTE_PATHS[service.category]}`,
    image: service.image,
    provider: { '@id': BUSINESS_ID },
    areaServed: AREA_SERVED,
  }));

  const localBusinessNode: Record<string, unknown> = {
    '@type': ['CleaningService', 'LocalBusiness'],
    '@id': BUSINESS_ID,
    name: 'Alice Keiko Organizing and Cleaning Services, LLC',
    alternateName: COMPANY_INFO.name,
    url: `${PRODUCTION_ORIGIN}/`,
    image: `${PRODUCTION_ORIGIN}/assets/logo.webp`,
    logo: `${PRODUCTION_ORIGIN}/assets/logo.webp`,
    telephone: '+1-808-218-2515',
    email: COMPANY_INFO.email,
    priceRange: '$$$',
    description: seo.description,
    areaServed: AREA_SERVED,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'North Shore, Oʻahu',
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
    sameAs: SOCIAL_SAME_AS,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: seo.serviceCategory,
      itemListElement: serviceNodes.map((node) => ({
        '@type': 'Offer',
        itemOffered: { '@id': node['@id'] },
      })),
    },
  };

  const graph: Record<string, unknown>[] = [localBusinessNode, ...serviceNodes];

  if (page === 'home') {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${PRODUCTION_ORIGIN}/#faq`,
      mainEntity: FAQ_LIST.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  } else {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${seo.canonicalUrl}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${PRODUCTION_ORIGIN}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: seo.breadcrumbName,
          item: seo.canonicalUrl,
        },
      ],
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
