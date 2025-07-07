import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Salary Predictor - AI-Powered Indian Market Salary Predictions",
  description:
    "Get accurate salary predictions for Indian job market based on your experience, education, location, and skills using advanced AI algorithms. Supports all major Indian cities and companies.",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
