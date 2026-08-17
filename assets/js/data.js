/* ==========================================================================
   WANDERLUST HORIZON - Realistic Mock Travel Dataset
   ========================================================================== */

const destinationsData = [
  {
    id: "dest-1",
    name: "Bali",
    country: "Indonesia",
    continent: "Asia",
    tagline: "Island of the Gods & Emerald Rice Terraces",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    startingPrice: 899,
    category: "Tropical",
    popular: true,
    description: "Immerse yourself in spiritual serenity, ancient temples, world-class surf breaks, and lush tropical jungle sanctuaries."
  },
  {
    id: "dest-2",
    name: "Swiss Alps",
    country: "Switzerland",
    continent: "Europe",
    tagline: "Majestic Snow Peaks & Crystal Lakes",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80",
    rating: 4.95,
    startingPrice: 1699,
    category: "Mountain",
    popular: true,
    description: "Experience breathtaking alpine vistas, world-renowned ski resorts, scenic glacier train rides, and charming mountain villages."
  },
  {
    id: "dest-3",
    name: "Amalfi Coast",
    country: "Italy",
    continent: "Europe",
    tagline: "Cliffside Pastel Towns & Azure Seas",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
    rating: 4.88,
    startingPrice: 1450,
    category: "Luxury",
    popular: true,
    description: "Drive along iconic Mediterranean coastal roads, sip limoncello in Positano, and cruise around the glamorous island of Capri."
  },
  {
    id: "dest-4",
    name: "Kyoto",
    country: "Japan",
    continent: "Asia",
    tagline: "Historic Shrines, Tea Houses & Bamboo Groves",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    rating: 4.92,
    startingPrice: 1299,
    category: "Cultural",
    popular: true,
    description: "Wander through centuries-old wooden shrines, witness serene cherry blossoms, and experience authentic Japanese tea ceremonies."
  },
  {
    id: "dest-5",
    name: "Santorini",
    country: "Greece",
    continent: "Europe",
    tagline: "Iconic White Cycladic Architecture & Aegean Sunsets",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    startingPrice: 1399,
    category: "Honeymoon",
    popular: true,
    description: "Relax in infinity pools overlooking volcanic calderas, taste fine Assyrtiko wines, and watch world-famous Oia sunsets."
  },
  {
    id: "dest-6",
    name: "Cairo & Giza",
    country: "Egypt",
    continent: "Africa",
    tagline: "Great Pyramids & Ancient Nile Pharaoh Treasures",
    image: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=800&q=80",
    rating: 4.82,
    startingPrice: 999,
    category: "Cultural",
    popular: false,
    description: "Stand before the monumental Pyramids of Giza, explore the Grand Egyptian Museum, and sail down the legendary Nile River."
  },
  {
    id: "dest-7",
    name: "Maui",
    country: "United States",
    continent: "Americas",
    tagline: "Volcano Sunrises, Coral Reefs & Polynesian Heritage",
    image: "https://images.unsplash.com/photo-1542259009477-d625272157b7?auto=format&fit=crop&w=800&q=80",
    rating: 4.89,
    startingPrice: 1599,
    category: "Beach",
    popular: false,
    description: "Drive the scenic Road to Hana, watch the sunrise from Haleakala volcano crater, and swim alongside wild sea turtles."
  },
  {
    id: "dest-8",
    name: "Dubai",
    country: "United Arab Emirates",
    continent: "Middle East",
    tagline: "Futuristic Skyscrapers, Golden Dunes & Luxury Shopping",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
    rating: 4.85,
    startingPrice: 1199,
    category: "Luxury",
    popular: true,
    description: "Experience the pinnacle of luxury, conquer desert sand dunes on 4x4 safaris, and admire the world's tallest tower."
  }
];

