export interface ServiceItem {
  id: string;
  category: 'residential' | 'vacation' | 'specialized';
  title: string;
  subtitle: string;
  badge: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  imageAlt: string;
  checklist: string[];
  recommendedFor: string;
  frequencyOptions: string[];
}

export interface BeforeAfterItem {
  id: string;
  title: string;
  category: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  highlights: string[];
}

export interface TestimonialItem {
  id: string;
  title: string;
  quote: string;
  author: string;
  role: string;
  location: string;
  serviceUsed: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}
