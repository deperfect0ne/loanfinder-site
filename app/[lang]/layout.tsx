// app/[lang]/layout.tsx

import type React from "react"
import { i18n } from "@/i18n-config"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { locales } from "@/middleware"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export async function generateMetadata({
  params,
}: {
  params: { lang: string }
}): Promise<Metadata> {
  const { lang: rawLang } = params
  const lang = i18n.locales.includes(rawLang) ? rawLang : i18n.defaultLocale

  return {
    title: {
      template: "%s | LoanFinder",
      default: "LoanFinder - Find the best loans",
    },
    description: "Find the best loan offers in Estonia",
    alternates: {
      canonical: `/${lang === i18n.defaultLocale ? "" : lang}`,
      languages: {
        et: "/et",
        ru: "/ru",
      },
    },
  }
}

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  const { lang: rawLang } = params
  const lang = i18n.locales.includes(rawLang) ? rawLang : i18n.defaultLocale

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Header lang={lang} />
          <main className="min-h-screen">{children}</main>
          <Footer lang={lang} />
        </ThemeProvider>
      </body>
    </html>
  )
}
