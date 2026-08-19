import { ServiceCardData, TransformationItem, TestimonialItem, GalleryItem, Artisan } from '../types';

export const SALON_INFO = {
  name: 'LUMIÈRE',
  tagline: 'Beauty, refined.',
  subTagline: 'Hair · Skin · Makeup · Bridal',
  description: 'Thoughtfully crafted beauty experiences for the modern woman.',
  address: '14/A Sanctuary Boulevard, Luxury Enclave, Indiranagar',
  city: 'Chennai, 600001',
  phone: '+91 9345781106',
  rawPhone: '9345781106',
  email: 'yokeshkb2002@gmail.com',
  instagram: 'shysnapster',
  instagramUrl: 'https://instagram.com/shysnapster',
  github: 'yokeshinfre',
  githubUrl: 'https://github.com/yokeshinfre',
  hours: [
    { days: 'Monday – Friday', time: '09:30 AM – 08:30 PM' },
    { days: 'Saturday – Sunday', time: '09:00 AM – 09:00 PM' },
    { days: 'Private Bridal Suites', time: 'By Prior Reservation' }
  ],
  stats: [
    { label: 'Private Suites', value: '06' },
    { label: 'Master Artisans', value: '14' },
    { label: 'Client Satisfaction', value: '99.4%' },
    { label: 'Years of Artistry', value: '08+' }
  ]
};

