export interface Creator {
  rank?: number;
  name: string;
  id: string;
  handle: string;
  platform: "instagram" | "youtube" | "tiktok" | "blog";
  downloads: number;
  badge: string;
  avatar: string;
  followers?: number;
  isSyncedFromFirestore?: boolean;
  email?: string;
  websiteUrl?: string;
  quizPlayedCount?: number;
  referredDownloads?: number;
  status?: string;
  isApproved?: boolean;
  questions?: QuizQuestion[];
  bio?: string;
  advocateCode?: string;
}

export function getInitials(name?: string): string {
  if (!name) return "KS";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export interface QuizQuestion {
  id?: string;
  question: string;
  options: string[];
  correctIdx: number;
  explanation: string;
  category?: string;
  difficulty?: string;
  hint?: string;
  image?: string;
}

export const DEFAULT_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "Are coffee grounds classified as a Green (Nitrogen) or a Brown (Carbon) in composting?",
    options: [
      "🟢 Green (Nitrogen-rich)",
      "🟤 Brown (Carbon-rich)",
      "❌ Strictly Forbidden"
    ],
    correctIdx: 0,
    explanation: "Even though coffee grounds are dark brown, they are rich in Nitrogen! They serve as energy-packed food for the microbes digesting your pile."
  },
  {
    question: "Which of these kitchen items is strictly forbidden in backyard compost bins?",
    options: [
      "Fruit & vegetable skins",
      "Rinsed & crushed eggshells",
      "Cheese, butter, and frying oils",
      "Unbleached coffee filters"
    ],
    correctIdx: 2,
    explanation: "Dairy products and cooking oils block out critical oxygen, slow down aerobic decomposition, and attract unwanted rodents and pests!"
  },
  {
    question: "What is the perfect baseline ratio of Browns (Carbon) to Greens (Nitrogen) for a sweet-smelling pile?",
    options: [
      "1 Part Brown to 10 Parts Green",
      "2 Parts Brown to 1 Part Green",
      "50 Parts Green to 1 Part Brown"
    ],
    correctIdx: 1,
    explanation: "A balanced 2:1 ratio of dry Carbon-rich Browns (leaves, cardboard) to damp Nitrogen-rich Greens (scraps) maintains airflow and limits bad odors."
  },
  {
    question: "How moist should your composting pile be kept?",
    options: [
      "Bone dry to prevent bugs",
      "Damp like a wrung-out sponge",
      "Completely flooded with standing water"
    ],
    correctIdx: 1,
    explanation: "Microbes and decomposers require moisture to survive and migrate, but excess water drowns them. A damp sponge consistency is perfect!"
  },
  {
    question: "Can you compost cardboard tubes (toilet paper rolls) and clean shredded newspaper?",
    options: [
      "Yes, they make excellent Browns!",
      "No, ink and wood fiber always ruin compost.",
      "Yes, but only if you boil them first."
    ],
    correctIdx: 0,
    explanation: "Yes! Uncoated cardboard, paper tubes, and shredded newsprint are fantastic dry Carbon-rich Browns that keep your heap aerated."
  },
  {
    question: "Are citrus peels (oranges, lemons, limes) safe to add to a worm vermicomposting bin?",
    options: [
      "Yes, in unlimited quantities",
      "In strict moderation (d-limonene can irritate worms)",
      "Never, citrus turns soil into acid"
    ],
    correctIdx: 1,
    explanation: "In small amounts, citrus peels break down fine in traditional compost, but in worm bins, excessive d-limonene oil can irritate worm skin!"
  },
  {
    question: "Are dry pine needles and fallen oak leaves considered Carbon Browns or Nitrogen Greens?",
    options: [
      "🟤 Carbon Browns (Best layered with moist scraps)",
      "🟢 Nitrogen Greens",
      "❌ Toxic waste"
    ],
    correctIdx: 0,
    explanation: "Dry pine needles and autumn leaves are classic Carbon-rich Browns that balance wet food scraps."
  },
  {
    question: "Why should black walnut leaves and wood chips be kept out of your compost pile?",
    options: [
      "They contain Juglone, a natural herbicidal chemical that harms plants",
      "They cause spontaneous combustion",
      "They attract raccoons"
    ],
    correctIdx: 0,
    explanation: "Black walnut trees release Juglone, a natural herbicidal compound that inhibits growth in tomatoes, peppers, and garden plants."
  },
  {
    question: "Can standard tea bags be thrown directly into your compost bin?",
    options: [
      "Only if they are plastic-free (100% paper or natural fibers)",
      "Yes, all tea bags dissolve within 2 days",
      "No, tea leaves ruin compost pH"
    ],
    correctIdx: 0,
    explanation: "Many synthetic tea bags contain plastic polypropylene heat-seal mesh that won't decompose. Stick to plastic-free paper bags!"
  },
  {
    question: "What is the primary indicator that your active compost pile is healthy and working hard?",
    options: [
      "It feels warm/hot in the center (130°F - 150°F)",
      "It smells like strong ammonia",
      "It turns bright yellow"
    ],
    correctIdx: 0,
    explanation: "Active thermophilic aerobic bacteria generate heat as they break down organic matter, raising core temperatures up to 135°F-160°F!"
  }
];

