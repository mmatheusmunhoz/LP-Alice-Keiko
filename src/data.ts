import { ServiceItem, BeforeAfterItem, TestimonialItem, FAQItem } from './types';

export const COMPANY_INFO = {
  name: 'Alice Keiko Organizing & Cleaning Services LLC',
  shortName: 'Alice Keiko',
  tagline: 'A trusted company that delivers what it promises and delivers quality.',
  owner: 'Alice Keiko',
  role: 'Owner & Hands-on Quality Director',
  phone: '(808) 218-2515',
  phoneRaw: '18082182515',
  whatsapp: '+1 (415) 660-6374',
  whatsappRaw: '14156606374',
  email: 'Keikomcd@gmail.com',
  businessHours: 'Monday – Sunday, 7:30 AM – 5:30 PM HST',
  experience: '3 years and 4 months serving premier properties',
  teamSize: '5 dedicated specialists personally trained & supervised by Alice',
  location: 'North Shore of Oʻahu, Hawaiʻi (Serving all of Oʻahu & Neighbor Islands)',
  credentials: [
    'Fully Registered LLC & Licensed in Hawaiʻi',
    'Comprehensive General Liability Insurance & Bonded',
    '100% Background-Checked, Uniformed Team',
    'Premium Commercial & Certified Eco-Botanical Products',
    'Exclusive 24-Hour Quality Guarantee',
  ],
};

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'deep-cleaning',
    category: 'residential',
    title: 'Deep Cleaning',
    subtitle: 'TOP-TO-BOTTOM HOME RESET',
    badge: 'START HERE · NEW CLIENTS',
    shortDescription:
      'Resets baseboards, tracks, baths, and kitchens from top to bottom.',
    fullDescription:
      'We always recommend that new clients begin with our Deep Cleaning. It is a more detailed, labor-intensive service that resets baseboards, door tracks, ceiling fans, and restores bathrooms and kitchens so regular maintenance becomes effortless.',
    image: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794872071/001.jpg',
    imageAlt: 'Deep cleaning showcase by Alice Keiko Organizing & Cleaning Services LLC on Oahu',
    recommendedFor: 'First-time clients, seasonal home reset, post-event or spring revival',
    frequencyOptions: ['Initial Reset', 'Bi-Annual Deep Clean', 'Seasonal Refresh'],
    checklist: [
      'Window tracks, sills, and pocket sliding door tracks detailed',
      'All baseboards hand-wiped and spot-cleaned throughout home',
      'Ceiling fans, vents, and light fixtures dusted and wiped',
      'Exterior surfaces of cabinets, drawers, and wardrobe fronts cleaned',
      'Deep bathroom descaling, grout scrub & soap scum removal from glass enclosures',
      'Kitchen countertops, backsplash, stove top, and sink polished',
      'Bedrooms dusted, beds straightened, mirrors shined to crystal clarity',
      'Comprehensive vacuuming (including under accessible furniture) and damp mop',
      'Appliance interior detailing (Oven, Refrigerator, Freezer) available as add-ons',
    ],
  },
  {
    id: 'regular-maintenance',
    category: 'residential',
    title: 'Regular Maintenance Cleaning',
    subtitle: 'EFFORTLESS RECURRING UPKEEP',
    badge: 'WEEKLY · BI-WEEKLY',
    shortDescription:
      'Weekly or bi-weekly upkeep for spotless kitchens, baths, and floors.',
    fullDescription:
      'Designed for busy homeowners and families who want a pristine home without the stress. Our vetted, uniform-wearing team arrives on time, works methodically, and handles every room with care.',
    image: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794870153/5.jpg',
    imageAlt: 'Regular maintenance cleaning by Alice Keiko team on Oahu',
    recommendedFor: 'Busy executives, families, private residences desiring effortless luxury',
    frequencyOptions: ['Weekly', 'Bi-Weekly', 'Monthly'],
    checklist: [
      'Complete sanitization of all bathrooms (toilets, tubs, counters, faucets)',
      'Kitchen cleanup: exterior appliance wipe-down, counter sanitization, sink polish',
      'Dusting of all surfaces, picture frames, and open decor shelving',
      'Bed tidying, pillow fluffing, and sheet changes upon request',
      'Floors vacuumed and damp mopped with neutral-pH eco solutions',
      'Trash emptied from all rooms with fresh liners replaced',
      'Light tidying and visual alignment in living spaces',
      'Consistent two-person specialist team for privacy and familiarity',
    ],
  },
  {
    id: 'vacation-rental',
    category: 'vacation',
    title: 'Vacation Rental & Airbnb Turnover',
    subtitle: '10 AM – 3:30 PM GUEST READY',
    badge: 'SAME-DAY TURNOVER',
    shortDescription:
      'Same-day linen resets, staging, and photo checks between guests.',
    fullDescription:
      'We understand that on the island, Superhost ratings depend on impeccable cleanliness and speed. We manage the tight turnaround window between guest check-out and check-in with hotel-grade presentation.',
    image: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794870152/2.jpg',
    imageAlt: 'Turnkey vacation rental and Airbnb turnover by Alice Keiko team on Oahu',
    recommendedFor: 'Airbnb Superhosts, VRBO Premier hosts, property asset managers',
    frequencyOptions: ['Per Guest Turnover', 'Same-Day Fast Reset', 'Mid-Stay Refresh'],
    checklist: [
      'Prompt arrival following guest check-out (10:00 AM – 3:30 PM)',
      'Complete linen & towel wash, sanitization, and crisp bed hospital corners',
      'Bathrooms disinfected and restocked with guest amenities and toiletries',
      'Kitchen wiped, dishes verified clean, refrigerator emptied and sanitized',
      'Floors vacuumed, patio/lanai furniture arranged, ocean mist wiped',
      'Photographic departure inspection sent to owner reporting any wear or damage',
      'Lock check and verified keyless lockbox reset for next guests',
    ],
  },
  {
    id: 'home-organizing',
    category: 'specialized',
    title: 'Professional Home Organizing',
    subtitle: 'CLOSETS, PANTRIES & SYSTEMS',
    badge: 'LED BY ALICE KEIKO',
    shortDescription:
      'Turns cluttered closets and pantries into easy, labeled daily systems.',
    fullDescription:
      'Led by Alice Keiko personally, our professional organizing service designs practical systems tailored to your daily routine. We don’t just tidy—we create sustainable order that saves you time and brings mental calm.',
    image: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794870659/0101.jpg',
    imageAlt: 'Professional home organizing by Alice Keiko team on Oahu',
    recommendedFor: 'Homeowners wanting functional closets, pantries, toy rooms, and storage spaces',
    frequencyOptions: ['By Room Project', 'Whole-Home Organization', 'Seasonal Maintenance'],
    checklist: [
      'Walk-in closets & wardrobes: categorizing by style, season, and palette',
      'Kitchen pantries: grouping staples, decanting, and intuitive labeling systems',
      'Kitchen cabinets & drawers: optimizing reach for cookware and spices',
      'Linen closets: folding uniformity and towel tiering',
      'Home offices, craft zones, and children’s play areas decluttered',
      'Custom container and divider recommendations to match your home aesthetic',
    ],
  },
  {
    id: 'move-in-out',
    category: 'residential',
    title: 'Move-In / Move-Out Cleaning',
    subtitle: 'EMPTY-HOME DEEP DETAILING',
    badge: 'DEPOSIT & CLOSING READY',
    shortDescription:
      'Deep empty-home detailing inside all cabinets, closets, and baths.',
    fullDescription:
      'Moving is stressful enough. We take full responsibility for detailing empty properties—inside drawers, pantry shelves, closet tracks, and appliances—ensuring a turnkey experience.',
    image: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794870668/0505.jpg',
    imageAlt: 'Turnkey move-in and move-out cleaning by Alice Keiko team on Oahu',
    recommendedFor: 'Homebuyers, sellers, tenants, property managers, and real estate brokers',
    frequencyOptions: ['Pre-Move In', 'Post-Move Out', 'Real Estate Staging'],
    checklist: [
      'Inside and outside of all empty cabinets, pantry shelves, and drawers wiped',
      'Detailed sanitization of all bathroom tile, glass, fixtures, and mirrors',
      'Baseboards, crown molding, door frames, and light switch plates wiped clean',
      'Kitchen range top, hood, counters, and exterior of all built-ins sanitized',
      'Interior window glass and deep vacuuming of window sill tracks',
      'Full floor vacuuming and deep washing of all hardwood/tile surfaces',
      'Walkthrough inspection ready for security deposit release or open house',
    ],
  },
  {
    id: 'post-construction',
    category: 'specialized',
    title: 'Post-Construction Cleaning',
    subtitle: 'RENOVATION TO MOVE-IN READY',
    badge: 'HEPA FINE-DUST REMOVAL',
    shortDescription:
      'Extracts fine drywall dust, paint specks, and residue after builds.',
    fullDescription:
      'Transforming a construction zone into a livable, breathable luxury home. We safely remove stubborn fine dust from vents, high ledges, window sills, and cabinetry using specialized HEPA gear.',
    image: 'https://res.cloudinary.com/k6gktjkm/image/upload/f_auto,q_auto/v1794872489/IMG_8551.heic',
    imageAlt: 'Newly remodeled architectural estate post-construction clean by Alice Keiko team on Oahu',
    recommendedFor: 'Contractors, interior designers, architects, and remodeling homeowners',
    frequencyOptions: ['Rough Clean', 'Final Detailing', 'Touch-Up Handover'],
    checklist: [
      'Multi-stage HEPA vacuuming to trap ultra-fine drywall and sawdust particles',
      'Removal of protective films, stickers, tape residues, and paint specks',
      'Deep washing of window glazing, frames, and deep tracks',
      'Interior and exterior wipe-down of all newly installed millwork and cabinets',
      'Sanitization of light fixtures, electrical faceplates, and HVAC registers',
      'Floor scrubbing to reveal pristine tile, marble, or hardwood finish',
    ],
  },
  {
    id: 'refresh-cleaning',
    category: 'vacation',
    title: 'Mid-Stay Refresh Cleaning',
    subtitle: 'QUICK HOSPITALITY RESET',
    badge: 'EXTENDED GUEST STAYS',
    shortDescription:
      'Fresh towels, bed resets, bath touch-ups, and trash mid-vacation.',
    fullDescription:
      'Designed for vacation rental hosts with guests staying a week or more. We replenish towels, make beds, freshen bathrooms, and clear out trash without disturbing guest belongings.',
    image: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794858943/WhatsApp_Image_2026-11-11_at_13.27.47.jpg',
    imageAlt: 'Mid-stay refresh cleaning by Alice Keiko team on Oahu',
    recommendedFor: 'Extended guest stays (7+ days), luxury villa rentals, quick touch-ups',
    frequencyOptions: ['Mid-Week Refresh', 'Weekly Guest Reset', 'On-Demand'],
    checklist: [
      'Fresh towel change and hotel bed reset',
      'Bathroom vanity, mirror, and toilet touch-up sanitization',
      'Kitchen surfaces wiped down and dish clearing',
      'All trash and recycling bins emptied and relined',
      'Light patio/lanai sweep and general straightening',
    ],
  },
  {
    id: 'one-time-clean',
    category: 'residential',
    title: 'One-Time Occasional Cleaning',
    subtitle: 'ON-DEMAND FULL REFRESH',
    badge: 'NO CONTRACT NEEDED',
    shortDescription:
      'Single-visit home refresh before guests or events—no contract.',
    fullDescription:
      'No recurring contract required. We conduct our standard in-person walkthrough or remote assessment and deliver our full quality standard for your one-off event or seasonal need.',
    image: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794870151/7.jpg',
    imageAlt: 'One-time occasional cleaning by Alice Keiko team on Oahu',
    recommendedFor: 'Holiday prep, dinner parties, out-of-town guests, seasonal revival',
    frequencyOptions: ['Single Appointment', 'Special Event Prep', 'Post-Party Cleanup'],
    checklist: [
      'Tailored scope agreed upon during initial assessment',
      'High-touch kitchen and bathroom detailing',
      'Surface dusting, vacuuming, and mopping across all main living areas',
      'Trash removal and fresh aesthetic staging',
    ],
  },
  {
    id: 'appliance-cleaning',
    category: 'specialized',
    title: 'Appliance Interior Detailing',
    subtitle: 'FOOD-SAFE INTERIOR RESTORE',
    badge: 'OVEN · FRIDGE · FREEZER',
    shortDescription:
      'Food-safe deep degreasing inside ovens, refrigerators, and freezers.',
    fullDescription:
      'These time-consuming tasks are available as add-ons to any deep clean, move-in/out, or vacation rental turnover. We disassemble racks, clean seals, and restore appliances to like-new freshness.',
    image: 'https://res.cloudinary.com/k6gktjkm/image/upload/v1794870660/0303.webp',
    imageAlt: 'Spotless clean gourmet kitchen appliances by Alice Keiko team on Oahu',
    recommendedFor: 'Pre-holiday cooking, vacation turnover resets, move-in sanitization',
    frequencyOptions: ['Oven Only', 'Refrigerator & Freezer', 'Full Appliance Trio'],
    checklist: [
      'Oven: baked-on grease removal, racks soaked and scrubbed, glass door polished',
      'Refrigerator: shelves and drawers removed, sanitized, food-safe deodorizing',
      'Freezer: frost-free wipe-down, crumb extraction, seal sanitization',
      'Range hood filters degreased and exterior stainless steel polished streak-free',
    ],
  },
];

