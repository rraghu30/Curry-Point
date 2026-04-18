export const categories = [
  { id: 'veg', name: 'Veg Menu', icon: 'Leaf' },
  { id: 'non-veg', name: 'Non-Veg Menu', icon: 'Drumstick' },
  { id: 'sweets', name: 'Sweets', icon: 'IceCream' },
  { id: 'offers', name: 'Offers', icon: 'Tag' }
];

export const dishes = [
  // --- VEG DISHES (22 items) ---
  {
    id: 1,
    name: "Paneer Butter Masala",
    category: "veg",
    description: "Creamy and rich tomato-based gravy with soft cottage cheese cubes.",
    price: 280,
    originalPrice: 350,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=800",
    tags: ["Best Seller"],
    isVeg: true
  },
  {
    id: 2,
    name: "Hyderabadi Veg Biryani",
    category: "veg",
    description: "Fragrant basmati rice cooked with garden fresh vegetables and traditional spices.",
    price: 320,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=800",
    tags: ["Authentic"],
    isVeg: true
  },
  {
    id: 3,
    name: "Dal Makhani",
    category: "veg",
    description: "Slow-cooked black lentils with cream and spices, a North Indian classic.",
    price: 240,
    originalPrice: 300,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=800",
    tags: ["Classic"],
    isVeg: true
  },
  {
    id: 4,
    name: "Gobi Manchurian",
    category: "veg",
    description: "Crispy cauliflower florets tossed in a spicy and tangy Indo-Chinese sauce.",
    price: 180,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1512132411229-c30391241dd8?auto=format&fit=crop&q=80&w=800",
    tags: ["Starters"],
    isVeg: true
  },
  {
    id: 11,
    name: "Malai Kofta",
    category: "veg",
    description: "Paneer and potato balls in a rich, creamy cashew gravy.",
    price: 310,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=800",
    isVeg: true
  },
  {
    id: 12,
    name: "Baingan Bharta",
    category: "veg",
    description: "Roasted eggplant mashed and cooked with tomatoes, onions, and green peas.",
    price: 220,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800",
    isVeg: true
  },
  {
    id: 13,
    name: "Aloo Gobi",
    category: "veg",
    description: "Classic dry dish made with potatoes and cauliflower florets with spices.",
    price: 190,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1631452179679-a787a2d427d1?auto=format&fit=crop&q=80&w=800",
    isVeg: true
  },
  {
    id: 14,
    name: "Kadai Paneer",
    category: "veg",
    description: "Paneer cooked with bell peppers and freshly ground spices in a kadai.",
    price: 295,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800",
    isVeg: true
  },
  {
    id: 15,
    name: "Shahi Paneer",
    category: "veg",
    description: "Royal cottage cheese preparation in a smooth white nut-based gravy.",
    price: 330,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1601050690597-df056fb17796?auto=format&fit=crop&q=80&w=800",
    isVeg: true
  },
  {
    id: 16,
    name: "Chana Masala",
    category: "veg",
    description: "Spicy chickpeas cooked in a tangy onion-tomato gravy.",
    price: 210,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1585937421612-706a146e499e?auto=format&fit=crop&q=80&w=800",
    isVeg: true
  },
  {
    id: 17,
    name: "Mix Veg Curry",
    category: "veg",
    description: "Assorted seasonal vegetables cooked in a spicy gravy.",
    price: 230,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
    isVeg: true
  },
  {
    id: 18,
    name: "Palak Paneer",
    category: "veg",
    description: "Paneer cubes in a thick paste made from pureed spinach and seasoned with garlic.",
    price: 275,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1601050690397-3ad56839d242?auto=format&fit=crop&q=80&w=800",
    isVeg: true
  },
  {
    id: 19,
    name: "Veg Korma",
    category: "veg",
    description: "Rich and creamy vegetable curry with coconut milk and nuts.",
    price: 300,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=800",
    isVeg: true
  },
  {
    id: 20,
    name: "Methi Matar Malai",
    category: "veg",
    description: "Fenugreek leaves and green peas in a very smooth and creamy gravy.",
    price: 320,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97eb4?auto=format&fit=crop&q=80&w=800",
    isVeg: true
  },
  {
    id: 21,
    name: "Jeera Aloo",
    category: "veg",
    description: "Sautéed potatoes with cumin seeds and mild spices.",
    price: 160,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1626132646522-6b9487cca240?auto=format&fit=crop&q=80&w=800",
    isVeg: true
  },
  {
    id: 22,
    name: "Bhindi Do Pyaza",
    category: "veg",
    description: "Okra cooked with plenty of onions and tangy spices.",
    price: 210,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1631562975993-96024959db2b?auto=format&fit=crop&q=80&w=800",
    isVeg: true
  },
  {
    id: 23,
    name: "Stuffed Capsicum",
    category: "veg",
    description: "Bell peppers stuffed with spiced potato and paneer mash.",
    price: 280,
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1625902870037-ad9af70a7d5b?auto=format&fit=crop&q=80&w=800",
    isVeg: true
  },
  {
    id: 24,
    name: "Vegetable Jalfrezi",
    category: "veg",
    description: "Tangy and spicy stir-fried vegetables with a thick gravy.",
    price: 250,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
    isVeg: true
  },
  {
    id: 25,
    name: "Mushroom Masala",
    category: "veg",
    description: "Button mushrooms in a spicy and aromatic onion-tomato gravy.",
    price: 290,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
    isVeg: true
  },
  {
    id: 26,
    name: "Dum Aloo Kashmiri",
    category: "veg",
    description: "Potatoes deep fried and then slow cooked in a spicy curd based gravy.",
    price: 270,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1626132646522-6b9487cca240?auto=format&fit=crop&q=80&w=800",
    isVeg: true
  },
  {
    id: 27,
    name: "Baby Corn Masala",
    category: "veg",
    description: "Tender baby corn in a thick and creamy orange gravy.",
    price: 280,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1632778149975-420e0e75ee0d?auto=format&fit=crop&q=80&w=800",
    isVeg: true
  },
  {
    id: 28,
    name: "Navratan Korma",
    category: "veg",
    description: "Nine gems of vegetables and fruits in a sweet and spicy white gravy.",
    price: 350,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800",
    isVeg: true
  },

  // --- NON-VEG DISHES (20 items) ---
  {
    id: 5,
    name: "Butter Chicken",
    category: "non-veg",
    description: "Tender chicken pieces in a mild, creamy tomato sauce. The ultimate comfort food.",
    price: 380,
    originalPrice: 450,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1603894584134-f132f1783bcd?auto=format&fit=crop&q=80&w=800",
    tags: ["Must Try"],
    isVeg: false
  },
  {
    id: 6,
    name: "Mutton Dum Biryani",
    category: "non-veg",
    description: "Slow-cooked mutton with basmati rice, saffron, and aromatic spices.",
    price: 450,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&q=80&w=800",
    tags: ["Premium"],
    isVeg: false
  },
  {
    id: 7,
    name: "Tandoori Chicken Full",
    category: "non-veg",
    description: "Whole chicken marinated in yogurt and spices, grilled in a traditional clay oven.",
    price: 520,
    originalPrice: 600,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?auto=format&fit=crop&q=80&w=800",
    tags: ["Festive Special"],
    isVeg: false
  },
  {
    id: 31,
    name: "Chicken Tikka Masala",
    category: "non-veg",
    description: "Roasted chunks of chicken in a spicy, orange-colored, creamy sauce.",
    price: 395,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800",
    isVeg: false
  },
  {
    id: 32,
    name: "Mutton Rogan Josh",
    category: "non-veg",
    description: "A Kashmiri aromatic goat meat dish with flavors of alcanna and ginger.",
    price: 480,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?auto=format&fit=crop&q=80&w=800",
    isVeg: false
  },
  {
    id: 33,
    name: "Chicken Chettinad",
    category: "non-veg",
    description: "A spicy South Indian chicken dish made with plenty of pepper and coconut.",
    price: 360,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1632778149975-420e0e75ee0d?auto=format&fit=crop&q=80&w=800",
    isVeg: false
  },
  {
    id: 34,
    name: "Fish Curry (Goan Style)",
    category: "non-veg",
    description: "Fresh fish in a tangy coconut and tamarind based gravy.",
    price: 410,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97eb4?auto=format&fit=crop&q=80&w=800",
    isVeg: false
  },
  {
    id: 35,
    name: "Prawns Masala",
    category: "non-veg",
    description: "Juicy prawns cooked with onions, tomatoes and exotic spices.",
    price: 490,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1626777552723-5e92751f7e4f?auto=format&fit=crop&q=80&w=800",
    isVeg: false
  },
  {
    id: 36,
    name: "Chicken Seekh Kebab",
    category: "non-veg",
    description: "Minced chicken with spices, grilled on skewers.",
    price: 320,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?auto=format&fit=crop&q=80&w=800",
    isVeg: false
  },
  {
    id: 37,
    name: "Egg Curry",
    category: "non-veg",
    description: "Boiled eggs in a simple yet flavorful onion-tomato gravy.",
    price: 240,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1590480500072-46ccbd100d02?auto=format&fit=crop&q=80&w=800",
    isVeg: false
  },
  {
    id: 38,
    name: "Mutton Kofte",
    category: "non-veg",
    description: "Minced mutton balls in a spicy thick gravy.",
    price: 460,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1590005354167-6da97870c91d?auto=format&fit=crop&q=80&w=800",
    isVeg: false
  },
  {
    id: 39,
    name: "Chicken Korma",
    category: "non-veg",
    description: "Mughlai style chicken curry with nut-based gravy.",
    price: 390,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1601050690597-df056fb17796?auto=format&fit=crop&q=80&w=800",
    isVeg: false
  },
  {
    id: 40,
    name: "Crispy Roasted Duck",
    category: "non-veg",
    description: "Slow roasted duck with honey glaze and herbs.",
    price: 850,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1516684732162-45e053f31923?auto=format&fit=crop&q=80&w=800",
    isVeg: false
  },
  {
    id: 41,
    name: "Beef Vindaloo",
    category: "non-veg",
    description: "A spicy and tangy Goan style beef curry.",
    price: 495,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?auto=format&fit=crop&q=80&w=800",
    isVeg: false
  },
  {
    id: 42,
    name: "Hyderabadi Chicken Biryani",
    category: "non-veg",
    description: "Signature chicken biryani with dum cooking style.",
    price: 340,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?auto=format&fit=crop&q=80&w=800",
    isVeg: false
  },
  {
    id: 43,
    name: "Lucknowi Mutton Biryani",
    category: "non-veg",
    description: "Fragrant and subtle white mutton biryani.",
    price: 480,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&q=80&w=800",
    isVeg: false
  },
  {
    id: 44,
    name: "Tangdi Kebab (4 Pcs)",
    category: "non-veg",
    description: "Chicken drumsticks marinated in rich creamy spices and grilled.",
    price: 380,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?auto=format&fit=crop&q=80&w=800",
    isVeg: false
  },
  {
    id: 45,
    name: "Hariyali Chicken Tikka",
    category: "non-veg",
    description: "Chicken chunks marinated in mint and coriander paste.",
    price: 350,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1632778149975-420e0e75ee0d?auto=format&fit=crop&q=80&w=800",
    isVeg: false
  },
  {
    id: 46,
    name: "Tandoori Fish",
    category: "non-veg",
    description: "Basa fish fillets marinated in tandoori spices and grilled.",
    price: 450,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&q=80&w=800",
    isVeg: false
  },
  {
    id: 47,
    name: "Chicken Lollipop",
    category: "non-veg",
    description: "Indo-Chinese style frenched chicken wings fried and tossed in sauce.",
    price: 290,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?auto=format&fit=crop&q=80&w=800",
    isVeg: false
  },

  // --- SWEETS (20 items) ---
  {
    id: 8,
    name: "Gulab Jamun (2 Pcs)",
    category: "sweets",
    description: "Soft berry-sized balls made with milk solids, soaked in rose flavored sugar syrup.",
    price: 60,
    originalPrice: 80,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1549642050-2f9540026e6d?auto=format&fit=crop&q=80&w=800",
    tags: ["Best Seller"],
    isVeg: true
  },
  {
    id: 9,
    name: "Kaju Katli (250g)",
    category: "sweets",
    description: "Premium cashew nut fudge with a smooth melt-in-the-mouth texture.",
    price: 250,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1590005354167-6da97870c91d?auto=format&fit=crop&q=80&w=800",
    tags: ["Gift Pack"],
    isVeg: true
  },
  {
    id: 10,
    name: "Rasgulla (4 Pcs)",
    category: "sweets",
    description: "Spongy white cheese balls in light sugar syrup, a Bengali delight.",
    price: 100,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1590480500072-46ccbd100d02?auto=format&fit=crop&q=80&w=800",
    isVeg: true
  },
  {
    id: 51,
    name: "Moong Dal Halwa",
    category: "sweets",
    description: "Classic rich dessert made with yellow moong lentils and pure ghee.",
    price: 150,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&q=80&w=800",
    isVeg: true
  },
  {
    id: 52,
    name: "Ras Malai (2 Pcs)",
    category: "sweets",
    description: "Flattened balls of chana soaked in malai flavored with cardamom.",
    price: 120,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1549642050-2f9540026e6d?auto=format&fit=crop&q=80&w=800",
    isVeg: true
  },
  {
    id: 53,
    name: "Gajar Ka Halwa",
    category: "sweets",
    description: "Traditional carrot pudding with milk, sugar and nuts.",
    price: 140,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&q=80&w=800",
    isVeg: true
  },
  {
    id: 54,
    name: "Motichoor Laddu (500g)",
    category: "sweets",
    description: "Saffron flavored tiny boondi balls made into laddus.",
    price: 300,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&q=80&w=800",
    isVeg: true
  },
  {
    id: 55,
    name: "Pista Barfi (250g)",
    category: "sweets",
    description: "Rich pistachio and milk based fudge.",
    price: 280,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1590005354167-6da97870c91d?auto=format&fit=crop&q=80&w=800",
    isVeg: true
  },
  {
    id: 56,
    name: "Jalebi (250g)",
    category: "sweets",
    description: "Crispy fried batter in pretzel shape, soaked in sugar syrup.",
    price: 120,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1549642050-2f9540026e6d?auto=format&fit=crop&q=80&w=800",
    isVeg: true
  },
  {
    id: 57,
    name: "Besan Laddu (500g)",
    category: "sweets",
    description: "Gram flour roasted in ghee and made into delicious balls.",
    price: 260,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&q=80&w=800",
    isVeg: true
  },
  {
    id: 58,
    name: "Mysore Pak (250g)",
    category: "sweets",
    description: "Hard but melt-in-mouth gram flour and ghee sweet from Mysore.",
    price: 220,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&q=80&w=800",
    isVeg: true
  },
  {
    id: 59,
    name: "Milk Cake (250g)",
    category: "sweets",
    description: "Condensed milk based semi-dry sweet with a grainy texture.",
    price: 240,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1590005354167-6da97870c91d?auto=format&fit=crop&q=80&w=800",
    isVeg: true
  },
  {
    id: 60,
    name: "Malpua (4 Pcs)",
    category: "sweets",
    description: "Pancake like dessert soaked in sugar syrup.",
    price: 160,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1549642050-2f9540026e6d?auto=format&fit=crop&q=80&w=800",
    isVeg: true
  },
  {
    id: 61,
    name: "Soan Papdi (500g)",
    category: "sweets",
    description: "Flaky and crisp gram flour sweet.",
    price: 180,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1590005354167-6da97870c91d?auto=format&fit=crop&q=80&w=800",
    isVeg: true
  },
  {
    id: 62,
    name: "Basundi",
    category: "sweets",
    description: "Thickened milk dessert flavored with saffron and nuts.",
    price: 200,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1549642050-2f9540026e6d?auto=format&fit=crop&q=80&w=800",
    isVeg: true
  },
  {
    id: 63,
    name: "Kheer",
    category: "sweets",
    description: "Traditional rice pudding with milk and dry fruits.",
    price: 120,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&q=80&w=800",
    isVeg: true
  },
  {
    id: 64,
    name: "Puran Poli (2 Pcs)",
    category: "sweets",
    description: "Sweet flatbread stuffed with chana dal and jaggery.",
    price: 100,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&q=80&w=800",
    isVeg: true
  },
  {
    id: 65,
    name: "Badam Katli (250g)",
    category: "sweets",
    description: "Premium almond fudge.",
    price: 350,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1590005354167-6da97870c91d?auto=format&fit=crop&q=80&w=800",
    isVeg: true
  },
  {
    id: 66,
    name: "Dharwad Pedha (250g)",
    category: "sweets",
    description: "Traditional milk based sweet from Dharwad.",
    price: 180,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1590005354167-6da97870c91d?auto=format&fit=crop&q=80&w=800",
    isVeg: true
  },
  {
    id: 67,
    name: "Lassi (Sweet)",
    category: "sweets",
    description: "Thick and creamy yogurt drink.",
    price: 80,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1549642050-2f9540026e6d?auto=format&fit=crop&q=80&w=800",
    isVeg: true
  },

  // --- OFFERS / SPECIALS (10 items) ---
  {
    id: 101,
    name: "Weekend Family Feast",
    category: "offers",
    description: "2 Biryanis, 1 Paneer/Chicken Starter, 2 Desserts, and Drinks. Serves 4.",
    price: 999,
    originalPrice: 1499,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=800",
    tags: ["Combo", "Value"],
    isVeg: false
  },
  {
    id: 102,
    name: "Couple's Date Night",
    category: "offers",
    description: "1 Premium Curry, 2 Butter Naans, 1 Starter, and 2 Gulab Jamuns.",
    price: 599,
    originalPrice: 799,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1590480500072-46ccbd100d02?auto=format&fit=crop&q=80&w=800",
    tags: ["Combo"],
    isVeg: true
  },
  {
    id: 103,
    name: "Office Lunch Box",
    category: "offers",
    description: "Dal, Veg Curry, Rice, 2 Rotis, Salad, and Sweet. Perfect for a quick meal.",
    price: 199,
    originalPrice: 249,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
    tags: ["Lunch Special"],
    isVeg: true
  },
  {
    id: 104,
    name: "Biryani Party Pack",
    category: "offers",
    description: "3 Kg Premium Mutton/Chicken Biryani with Raita and Salan. Serves 6-8.",
    price: 1299,
    originalPrice: 1800,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&q=80&w=800",
    tags: ["Party Pack"],
    isVeg: false
  },
  {
    id: 105,
    name: "Student Thali",
    category: "offers",
    description: "Simple home-style meal with Dal, Rice, and 1 seasonal Veg.",
    price: 99,
    originalPrice: 149,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1626132646522-6b9487cca240?auto=format&fit=crop&q=80&w=800",
    tags: ["Budget"],
    isVeg: true
  },
  {
    id: 106,
    name: "Dessert Platter",
    category: "offers",
    description: "Mini portions of Rasmalai, Gulab Jamun, and Kaju Katli.",
    price: 149,
    originalPrice: 199,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1549642050-2f9540026e6d?auto=format&fit=crop&q=80&w=800",
    tags: ["Sweet Deal"],
    isVeg: true
  },
  {
    id: 107,
    name: "Snack Combo",
    category: "offers",
    description: "Samosas (2), Pakoras (4), and Masala Chai.",
    price: 120,
    originalPrice: 160,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1601050690597-df056fb17796?auto=format&fit=crop&q=80&w=800",
    tags: ["Tea Time"],
    isVeg: true
  },
  {
    id: 108,
    name: "Paneer Lover's Combo",
    category: "offers",
    description: "Paneer Butter Masala + 2 Garlic Naans.",
    price: 349,
    originalPrice: 420,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=800",
    tags: ["Popular"],
    isVeg: true
  },
  {
    id: 109,
    name: "Chicken Delight Combo",
    category: "offers",
    description: "Butter Chicken + 2 Laccha Parathas.",
    price: 399,
    originalPrice: 480,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1603894584134-f132f1783bcd?auto=format&fit=crop&q=80&w=800",
    tags: ["Bestseller"],
    isVeg: false
  },
  {
    id: 110,
    name: "Healthy Veg Bowl",
    category: "offers",
    description: "Quinoa, roasted veggies, and paneer with mint chutney.",
    price: 249,
    originalPrice: 320,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
    tags: ["Healthy"],
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