const packagesData = [
  {
    id: "pkg-1",
    title: "Bali Tropical Bliss & Ubud Sanctuary",
    destinationId: "dest-1",
    destinationName: "Bali, Indonesia",
    price: 999,
    originalPrice: 1299,
    durationDays: 7,
    rating: 4.9,
    reviewsCount: 142,
    category: "Tropical",
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    description: "Discover the enchanting heart of Bali! Experience private villa living in Ubud, guided tours to Tegallalang rice terraces, sacred monkey forest, and sunset catamarans to Nusa Penida.",
    highlights: [
      "7 Days / 6 Nights in 4-Star Luxury Villa with Private Pool",
      "Daily Gourmet Floating Breakfast & Organic Farm Lunches",
      "Full-Day Excursion to Nusa Penida Kelingking Beach",
      "Traditional Balinese Massage & Spa Treatment",
      "Private Airport Shuttle & Dedicated Local Guide"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Denpasar & Ubud Transfer", details: "Welcome at Ngurah Rai Airport with flower garland, private transfer to Ubud luxury resort. Welcome dinner under the stars." },
      { day: 2, title: "Ubud Cultural Discovery & Rice Terraces", details: "Visit Tegallalang rice terraces, Tirta Empul holy spring temple, and evening traditional Legong dance performance." },
      { day: 3, title: "Mount Batur Sunrise Trekking & Spa", details: "Early morning gentle trek up Mount Batur volcano for sunrise views above the clouds, followed by hot springs relaxation." },
      { day: 4, title: "Island Hopping to Nusa Penida", details: "Speedboat ride to Nusa Penida island to photograph Kelingking T-Rex cliff and snorkel with giant Manta Rays." },
      { day: 5, title: "Seminyak Beach & Sunset Clubbing", details: "Transfer to coastal Seminyak resort. Afternoon at leisure, evening cocktail lounge reservation at Potato Head Beach Club." },
      { day: 6, title: "Ulun Danu Beratan Temple & Waterfall Tour", details: "Discover the iconic lake temple of Bedugul and hike to Banyumala Twin Waterfalls." },
      { day: 7, title: "Souvenir Shopping & Farewell Departure", details: "Visit Denpasar Art Market for authentic handicrafts before private transfer to airport." }
    ],
    included: ["4-Star Resort Accommodation", "Daily Breakfast & 3 Curated Dinners", "All Entrance Fees & Private Transfers", "English Speaking Certified Guide", "Travel Insurance Policy"],
    excluded: ["International Airfare", "Personal Expenses & Tipping", "Alcoholic Beverages (unless noted)"],
    hotelInfo: {
      name: "Ubud Hanging Gardens Resort & Spa",
      stars: 5,
      location: "Ubud Jungle Ravine, Bali",
      amenities: ["Twin-Tiered Infinity Pool", "Overlooking Ayung River", "Holistic Wellness Spa", "Free Shuttle to Ubud Center"]
    }
  },
  {
    id: "pkg-2",
    title: "Swiss Alps Express & Glacier Wonder",
    destinationId: "dest-2",
    destinationName: "Interlaken & Zermatt, Switzerland",
    price: 1899,
    originalPrice: 2200,
    durationDays: 8,
    rating: 4.96,
    reviewsCount: 98,
    category: "Mountain",
    badge: "Top Rated",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80",
    description: "Take the ride of a lifetime through snow-capped Swiss peaks aboard the famous Glacier Express. Explore Jungfraujoch, Zermatt, and Lake Lucerne.",
    highlights: [
      "First-Class Pass on Glacier Express & GoldenPass Express Trains",
      "Summit Excursion to Jungfraujoch - Top of Europe",
      "Matterhorn Views from Gornergrat Mountain Cogwheel Railway",
      "Lake Lucerne Sunset Steamboat Cruise",
      "Traditional Swiss Fondue Tasting Night"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Zurich & Scenic Train to Lucerne", details: "Land in Zurich, board Swiss Rail to lakeside Lucerne. Evening walking tour across Chapel Bridge." },
      { day: 2, title: "Mt. Pilatus Golden Round Trip", details: "Cable car up Mount Pilatus, panoramic alpine views, and world's steepest cogwheel train ride down." },
      { day: 3, title: "Interlaken & Lauterbrunnen Waterfalls Valley", details: "Travel to Interlaken. Explore 72 cascading waterfalls in Lauterbrunnen valley." },
      { day: 4, title: "Jungfraujoch - Top of Europe (3,454m)", details: "Ascend via Eiger Express cable car to the highest railway station in Europe. Tour the Ice Palace." },
      { day: 5, title: "Glacier Express to Zermatt", details: "Scenic panoramic rail journey through alpine gorges and passes arriving at car-free Zermatt." },
      { day: 6, title: "Gornergrat Railway & Matterhorn Reflection Lake", details: "Cogwheel train to Gornergrat 3,100m summit. Hike around Riffelsee reflecting the iconic Matterhorn." },
      { day: 7, title: "Geneva Lake & Castle Chillon", details: "Travel along Lake Geneva, visit medieval Chateau de Chillon castle." },
      { day: 8, title: "Zurich Departure", details: "Return train to Zurich Airport for international departure flight." }
    ],
    included: ["8-Day Swiss Travel Pass (1st Class)", "Alpine Chalet Accommodations", "Daily Buffet Breakfasts", "Mountain Railway Tickets", "24/7 Swiss Tour Assistant"],
    excluded: ["Ski Equipment Rentals", "International Flights", "Optional Paragliding in Interlaken"],
    hotelInfo: {
      name: "The Omnia Alpine Lodge & Spa",
      stars: 5,
      location: "Zermatt Peak, Switzerland",
      amenities: ["Matterhorn View Suites", "Indoor/Outdoor Thermal Pools", "Michelin-Starred Dining", "Ski-in/Ski-out Access"]
    }
  },
  {
    id: "pkg-3",
    title: "Amalfi Coast Luxury & Capri Private Cruise",
    destinationId: "dest-3",
    destinationName: "Amalfi Coast, Italy",
    price: 1599,
    originalPrice: 1950,
    durationDays: 6,
    rating: 4.88,
    reviewsCount: 115,
    category: "Luxury",
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
    description: "Soak up southern Italian romance! Cliffside boutique hotel stays in Sorrento, private yacht tour to Capri's Blue Grotto, and limoncello tastings in Positano.",
    highlights: [
      "Private Speedboat Charter to Capri & Blue Grotto",
      "Positano & Ravello Scenic Guided Drives",
      "Authentic Neapolitan Pizza Masterclass with Italian Chef",
      "Private Wine Tasting at Cliffside Vineyards",
      "Cliffside Infinity Pool Hotel Accommodations"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Naples & Sorrento Transfer", details: "Private VIP transfer from Naples airport/train station to Sorrento boutique cliff hotel. Welcome prosecco." },
      { day: 2, title: "Positano Coastal Beauty & Ravello Gardens", details: "Explore colorful cliffside streets of Positano and historic Villa Cimbrone infinity terrace in Ravello." },
      { day: 3, title: "Capri Island Private Boat Excursion", details: "Full day private boat trip around Capri Island. Swimming in secluded coves & Blue Grotto visit." },
      { day: 4, title: "Amalfi Town & Ancient Cathedral", details: "Visit Amalfi maritime republic history, paper museum, and artisanal limoncello distillery." },
      { day: 5, title: "Pompeii Ruins & Mount Vesuvius Wine Tasting", details: "Guided archaeology tour of ancient Pompeii and volcano foothill vineyard lunch." },
      { day: 6, title: "Departure", details: "Leisurely breakfast overlooking Gulf of Naples before private airport transfer." }
    ],
    included: ["Luxury Boutique Cliff Hotel", "Daily Mediterranean Breakfast", "Private Capri Yacht Cruise", "Limoncello & Wine Tastings", "VIP Mercedes Transfers"],
    excluded: ["Naples Flights", "City Visitor Taxes", "Gratuities"],
    hotelInfo: {
      name: "Grand Hotel Excelsior Vittoria",
      stars: 5,
      location: "Sorrento Cliffs, Amalfi Coast",
      amenities: ["Private Mediterranean Park", "Limo Shuttle", "Michelin Restaurant Terrazza Bosquet", "Private Sea Elevator"]
    }
  },
  {
    id: "pkg-4",
    title: "Kyoto Heritage & Cherry Blossom Dreams",
    destinationId: "dest-4",
    destinationName: "Kyoto & Nara, Japan",
    price: 1399,
    originalPrice: 1650,
    durationDays: 7,
    rating: 4.93,
    reviewsCount: 176,
    category: "Cultural",
    badge: "Trending",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    description: "Step back in time through Japan's cultural heartland. Walk under 10,000 torii gates at Fushimi Inari, wander Arashiyama bamboo forest, and stay in traditional Ryokan.",
    highlights: [
      "2-Night Stay in Authentic Traditional Japanese Ryokan with Onsen Bath",
      "Fushimi Inari Taisha Early Morning Private Tour",
      "Kimono Dressing Experience & Tea Ceremony with Tea Master",
      "Arashiyama Bamboo Grove & Tenryu-ji Temple",
      "Nara Deer Park & Todai-ji Giant Buddha Excursion"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Kansai / Osaka & Bullet Train to Kyoto", details: "Arrival at Kansai Airport, Shinkansen transfer to Kyoto. Check in to traditional Ryokan." },
      { day: 2, title: "Golden Pavilion & Bamboo Grove", details: "Visit Kinkaku-ji (Golden Pavilion), Rock Garden of Ryoan-ji, and stroll Arashiyama Bamboo Grove." },
      { day: 3, title: "Fushimi Inari & Gion Geisha District", details: "Walk through iconic vermilion torii gates at sunrise. Evening walking tour of historical Gion district." },
      { day: 4, title: "Tea Ceremony & Kimono Rental", details: "Dress in silk Kimono, attend authentic matcha tea ceremony, explore Kiyomizu-dera wooden temple." },
      { day: 5, title: "Day Trip to Nara Ancient Capital", details: "Feed friendly bowing deer at Nara Park, admire Todai-ji Great Buddha Bronze statue." },
      { day: 6, title: "Osaka Food Adventure (Dotonbori)", details: "Short train to Osaka for street food tasting (Takoyaki, Okonomiyaki) and neon lit Dotonbori nightlife." },
      { day: 7, title: "Kyoto Departure", details: "Morning souvenir shopping at Nishiki Market before departure train." }
    ],
    included: ["3 Nights Hotel + 3 Nights Ryokan", "Kaiseki Multi-Course Dinners", "JR Rail Pass & Local Metro", "Tea Ceremony & Kimono Rental", "English Tour Escort"],
    excluded: ["International Airfare", "Personal Shopping", "Luggage Forwarding Fees"],
    hotelInfo: {
      name: "Kyoto Ryokan Yachiyo",
      stars: 5,
      location: "Higashiyama, Kyoto",
      amenities: ["Natural Mineral Thermal Onsen", "Japanese Zen Gardens", "Authentic Kaiseki Dining", "Tatami Mat Rooms"]
    }
  },
  {
    id: "pkg-5",
    title: "Santorini Caldera Sunset & Wine Odyssey",
    destinationId: "dest-5",
    destinationName: "Santorini, Greece",
    price: 1499,
    originalPrice: 1800,
    durationDays: 5,
    rating: 4.91,
    reviewsCount: 84,
    category: "Honeymoon",
    badge: "Honeymoon Favorite",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
    description: "The ultimate romantic escape! Stay in cave suites overlooking the Aegean caldera, sail on a luxury catamaran at sunset, and explore black sand volcanic beaches.",
    highlights: [
      "Cave Suite with Private Heated Jacuzzi Overlooking Caldera",
      "5-Hour Sunset Catamaran Cruise with Open Bar & BBQ Dinner",
      "Guided Sommelier Tour of 3 Historic Wineries",
      "Oia Sunset VIP Terrace Table Reservation",
      "Red Beach & Akrotiri Bronze Age Ruins Discovery"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Santorini & Cave Suite Check-In", details: "Welcome at Thira airport/port, private transfer to luxury cave suite in Imerovigli. Chilled Greek wine welcome." },
      { day: 2, title: "Fira to Oia Caldera Hike & Wine Tasting", details: "Scenic cliffside hike from Fira to Oia. Afternoon tour of cliffside vineyards tasting Assyrtiko wines." },
      { day: 3, title: "Volcano Island & Hot Springs Catamaran Cruise", details: "Sail across volcanic caldera, swim in sulfur hot springs, watch famous sunset from water." },
      { day: 4, title: "Red Beach, Black Sand Beach & Akrotiri", details: "Explore unique volcanic sand beaches of Perissa and Akrotiri ancient archaeological ruins." },
      { day: 5, title: "Farewell Santorini", details: "Relaxed poolside morning before private transfer to airport or ferry port." }
    ],
    included: ["Caldera View Luxury Cave Suite", "Daily Champagne Breakfast", "Sunset Catamaran Cruise with Dinner", "Private Airport Transfers", "Wine Tasting Fees"],
    excluded: ["Flights to Greece", "Portage Tips"],
    hotelInfo: {
      name: "Canaves Oia Suites & Spa",
      stars: 5,
      location: "Oia Cliffside, Santorini",
      amenities: ["Infinity Pool Overlooking Volcano", "Caldera Wine Lounge", "Luxury Spa", "24/7 Butler Service"]
    }
  },
  {
    id: "pkg-6",
    title: "Cairo Pyramids & Nile Luxury Cruise Expedition",
    destinationId: "dest-6",
    destinationName: "Cairo & Luxor, Egypt",
    price: 1199,
    originalPrice: 1499,
    durationDays: 8,
    rating: 4.84,
    reviewsCount: 67,
    category: "Cultural",
    badge: "Special Offer",
    image: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=800&q=80",
    description: "Unravel ancient mysteries of Egypt! Standing before the Great Pyramid of Cheops, Tutankhamun's gold treasures, and 4 nights aboard a luxury 5-star Nile cruise ship.",
    highlights: [
      "4-Night 5-Star Deluxe Nile River Cruise (Luxor to Aswan)",
      "Private Egyptologist Guide for All Temple Tours",
      "Camel Ride at Giza Pyramids & Great Sphinx",
      "Hot Air Balloon Sunrise Flight over Valley of the Kings",
      "Khan El-Khalili Bazaar Guided Souk Walk"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Cairo", details: "Meet & greet at Cairo International Airport with fast-track entry visa service. Transfer to 5-star Nile view hotel." },
      { day: 2, title: "Giza Pyramids, Sphinx & Egyptian Museum", details: "Full day tour of Great Pyramids of Giza, Solar Boat Museum, Sphinx, and King Tut treasure room." },
      { day: 3, title: "Flight to Luxor & Cruise Boarding", details: "Morning flight to Luxor. Board 5-star Nile cruise ship. Visit Karnak & Luxor Temples." },
      { day: 4, title: "Valley of the Kings & Sunrise Hot Air Balloon", details: "Optional sunrise hot air balloon over Luxor. Explore King Tut & Ramses tombs in Valley of the Kings." },
      { day: 5, title: "Edfu & Kom Ombo Temples Cruise", details: "Sail along the Nile visiting Falcon God Horus temple at Edfu and Crocodile God temple at Kom Ombo." },
      { day: 6, title: "Aswan Philae Temple & Felucca Sailboat", details: "Arrive in Aswan. Visit Philae Temple of Isis on island and sail traditional wooden Felucca boat." },
      { day: 7, title: "Abu Simbel Excursion & Return to Cairo", details: "Optional flight/drive to colossal Ramses II Abu Simbel temples. Evening return flight to Cairo." },
      { day: 8, title: "Cairo Departure", details: "Transfer to Cairo Airport for international departure." }
    ],
    included: ["3 Nights Hotel + 4 Nights 5-Star Nile Cruise", "All Meals Aboard Nile Cruise", "Domestic Cairo-Luxor/Aswan Flights", "Certified Egyptologist Guide", "All Monument Entry Tickets"],
    excluded: ["Entry Visa Fee ($25)", "Hot Air Balloon Ticket ($120)", "International Airfare"],
    hotelInfo: {
      name: "MS Mayfair Luxury Nile Cruise",
      stars: 5,
      location: "Nile River, Egypt",
      amenities: ["Sun Deck Pool & Bar", "French Balcony Cabins", "Gourmet Restaurant", "Evening Folklore Shows"]
    }
  },
  {
    id: "pkg-7",
    title: "Maui Island Hopping & Helicopter Adventure",
    destinationId: "dest-7",
    destinationName: "Maui, Hawaii, USA",
    price: 1699,
    originalPrice: 1999,
    durationDays: 6,
    rating: 4.89,
    reviewsCount: 53,
    category: "Beach",
    badge: "Adventure",
    image: "https://images.unsplash.com/photo-1542259009477-d625272157b7?auto=format&fit=crop&w=800&q=80",
    description: "Experience Hawaiian paradise! Scenic doors-off helicopter tour over Hana waterfalls, sunrise atop Haleakala volcano, authentic Polynesian Luau, and snorkeling with turtles.",
    highlights: [
      "Doors-Off Doors Helicopter Tour of West Maui & Molokai Waterfalls",
      "Haleakala Crater Sunrise Viewing Tour",
      "Authentic Old Lahaina Luau Feast & Polynesian Fire Dancing",
      "Molokini Crater Turtle Snorkel Catamaran Cruise",
      "Oceanfront Resort Stay on Kaanapali Beach"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Kahului & Beachfront Check-In", details: "Warm Lei greeting at Kahului Airport, pickup convertible rental car or private shuttle to Kaanapali Resort." },
      { day: 2, title: "Road to Hana Scenic Waterfall Drive", details: "Full day journey past rainforests, black sand beaches, bamboo groves, and cascading pools." },
      { day: 3, title: "Molokini Crater Snorkeling & Whale Watching", details: "Catamaran cruise to extinct volcanic crater Molokini for crystal clear snorkeling." },
      { day: 4, title: "Helicopter Flight & Evening Luau", details: "Morning helicopter flight over sea cliffs. Evening authentic Polynesian Luau with roasted pig & roasted mai tais." },
      { day: 5, title: "Haleakala Sunrise & Beach Day", details: "Pre-dawn drive up Haleakala 10,000ft summit for magnificent sunrise. Afternoon relaxing at Kapalua Bay." },
      { day: 6, title: "Aloha Departure", details: "Morning souvenir shopping before airport departure." }
    ],
    included: ["Ocean View Resort Room", "Helicopter Flight Ticket", "Polynesian Luau Ticket", "Catamaran Snorkel Trip", "Daily Beach Chairs & Towels"],
    excluded: ["Hawaii Flights", "Rental Car Gas / Parking"],
    hotelInfo: {
      name: "The Westin Maui Resort & Spa",
      stars: 5,
      location: "Kaanapali Beach, Maui",
      amenities: ["6 Oceanfront Pools & Waterslide", "Heavenly Spa", "Beachfront Luau Grounds", "Golf Course Access"]
    }
  },
  {
    id: "pkg-8",
    title: "Dubai Ultra Luxury & Desert Safari Oasis",
    destinationId: "dest-8",
    destinationName: "Dubai, United Arab Emirates",
    price: 1299,
    originalPrice: 1550,
    durationDays: 5,
    rating: 4.87,
    reviewsCount: 110,
    category: "Luxury",
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
    description: "Step into the future of luxury travel! VIP access to Burj Khalifa 148th floor, 4x4 dune bashing safari with Bedouin dinner, and yacht cruise around Dubai Marina.",
    highlights: [
      "VIP Fast-Track Access to Burj Khalifa At The Top SKY (148th Floor)",
      "Luxury 4x4 Sand Dune Bashing & Bedouin Desert Camp Gala",
      "Private 2-Hour Yacht Tour of Dubai Marina & Atlantis The Palm",
      "Museum of the Future Interactive Admission",
      "5-Star Marina Waterfront Hotel Stay"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Dubai & Limousine Transfer", details: "VIP greeting at Dubai International Airport, private limousine transfer to Marina waterfront 5-star hotel." },
      { day: 2, title: "Futuristic City Tour & Burj Khalifa", details: "Visit Museum of the Future, Dubai Mall, and ascend Burj Khalifa 148th floor VIP lounge." },
      { day: 3, title: "Red Sand Desert Safari & Camel Riding", details: "Afternoon 4x4 dune bashing, camel rides, quad biking, henna painting, and BBQ dinner under desert stars." },
      { day: 4, title: "Private Yacht Cruise & Palm Jumeirah", details: "Private luxury yacht cruise past Dubai Marina skyline and Atlantis The Palm. Afternoon shopping at Gold Souk." },
      { day: 5, title: "Departure", details: "Relax at hotel infinity pool before private transfer to airport." }
    ],
    included: ["5-Star Waterfront Hotel", "Burj Khalifa 148th Floor VIP Ticket", "Desert Safari with Gala Dinner", "Private Airport Limousine", "Daily Breakfast"],
    excluded: ["Dubai Tourism Dirham Fee", "Personal Shopping"],
    hotelInfo: {
      name: "Address Dubai Marina Hotel",
      stars: 5,
      location: "Dubai Marina Promenade",
      amenities: ["Elevated Infinity Pool Overlooking Marina", "Direct Mall Access", "World-Class Spa", "Fine Dining Restaurants"]
    }
  }
];