export const SERVICES: ServiceCardData[] = [
  {
    id: 'hair',
    category: 'hair',
    number: '01',
    name: 'Hair',
    tagline: 'Cut · Styling · Colour · Treatments',
    description: 'Precision architecture for your hair. From custom French balayage to restorative botanical silk infusions.',
    image: '/image/Hair.png',
    features: ['Bespoke Hair Architecture', 'Custom Balayage & Glossing', 'Japanese Scalp Rejuvenation', 'Silk Protein Infusion'],
    treatments: [
      {
        id: 'hair-cut-style',
        name: 'Signature Precision Cut & Blowdry',
        category: 'hair',
        duration: '60 min',
        price: '₹2,800',
        description: 'Sculptural consultation, sensory wash with botanical oils, precision wet/dry cut, and editorial styling.',
        tags: ['Signature', 'Bespoke']
      },
      {
        id: 'hair-balayage',
        name: 'Custom Sun-Kissed Balayage & Gloss',
        category: 'hair',
        duration: '180 min',
        price: '₹8,500',
        description: 'Freehand dimensional light painting with ammonia-free clay lighteners and a conditioning champagne gloss.',
        tags: ['Color', 'Popular']
      },
      {
        id: 'hair-silk-treatment',
        name: 'Hydro-Silk Molecular Repair Treatment',
        category: 'hair',
        duration: '75 min',
        price: '₹4,200',
        description: 'Deep cortex restorative therapy utilizing biomimetic peptides and cold vapor infusion for mirror shine.',
        tags: ['Restorative']
      },
      {
        id: 'hair-scalp-spa',
        name: 'Japanese Head Spa & Scalp Detox',
        category: 'hair',
        duration: '90 min',
        price: '₹4,900',
        description: 'Micro-mist circulation ritual, lymphatic scalp massage with hinoki cypress oil, and waterfall cleanse.',
        tags: ['Signature', 'Ritual']
      }
    ]
  },
  {
    id: 'skin',
    category: 'skin',
    number: '02',
    name: 'Skin',
    tagline: 'Facials · Cleanup · Glow Treatments',
    description: 'Clean, clinical, and sensorial skin rituals that awaken your natural radiance without harsh intervention.',
    image: '/image/Skin.png',
    features: ['24K Botanical Glow Facial', 'Cryo-Sculpting Facial', 'Deep Hydro-Pore Cleanse', 'Lymphatic Drainage Massage'],
    treatments: [
      {
        id: 'skin-lumiere-glow',
        name: 'The Lumière 24K Botanical Radiance Facial',
        category: 'skin',
        duration: '75 min',
        price: '₹5,500',
        description: 'Dual cleanse, enzyme resurfacing, rose quartz gua sha sculpting, 24K gold leaf infusion, and LED phototherapy.',
        tags: ['Signature', 'Radiance']
      },
      {
        id: 'skin-hydro-cleanse',
        name: 'Aqua-Pure Deep Pore Renewal',
        category: 'skin',
        duration: '60 min',
        price: '₹3,400',
        description: 'Vortex suction pore extraction infused with niacinamide, hyaluronic acid, and cold-pressed camellia extract.',
        tags: ['Detox', 'Hydrating']
      },
      {
        id: 'skin-cryo-lift',
        name: 'Sub-Zero Cryo-Firming & Lift',
        category: 'skin',
        duration: '60 min',
        price: '₹4,800',
        description: 'Controlled cold therapy to instantly de-puff, stimulate collagen synthesis, and sharpen facial contours.',
        tags: ['Sculpting']
      },
      {
        id: 'skin-barrier-calm',
        name: 'Sensorial Barrier Repair & Calming Ritual',
        category: 'skin',
        duration: '70 min',
        price: '₹3,900',
        description: 'Soothing centella asiatica and oat ceramide compress designed for delicate, stressed, or sensitive skin.',
        tags: ['Soothing']
      }
    ]
  },
  {
    id: 'makeup',
    category: 'makeup',
    number: '03',
    name: 'Makeup',
    tagline: 'Party · Engagement · Bridal',
    description: 'Understated, skin-first makeup artistry designed to enhance your authentic bone structure and effortless grace.',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1200&auto=format&fit=crop',
    features: ['High-Definition Dewy Skin', 'Subtle Red Carpet Sculpt', 'Lash Enhancement & Brow Architecture', 'Long-Wear Velvet Finish'],
    treatments: [
      {
        id: 'makeup-editorial-party',
        name: 'The Editorial Evening / Soirée Look',
        category: 'makeup',
        duration: '75 min',
        price: '₹4,500',
        description: 'Skin-prep ritual, featherlight airbrushed finish, custom lash clusters, and tailored lip tinting.',
        tags: ['Popular', 'Evening']
      },
      {
        id: 'makeup-engagement',
        name: 'Engagement & High-Occasion Artistry',
        category: 'makeup',
        duration: '90 min',
        price: '₹7,500',
        description: 'Luminous long-wear complexion, monochromatic eye framing, and bespoke hair styling coordination.',
        tags: ['Occasion']
      },
      {
        id: 'makeup-soft-glam',
        name: 'Quiet Luxury Soft Glam',
        category: 'makeup',
        duration: '60 min',
        price: '₹3,800',
        description: 'Minimalist champagne-toned accents, sculpted brows, dewy cheek glaze, and a satin nude lip.',
        tags: ['Signature', 'Natural']
      },
      {
        id: 'makeup-express-touch',
        name: 'Express Camera-Ready Glow',
        category: 'makeup',
        duration: '40 min',
        price: '₹2,500',
        description: 'Quick skin hydration, targeted spot perfecting, cream blush elevation, and defined eyes.',
        tags: ['Express']
      }
    ]
  },
  {
    id: 'nails',
    category: 'nails',
    number: '04',
    name: 'Nails',
    tagline: 'Manicure · Pedicure · Nail Art',
    description: 'Impeccable cuticle care, non-toxic formulations, and minimalist editorial designs on pristine nail beds.',
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=1200&auto=format&fit=crop',
    features: ['Apothecary Herb Manicure', 'Warm Milk & Honey Pedicure', 'Minimalist Micro-Art', 'Builder Gel Sculpting'],
    treatments: [
      {
        id: 'nails-spa-manicure',
        name: 'Lumière Botanical Spa Manicure',
        category: 'nails',
        duration: '50 min',
        price: '₹1,800',
        description: 'Aromatic dead sea salt soak, gentle cuticle refinement, warm jojoba massage, and high-shine non-toxic buff or lacquer.',
        tags: ['Signature', 'Nourishing']
      },
      {
        id: 'nails-cloud-pedicure',
        name: 'Cloud-Nine Warm Milk & Rose Pedicure',
        category: 'nails',
        duration: '65 min',
        price: '₹2,400',
        description: 'Warm organic oat milk & rose petal bath, pumice smoothing, magnesium butter foot wrap, and callus treatment.',
        tags: ['Relaxation']
      },
      {
        id: 'nails-minimal-art',
        name: 'Minimalist Editorial Nail Art & Gel Overlay',
        category: 'nails',
        duration: '75 min',
        price: '₹2,900',
        description: 'Clean French micro-tips, metallic chrome glazing, negative-space strokes, and long-lasting gel strengthening.',
        tags: ['Artistry', 'Trending']
      },
      {
        id: 'nails-structure-gel',
        name: 'Natural Builder Gel Extension & Sculpt',
        category: 'nails',
        duration: '90 min',
        price: '₹3,600',
        description: 'Damage-free nail elongation with flexible builder gel, tailored to your natural nail curve.',
        tags: ['Durability']
      }
    ]
  }
];