export const BEFORE_AFTER_ITEMS: BeforeAfterItem[] = [
  {
    id: 'ba-kitchen',
    title: 'North Shore Chef Kitchen Detailing',
    category: 'Deep Cleaning',
    description: 'Stubborn coastal grease and mineral water stains eliminated; quartz waterfall island and brass fixtures polished to mirror clarity.',
    beforeImage: '/assets/photos/IMG_1565.jpg',
    afterImage: '/assets/photos/IMG_1565.jpg',
    highlights: ['Window sills descaled', 'Range hood degreased', 'Eco-safe quartz polish'],
  },
  {
    id: 'ba-bath',
    title: 'Lanikai Master Spa Bath Restoration',
    category: 'Deep Bathroom Descaling',
    description: 'Removal of thick coastal soap scum on frameless glass enclosures, descaling travertine grout, and sanitizing rainshower heads.',
    beforeImage: '/assets/photos/IMG_0375.jpg',
    afterImage: '/assets/photos/IMG_6588.jpg',
    highlights: ['Glass soap scum eradicated', 'Travertine pH balanced', 'Chrome fixtures shined'],
  },
  {
    id: 'ba-closet',
    title: 'Kahala Estate Walk-in Closet Organization',
    category: 'Professional Organizing',
    description: 'Alice Keiko personal curation: streamlined wardrobe, grouped by palette and lifestyle, with customized storage bins and uniform hangers.',
    beforeImage: '/assets/photos/IMG_6937.jpg',
    afterImage: '/assets/photos/IMG_6937.jpg',
    highlights: ['Custom categorizing', 'Visual harmony', 'Every item has its home'],
  },
];

