"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ComparisonTable({ comparisons }) {
  if (comparisons.length === 0) {
    return (
      <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50">
        <CardHeader>
          <CardTitle>Salary Comparisons</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <p>No comparisons yet. Make a prediction to see comparisons here.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const formatJobTitle = (title, customTitle) => {
    if (title === "others" && customTitle) {
      return customTitle
    }
    return title
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  const formatLocation = (location, customLocation) => {
    if (location === "others" && customLocation) {
      return customLocation
    }
    const locationMap = {
      bangalore: "Bangalore",
      mumbai: "Mumbai",
      "delhi-ncr": "Delhi NCR",
      hyderabad: "Hyderabad",
      pune: "Pune",
      chennai: "Chennai",
      kolkata: "Kolkata",
      ahmedabad: "Ahmedabad",
      kochi: "Kochi",
      indore: "Indore",
      bhubaneswar: "Bhubaneswar",
      jaipur: "Jaipur",
      chandigarh: "Chandigarh",
      coimbatore: "Coimbatore",
      nagpur: "Nagpur",
      remote: "Remote",
    }
    return locationMap[location] || location
  }

  const formatEducation = (education, customEducation) => {
    if (education === "others" && customEducation) {
      return customEducation
    }
    const educationMap = {
      "12th": "12th Pass",
      diploma: "Diploma",
      btech: "B.Tech/B.E",
      bca: "BCA",
      bcom: "B.Com",
      ba: "B.A",
      bsc: "B.Sc",
      mtech: "M.Tech/M.E",
      mca: "MCA",
      mba: "MBA",
      msc: "M.Sc",
      phd: "PhD",
    }
    return educationMap[education] || education
  }

  const formatCompanySize = (companySize, customCompanySize) => {
    if (companySize === "others" && customCompanySize) {
      return customCompanySize
    }
    const companySizeMap = {
      startup: "Startup",
      small: "Small Company",
      "mid-size": "Mid-size",
      "large-indian": "Large Indian Company",
      mnc: "MNC",
      faang: "FAANG/Top Tech",
      government: "Government/PSU",
      ngo: "NGO/Non-Profit",
      freelance: "Freelance",
    }
    return companySizeMap[companySize] || companySize
  }

  const formatIndustry = (industry, customIndustry) => {
    if (industry === "others" && customIndustry) {
      return customIndustry
    }
    const industryMap = {
      "it-services": "IT Services",
      "product-tech": "Product/Tech",
      fintech: "Fintech",
      ecommerce: "E-commerce",
      banking: "Banking/Finance",
      consulting: "Consulting",
      healthcare: "Healthcare",
      education: "Education/EdTech",
      manufacturing: "Manufacturing",
      retail: "Retail",
      government: "Government",
      telecom: "Telecom",
      media: "Media/Entertainment",
      "real-estate": "Real Estate",
      automotive: "Automotive",
      agriculture: "Agriculture",
      logistics: "Logistics/Supply Chain",
    }
    return industryMap[industry] || industry
  }

  const formatSalaryInLakhs = (amount) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`
    }
    return `₹${amount.toLocaleString("en-IN")}`
  }

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50">
      <CardHeader>
        <CardTitle>Recent Predictions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {comparisons.map((comparison, index) => (
            <div
              key={comparison.id}
              className="border border-gray-200/50 bg-white/50 backdrop-blur-sm rounded-lg p-4 space-y-3"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="font-semibold text-lg">₹{comparison.predictedSalary.toLocaleString("en-IN")}</div>
                  <div className="text-sm font-medium text-green-600">
                    {formatSalaryInLakhs(comparison.predictedSalary)} CTC
                  </div>
                  <div className="text-sm text-gray-600">{comparison.timestamp}</div>
                </div>
                <Badge variant={index === 0 ? "default" : "secondary"}>
                  {index === 0 ? "Latest" : `#${index + 1}`}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Job Title:</span>
                  <div className="font-medium">{formatJobTitle(comparison.jobTitle, comparison.customJobTitle)}</div>
                </div>
                <div>
                  <span className="text-gray-500">Experience:</span>
                  <div className="font-medium">{comparison.experience} years</div>
                </div>
                <div>
                  <span className="text-gray-500">Location:</span>
                  <div className="font-medium">{formatLocation(comparison.location, comparison.customLocation)}</div>
                </div>
                <div>
                  <span className="text-gray-500">Education:</span>
                  <div className="font-medium">{formatEducation(comparison.education, comparison.customEducation)}</div>
                </div>
                <div>
                  <span className="text-gray-500">Company:</span>
                  <div className="font-medium">
                    {formatCompanySize(comparison.companySize, comparison.customCompanySize)}
                  </div>
                </div>
                <div>
                  <span className="text-gray-500">Industry:</span>
                  <div className="font-medium">{formatIndustry(comparison.industry, comparison.customIndustry)}</div>
                </div>
              </div>

              {comparison.skills && (
                <div className="text-sm">
                  <span className="text-gray-500">Skills:</span>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {comparison.skills
                      .split(",")
                      .slice(0, 4)
                      .map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="outline" className="text-xs">
                          {skill.trim()}
                        </Badge>
                      ))}
                    {comparison.skills.split(",").length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{comparison.skills.split(",").length - 4} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {comparisons.length > 0 && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Showing {comparisons.length} recent prediction{comparisons.length !== 1 ? "s" : ""}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