export const BRIDAL_PACKAGES = [
  {
    id: 'the-couture-bride',
    title: 'The Couture Bride',
    subtitle: 'Full Wedding Day Artistry & Suite Service',
    duration: 'Full Day Concierge',
    price: '₹28,000',
    description: 'The definitive bridal ritual. Private luxury suite with dedicated makeup artist, hair artisan, and trousseau draper.',
    features: [
      'Comprehensive pre-wedding trial session (Makeup & Hair)',
      'High-Definition long-wear bridal makeup with luxury skin prep',
      'Intricate hair styling with authentic floral / jewelry setting',
      'Dupatta, saree or lehenga drape artistry',
      'Private suite with artisanal champagne & herbal refreshments',
      'Complimentary bridal touch-up kit for reception transitions'
    ],
    image: '/image/Bride.png'
  },
  {
    id: 'the-pre-bridal-ritual',
    title: 'The Pre-Bridal Radiance Ritual',
    subtitle: '4-Week Intensive Skin & Body Transformation',
    duration: '4 Personalized Sessions',
    price: '₹36,000',
    description: 'A phased countdown designed to unveil illuminated skin, revitalized hair luster, and deep somatic relaxation.',
    features: [
      'Week 1: Scalp Detox & Aqua-Pure Skin Resurfacing',
      'Week 2: Full Body Botanical Polish & Hydro Therapy',
      'Week 3: 24K Gold Cellular Renewal & Collagen Infusion',
      'Week 4: Final Glow Facial, Milk & Rose Pedicure, Nail Artistry',
      'Personalized at-home skincare roadmap curated by our aesthetician'
    ],
    image: '/image/Front2.png'
  },
  {
    id: 'the-engagement-soiree',
    title: 'The Engagement & Sangeet Suite',
    subtitle: 'Refined Occasion Artistry',
    duration: '2.5 Hours per Look',
    price: '₹14,500',
    description: 'Modern, magnetic beauty tailored for high-energy celebrations and evening flash photography.',
    features: [
      'Deconstructed Hollywood waves or modern textured updos',
      'Dimensional eye framing with custom silk eyelashes',
      'Hydra-glow skin base with all-night transfer-proof lock',
      'Garment draping & jewelry placement'
    ],
    image: '/image/Front1.png'
  }
];