export const TESTIMONIALS_LIST: TestimonialItem[] = [
  {
    id: 'test-1',
    title: 'Honest, Punctual, and Flawless Every Single Visit',
    quote:
      'Finding someone you completely trust in your home on Oʻahu is rare. Alice and her team have been caring for our North Shore residence for over two years now. They are always on time, polite, respectful of our privacy, and their work ethic is second to none. If they say 8:00 AM, they are at the gate at 8:00 AM. Worth every penny.',
    author: 'David & Sarah M.',
    role: 'Private Homeowners',
    location: 'North Shore, Oʻahu',
    serviceUsed: 'Bi-Weekly Maintenance Cleaning',
  },
  {
    id: 'test-2',
    title: 'Our Vacation Rental Superhost Status is Safe with Alice',
    quote:
      'We manage two luxury beachfront villas near Haleʻiwa. Before Alice Keiko, turnover days were pure anxiety. Now, her team comes in like clockwork, washes linens with hotel precision, restocks our welcome sets, and sends photo updates. Our guest cleanliness reviews are a solid 5.0 stars. I recommend her to everyone.',
    author: 'Kainoa R.',
    role: 'Vacation Rental Property Host',
    location: 'Haleʻiwa & Waimea',
    serviceUsed: 'Vacation Rental Turnover',
  },
  {
    id: 'test-3',
    title: 'The Initial Deep Clean Transformed Our Whole House',
    quote:
      'Alice recommended we start with a deep clean before switching to regular service, and what a difference. The sliding door tracks, window sills, and shower glass looked brand new. You can tell she personally trains her staff because the attention to detail is consistent across all rooms. She truly keeps her word.',
    author: 'Elena T.',
    role: 'Architectural Homeowner',
    location: 'Kahala & Diamond Head',
    serviceUsed: 'Deep Cleaning + Monthly Care',
  },
];

