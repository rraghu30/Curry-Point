export const categories = [
  { id: 'veg', name: 'Veg Menu', icon: 'Leaf' },
  { id: 'non-veg', name: 'Non-Veg Menu', icon: 'Drumstick' },
  { id: 'sweets', name: 'Sweets', icon: 'IceCream' },
  { id: 'offers', name: 'Offers', icon: 'Tag' }
];

export const dishes = [
  // --- VEG DISHES (5 items) ---
  {
    id: 1,
    name: "Paneer Tikka Masala",
    category: "veg",
    description: "Premium cottage cheese cubes grilled to perfection and simmered in a rich, spicy tomato-based gravy with aromatic spices.",
    price: 320,
    rating: 4.9,
    image: "/menu/paneer_tikka.png",
    tags: ["Signature", "Bestseller"],
    isVeg: true
  },
  {
    id: 2,
    name: "Malai Kofta",
    category: "veg",
    description: "Velvety soft paneer and potato dumplings served in a creamy, golden cashew-nut gravy. A royal vegetarian delight.",
    price: 340,
    rating: 4.8,
    image: "/menu/malai_kofta.png",
    tags: ["Must Try"],
    isVeg: true
  },
  {
    id: 3,
    name: "Dal Makhani (Bukhara Style)",
    category: "veg",
    description: "Slow-cooked black lentils and kidney beans simmered overnight with butter and cream for a rich, smoky flavor.",
    price: 280,
    rating: 4.9,
    image: "/menu/dal_makhani.png",
    tags: ["Classic"],
    isVeg: true
  },
  {
    id: 4,
    name: "Hyderabadi Veg Biryani",
    category: "veg",
    description: "Fragrant long-grain basmati rice layered with garden-fresh vegetables, saffron, and authentic Hyderabadi spices.",
    price: 310,
    rating: 4.7,
    image: "/menu/veg_biryani.png",
    tags: ["Authentic"],
    isVeg: true
  },
  {
    id: 5,
    name: "Crispy Gobi Manchurian",
    category: "veg",
    description: "Crispy cauliflower florets tossed in a tangy and spicy Indo-Chinese sauce with bell peppers and spring onions.",
    price: 220,
    rating: 4.6,
    image: "/menu/gobi_manchurian.png",
    tags: ["Starters"],
    isVeg: true
  },

  // --- NON-VEG DISHES (5 items) ---
  {
    id: 6,
    name: "Signature Butter Chicken",
    category: "non-veg",
    description: "Tender tandoori chicken pieces simmered in a smooth, buttery tomato gravy. A timeless classic with a touch of cream.",
    price: 420,
    rating: 4.9,
    image: "/menu/butter_chicken.png",
    tags: ["Chef Special", "Popular"],
    isVeg: false
  },
  {
    id: 7,
    name: "Mutton Dum Biryani",
    category: "non-veg",
    description: "Succulent pieces of mutton slow-cooked with aromatic basmati rice and secret spices in a traditional clay pot.",
    price: 480,
    rating: 4.8,
    image: "/menu/mutton_biryani.png",
    tags: ["Premium"],
    isVeg: false
  },
  {
    id: 8,
    name: "Tandoori Chicken (Full)",
    category: "non-veg",
    description: "Whole chicken marinated in yogurt and a secret blend of spices, grilled to perfection in a traditional clay oven.",
    price: 550,
    rating: 4.7,
    image: "/menu/tandoori_chicken.png",
    tags: ["Classic"],
    isVeg: false
  },
  {
    id: 9,
    name: "Chicken Tikka Masala",
    category: "non-veg",
    description: "Succulent grilled chicken chunks served in a spicy, aromatic orange-colored gravy with onions and peppers.",
    price: 395,
    rating: 4.8,
    image: "/menu/chicken_tikka_masala.png",
    isVeg: false
  },
  {
    id: 10,
    name: "Goan Fish Curry",
    category: "non-veg",
    description: "Fresh fish fillets cooked in a tangy coconut and tamarind-based gravy with traditional Goan spices.",
    price: 410,
    rating: 4.6,
    image: "/menu/goan_fish_curry.png",
    isVeg: false
  },

  // --- SWEETS (5 items) ---
  {
    id: 11,
    name: "Royal Ras Malai",
    category: "sweets",
    description: "Soft and spongy cottage cheese patties soaked in saffron-flavored chilled milk, garnished with pistachios.",
    price: 150,
    rating: 4.9,
    image: "/menu/ras_malai.png",
    tags: ["Exquisite"],
    isVeg: true
  },
  {
    id: 12,
    name: "Gulab Jamun (2 Pcs)",
    category: "sweets",
    description: "Warm, berry-sized milk-solid balls soaked in a fragrant rose-flavored sugar syrup.",
    price: 80,
    rating: 4.8,
    image: "/menu/gulab_jamun.png",
    isVeg: true
  },
  {
    id: 13,
    name: "Premium Kaju Katli",
    category: "sweets",
    description: "Traditional diamond-shaped cashew fudge with a smooth melt-in-the-mouth texture.",
    price: 300,
    rating: 4.7,
    image: "/menu/kaju_katli.png",
    isVeg: true
  },
  {
    id: 14,
    name: "Gajar Ka Halwa",
    category: "sweets",
    description: "Rich and delicious carrot pudding slow-cooked with milk, ghee, and generous amounts of dry fruits.",
    price: 180,
    rating: 4.8,
    image: "/menu/gajar_halwa.png",
    isVeg: true
  },
  {
    id: 15,
    name: "Shahi Kheer",
    category: "sweets",
    description: "Traditional Indian rice pudding with milk, saffron, and cardamom, served chilled.",
    price: 120,
    rating: 4.6,
    image: "/menu/shahi_kheer.png",
    isVeg: true
  },

  // --- OFFERS (5 items) ---
  {
    id: 16,
    name: "Weekend Family Feast",
    category: "offers",
    description: "A complete meal for the whole family: 2 Biryanis, 1 Starter, 2 Desserts, and Beverages.",
    price: 999,
    originalPrice: 1499,
    rating: 4.9,
    image: "/menu/family_feast.png",
    tags: ["Best Value", "Combo"],
    isVeg: false
  },
  {
    id: 17,
    name: "Corporate Lunch Box",
    category: "offers",
    description: "Perfectly portioned lunch with Dal, Veg Curry, Rice, 2 Rotis, and a Sweet. Ideal for office lunch.",
    price: 199,
    originalPrice: 249,
    rating: 4.6,
    image: "/menu/corporate_lunch_box.png",
    tags: ["Lunch Special"],
    isVeg: true
  },
  {
    id: 18,
    name: "Couple's Date Night Combo",
    category: "offers",
    description: "A romantic meal for two: 1 Premium Curry, 2 Garlic Naans, 1 Starter, and 2 Ras Malais.",
    price: 649,
    originalPrice: 850,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800",
    tags: ["Combo"],
    isVeg: true
  },
  {
    id: 19,
    name: "Biryani Party Pack",
    category: "offers",
    description: "Bulk pack of our signature Mutton/Chicken Biryani with Raita and Salan. Serves 5-6 people.",
    price: 1399,
    originalPrice: 1800,
    rating: 4.9,
    image: "/menu/family_feast.png",
    tags: ["Party Special"],
    isVeg: false
  },
  {
    id: 20,
    name: "Dessert Platter",
    category: "offers",
    description: "Assorted platter featuring mini portions of Gulab Jamun, Ras Malai, and Kaju Katli.",
    price: 249,
    originalPrice: 350,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1596797038558-b65675e2474f?auto=format&fit=crop&q=80&w=800",
    tags: ["Sweet Deal"],
    isVeg: true
  }
];

export const coupons = [
  {
    code: 'CURRY20',
    discount: 20,
    description: '20% OFF on your first order',
    minOrder: 500
  },
  {
    code: 'SWEET10',
    discount: 10,
    description: '10% OFF on all sweets',
    category: 'sweets'
  },
  {
    code: 'FESTIVE30',
    discount: 30,
    description: 'Flat 30% OFF for festive season',
    minOrder: 1000
  }
];
