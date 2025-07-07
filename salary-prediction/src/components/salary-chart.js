import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Progress } from "./ui/progress"

export default function SalaryChart({ prediction }) {
  // Add null checks to prevent errors during rendering
  if (!prediction || !prediction.factors) {
    return (
      <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50">
        <CardHeader>
          <CardTitle>Salary Breakdown Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <p>No prediction data available. Please make a prediction first.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const maxFactor = Math.max(...prediction.factors.map((f) => Math.abs(f.impact || 0)))

  const formatSalaryInLakhs = (amount) => {
    if (!amount) return "₹0"
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`
    }
    return `₹${amount.toLocaleString("en-IN")}`
  }

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50">
      <CardHeader>
        <CardTitle>Salary Breakdown Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Main prediction display */}
          <div className="text-center p-6 bg-gradient-to-r from-green-50/80 to-orange-50/80 backdrop-blur-sm rounded-lg border border-gray-200/30">
            <div className="text-4xl font-bold text-green-600 mb-2">
              ₹{prediction.predictedSalary?.toLocaleString("en-IN") || "0"}
            </div>
            <div className="text-lg font-semibold text-green-700 mb-2">
              {formatSalaryInLakhs(prediction.predictedSalary)} per annum
            </div>
            <div className="text-gray-600">Predicted Annual CTC</div>
            <div className="mt-4 text-sm text-gray-500">
              Range: {formatSalaryInLakhs(prediction.range?.min)} - {formatSalaryInLakhs(prediction.range?.max)}
            </div>
          </div>

          {/* Factors breakdown */}
          {prediction.factors && prediction.factors.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Contributing Factors</h3>
              <div className="space-y-4">
                {prediction.factors.map((factor, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{factor.name}</span>
                      <span
                        className={`text-sm font-semibold ${factor.impact > 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {factor.impact > 0 ? "+" : ""}
                        {formatSalaryInLakhs(factor.impact)}
                      </span>
                    </div>
                    <Progress
                      value={maxFactor > 0 ? (Math.abs(factor.impact || 0) / maxFactor) * 100 : 0}
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Confidence indicator */}
          <div className="p-4 bg-orange-50/80 backdrop-blur-sm rounded-lg border border-orange-200/30">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Prediction Confidence</span>
              <span className="text-sm font-semibold text-orange-600">{prediction.confidence || 0}%</span>
            </div>
            <Progress value={prediction.confidence || 0} className="h-2" />
            <div className="text-xs text-gray-500 mt-2">Based on Indian market data and industry standards</div>
          </div>

          {/* Indian market context */}
          <div className="p-4 bg-blue-50/80 backdrop-blur-sm rounded-lg border border-blue-200/30">
            <h4 className="font-semibold text-blue-800 mb-2">Indian Market Context</h4>
            <div className="text-sm text-blue-700 space-y-1">
              <p>• CTC includes base salary, allowances, and benefits</p>
              <p>• Take-home salary is typically 70-80% of CTC</p>
              <p>• IT sector offers highest growth potential</p>
              <p>• MNCs typically offer 25-40% premium over Indian companies</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