export const FAQ_LIST: FAQItem[] = [
  {
    category: 'Trust & Team',
    question: 'Who will be inside my home, and is your team trustworthy?',
    answer:
      'Our team consists of 5 dedicated specialists plus owner Alice Keiko. Every team member undergoes thorough criminal background checks, is personally trained by Alice in our proprietary methods, wears neat company uniforms, and works under strict confidentiality. We treat your property with the same reverence and care we give our own homes.',
  },
  {
    category: 'Process & Pricing',
    question: 'How do you determine the quote for my property?',
    answer:
      'Because every high-end residence and vacation rental has unique architecture, square footage, and specific materials (such as delicate marble, teak, or custom glass), we do not publish generic rates. You simply reach out via SMS or phone at (808) 218-2515. We schedule an in-person assessment or review photos of your home, and then provide a clear, transparent proposal tailored to your needs.',
  },
  {
    category: 'Guarantee',
    question: 'What is your 24-Hour Quality Guarantee?',
    answer:
      'We stand firmly behind our work. If any detail of our service was not completed as agreed, simply notify us. We will assess the situation and, if our team fell short of our standard, we will return within 24 hours to correct the issue at zero additional cost to you.',
  },
  {
    category: 'Equipment & Supplies',
    question: 'Do you bring your own cleaning supplies and equipment?',
    answer:
      'Yes! We provide all professional-grade equipment (including high-filtration HEPA vacuums, microfiber cleaning systems, and extendable dusters) along with premium commercial and eco-botanical cleaning solutions. If you have specific specialty products you prefer for rare antique surfaces, we are happy to accommodate them.',
  },
  {
    category: 'Insurance',
    question: 'Are you licensed and insured in Hawaiʻi?',
    answer:
      'Yes. Alice Keiko Organizing & Cleaning Services LLC is an active registered company in Hawaiʻi and maintains comprehensive general liability insurance and bonding. This provides our clients complete peace of mind.',
  },
  {
    category: 'Service Area',
    question: 'Which areas of Oʻahu and other Hawaiian islands do you service?',
    answer:
      'We are headquartered on the North Shore of Oʻahu and proudly service all regions of the island—including The Ritz-Carlton O‘ahu, Turtle Bay (57-091 Kamehameha Highway, Kahuku, HI 96731, USA), Honolulu, Kahala, Lanikai, Kailua, Hawaii Kai, and Waikiki. We also service properties on neighbor islands upon advance scheduling and assessment of project scale.',
  },
  {
    category: 'Payments',
    question: 'What payment methods do you accept?',
    answer:
      'We accept electronic bank transfers (ACH/Zelle), major credit cards, and company checks for ongoing residential and commercial accounts. Invoices are sent directly upon service completion.',
  },
];

