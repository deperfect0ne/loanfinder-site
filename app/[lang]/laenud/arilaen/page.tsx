// app/[lang]/laenud/autolaen/page.tsx

import type { Metadata } from "next"
import { getDictionary, getFallbackPageData } from "@/lib/dictionaries"
import LoanCalculator from "@/components/loan-calculator"
import CreditorsList from "@/components/creditors-list"
import SeoTextBlocks from "@/components/seo-text-blocks"
import FaqSection from "@/components/faq-section"
import ContactForm from "@/components/contact-form"

export async function generateMetadata({
  params,
}: {
  params: { lang: string }     // <-- plain object, не Promise
}): Promise<Metadata> {
  const { lang } = params
  const dict = await getDictionary(lang)
  const path = "/laenud/autolaen"
  const pageData = dict.pages[path] || getFallbackPageData(path, lang)

  return {
    title: pageData.metatitle,
    description: pageData.metadescription,
    keywords: pageData.keywords,
    openGraph: {
      title: pageData.metatitle,
      description: pageData.metadescription,
      url: path,
      siteName: "LoanFinder",
    },
  }
}

export default async function CarLoanPage({
  params,
}: {
  params: { lang: string }     // <-- plain object, не Promise
}) {
  const { lang } = params
  const dict = await getDictionary(lang)
  const path = "/laenud/autolaen"
  const pageData = dict.pages[path] || getFallbackPageData(path, lang)

  return (
    <main className="container mx-auto px-4 py-8">
      <header>
        <h1 className="text-4xl font-bold mb-8">{pageData.h1}</h1>
      </header>

      <section className="my-12" aria-label="SEO information">
        <SeoTextBlocks lang={lang} content={pageData.sisu} />
      </section>

      <section className="my-16" aria-label="Loan calculator">
        <h2 className="text-3xl font-bold mb-8">{dict.common.calculatorTitle}</h2>
        <LoanCalculator lang={lang} loanType="car" />
      </section>

      <section className="my-16" aria-label="Creditors list">
        <h2 className="text-3xl font-bold mb-8">{dict.common.creditorsTitle}</h2>
        <CreditorsList lang={lang} loanType="car" />
      </section>

      <section className="my-16" aria-label="FAQ">
        <FaqSection lang={lang} category="general" />
      </section>

      <section className="my-16" aria-label="Contact form">
        <h2 className="text-3xl font-bold mb-8">{dict.common.contactTitle}</h2>
        <ContactForm lang={lang} />
      </section>
    </main>
  )
}
