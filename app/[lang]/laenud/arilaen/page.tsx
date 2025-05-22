// app/[lang]/laenud/arilaen/page.tsx
'use server'

import type { Metadata } from "next"
import { getDictionary, getFallbackPageData } from "@/lib/dictionaries"
import LoanCalculator from "@/components/loan-calculator"
import CreditorsList from "@/components/creditors-list"
import SeoTextBlocks from "@/components/seo-text-blocks"
import FaqSection from "@/components/faq-section"
import ContactForm from "@/components/contact-form"

const path = "/laenud/arilaen"

export async function generateMetadata({
  params,
}: {
  params: { lang: string }
}): Promise<Metadata> {
  const { lang } = params
  const dict = await getDictionary(lang)

  const pageData = dict.pages?.[path] || getFallbackPageData(path, lang)

  return {
    title: pageData.metatitle || (lang === "et" ? "Ärilaen" : "Бизнес-кредит") + " | LoanFinder",
    description:
      pageData.metadescription ||
      (lang === "et"
        ? "Leia parim ärilaen Eestis. Võrdle intresse ja tingimusi."
        : "Найдите лучший бизнес-кредит в Эстонии. Сравните проценты и условия."),
    keywords: pageData.keywords,
    openGraph: {
      title: pageData.metatitle,
      description: pageData.metadescription,
      url: path,
      siteName: "LoanFinder",
    },
  }
}

export default async function BusinessLoanPage({
  params,
}: {
  params: { lang: string }
}) {
  const { lang } = params
  const dict = await getDictionary(lang)

  const pageData = dict.pages?.[path] || getFallbackPageData(path, lang)

  return (
    <main className="container mx-auto px-4 py-8">
      <header>
        <h1 className="text-4xl font-bold mb-8">{pageData.h1}</h1>
      </header>

      <section className="my-12" aria-label="SEO Content">
        <SeoTextBlocks lang={lang} content={pageData.sisu} />
      </section>

      <section className="my-16" aria-label="Loan Calculator">
        <h2 className="text-3xl font-bold mb-8">{dict.common.calculatorTitle}</h2>
        <LoanCalculator lang={lang} loanType="business" />
      </section>

      <section className="my-16" aria-label="Creditors List">
        <h2 className="text-3xl font-bold mb-8">{dict.common.creditorsTitle}</h2>
        <CreditorsList lang={lang} loanType="business" />
      </section>

      <section className="my-16" aria-label="FAQ Section">
        <FaqSection lang={lang} category="general" />
      </section>

      <section className="my-16" aria-label="Contact Form">
        <h2 className="text-3xl font-bold mb-8">{dict.common.contactTitle}</h2>
        <ContactForm lang={lang} />
      </section>
    </main>
  )
}
