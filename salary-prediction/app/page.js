"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calculator, TrendingUp, Users, MapPin, GraduationCap, Briefcase } from "lucide-react"
import { predictSalary } from "./actions"
import SalaryChart from "./components/salary-chart"
import ComparisonTable from "./components/comparison-table"

export default function SalaryPredictor() {
  const [formData, setFormData] = useState({
    age: "",
    experience: "",
    education: "",
    customEducation: "",
    jobTitle: "",
    customJobTitle: "",
    location: "",
    customLocation: "",
    companySize: "",
    customCompanySize: "",
    skills: "",
    industry: "",
    customIndustry: "",
  })

  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [comparisons, setComparisons] = useState([])

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await predictSalary(formData)
      setPrediction(result)

      // Add to comparisons
      const newComparison = {
        id: Date.now(),
        ...formData,
        predictedSalary: result.predictedSalary,
        timestamp: new Date().toLocaleString(),
      }
      setComparisons((prev) => [newComparison, ...prev.slice(0, 4)])
    } catch (error) {
      console.error("Prediction error:", error)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      age: "",
      experience: "",
      education: "",
      customEducation: "",
      jobTitle: "",
      customJobTitle: "",
      location: "",
      customLocation: "",
      companySize: "",
      customCompanySize: "",
      skills: "",
      industry: "",
      customIndustry: "",
    })
    setPrediction(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Calculator className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600" />
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Salary Predictor</h1>
            </div>
            <Badge variant="secondary" className="text-xs sm:text-sm">
              AI-Powered Indian Market Predictions
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Main Form */}
          <div className="xl:col-span-2">
            <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-orange-600" />
                  <span>Employee Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {/* Age */}
                    <div className="space-y-2">
                      <Label htmlFor="age" className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>Age</span>
                      </Label>
                      <Input
                        id="age"
                        type="number"
                        placeholder="Enter age"
                        value={formData.age}
                        onChange={(e) => handleInputChange("age", e.target.value)}
                        min="18"
                        max="65"
                        required
                      />
                    </div>

                    {/* Experience */}
                    <div className="space-y-2">
                      <Label htmlFor="experience" className="flex items-center space-x-1">
                        <Briefcase className="h-4 w-4" />
                        <span>Years of Experience</span>
                      </Label>
                      <Input
                        id="experience"
                        type="number"
                        placeholder="Years of experience"
                        value={formData.experience}
                        onChange={(e) => handleInputChange("experience", e.target.value)}
                        min="0"
                        max="40"
                        required
                      />
                    </div>

                    {/* Education */}
                    <div className="space-y-2">
                      <Label className="flex items-center space-x-1">
                        <GraduationCap className="h-4 w-4" />
                        <span>Education Level</span>
                      </Label>
                      <Select onValueChange={(value) => handleInputChange("education", value)} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select education level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="12th">12th Pass</SelectItem>
                          <SelectItem value="diploma">Diploma</SelectItem>
                          <SelectItem value="btech">B.Tech/B.E</SelectItem>
                          <SelectItem value="bca">BCA</SelectItem>
                          <SelectItem value="bcom">B.Com</SelectItem>
                          <SelectItem value="ba">B.A</SelectItem>
                          <SelectItem value="bsc">B.Sc</SelectItem>
                          <SelectItem value="mtech">M.Tech/M.E</SelectItem>
                          <SelectItem value="mca">MCA</SelectItem>
                          <SelectItem value="mba">MBA</SelectItem>
                          <SelectItem value="msc">M.Sc</SelectItem>
                          <SelectItem value="phd">PhD</SelectItem>
                          <SelectItem value="others">Others</SelectItem>
                        </SelectContent>
                      </Select>
                      {formData.education === "others" && (
                        <Input
                          placeholder="Please specify your education"
                          value={formData.customEducation}
                          onChange={(e) => handleInputChange("customEducation", e.target.value)}
                          required
                        />
                      )}
                    </div>

                    {/* Job Title */}
                    <div className="space-y-2">
                      <Label>Job Title</Label>
                      <Select onValueChange={(value) => handleInputChange("jobTitle", value)} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select job title" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="software-developer">Software Developer</SelectItem>
                          <SelectItem value="senior-developer">Senior Software Developer</SelectItem>
                          <SelectItem value="tech-lead">Technical Lead</SelectItem>
                          <SelectItem value="data-scientist">Data Scientist</SelectItem>
                          <SelectItem value="data-analyst">Data Analyst</SelectItem>
                          <SelectItem value="product-manager">Product Manager</SelectItem>
                          <SelectItem value="ui-ux-designer">UI/UX Designer</SelectItem>
                          <SelectItem value="business-analyst">Business Analyst</SelectItem>
                          <SelectItem value="qa-engineer">QA Engineer</SelectItem>
                          <SelectItem value="devops-engineer">DevOps Engineer</SelectItem>
                          <SelectItem value="project-manager">Project Manager</SelectItem>
                          <SelectItem value="team-lead">Team Lead</SelectItem>
                          <SelectItem value="architect">Solutions Architect</SelectItem>
                          <SelectItem value="consultant">Consultant</SelectItem>
                          <SelectItem value="sales-executive">Sales Executive</SelectItem>
                          <SelectItem value="hr-executive">HR Executive</SelectItem>
                          <SelectItem value="marketing-executive">Marketing Executive</SelectItem>
                          <SelectItem value="finance-analyst">Finance Analyst</SelectItem>
                          <SelectItem value="operations-manager">Operations Manager</SelectItem>
                          <SelectItem value="others">Others</SelectItem>
                        </SelectContent>
                      </Select>
                      {formData.jobTitle === "others" && (
                        <Input
                          placeholder="Please specify your job title"
                          value={formData.customJobTitle}
                          onChange={(e) => handleInputChange("customJobTitle", e.target.value)}
                          required
                        />
                      )}
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                      <Label className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>Location</span>
                      </Label>
                      <Select onValueChange={(value) => handleInputChange("location", value)} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bangalore">Bangalore</SelectItem>
                          <SelectItem value="mumbai">Mumbai</SelectItem>
                          <SelectItem value="delhi-ncr">Delhi NCR</SelectItem>
                          <SelectItem value="hyderabad">Hyderabad</SelectItem>
                          <SelectItem value="pune">Pune</SelectItem>
                          <SelectItem value="chennai">Chennai</SelectItem>
                          <SelectItem value="kolkata">Kolkata</SelectItem>
                          <SelectItem value="ahmedabad">Ahmedabad</SelectItem>
                          <SelectItem value="kochi">Kochi</SelectItem>
                          <SelectItem value="indore">Indore</SelectItem>
                          <SelectItem value="bhubaneswar">Bhubaneswar</SelectItem>
                          <SelectItem value="jaipur">Jaipur</SelectItem>
                          <SelectItem value="chandigarh">Chandigarh</SelectItem>
                          <SelectItem value="coimbatore">Coimbatore</SelectItem>
                          <SelectItem value="nagpur">Nagpur</SelectItem>
                          <SelectItem value="remote">Remote</SelectItem>
                          <SelectItem value="others">Others</SelectItem>
                        </SelectContent>
                      </Select>
                      {formData.location === "others" && (
                        <Input
                          placeholder="Please specify your location/city"
                          value={formData.customLocation}
                          onChange={(e) => handleInputChange("customLocation", e.target.value)}
                          required
                        />
                      )}
                    </div>

                    {/* Company Size */}
                    <div className="space-y-2">
                      <Label>Company Type</Label>
                      <Select onValueChange={(value) => handleInputChange("companySize", value)} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select company type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="startup">Startup (1-50)</SelectItem>
                          <SelectItem value="small">Small Company (51-200)</SelectItem>
                          <SelectItem value="mid-size">Mid-size (201-1000)</SelectItem>
                          <SelectItem value="large-indian">Large Indian Company</SelectItem>
                          <SelectItem value="mnc">MNC</SelectItem>
                          <SelectItem value="faang">FAANG/Top Tech</SelectItem>
                          <SelectItem value="government">Government/PSU</SelectItem>
                          <SelectItem value="ngo">NGO/Non-Profit</SelectItem>
                          <SelectItem value="freelance">Freelance/Self-Employed</SelectItem>
                          <SelectItem value="others">Others</SelectItem>
                        </SelectContent>
                      </Select>
                      {formData.companySize === "others" && (
                        <Input
                          placeholder="Please specify your company type"
                          value={formData.customCompanySize}
                          onChange={(e) => handleInputChange("customCompanySize", e.target.value)}
                          required
                        />
                      )}
                    </div>

                    {/* Industry */}
                    <div className="space-y-2">
                      <Label>Industry</Label>
                      <Select onValueChange={(value) => handleInputChange("industry", value)} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="it-services">IT Services</SelectItem>
                          <SelectItem value="product-tech">Product/Tech</SelectItem>
                          <SelectItem value="fintech">Fintech</SelectItem>
                          <SelectItem value="ecommerce">E-commerce</SelectItem>
                          <SelectItem value="banking">Banking/Finance</SelectItem>
                          <SelectItem value="consulting">Consulting</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="education">Education/EdTech</SelectItem>
                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="government">Government</SelectItem>
                          <SelectItem value="telecom">Telecom</SelectItem>
                          <SelectItem value="media">Media/Entertainment</SelectItem>
                          <SelectItem value="real-estate">Real Estate</SelectItem>
                          <SelectItem value="automotive">Automotive</SelectItem>
                          <SelectItem value="agriculture">Agriculture</SelectItem>
                          <SelectItem value="logistics">Logistics/Supply Chain</SelectItem>
                          <SelectItem value="others">Others</SelectItem>
                        </SelectContent>
                      </Select>
                      {formData.industry === "others" && (
                        <Input
                          placeholder="Please specify your industry"
                          value={formData.customIndustry}
                          onChange={(e) => handleInputChange("customIndustry", e.target.value)}
                          required
                        />
                      )}
                    </div>

                    {/* Skills */}
                    <div className="space-y-2 md:col-span-2">
                      <Label>Key Skills (comma-separated)</Label>
                      <Input
                        placeholder="e.g., Java, React, Python, AWS, Spring Boot, Machine Learning, Digital Marketing"
                        value={formData.skills}
                        onChange={(e) => handleInputChange("skills", e.target.value)}
                      />
                      <p className="text-xs text-gray-500">
                        Add all relevant skills including technical, soft skills, certifications, etc.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:flex-1 bg-orange-600 hover:bg-orange-700"
                    >
                      {loading ? "Predicting..." : "Predict Salary"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={resetForm}
                      className="w-full sm:w-auto bg-transparent"
                    >
                      Reset
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel */}
          <div className="space-y-4 sm:space-y-6">
            {prediction && (
              <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50">
                <CardHeader>
                  <CardTitle className="text-green-700">Salary Prediction</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div className="text-3xl font-bold text-green-600">
                      ₹{prediction.predictedSalary?.toLocaleString("en-IN") || "0"}
                    </div>
                    <div className="text-sm text-gray-600">Annual Salary Estimate (CTC)</div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Confidence:</span>
                        <Badge variant="secondary">{prediction.confidence || 0}%</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Range:</span>
                        <span className="text-gray-600">
                          ₹{prediction.range?.min?.toLocaleString("en-IN") || "0"} - ₹
                          {prediction.range?.max?.toLocaleString("en-IN") || "0"}
                        </span>
                      </div>
                    </div>

                    {prediction.factors && prediction.factors.length > 0 && (
                      <div className="pt-4 border-t">
                        <h4 className="font-semibold mb-2">Key Factors:</h4>
                        <div className="space-y-1 text-sm text-left">
                          {prediction.factors.map((factor, index) => (
                            <div key={index} className="flex justify-between">
                              <span>{factor.name}:</span>
                              <span className={factor.impact > 0 ? "text-green-600" : "text-red-600"}>
                                {factor.impact > 0 ? "+" : ""}₹{factor.impact?.toLocaleString("en-IN") || "0"}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Market Insights */}
            <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50">
              <CardHeader>
                <CardTitle>Indian Market Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>IT Industry Avg:</span>
                    <span className="font-semibold">₹8,50,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Experience Premium:</span>
                    <span className="text-green-600">+₹1,20,000/year</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Location Factor:</span>
                    <span className="text-blue-600">Bangalore: +15%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Education Bonus:</span>
                    <span className="text-purple-600">M.Tech: +₹2,00,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>MNC Premium:</span>
                    <span className="text-orange-600">+25-40%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips Card */}
            <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50">
              <CardHeader>
                <CardTitle className="text-blue-700">💡 Tips for Better Predictions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p>• Be specific with your job title and skills</p>
                  <p>• Include certifications in your skills</p>
                  <p>• Consider total years of relevant experience</p>
                  <p>• Factor in company size and type</p>
                  <p>• Location significantly impacts salary</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Results Tabs */}
        {prediction && (
          <div className="mt-6 sm:mt-8">
            <Tabs defaultValue="chart" className="w-full">
              <TabsList className="grid w-full grid-cols-2 h-auto bg-white/70 backdrop-blur-sm">
                <TabsTrigger value="chart" className="text-sm sm:text-base">
                  Salary Breakdown
                </TabsTrigger>
                <TabsTrigger value="comparison" className="text-sm sm:text-base">
                  Comparisons
                </TabsTrigger>
              </TabsList>

              <TabsContent value="chart" className="mt-6">
                <SalaryChart prediction={prediction} />
              </TabsContent>

              <TabsContent value="comparison" className="mt-6">
                <ComparisonTable comparisons={comparisons} />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  )
}
