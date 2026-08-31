export const initialAds = [
  {
    id: "AD-001",
    title: "Daily Boost",
    description: "Discover a quick productivity tip and unlock a small daily reward.",
    reward: 5,
    currency: "Tokens",
    duration: 10,
    category: "Productivity",
    status: "available",
    icon: "⚡"
  },
  {
    id: "AD-002",
    title: "Survey Pulse",
    description: "Watch a short research preview and earn a participation reward.",
    reward: 8,
    currency: "Tokens",
    duration: 12,
    category: "Research",
    status: "available",
    icon: "◈"
  },
  {
    id: "AD-003",
    title: "App Explorer",
    description: "Preview a useful app experience in a compact sponsored story.",
    reward: 10,
    currency: "Tokens",
    duration: 15,
    category: "Apps",
    status: "available",
    icon: "▣"
  },
  {
    id: "AD-004",
    title: "Fintech Tips",
    description: "Learn one practical money-management idea from a short ad.",
    reward: 6,
    currency: "VEs",
    duration: 8,
    category: "Finance",
    status: "available",
    icon: "₹"
  },
  {
    id: "AD-005",
    title: "Shopping Picks",
    description: "Explore a curated product preview and collect your watch reward.",
    reward: 15,
    currency: "Tokens",
    duration: 20,
    category: "Shopping",
    status: "available",
    icon: "◇"
  },
  {
    id: "AD-006",
    title: "Gaming Preview",
    description: "Watch a short game trailer-style sponsored preview.",
    reward: 20,
    currency: "Tokens",
    duration: 25,
    category: "Entertainment",
    status: "available",
    icon: "◉"
  }
];

export const adConfig = {
  dailyTarget: initialAds.length,
  dailyRewardCap: initialAds.reduce((sum, ad) => sum + ad.reward, 0)
};