export const DIFFERENTIALS_DATA = [
  {
    title: 'Owner-Trained & Supervised Team',
    description:
      'Alice Keiko personally trains every team member on proprietary techniques, product chemical safety, and discreet luxury etiquette. Quality is never delegated to untested subcontractors.',
    icon: 'UserCheck',
  },
  {
    title: 'True Commitment & Punctuality',
    description:
      'We value your time above all. When we commit to a schedule, we arrive punctually and communicate transparently about what can and cannot be done. Our reputation is built on our word.',
    icon: 'Clock',
  },
  {
    title: '24-Hour Quality Guarantee',
    description:
      'If any area does not meet the agreed standard, notify us. We return within 24 hours to re-clean and perfect the space at no additional cost.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Top-Tier Supplies & Eco-Botanicals',
    description:
      'We invest in premium-grade materials and safe, certified eco-botanical cleansers that preserve luxury travertine, natural wood, and oceanfront glass without toxic fumes.',
    icon: 'Leaf',
  },
  {
    title: 'Built on Client Trust & Referrals',
    description:
      'Operating for over 3 years on Oʻahu, our growth has been driven primarily by satisfied homeowner referrals—the ultimate reflection of consistency and integrity.',
    icon: 'HeartHandshake',
  },
  {
    title: 'Licensed, Bonded & Insured',
    description:
      'Rest easy knowing your multi-million dollar asset is protected by verified general liability coverage and an honest, accountable team.',
    icon: 'Award',
  },
];
