export const getMarketData = () => {
  // More realistic Indian market data
  const marketData = {
    averageSalaries: {
      "software-developer": 450000, // 4.5 LPA
      "senior-developer": 750000, // 7.5 LPA
      "tech-lead": 1100000, // 11 LPA
      "data-scientist": 800000, // 8 LPA
      "data-analyst": 500000, // 5 LPA
      "product-manager": 900000, // 9 LPA
      "ui-ux-designer": 550000, // 5.5 LPA
      "business-analyst": 480000, // 4.8 LPA
      "qa-engineer": 420000, // 4.2 LPA
      "devops-engineer": 650000, // 6.5 LPA
      "project-manager": 700000, // 7 LPA
      "team-lead": 800000, // 8 LPA
      architect: 1300000, // 13 LPA
      consultant: 600000, // 6 LPA
    },
    locationFactors: {
      bangalore: 1.12,
      mumbai: 1.15,
      "delhi-ncr": 1.1,
      hyderabad: 1.05,
      pune: 1.08,
      chennai: 1.03,
      kolkata: 0.9,
      ahmedabad: 0.95,
      kochi: 0.85,
      indore: 0.8,
      bhubaneswar: 0.75,
      remote: 0.9,
    },
    industryTrends: {
      "it-services": { growth: 8.5, demand: "high", avgSalary: 450000 },
      "product-tech": { growth: 15.2, demand: "very-high", avgSalary: 650000 },
      fintech: { growth: 18.1, demand: "very-high", avgSalary: 700000 },
      ecommerce: { growth: 12.3, demand: "high", avgSalary: 550000 },
      banking: { growth: 6.4, demand: "medium", avgSalary: 480000 },
      consulting: { growth: 7.8, demand: "medium", avgSalary: 520000 },
    },
    companyTypes: {
      startup: { avgSalary: 380000, growth: "high-risk-variable" },
      mnc: { avgSalary: 650000, growth: "stable-good" },
      faang: { avgSalary: 1500000, growth: "premium-excellent" },
      government: { avgSalary: 320000, growth: "stable-low" },
    },
    experienceBands: {
      fresher: { min: 250000, max: 600000, avg: 350000 },
      junior: { min: 400000, max: 800000, avg: 550000 },
      midLevel: { min: 600000, max: 1200000, avg: 800000 },
      senior: { min: 1000000, max: 2000000, avg: 1400000 },
    },
  }

  return marketData
}
