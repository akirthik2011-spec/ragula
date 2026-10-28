import { Product } from '../types/index.ts';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Handmade Gift Box",
    description: "A thoughtful gift for someone special.",
    longDescription: "Exquisitely curated wooden keepsake box lined with textured raw silk and tied with natural jute ribbon. Each box is hand-assembled, polished with organic beeswax, and includes dried botanicals and a blank handmade paper card for your personal handwritten message.",
    price: 499,
    originalPrice: 599,
    category: "gift-boxes",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80"
    ],
    badge: "Bestseller",
    inStock: true,
    rating: 4.9,
    reviewsCount: 42,
    materials: ["Sustainable Pine Wood", "Raw Mulberry Paper", "Jute Ribbon", "Beeswax Seal"],
    dimensions: "18 cm x 14 cm x 8 cm",
    leadTime: "1-2 days crafting time",
    customizable: true
  },
  {
    id: 2,
    name: "Creative Art Piece",
    description: "A unique piece to brighten your space.",
    longDescription: "Original hand-textured mixed-media artwork made on archival cotton canvas. Accented with warm earthy pigments and delicate 24k-style imitation gold leaf foil that catches light gracefully from different room angles.",
    price: 699,
    originalPrice: 849,
    category: "art-pieces",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80"
    ],
    badge: "Artisan Pick",
    inStock: true,
    rating: 4.9,
    reviewsCount: 31,
    materials: ["Heavyweight Cotton Canvas", "Natural Mineral Pigments", "Gold Foil Accents", "Protective Matte Varnish"],
    dimensions: "25 cm x 25 cm (Square)",
    leadTime: "Ready to ship",
    customizable: false
  },
  {
    id: 3,
    name: "Handmade Accessories",
    description: "Beautiful details, made with care.",
    longDescription: "Meticulously hand-beaded charm bracelet and matching trinket made with natural semi-precious stones, antique brass charms, and durable braided silk thread. Light, skin-friendly, and crafted for everyday elegance.",
    price: 349,
    originalPrice: 429,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1611591475152-47831130ab78?auto=format&fit=crop&w=800&q=80"
    ],
    badge: "Popular Gift",
    inStock: true,
    rating: 4.8,
    reviewsCount: 56,
    materials: ["Semi-precious Jasper & Quartz", "Antique Brass", "Braided Silk Cord"],
    dimensions: "Adjustable 16 - 21 cm",
    leadTime: "Same day dispatch",
    customizable: true
  },
  {
    id: 4,
    name: "Decorative Creation",
    description: "A charming addition to your home.",
    longDescription: "A statement ceramic tabletop ornament hand-molded and fired with an artisanal speckled oat glaze. Designed to hold dried florals, incense, or stand as a sculptural centerpiece on coffee tables and study desks.",
    price: 599,
    originalPrice: 699,
    category: "home-decor",
    image: "https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=800&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80"
    ],
    badge: "Limited Edition",
    inStock: true,
    rating: 5.0,
    reviewsCount: 19,
    materials: ["Stoneware Clay", "Non-toxic Mineral Glaze", "Cork Protective Base"],
    dimensions: "16 cm height x 11 cm diameter",
    leadTime: "1 day crafting time",
    customizable: false
  },
  {
    id: 5,
    name: "Botanical Soy Wax Candle",
    description: "Hand-poured with pure lavender & warm sandalwood.",
    longDescription: "Clean-burning candle hand-poured in small batches using 100% natural soy wax, lead-free cotton wick, and therapeutic-grade essential oils. Decorated with dried French lavender florets and golden marigold petals.",
    price: 449,
    originalPrice: 520,
    category: "candles",
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80",
    badge: "Aroma Favorite",
    inStock: true,
    rating: 4.9,
    reviewsCount: 68,
    materials: ["100% Golden Soy Wax", "Lavender & Mysore Sandalwood Oil", "Braided Cotton Wick", "Amber Glass Jar"],
    dimensions: "220g (approx 45 hrs burn time)",
    leadTime: "Ready to ship",
    customizable: true
  },
  {
    id: 6,
    name: "Artisanal Terracotta Planter",
    description: "Hand-thrown clay pot with traditional etched motifs.",
    longDescription: "Crafted on a traditional potters wheel by village artisans, this breathable terracotta planter promotes optimal root aeration and is finished with subtle hand-burnished geometric grooves.",
    price: 549,
    originalPrice: 650,
    category: "home-decor",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    rating: 4.7,
    reviewsCount: 27,
    materials: ["Natural River Terracotta", "Organic Wax Polish"],
    dimensions: "14 cm diameter x 13 cm height",
    leadTime: "Ready to ship",
    customizable: false
  },
  {
    id: 7,
    name: "Handcrafted Macramé Tapestry",
    description: "Intricate bohemian knotwork on seasoned driftwood.",
    longDescription: "Woven entirely by hand using 4mm unbleached organic cotton rope suspended from a smoothly sanded branch of natural driftwood. Adds instant organic warmth and acoustic softening to bedrooms and living spaces.",
    price: 849,
    originalPrice: 1099,
    category: "home-decor",
    image: "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?auto=format&fit=crop&w=800&q=80",
    badge: "Masterpiece",
    inStock: true,
    rating: 5.0,
    reviewsCount: 15,
    materials: ["100% Unbleached Cotton Cord", "Sanded Hardwood Branch"],
    dimensions: "45 cm width x 70 cm length",
    leadTime: "2-3 days hand-knotting",
    customizable: true
  },
  {
    id: 8,
    name: "Embroidered Heritage Pouch",
    description: "Hand-stitched linen pouch with brass zipper & golden tassel.",
    longDescription: "A versatile daily pouch designed to hold jewelry, cosmetics, or travel essentials. Sewn from pure Indian linen, embroidered with delicate botanical stems, and fully lined with soft cotton poplin.",
    price: 399,
    originalPrice: 479,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    rating: 4.8,
    reviewsCount: 39,
    materials: ["Natural Flax Linen", "Cotton Floss Thread", "YKK Brass Zipper", "Silken Tassel"],
    dimensions: "20 cm x 15 cm",
    leadTime: "Ready to ship",
    customizable: true
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'All Treasures', count: 8 },
  { id: 'gift-boxes', label: 'Gift Boxes', count: 1 },
  { id: 'art-pieces', label: 'Art Pieces', count: 1 },
  { id: 'accessories', label: 'Accessories', count: 2 },
  { id: 'home-decor', label: 'Home Decor', count: 3 },
  { id: 'candles', label: 'Candles & Scents', count: 1 },
] as const;

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Pooja Sharma",
    city: "Bangalore",
    comment: "The Handmade Gift Box arrived packed like a royal treasure! The wax seal and handwritten note made my sister's birthday unforgettable. Truly premium quality.",
    rating: 5,
    verified: true,
    itemPurchased: "Handmade Gift Box"
  },
  {
    id: 2,
    name: "Rohan Deshmukh",
    city: "Mumbai",
    comment: "Ordered via WhatsApp and the response was so fast and courteous. The creative art piece has such rich texture and brings so much life to our dining room.",
    rating: 5,
    verified: true,
    itemPurchased: "Creative Art Piece"
  },
  {
    id: 3,
    name: "Ananya Iyer",
    city: "Chennai",
    comment: "Supporting local craftswomen who put this much genuine soul into their creations feels wonderful. The lavender candle scent is divine and burns cleanly.",
    rating: 5,
    verified: true,
    itemPurchased: "Botanical Soy Wax Candle"
  }
];

