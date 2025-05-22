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

  const pageTitle = lang === "et" ? "Õppelaen" : "Студенческий кредит"
  const pageDescription =
    lang === "et"
      ? "Leia parim õppelaen Eestis. Võrdle intresse ja tingimusi."
      : "Найдите лучший студенческий кредит в Эстонии. Сравните проценты и условия."

  return {
    title: `${pageTitle} | LoanFinder`,
    description: pageDescription,
    openGraph: {
      title: `${pageTitle} | LoanFinder`,
      description: pageDescription,
      url: "/laenud/oppelaen",
      siteName: "LoanFinder",
    },
  }
}

export default async function StudentLoanPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  const pageData = {
    h1: lang === "et" ? "Õppelaen" : "Студенческий кредит",
    sisu:
      lang === "et"
        ? "Õppelaen on riigi poolt tagatud laen, mida saavad taotleda õppivad inimesed. Õppelaenu tingimused on tavaliselt soodsamad kui teistel laenudel ja tagasimaksmine algab pärast õpingute lõpetamist."
        : "Студенческий кредит - это кредит, гарантированный государством, который могут запросить учащиеся. Условия студенческого кредита обычно более выгодные, чем у других кредитов, и погашение начинается после окончания учебы.",
  }

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
          <LoanCalculator lang={lang} loanType="student" />
        </section>

        <section className="my-16" aria-label="Creditors List">
          <h2 className="text-3xl font-bold mb-8">{dict.common.creditorsTitle}</h2>
          <CreditorsList lang={lang} loanType="student" />
        </section>

        <section className="my-16" aria-label="FAQ Section">
          <FaqSection lang={lang} category="general" />
        </section>

        <section className="my-16" aria-label="Contact Form">
          <h2 className="text-3xl font-bold mb-8">{dict.common.contactTitle}</h2>
          <ContactForm lang={lang} />
        </section>
      </article>
    </main>
  )
}
