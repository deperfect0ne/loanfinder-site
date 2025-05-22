'use server'

import type { Metadata } from "next"
import { i18n } from "../../i18n-config"
import { getDictionary } from "@/lib/dictionaries"
import HeroSection from "@/components/hero-section"
import LoanCalculator from "@/components/loan-calculator"
import CreditorsList from "@/components/creditors-list"
import LoansGrid from "@/components/loans-grid"
import FaqSection from "@/components/faq-section"
import SeoTextBlocks from "@/components/seo-text-blocks"
import ContactForm from "@/components/contact-form"

export async function generateMetadata({
  params,
}: {
  params: { lang: string }
}): Promise<Metadata> {
  const { lang: rawLang } = params
  const lang = i18n.locales.includes(rawLang) ? rawLang : i18n.defaultLocale
  const dict = await getDictionary(lang)
  const pageData = dict.pages["/"]

  return {
    title: pageData.metatitle,
    description: pageData.metadescription,
    keywords: pageData.keywords,
    openGraph: {
      title: pageData.metatitle,
      description: pageData.metadescription,
      url: "/",
      siteName: "LoanFinder",
    },
  }
}

export default async function Home({
  params,
}: {
  params: { lang: string }
}) {
  const { lang: rawLang } = params
  const lang = i18n.locales.includes(rawLang) ? rawLang : i18n.defaultLocale
  const dict = await getDictionary(lang)
  const pageData = dict.pages["/"]

  return (
    <main className="container mx-auto px-4 py-8">
      <header>
        <h1 className="text-4xl font-bold mb-8">{pageData.h1}</h1>
      </header>

      <section aria-labelledby="hero">
        <HeroSection lang={lang} />
      </section>

      <section className="my-16" aria-labelledby="calculator">
        <h2 id="calculator" className="text-3xl font-bold mb-8">{dict.common.calculatorTitle}</h2>
        <LoanCalculator lang={lang} />
      </section>

      <section className="my-16" aria-labelledby="creditors">
        <h2 id="creditors" className="text-3xl font-bold mb-8">{dict.common.creditorsTitle}</h2>
        <CreditorsList lang={lang} />
      </section>

      <section className="my-16" aria-labelledby="loan-types">
        <h2 id="loan-types" className="text-3xl font-bold mb-8">{dict.common.loanTypesTitle}</h2>
        <LoansGrid lang={lang} />
      </section>

      <section className="my-16" aria-labelledby="faq">
        <FaqSection lang={lang} />
      </section>

      <section className="my-16" aria-labelledby="seo-info">
        <SeoTextBlocks lang={lang} content={pageData.sisu} />
      </section>

      <section className="my-16" aria-labelledby="contact">
        <h2 id="contact" className="text-3xl font-bold mb-8">{dict.common.contactTitle}</h2>
        <ContactForm lang={lang} />
      </section>
    </main>
  )
}