const staysData = [
  {
    id: "stay-1",
    name: "Amanjiwo Heritage Resort",
    location: "Borobudur, Indonesia",
    pricePerNight: 450,
    rating: 4.95,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    badge: "5-Star Resort",
    type: "Luxury Resort"
  },
  {
    id: "stay-2",
    name: "The Chedi Andermatt Alpine Chalet",
    location: "Swiss Alps, Switzerland",
    pricePerNight: 620,
    rating: 4.92,
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
    badge: "Alpine Chalet",
    type: "Mountain Lodge"
  },
  {
    id: "stay-3",
    name: "Belmond Hotel Caruso Cliffside",
    location: "Ravello, Amalfi Coast",
    pricePerNight: 780,
    rating: 4.98,
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80",
    badge: "Infinity Pool",
    type: "Boutique Hotel"
  },
  {
    id: "stay-4",
    name: "Hoshinoya Kyoto Traditional Sanctuary",
    location: "Arashiyama, Kyoto",
    pricePerNight: 550,
    rating: 4.91,
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
    badge: "Traditional Ryokan",
    type: "Cultural Sanctuary"
  }
];

const activitiesData = [
  {
    id: "act-1",
    title: "Nusa Penida Manta Ray Snorkeling & Speedboat",
    location: "Bali, Indonesia",
    price: 85,
    duration: "Full Day",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
    category: "Water Sports"
  },
  {
    id: "act-2",
    title: "Interlaken Tandem Paragliding over Swiss Lakes",
    location: "Interlaken, Switzerland",
    price: 195,
    duration: "3 Hours",
    rating: 4.97,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    category: "Adventure"
  },
  {
    id: "act-3",
    title: "Capri Sunset Sailboat Cruise with Prosecco",
    location: "Capri, Italy",
    price: 130,
    duration: "4 Hours",
    rating: 4.88,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
    category: "Sailing"
  },
  {
    id: "act-4",
    title: "Authentic Kyoto Tea Ceremony & Gion Walking Tour",
    location: "Kyoto, Japan",
    price: 75,
    duration: "2.5 Hours",
    rating: 4.93,
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
    category: "Culture"
  }
];

