// Dummy event data
export const dummyEvents = [
  {
    id: "1",
    slug: "grand-cricket-tournament",
    name: "Grand Cricket Tournament",
    date: "August 15, 2025",
    time: "10:00 AM - 6:00 PM",
    location: "National Stadium, Dhaka",
    description:
      "Join us for the grand finale of the most anticipated cricket tournament of the year! Witness top teams battle it out for supremacy in a day full of thrilling action, spectacular catches, and powerful hits. Food and beverage stalls will be available. Don't miss this epic showdown!",
    image: "/placeholder.svg?height=400&width=600",
    category: "Sports",
    tickets: [
      {
        id: "t1",
        type: "Basic",
        price: 500,
        quantity: 200,
        features: [
          "Access to general stands",
          "First-come, first-served seating",
        ],
      },
      {
        id: "t2",
        type: "Standard",
        price: 1200,
        quantity: 100,
        features: [
          "Access to reserved seating area",
          "Complimentary soft drink",
        ],
      },
      {
        id: "t3",
        type: "Advanced",
        price: 2500,
        quantity: 50,
        features: [
          "VIP lounge access",
          "Premium seating",
          "Exclusive merchandise voucher",
          "Meet & Greet opportunity",
        ],
      },
    ],
  },
  {
    id: "2",
    slug: "rock-fusion-concert",
    name: "Rock Fusion Concert",
    date: "September 01, 2025",
    time: "7:00 PM - 11:00 PM",
    location: "Bashundhara Convention Center, Dhaka",
    description:
      "Prepare for an electrifying night of rock and fusion music! Featuring renowned bands and emerging artists, this concert promises an unforgettable experience. High-energy performances, stunning light shows, and a vibrant atmosphere await. Get ready to headbang!",
    image: "/placeholder.svg?height=400&width=600",
    category: "Concert",
    tickets: [
      {
        id: "t4",
        type: "Basic",
        price: 800,
        quantity: 300,
        features: ["General admission", "Standing area"],
      },
      {
        id: "t5",
        type: "Standard",
        price: 1800,
        quantity: 150,
        features: ["Front section access", "Dedicated bar access"],
      },
      {
        id: "t6",
        type: "Advanced",
        price: 3500,
        quantity: 75,
        features: [
          "VIP seating",
          "Backstage tour lottery",
          "Complimentary snacks and drinks",
        ],
      },
    ],
  },
  {
    id: "3",
    slug: "football-fan-fest",
    name: "Football Fan Fest",
    date: "August 20, 2025",
    time: "5:00 PM - 9:00 PM",
    location: "Army Stadium, Dhaka",
    description:
      "Experience the thrill of the biggest football match on giant screens with thousands of fellow fans! Enjoy live music, food trucks, and interactive games before and after the match. A perfect day out for football enthusiasts of all ages.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Sports",
    tickets: [
      {
        id: "t7",
        type: "Basic",
        price: 300,
        quantity: 400,
        features: ["General entry", "Access to fan zone"],
      },
      {
        id: "t8",
        type: "Standard",
        price: 700,
        quantity: 200,
        features: ["Reserved seating near screen", "Fan kit included"],
      },
      {
        id: "t9",
        type: "Advanced",
        price: 1500,
        quantity: 80,
        features: [
          "Premium viewing area",
          "Exclusive merchandise",
          "Meet & Greet with local football legends",
        ],
      },
    ],
  },
  {
    id: "4",
    slug: "classical-music-gala",
    name: "Classical Music Gala",
    date: "October 10, 2025",
    time: "6:30 PM - 9:30 PM",
    location: "Bangladesh Shilpakala Academy, Dhaka",
    description:
      "Immerse yourself in an evening of timeless melodies and exquisite harmonies. Featuring world-renowned classical musicians and a grand orchestra, this gala promises a captivating auditory journey. A perfect event for connoisseurs of classical music.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Concert",
    tickets: [
      {
        id: "t10",
        type: "Basic",
        price: 600,
        quantity: 150,
        features: ["Standard seating"],
      },
      {
        id: "t11",
        type: "Standard",
        price: 1500,
        quantity: 80,
        features: ["Preferred seating", "Complimentary program booklet"],
      },
      {
        id: "t12",
        type: "Advanced",
        price: 3000,
        quantity: 40,
        features: [
          "Front row seating",
          "Exclusive pre-show reception",
          "Signed memorabilia",
        ],
      },
    ],
  },
];

// Dummy promo codes
export const promoCodes = {
  SAVE10: { discount: 0.1, type: "percentage" }, // 10% off
  FLAT200: { discount: 200, type: "flat" }, // 200 BDT off
};

// Dummy purchased tickets data
export const dummyPurchasedTickets = [
  {
    id: "p1",
    eventName: "Grand Cricket Tournament",
    ticketType: "Standard",
    purchaseDate: "2025-07-10",
    pdfUrl: "/dummy-ticket.pdf", // Placeholder PDF URL
  },
  {
    id: "p2",
    eventName: "Rock Fusion Concert",
    ticketType: "Basic",
    purchaseDate: "2025-07-05",
    pdfUrl: "/dummy-ticket.pdf", // Placeholder PDF URL
  },
];
