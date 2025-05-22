'use server'

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
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const path = "/laenud/ilma-konto-valjavotteta"
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

export default async function LoanWithoutBankStatementPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const path = "/laenud/ilma-konto-valjavotteta"
  const pageData = dict.pages[path] || getFallbackPageData(path, lang)

  return (
    <main className="container mx-auto px-4 py-8">
      <header>
        <h1 className="text-4xl font-bold mb-8">{pageData.h1}</h1>
      </header>

      <article>
        <section className="my-12" aria-label="SEO Text">
          <SeoTextBlocks lang={lang} content={pageData.sisu} />
        </section>

        <section className="my-16" aria-label="Loan Calculator">
          <h2 className="text-3xl font-bold mb-8">{dict.common.calculatorTitle}</h2>
          <LoanCalculator lang={lang} loanType="without-bank-statement" />
        </section>

        <section className="my-16" aria-label="Creditors List">
          <h2 className="text-3xl font-bold mb-8">{dict.common.creditorsTitle}</h2>
          <CreditorsList lang={lang} loanType="without-bank-statement" />
        </section>

        <section className="my-16" aria-label="FAQ Section">
          <FaqSection lang={lang} category="loan-without-bank-statement" />
        </section>

        <section className="my-16" aria-label="Contact Form">
          <h2 className="text-3xl font-bold mb-8">{dict.common.contactTitle}</h2>
          <ContactForm lang={lang} />
        </section>
      </article>
    </main>
  )
}
