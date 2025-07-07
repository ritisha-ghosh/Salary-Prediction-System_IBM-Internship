export async function predictSalary(formData) {
  // More realistic base salary calculation for Indian market (in INR)
  let baseSalary = 250000 // 2.5 LPA base (more realistic for average Indian)

  // Age factor (more conservative for Indian context)
  const age = Number.parseInt(formData.age)
  if (age >= 22 && age <= 30) {
    baseSalary += (age - 22) * 15000 // Slower growth in early career
  } else if (age > 30 && age <= 40) {
    baseSalary += 120000 + (age - 30) * 25000 // Better growth in mid-career
  } else if (age > 40) {
    baseSalary += 370000 + (age - 40) * 20000 // Senior level growth
  }

  // Experience multiplier (more realistic Indian market rates)
  const experience = Number.parseInt(formData.experience)
  if (experience <= 2) {
    baseSalary += experience * 80000 // 80k per year for freshers
  } else if (experience <= 5) {
    baseSalary += 160000 + (experience - 2) * 100000 // 1L per year for junior
  } else if (experience <= 10) {
    baseSalary += 460000 + (experience - 5) * 120000 // 1.2L per year for mid-level
  } else {
    baseSalary += 1060000 + (experience - 10) * 80000 // 80k per year for senior (diminishing returns)
  }

  // Education level bonus (realistic Indian education system)
  const educationBonus = {
    "12th": -50000, // Below average for 12th pass
    diploma: 0, // Average baseline
    btech: 100000, // Standard engineering bonus
    bca: 50000, // Moderate IT bonus
    bcom: -20000, // Slightly below average
    ba: -30000, // Below average
    bsc: -10000, // Slightly below average
    mtech: 200000, // Good premium for M.Tech
    mca: 150000, // Good IT premium
    mba: 250000, // Strong business premium
    msc: 100000, // Moderate science premium
    phd: 300000, // Research premium
    others: 50000, // Default moderate bonus
  }
  baseSalary += educationBonus[formData.education] || 0

  // Job title multiplier (realistic Indian market)
  const jobTitleMultiplier = {
    "software-developer": 1.0, // Baseline
    "senior-developer": 1.3, // 30% premium
    "tech-lead": 1.5, // 50% premium
    "data-scientist": 1.4, // 40% premium (high demand)
    "data-analyst": 0.9, // 10% below baseline
    "product-manager": 1.4, // 40% premium
    "ui-ux-designer": 1.0, // Baseline
    "business-analyst": 0.9, // 10% below baseline
    "qa-engineer": 0.8, // 20% below baseline
    "devops-engineer": 1.2, // 20% premium
    "project-manager": 1.2, // 20% premium
    "team-lead": 1.3, // 30% premium
    architect: 1.7, // 70% premium
    consultant: 1.1, // 10% premium
    "sales-executive": 0.9, // 10% below baseline
    "hr-executive": 0.8, // 20% below baseline
    "marketing-executive": 0.9, // 10% below baseline
    "finance-analyst": 0.9, // 10% below baseline
    "operations-manager": 1.0, // Baseline
    others: 0.95, // Slightly below baseline
  }
  baseSalary *= jobTitleMultiplier[formData.jobTitle] || 0.95

  // Location adjustment (realistic Indian cities)
  const locationMultiplier = {
    bangalore: 1.12, // 12% premium (IT hub)
    mumbai: 1.15, // 15% premium (financial capital)
    "delhi-ncr": 1.1, // 10% premium (NCR region)
    hyderabad: 1.05, // 5% premium (growing IT hub)
    pune: 1.08, // 8% premium (IT city)
    chennai: 1.03, // 3% premium (South IT hub)
    kolkata: 0.9, // 10% below average
    ahmedabad: 0.95, // 5% below average
    kochi: 0.85, // 15% below average
    indore: 0.8, // 20% below average
    bhubaneswar: 0.75, // 25% below average
    jaipur: 0.85, // 15% below average
    chandigarh: 0.9, // 10% below average
    coimbatore: 0.8, // 20% below average
    nagpur: 0.75, // 25% below average
    remote: 0.9, // 10% below average
    others: 0.85, // 15% below average
  }
  baseSalary *= locationMultiplier[formData.location] || 0.85

  // Company type bonus (realistic Indian market context)
  const companySizeBonus = {
    startup: -50000, // Risk factor, often lower initial pay
    small: 0, // Baseline
    "mid-size": 80000, // Moderate bonus
    "large-indian": 150000, // Good Indian company bonus
    mnc: 300000, // Strong MNC premium
    faang: 600000, // Premium tech companies
    government: -80000, // Government pays less but has benefits
    ngo: -120000, // NGOs typically pay less
    freelance: -30000, // Variable income, lower average
    others: 50000, // Moderate default bonus
  }
  baseSalary += companySizeBonus[formData.companySize] || 0

  // Industry adjustment (realistic Indian market)
  const industryMultiplier = {
    "it-services": 1.0, // Baseline IT industry
    "product-tech": 1.15, // 15% premium for product companies
    fintech: 1.2, // 20% premium (high growth)
    ecommerce: 1.1, // 10% premium
    banking: 1.05, // 5% premium (traditional banking)
    consulting: 1.08, // 8% premium
    healthcare: 0.95, // 5% below average
    education: 0.75, // 25% below average (education sector pays less)
    manufacturing: 0.9, // 10% below average
    retail: 0.85, // 15% below average
    government: 0.7, // 30% below average
    telecom: 0.95, // 5% below average
    media: 0.9, // 10% below average
    "real-estate": 0.95, // 5% below average
    automotive: 0.95, // 5% below average
    agriculture: 0.65, // 35% below average
    logistics: 0.85, // 15% below average
    others: 0.9, // 10% below average
  }
  baseSalary *= industryMultiplier[formData.industry] || 0.9

  // Skills bonus (more conservative for Indian market)
  const skillsCount = formData.skills ? formData.skills.split(",").length : 0
  baseSalary += skillsCount * 25000 // 25k per skill (reduced from 50k)

  // Add realistic randomness (smaller range)
  const randomFactor = 0.92 + Math.random() * 0.16 // ±8% variation
  baseSalary *= randomFactor

  // Ensure minimum salary (realistic floor)
  const predictedSalary = Math.max(Math.round(baseSalary), 180000) // Minimum 1.8 LPA

  // Calculate factors breakdown with realistic impacts
  const factors = [
    {
      name: "Base Salary",
      impact: 250000,
    },
    {
      name: "Experience",
      impact:
        experience <= 2
          ? experience * 80000
          : experience <= 5
            ? 160000 + (experience - 2) * 100000
            : experience <= 10
              ? 460000 + (experience - 5) * 120000
              : 1060000 + (experience - 10) * 80000,
    },
    {
      name: "Education",
      impact: educationBonus[formData.education] || 0,
    },
    {
      name: "Location",
      impact: Math.round(250000 * (locationMultiplier[formData.location] - 1)),
    },
    {
      name: "Company Type",
      impact: companySizeBonus[formData.companySize] || 0,
    },
    {
      name: "Skills",
      impact: skillsCount * 25000,
    },
  ]

  return {
    predictedSalary,
    confidence: Math.round(70 + Math.random() * 25), // 70-95% confidence range
    range: {
      min: Math.round(predictedSalary * 0.8), // ±20% range
      max: Math.round(predictedSalary * 1.2),
    },
    factors: factors.filter((f) => f.impact !== 0),
  }
}