// Memory cache for fetched Firestore creators
const CREATOR_CACHE = new Map<string, Creator>();

export function saveCreatorToCache(creator: Creator): void {
  if (!creator) return;
  if (creator.id) {
    const cleanId = creator.id.toLowerCase().trim();
    CREATOR_CACHE.set(cleanId, creator);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(`ks_creator_cache_${cleanId}`, JSON.stringify(creator));
      } catch {
        // Ignore storage errors
      }
    }
  }
  if (creator.handle) {
    const cleanHandle = creator.handle.toLowerCase().trim().replace(/^@/, "");
    if (cleanHandle) {
      CREATOR_CACHE.set(cleanHandle, creator);
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(`ks_creator_cache_${cleanHandle}`, JSON.stringify(creator));
        } catch {
          // Ignore storage errors
        }
      }
    }
  }
}

export function getCreator(id: string): Creator {
  if (!id) return LEADERBOARD_DATA[0];
  const cleanId = id.toLowerCase().trim().replace(/^@/, "");

  // Check memory cache
  if (CREATOR_CACHE.has(cleanId)) {
    return CREATOR_CACHE.get(cleanId)!;
  }

  // Check localStorage cache if in browser
  if (typeof window !== "undefined") {
    try {
      const cachedStr = localStorage.getItem(`ks_creator_cache_${cleanId}`);
      if (cachedStr) {
        const parsed = JSON.parse(cachedStr);
        if (parsed && parsed.avatar) {
          CREATOR_CACHE.set(cleanId, parsed);
          return parsed;
        }
      }
    } catch {
      // Ignore storage errors
    }
  }

  // Check preset LEADERBOARD_DATA
  const preset = LEADERBOARD_DATA.find((c) => c.id === cleanId);
  if (preset) return preset;

  // Fallback default prettification
  const words = cleanId.replace(/[-_]+/g, " ").split(" ");
  const name = words
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  let platform: "instagram" | "youtube" | "tiktok" | "blog" = "instagram";
  if (cleanId.includes("blog")) platform = "blog";
  else if (cleanId.includes("yt") || cleanId.includes("tube")) platform = "youtube";
  else if (cleanId.includes("tok") || cleanId.includes("tiktok")) platform = "tiktok";

  return {
    name,
    id: cleanId,
    handle: id.startsWith("@") ? id : `@${cleanId}`,
    platform,
    downloads: 0,
    badge: "Partner Advocate 🏆",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80"
  };
}

export const LEADERBOARD_DATA: Creator[] = [
  {
    rank: 1,
    name: "Chef Sarah",
    id: "chef_sarah",
    handle: "@chef_sarah_cooking",
    platform: "instagram",
    downloads: 1240,
    badge: "Creator of the Month 🏆",
    avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=120&auto=format&fit=crop&q=80"
  },
  {
    rank: 2,
    name: "Worm Whisperer",
    id: "worm_whisperer",
    handle: "@balcony_worms",
    platform: "tiktok",
    downloads: 890,
    badge: "Worm Wizard 🪱",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80"
  },
  {
    rank: 3,
    name: "Zero-Waste Club",
    id: "zerowaste_club",
    handle: "@zerowaste_hq",
    platform: "youtube",
    downloads: 650,
    badge: "Soil Champion 🌱",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
  },
  {
    rank: 4,
    name: "Urban Homesteaders",
    id: "urban_homestead",
    handle: "@urban_homestead_blog",
    platform: "blog",
    downloads: 410,
    badge: "Carbon Warrior 🍂",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
  },
  {
    rank: 5,
    name: "Eco Garden Guide",
    id: "eco_garden",
    handle: "@ecogardenguide",
    platform: "instagram",
    downloads: 280,
    badge: "Compost Master 🌿",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80"
  },
  {
    rank: 6,
    name: "Green Living Daily",
    id: "green_living",
    handle: "@greenlivingdaily",
    platform: "youtube",
    downloads: 190,
    badge: "Zero Waste Pioneer ♻️",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80"
  }
];


