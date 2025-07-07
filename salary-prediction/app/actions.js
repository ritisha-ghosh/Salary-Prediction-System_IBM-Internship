"use server"

export async function predictSalary(formData) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Base salary calculation for Indian market (in INR)
  let baseSalary = 350000 // 3.5 LPA base

  // Age factor (peak earning years in Indian context)
  const age = Number.parseInt(formData.age)
  if (age >= 25 && age <= 40) {
    baseSalary += (age - 25) * 25000
  } else if (age > 40) {
    baseSalary += 375000 + (age - 40) * 15000
  }

  // Experience multiplier (Indian market rates)
  const experience = Number.parseInt(formData.experience)
  baseSalary += experience * 120000 // 1.2 LPA per year of experience

  // Education level bonus (Indian education system)
  const educationBonus = {
    "12th": 0,
    diploma: 50000,
    btech: 200000,
    bca: 150000,
    bcom: 100000,
    ba: 80000,
    bsc: 90000,
    mtech: 350000,
    mca: 250000,
    mba: 400000,
    msc: 200000,
    phd: 500000,
    others: 150000, // Default bonus for custom education
  }
  baseSalary += educationBonus[formData.education] || 0

  // Job title multiplier (Indian market)
  const jobTitleMultiplier = {
    "software-developer": 1.0,
    "senior-developer": 1.4,
    "tech-lead": 1.7,
    "data-scientist": 1.5,
    "data-analyst": 1.1,
    "product-manager": 1.6,
    "ui-ux-designer": 1.2,
    "business-analyst": 1.1,
    "qa-engineer": 0.9,
    "devops-engineer": 1.3,
    "project-manager": 1.4,
    "team-lead": 1.5,
    architect: 2.0,
    consultant: 1.3,
    "sales-executive": 1.0,
    "hr-executive": 0.9,
    "marketing-executive": 1.0,
    "finance-analyst": 1.1,
    "operations-manager": 1.2,
    others: 1.0, // Default multiplier for custom job titles
  }
  baseSalary *= jobTitleMultiplier[formData.jobTitle] || 1.0

  // Location adjustment (Indian cities)
  const locationMultiplier = {
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
    jaipur: 0.9,
    chandigarh: 0.95,
    coimbatore: 0.85,
    nagpur: 0.8,
    remote: 0.95,
    others: 0.9, // Default multiplier for custom locations
  }
  baseSalary *= locationMultiplier[formData.location] || 0.9

  // Company type bonus (Indian market context)
  const companySizeBonus = {
    startup: 0,
    small: 100000,
    "mid-size": 200000,
    "large-indian": 300000,
    mnc: 500000,
    faang: 800000,
    government: -100000, // Government jobs typically pay less but have other benefits
    ngo: -150000,
    freelance: -50000,
    others: 100000, // Default bonus for custom company types
  }
  baseSalary += companySizeBonus[formData.companySize] || 0

  // Industry adjustment (Indian market)
  const industryMultiplier = {
    "it-services": 1.0,
    "product-tech": 1.25,
    fintech: 1.3,
    ecommerce: 1.2,
    banking: 1.15,
    consulting: 1.1,
    healthcare: 1.05,
    education: 0.85,
    manufacturing: 0.95,
    retail: 0.9,
    government: 0.8,
    telecom: 1.05,
    media: 0.95,
    "real-estate": 1.0,
    automotive: 1.0,
    agriculture: 0.75,
    logistics: 0.9,
    others: 1.0, // Default multiplier for custom industries
  }
  baseSalary *= industryMultiplier[formData.industry] || 1.0

  // Skills bonus (Indian tech market)
  const skillsCount = formData.skills ? formData.skills.split(",").length : 0
  baseSalary += skillsCount * 50000 // 50k per skill

  // Add some randomness for realism
  const randomFactor = 0.9 + Math.random() * 0.2
  baseSalary *= randomFactor

  const predictedSalary = Math.round(baseSalary)

  // Calculate factors breakdown
  const factors = [
    {
      name: "Base Salary",
      impact: 350000,
    },
    {
      name: "Experience",
      impact: experience * 120000,
    },
    {
      name: "Education",
      impact: educationBonus[formData.education] || 0,
    },
    {
      name: "Location",
      impact: Math.round(350000 * (locationMultiplier[formData.location] - 1)),
    },
    {
      name: "Company Type",
      impact: companySizeBonus[formData.companySize] || 0,
    },
    {
      name: "Skills",
      impact: skillsCount * 50000,
    },
  ]

  return {
    predictedSalary,
    confidence: Math.round(75 + Math.random() * 20),
    range: {
      min: Math.round(predictedSalary * 0.85),
      max: Math.round(predictedSalary * 1.15),
    },
    factors: factors.filter((f) => f.impact !== 0),
  }
}
