// src/data/mockData.js
export const generateMockData = () => {
  const today = new Date();
  const dailyData = [];

  // Generate 30 days of data
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    // Create realistic patterns with random variations
    const dayFactor = 1 + Math.sin(i / 5) * 0.2;
    const randomFactor = 0.8 + Math.random() * 0.4;

    const baseRevenue = 10000 + i * 200;
    const baseUsers = 1500 + i * 30;
    const baseConversions = 120 + i * 4;

    // Generate campaign data
    const campaigns = [
      {
        id: 1,
        name: "Summer Sale",
        spend: Math.round(1200 * dayFactor * randomFactor),
        impressions: Math.round(15000 * dayFactor * randomFactor),
        clicks: Math.round(750 * dayFactor * randomFactor),
        conversions: Math.round(85 * dayFactor * randomFactor),
        roi: Math.round(320 * dayFactor * randomFactor) / 100,
      },
      {
        id: 2,
        name: "Brand Awareness",
        spend: Math.round(950 * dayFactor * randomFactor),
        impressions: Math.round(22000 * dayFactor * randomFactor),
        clicks: Math.round(620 * dayFactor * randomFactor),
        conversions: Math.round(45 * dayFactor * randomFactor),
        roi: Math.round(180 * dayFactor * randomFactor) / 100,
      },
      {
        id: 3,
        name: "Product Launch",
        spend: Math.round(1800 * dayFactor * randomFactor),
        impressions: Math.round(18500 * dayFactor * randomFactor),
        clicks: Math.round(920 * dayFactor * randomFactor),
        conversions: Math.round(110 * dayFactor * randomFactor),
        roi: Math.round(410 * dayFactor * randomFactor) / 100,
      },
      {
        id: 4,
        name: "Retargeting",
        spend: Math.round(750 * dayFactor * randomFactor),
        impressions: Math.round(8500 * dayFactor * randomFactor),
        clicks: Math.round(580 * dayFactor * randomFactor),
        conversions: Math.round(95 * dayFactor * randomFactor),
        roi: Math.round(480 * dayFactor * randomFactor) / 100,
      },
      {
        id: 5,
        name: "Email Campaign",
        spend: Math.round(350 * dayFactor * randomFactor),
        impressions: Math.round(12000 * dayFactor * randomFactor),
        clicks: Math.round(420 * dayFactor * randomFactor),
        conversions: Math.round(65 * dayFactor * randomFactor),
        roi: Math.round(560 * dayFactor * randomFactor) / 100,
      },
      {
        id: 6,
        name: "Social Media",
        spend: Math.round(1100 * dayFactor * randomFactor),
        impressions: Math.round(28000 * dayFactor * randomFactor),
        clicks: Math.round(1200 * dayFactor * randomFactor),
        conversions: Math.round(105 * dayFactor * randomFactor),
        roi: Math.round(370 * dayFactor * randomFactor) / 100,
      },
      {
        id: 7,
        name: "Search Ads",
        spend: Math.round(1500 * dayFactor * randomFactor),
        impressions: Math.round(14000 * dayFactor * randomFactor),
        clicks: Math.round(820 * dayFactor * randomFactor),
        conversions: Math.round(92 * dayFactor * randomFactor),
        roi: Math.round(290 * dayFactor * randomFactor) / 100,
      },
      {
        id: 8,
        name: "Display Ads",
        spend: Math.round(850 * dayFactor * randomFactor),
        impressions: Math.round(32000 * dayFactor * randomFactor),
        clicks: Math.round(480 * dayFactor * randomFactor),
        conversions: Math.round(45 * dayFactor * randomFactor),
        roi: Math.round(180 * dayFactor * randomFactor) / 100,
      },
      {
        id: 9,
        name: "Video Campaign",
        spend: Math.round(1300 * dayFactor * randomFactor),
        impressions: Math.round(18500 * dayFactor * randomFactor),
        clicks: Math.round(720 * dayFactor * randomFactor),
        conversions: Math.round(78 * dayFactor * randomFactor),
        roi: Math.round(250 * dayFactor * randomFactor) / 100,
      },
      {
        id: 10,
        name: "Affiliate Marketing",
        spend: Math.round(650 * dayFactor * randomFactor),
        impressions: Math.round(9500 * dayFactor * randomFactor),
        clicks: Math.round(380 * dayFactor * randomFactor),
        conversions: Math.round(42 * dayFactor * randomFactor),
        roi: Math.round(220 * dayFactor * randomFactor) / 100,
      },
      {
        id: 11,
        name: "Influencer Campaign",
        spend: Math.round(1200 * dayFactor * randomFactor),
        impressions: Math.round(25000 * dayFactor * randomFactor),
        clicks: Math.round(950 * dayFactor * randomFactor),
        conversions: Math.round(88 * dayFactor * randomFactor),
        roi: Math.round(280 * dayFactor * randomFactor) / 100,
      },
      {
        id: 12,
        name: "Holiday Promotion",
        spend: Math.round(1750 * dayFactor * randomFactor),
        impressions: Math.round(30000 * dayFactor * randomFactor),
        clicks: Math.round(1400 * dayFactor * randomFactor),
        conversions: Math.round(145 * dayFactor * randomFactor),
        roi: Math.round(390 * dayFactor * randomFactor) / 100,
      },
      {
        id: 13,
        name: "Flash Sale",
        spend: Math.round(900 * dayFactor * randomFactor),
        impressions: Math.round(16000 * dayFactor * randomFactor),
        clicks: Math.round(850 * dayFactor * randomFactor),
        conversions: Math.round(110 * dayFactor * randomFactor),
        roi: Math.round(450 * dayFactor * randomFactor) / 100,
      },
      {
        id: 14,
        name: "Loyalty Program",
        spend: Math.round(550 * dayFactor * randomFactor),
        impressions: Math.round(7500 * dayFactor * randomFactor),
        clicks: Math.round(420 * dayFactor * randomFactor),
        conversions: Math.round(85 * dayFactor * randomFactor),
        roi: Math.round(520 * dayFactor * randomFactor) / 100,
      },
      {
        id: 15,
        name: "New Customer Offer",
        spend: Math.round(800 * dayFactor * randomFactor),
        impressions: Math.round(13000 * dayFactor * randomFactor),
        clicks: Math.round(680 * dayFactor * randomFactor),
        conversions: Math.round(95 * dayFactor * randomFactor),
        roi: Math.round(410 * dayFactor * randomFactor) / 100,
      },
    ];

    // Channel performance data
    const channelPerformance = {
      social: Math.round(28 * dayFactor * randomFactor),
      search: Math.round(35 * dayFactor * randomFactor),
      email: Math.round(15 * dayFactor * randomFactor),
      direct: Math.round(12 * dayFactor * randomFactor),
      referral: Math.round(10 * dayFactor * randomFactor),
    };

    dailyData.push({
      date: date.toISOString(),
      revenue: Math.round(baseRevenue * dayFactor * randomFactor),
      users: Math.round(baseUsers * dayFactor * randomFactor),
      conversions: Math.round(baseConversions * dayFactor * randomFactor),
      campaigns,
      channelPerformance,
    });
  }

  return dailyData;
};

