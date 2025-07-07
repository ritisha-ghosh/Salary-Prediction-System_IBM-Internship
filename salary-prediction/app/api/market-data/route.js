export async function GET() {
  // Indian market data API
  const marketData = {
    averageSalaries: {
      "software-developer": 650000,
      "senior-developer": 1200000,
      "tech-lead": 1800000,
      "data-scientist": 1100000,
      "data-analyst": 750000,
      "product-manager": 1500000,
      "ui-ux-designer": 850000,
      "business-analyst": 800000,
      "qa-engineer": 600000,
      "devops-engineer": 1000000,
      "project-manager": 1200000,
      "team-lead": 1300000,
      architect: 2200000,
      consultant: 950000,
    },
    locationFactors: {
      bangalore: 1.15,
      mumbai: 1.2,
      "delhi-ncr": 1.18,
      hyderabad: 1.1,
      pune: 1.12,
      chennai: 1.08,
      kolkata: 0.95,
      ahmedabad: 1.0,
      kochi: 0.9,
      indore: 0.85,
      bhubaneswar: 0.8,
      remote: 0.95,
    },
    industryTrends: {
      "it-services": { growth: 12.5, demand: "high" },
      "product-tech": { growth: 18.2, demand: "very-high" },
      fintech: { growth: 22.1, demand: "very-high" },
      ecommerce: { growth: 15.3, demand: "high" },
      banking: { growth: 8.4, demand: "medium" },
      consulting: { growth: 10.3, demand: "medium" },
    },
    companyTypes: {
      startup: { avgSalary: 650000, growth: "high-risk-high-reward" },
      mnc: { avgSalary: 1200000, growth: "stable" },
      faang: { avgSalary: 2500000, growth: "premium" },
      government: { avgSalary: 450000, growth: "stable-low" },
    },
  }

  return Response.json(marketData)
}
