import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProviderClient } from "@/components/language-provider-client"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "4RealFree - Free Games",
  description: "Discover the best free-to-play games for PC and browser",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <LanguageProviderClient>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <div className="flex flex-col min-h-screen">
              <Header />
              <div className="flex-1">{children}</div>
              <Footer />
            </div>
          </ThemeProvider>
        </LanguageProviderClient>
      </body>
    </html>
  )
}


import './globals.css'