export const getOverviewData = () => {
  const data = generateMockData();
  const current = data[data.length - 1];
  const previous = data[data.length - 2];

  return {
    metrics: {
      revenue: current.revenue,
      users: current.users,
      conversions: current.conversions,
    },
    growth: {
      revenue: ((current.revenue - previous.revenue) / previous.revenue) * 100,
      users: ((current.users - previous.users) / previous.users) * 100,
      conversions:
        ((current.conversions - previous.conversions) / previous.conversions) *
        100,
    },
  };
};

export const getChartData = () => {
  const data = generateMockData();

  const lineChartData = data.map((item) => ({
    date: item.date,
    revenue: item.revenue,
    users: item.users,
    conversions: item.conversions,
  }));

  const latestData = data[data.length - 1];
  const pieChartData = Object.entries(latestData.channelPerformance).map(
    ([channel, value]) => ({
      channel,
      value,
    })
  );

  const barChartData = data.slice(-7).map((item) => ({
    date: item.date,
    campaigns: item.campaigns.slice(0, 5).map((campaign) => ({
      name: campaign.name,
      conversions: campaign.conversions,
    })),
  }));

  return {
    lineChartData,
    pieChartData,
    barChartData,
  };
};

export const getCampaignsData = (
  page = 1,
  limit = 10,
  sort = "spend",
  order = "desc"
) => {
  const data = generateMockData();
  const latestData = data[data.length - 1];
  let campaigns = [...latestData.campaigns];

  // Sort campaigns
  campaigns.sort((a, b) => {
    return order === "desc" ? b[sort] - a[sort] : a[sort] - b[sort];
  });

  // Paginate
  const skip = (page - 1) * limit;
  const paginatedCampaigns = campaigns.slice(skip, skip + parseInt(limit));

  // Add calculated fields
  const enhancedCampaigns = paginatedCampaigns.map((campaign) => ({
    ...campaign,
    ctr: (campaign.clicks / campaign.impressions) * 100,
    cpc: campaign.spend / campaign.clicks,
  }));

  return {
    campaigns: enhancedCampaigns,
    total: campaigns.length,
    page: parseInt(page),
    totalPages: Math.ceil(campaigns.length / limit),
  };
};
