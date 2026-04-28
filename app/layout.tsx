import type React from "react"
import type { Metadata } from "next"
import { ParticleBackground } from "@/src/components/background/ParticleBackground"
import { Bebas_Neue, Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
})

export const metadata: Metadata = {
  title: "Smart Home Dashboard",
  description: "Modern smart home control dashboard",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${bebasNeue.variable}`} suppressHydrationWarning>
      <body className="bg-gray-950 text-white antialiased" suppressHydrationWarning>
        <ParticleBackground />
        {children}
      </body>
    </html>
  )
}
