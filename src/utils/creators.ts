export interface Creator {
    rank?: number;
    name: string;
    id: string;
    handle: string;
    platform: "instagram" | "youtube" | "tiktok" | "blog";
    downloads: number;
    badge: string;
    avatar: string;
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
        handle: "urban_homestead_blog",
        platform: "blog",
        downloads: 410,
        badge: "Carbon Warrior 🍂",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
    }
];

export function getCreator(id: string): Creator {
    const cleanId = id.toLowerCase().trim();
    const preset = LEADERBOARD_DATA.find((c) => c.id === cleanId);
    if (preset) return preset;

    // Prettify name
    const words = cleanId.replace(/[-_]+/g, " ").split(" ");
    const name = words
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

    // Determine platform guess based on id format
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
