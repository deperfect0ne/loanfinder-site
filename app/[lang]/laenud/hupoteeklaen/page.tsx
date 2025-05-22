'use server'

import type { Metadata } from "next"
import { getDictionary } from "@/lib/dictionaries"
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
  const pageTitle = lang === "et" ? "Hüpoteeklaen" : "Ипотечный кредит"
  const pageDescription =
    lang === "et"
      ? "Leia parim hüpoteeklaen Eestis. Võrdle intresse ja tingimusi."
      : "Найдите лучший ипотечный кредит в Эстонии. Сравните проценты и условия."

  return {
    title: `${pageTitle} | LoanFinder`,
    description: pageDescription,
    openGraph: {
      title: `${pageTitle} | LoanFinder`,
      description: pageDescription,
      url: "/laenud/hupoteeklaen",
      siteName: "LoanFinder",
    },
  }
}

export default async function MortgageLoanPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  const pageData = {
    h1: lang === "et" ? "Hüpoteeklaen" : "Ипотечный кредит",
    sisu:
      lang === "et"
        ? "Hüpoteeklaen on laen, mille tagatiseks on kinnisvara. Hüpoteeklaenu tingimused on tavaliselt soodsamad kui tagatiseta laenudel, kuid laenuvõtja peab olema valmis tagatise kaotamiseks, kui ta ei suuda laenu tagasi maksta."
        : "Ипотечный кредит - это кредит, обеспеченный недвижимостью. Условия ипотечного кредита обычно более выгодные, чем у кредитов без обеспечения, но заемщик должен быть готов к потере залога, если он не сможет погасить кредит.",
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <header>
        <h1 className="text-4xl font-bold mb-8">{pageData.h1}</h1>
      </header>

      <article>
        <section className="my-12" aria-label="SEO description">
          <SeoTextBlocks lang={lang} content={pageData.sisu} />
        </section>

        <section className="my-16" aria-label="Loan calculator">
          <h2 className="text-3xl font-bold mb-8">{dict.common.calculatorTitle}</h2>
          <LoanCalculator lang={lang} loanType="mortgage" />
        </section>

        <section className="my-16" aria-label="Creditors">
          <h2 className="text-3xl font-bold mb-8">{dict.common.creditorsTitle}</h2>
          <CreditorsList lang={lang} loanType="mortgage" />
        </section>

        <section className="my-16" aria-label="FAQ section">
          <FaqSection lang={lang} category="general" />
        </section>

        <section className="my-16" aria-label="Contact form">
          <h2 className="text-3xl font-bold mb-8">{dict.common.contactTitle}</h2>
          <ContactForm lang={lang} />
        </section>
      </article>
    </main>
  )
}
