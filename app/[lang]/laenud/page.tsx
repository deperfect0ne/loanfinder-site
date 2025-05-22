'use server'

import type { Metadata } from "next"
import { getDictionary } from "@/lib/dictionaries"
import LoansGrid from "@/components/loans-grid"
import LoanCalculator from "@/components/loan-calculator"
import SeoTextBlocks from "@/components/seo-text-blocks"
import FaqSection from "@/components/faq-section"
import ContactForm from "@/components/contact-form"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const pageData = dict.pages["/laenud/"]

  return {
    title: pageData.metatitle,
    description: pageData.metadescription,
    keywords: pageData.keywords,
    openGraph: {
      title: pageData.metatitle,
      description: pageData.metadescription,
      url: `/laenud`,
      siteName: "LoanFinder",
    },
  }
}

export default async function LoansPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const pageData = dict.pages["/laenud/"]

  return (
    <main className="container mx-auto px-4 py-8">
      <header>
        <h1 className="text-4xl font-bold mb-8">{pageData.h1}</h1>
      </header>

      <section className="my-12" aria-label="SEO Content">
        <SeoTextBlocks lang={lang} content={pageData.sisu} />
      </section>

      <section className="my-16" aria-label="Loan Types">
        <h2 className="text-3xl font-bold mb-8">{dict.common.loanTypesTitle}</h2>
        <LoansGrid lang={lang} />
      </section>

      <section className="my-16" aria-label="Loan Calculator">
        <h2 className="text-3xl font-bold mb-8">{dict.common.calculatorTitle}</h2>
        <LoanCalculator lang={lang} />
      </section>

      <section className="my-16" aria-label="Frequently Asked Questions">
        <FaqSection lang={lang} />
      </section>

      <section className="my-16" aria-label="Contact Form">
        <h2 className="text-3xl font-bold mb-8">{dict.common.contactTitle}</h2>
        <ContactForm lang={lang} />
      </section>
    </main>
  )
}