export const FAQS = [
  {
    question: "How do I place an order via WhatsApp?",
    answer: "Simply click 'Add to Cart' on your favourite items, then click 'Order on WhatsApp' in your cart. A pre-filled message detailing your chosen items, quantities, and delivery details will automatically open in your WhatsApp chat with us (+91 9448620389). We will immediately confirm item availability and send UPI payment details."
  },
  {
    question: "Do you ship all across India?",
    answer: "Yes! We ship to all serviceable PIN codes throughout India. We offer FREE shipping on orders of ₹999 or more, and a flat standard fee of ₹60 for smaller orders. Most orders reach you within 2 to 5 business days."
  },
  {
    question: "Can I customize an item or add a personalized name/gift note?",
    answer: "Yes, absolutely! On customizable items you can type your personalized name, message, or color preference. Every gift box also includes a complimentary handwritten wax-sealed calligraphy card."
  },
  {
    question: "How are the fragile creations packed for safe delivery?",
    answer: "Every piece is wrapped in eco-friendly honeycomb paper cushioning, nested in sturdy craft boxes, and sealed against moisture. We guarantee 100% damage-free transit; in the rare event of transit damage, we replace it promptly at no extra charge."
  },
  {
    question: "Do you accept custom commissions and wedding/bulk favors?",
    answer: "Yes! We adore crafting bespoke collections for weddings, corporate gifting, anniversaries, and housewarmings. Click 'Custom Order' in the header or message us directly on WhatsApp for bulk inquiries."
  }
];