const galleryData = [
  {
    id: "gal-1",
    title: "Emerald Rice Terraces of Tegallalang",
    location: "Ubud, Bali",
    category: "Tropical",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "gal-2",
    title: "Majestic Matterhorn Peak Reflection",
    location: "Zermatt, Switzerland",
    category: "Mountains",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "gal-3",
    title: "Positano Cliffside Pastel Village",
    location: "Amalfi Coast, Italy",
    category: "Luxury",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "gal-4",
    title: "Fushimi Inari Vermilion Torii Gates",
    location: "Kyoto, Japan",
    category: "Culture",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "gal-5",
    title: "Santorini Blue Dome Churches at Sunset",
    location: "Oia, Greece",
    category: "Beaches",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "gal-6",
    title: "Great Pyramids of Giza Against Blue Sky",
    location: "Cairo, Egypt",
    category: "Culture",
    image: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "gal-7",
    title: "Maui Ocean Waves & Tropical Sunset",
    location: "Maui, Hawaii",
    category: "Beaches",
    image: "https://images.unsplash.com/photo-1542259009477-d625272157b7?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "gal-8",
    title: "Dubai Marina Skyline Illuminated at Night",
    location: "Dubai, UAE",
    category: "Luxury",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80"
  }
];

const testimonialsData = [
  {
    id: "rev-1",
    name: "Sophia Martinez",
    country: "United States",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    tripTitle: "Bali Tropical Bliss & Ubud Sanctuary",
    date: "July 2026",
    comment: "Aetheria Voyages organized the absolute best vacation of our lives! The private villa in Ubud was magical, and our tour guide went above and beyond every single day. 10/10 service!"
  },
  {
    id: "rev-2",
    name: "Marcus Vance",
    country: "United Kingdom",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    tripTitle: "Swiss Alps Express & Glacier Wonder",
    date: "June 2026",
    comment: "Riding the Glacier Express and ascending Jungfraujoch was a dream come true. The itinerary was perfectly balanced between guided activities and personal leisure time."
  },
  {
    id: "rev-3",
    name: "Elena Rostova",
    country: "Canada",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    tripTitle: "Santorini Caldera Sunset & Wine Odyssey",
    date: "May 2026",
    comment: "Our honeymoon in Santorini was flawless thanks to Aetheria Voyages! The private cave suite had unbelievable views and the sunset catamaran cruise was unforgettable."
  }
];

const faqsData = [
  {
    id: "faq-1",
    category: "Booking",
    question: "How do I confirm my travel package booking?",
    answer: "Once you complete the online booking form and payment simulation, you will instantly receive a digital e-ticket with a unique reference code. A confirmation summary is also saved under 'My Bookings'."
  },
  {
    id: "faq-2",
    category: "Payment",
    question: "What payment methods do you accept?",
    answer: "We support all major Credit/Debit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay. Flexible installment plans are also available for bookings 60+ days in advance."
  },
  {
    id: "faq-3",
    category: "Cancellations",
    question: "What is your cancellation & refund policy?",
    answer: "We offer 100% full refund for cancellations made up to 14 days prior to departure. Cancellations within 7 to 13 days receive a 70% refund or full travel credit valid for 24 months."
  },
  {
    id: "faq-4",
    category: "Visas & Travel",
    question: "Do your packages include flights and entry visas?",
    answer: "Package inclusions are clearly detailed on each package page. Most packages include domestic transfers and fast-track visa assistance, while international flights can be added during step 2 of booking."
  }
];
