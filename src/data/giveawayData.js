export const giveawayData = {
  id: "GW-2026-08",
  title: "Summer Rewards Giveaway",
  slug: "summer-rewards",
  description: "Complete eligible activities, collect entries and get a chance to win premium rewards.",
  status: "ACTIVE",
  startAt: "2026-08-01T00:00:00+05:30",
  endAt: "2026-09-12T23:59:59+05:30",
  participants: 8500,
  totalGiveaways: 24,
  prizesWon: 1200,
  currentUserId: "VE10025",
  userEntries: 24,
  userJoined: false,
  balances: { VEs: 850, SVEs: 1200, Tokens: 5000 },
  prizes: [
    {
      id: "PRIZE-001",
      name: "iPhone 15 Pro",
      position: "1st Prize",
      description: "Premium smartphone reward.",
      winnerCount: 1,
      type: "PHYSICAL",
      claimType: "physical",
      entryCurrency: "VEs",
      entryFee: 250,
      participants: "2.3K+",
      icon: "📱",
      slug: "iphone-15-pro"
    },
    {
      id: "PRIZE-002",
      name: "Apple Watch Series 9",
      position: "2nd Prize",
      description: "Smartwatch reward for a selected participant.",
      winnerCount: 3,
      type: "PHYSICAL",
      claimType: "physical",
      entryCurrency: "VEs",
      entryFee: 200,
      participants: "1.8K+",
      icon: "⌚",
      slug: "apple-watch"
    },
    {
      id: "PRIZE-003",
      name: "AirPods Pro",
      position: "3rd Prize",
      description: "Wireless audio reward.",
      winnerCount: 5,
      type: "PHYSICAL",
      claimType: "physical",
      entryCurrency: "SVEs",
      entryFee: 500,
      participants: "1.5K+",
      icon: "🎧",
      slug: "airpods"
    },
    {
      id: "PRIZE-004",
      name: "₹2,000 Amazon Voucher",
      position: "Lucky Draw",
      description: "Digital gift-card reward.",
      winnerCount: 10,
      type: "GIFT_CARD",
      claimType: "gift_card",
      entryCurrency: "VEs",
      entryFee: 500,
      participants: "3.1K+",
      icon: "🎁",
      slug: "amazon-2000"
    },
    {
      id: "PRIZE-005",
      name: "₹500 Amazon Voucher",
      position: "Lucky Draw",
      description: "Digital gift-card reward.",
      winnerCount: 15,
      type: "GIFT_CARD",
      claimType: "gift_card",
      entryCurrency: "VEs",
      entryFee: 300,
      participants: "2.7K+",
      icon: "🛍️",
      slug: "amazon-500"
    },
    {
      id: "PRIZE-006",
      name: "₹20 Voucher",
      position: "Bonus Draw",
      description: "Small digital voucher reward.",
      winnerCount: 25,
      type: "DIGITAL",
      claimType: "gift_card",
      entryCurrency: "Tokens",
      entryFee: 2000,
      participants: "4.2K+",
      icon: "🏷️",
      slug: "amazon-20"
    }
  ],
  rules: [
    "Eligibility requirements are checked before participation.",
    "One participation per user per giveaway event is the demo rule.",
    "Entry fee and currency are read from giveaway configuration.",
    "Winner selection occurs after the event ends.",
    "Claim information is collected only for fulfillment.",
    "Suspicious, fraudulent or abusive activity may be rejected according to platform rules."
  ]
};

export const winnerData = [
  { userId: "VE10025", displayId: "VE****25", prize: "Apple Watch Series 9", status: "WINNER", claimStatus: "NOT_SUBMITTED" },
  { userId: "VE10042", displayId: "VE****42", prize: "iPhone 15 Pro", status: "WINNER" },
  { userId: "VE10091", displayId: "VE****91", prize: "AirPods Pro", status: "WINNER" }
];

export const previousWinners = [
  { userId: "VE****82", prize: "iPhone 15 Pro", giveaway: "August Reward Rush", date: "05 Aug 2026", category: "Physical", status: "Delivered" },
  { userId: "VE****42", prize: "Apple Watch Series 9", giveaway: "Summer Rewards", date: "06 Aug 2026", category: "Physical", status: "Delivered" },
  { userId: "VE****27", prize: "AirPods Pro", giveaway: "Monsoon Rewards", date: "12 Jul 2026", category: "Physical", status: "Delivered" }
];

export const winnerMessages = [
  "VE****21 won an iPhone 15 Pro!",
  "VE****83 won an Apple Watch!",
  "VE****54 won AirPods Pro!",
  "VE****92 won an Amazon Gift Card!"
];