export const TRANSFORMATIONS: TransformationItem[] = [
  {
    id: 'trans-1',
    title: 'Sunlit Champagne Balayage',
    category: 'Hair Artistry',
    description: 'Transitioned dull brassy lengths into seamless, dimension-rich champagne tones with soft face-framing ribbons.',
    beforeImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=900&auto=format&fit=crop',
    afterImage: '/image/Front1.png',
    treatmentName: 'Custom Balayage & Silk Infusion',
    artisan: 'Elise Dupont, Master Colorist'
  },
  {
    id: 'trans-2',
    title: 'Glass-Skin Cellular Glow',
    category: 'Skin Renewal',
    description: 'Alleviated skin congestion and barrier fatigue, restoring plump hydration, sculpted cheekbones, and effortless light reflection.',
    beforeImage: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=900&auto=format&fit=crop',
    afterImage: '/image/Front2.png',
    treatmentName: '24K Botanical Radiance Facial',
    artisan: 'Claire Vane, Lead Aesthetician'
  },
  {
    id: 'trans-3',
    title: 'Understated Bridal Radiance',
    category: 'Bridal Artistry',
    description: 'Subtle high-fashion bridal aesthetic with seamless dewy skin base, rose-gold eye accents, and natural sculpted lips.',
    beforeImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=900&auto=format&fit=crop',
    afterImage: '/image/Bride.png',
    treatmentName: 'The Couture Bride Look',
    artisan: 'Aria Sharma, Bridal Director'
  },
  {
    id: 'trans-4',
    title: 'Minimalist Micro-French Sculpt',
    category: 'Nail Architecture',
    description: 'Shortened fragile nails renewed with natural builder gel overlays, finished with micro champagne-chrome edging.',
    beforeImage: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=900&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=900&auto=format&fit=crop',
    treatmentName: 'Builder Gel & Minimal Chrome Art',
    artisan: 'Mei Lin, Nail Artisan'
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'rev-1',
    name: 'Ananya Deshmukh',
    role: 'Creative Director',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
    rating: 5,
    service: 'Japanese Head Spa & Balayage',
    quote: 'LUMIÈRE completely redefined salon care for me. The scalp therapy was pure meditation, and the balayage is the most natural, seamless blend I’ve ever had.',
    date: '2 weeks ago'
  },
  {
    id: 'rev-2',
    name: 'Dr. Sarah Jenkins',
    role: 'Dermatology Resident',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop',
    rating: 5,
    service: '24K Botanical Radiance Facial',
    quote: 'As someone meticulous about skin health, I was deeply impressed by their botanical formulations and hygienic precision. Zero redness, just pure glass skin.',
    date: '1 month ago'
  },
  {
    id: 'rev-3',
    name: 'Rhea Kapoor-Merchant',
    role: 'Bride (Couture Suite)',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&auto=format&fit=crop',
    rating: 5,
    service: 'The Couture Bride Package',
    quote: 'Having the private bridal suite made my wedding morning serene and joyful. The makeup lasted flawlessly through 14 hours of tears, dancing, and cameras.',
    date: '3 weeks ago'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Architectural Waves',
    category: 'hair',
    image: '/image/Front1.png',
    aspect: 'portrait',
    description: 'Soft dimensional texture with honey gloss.'
  },
  {
    id: 'gal-2',
    title: 'Dewy Porcelain Glow',
    category: 'skin',
    image: '/image/Skin.png',
    aspect: 'square',
    description: 'Enzyme renewal and cold cryo therapy.'
  },
  {
    id: 'gal-3',
    title: 'Sanctuary Lounge',
    category: 'interior',
    image: 'https://images.unsplash.com/photo-1629198658000-7332617e8b24?q=80&w=1000&auto=format&fit=crop',
    aspect: 'landscape',
    description: 'Warm travertine stone and acoustic serenity.'
  },
  {
    id: 'gal-4',
    title: 'Bridal Heritage Grace',
    category: 'bridal',
    image: '/image/Bride.png',
    aspect: 'portrait',
    description: 'Understated elegance for the modern bride.'
  },
  {
    id: 'gal-5',
    title: 'Micro-Artistry Polish',
    category: 'nails',
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=1000&auto=format&fit=crop',
    aspect: 'square',
    description: 'Clean French tips on almond builder gel.'
  },
  {
    id: 'gal-6',
    title: 'Champagne Soft Glam',
    category: 'makeup',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1000&auto=format&fit=crop',
    aspect: 'portrait',
    description: 'Feathered brows and satin nude lip artistry.'
  },
  {
    id: 'gal-7',
    title: 'Private Wash Basin Suite',
    category: 'interior',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1000&auto=format&fit=crop',
    aspect: 'landscape',
    description: 'Japanese head spa wash station with ambient lighting.'
  },
  {
    id: 'gal-8',
    title: 'Sunlit Precision Cut',
    category: 'hair',
    image: '/image/Front1.png',
    aspect: 'square',
    description: 'French curtain fringe and layered movement.'
  }
];

export const ARTISANS: Artisan[] = [
  {
    id: 'art-1',
    name: 'Elise Dupont',
    role: 'Creative Hair Director & Master Colorist',
    experience: '12 Years Experience',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=500&auto=format&fit=crop',
    specialties: ['French Balayage', 'Hair Architecture', 'Silk Restoration']
  },
  {
    id: 'art-2',
    name: 'Aria Sharma',
    role: 'Lead Bridal & Editorial Artist',
    experience: '10 Years Experience',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500&auto=format&fit=crop',
    specialties: ['Couture Bridal', 'Dewy Complexions', 'Red Carpet Glam']
  },
  {
    id: 'art-3',
    name: 'Claire Vane',
    role: 'Senior Aesthetician & Skin Specialist',
    experience: '8 Years Experience',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=500&auto=format&fit=crop',
    specialties: ['24K Botanical Facials', 'Lymphatic Sculpting', 'Barrier Repair']
  },
  {
    id: 'art-4',
    name: 'Mei Lin',
    role: 'Master Nail Stylist & Sculptor',
    experience: '7 Years Experience',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=500&auto=format&fit=crop',
    specialties: ['Builder Gel Sculpting', 'Minimalist Nail Art', 'Spa Care']
  }
];
