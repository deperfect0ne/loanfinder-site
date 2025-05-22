'use server'

import type { Metadata } from "next"
import { getDictionary } from "@/lib/dictionaries"
import LoanCalculator from "@/components/loan-calculator"
import CreditorsList from "@/components/creditors-list"
import SeoTextBlocks from "@/components/seo-text-blocks"
import FaqSection from "@/components/faq-section"
import ContactForm from "@/components/contact-form"

const path = "/laenud/refinantseerimine"

export async function generateMetadata({
  params,
}: {
  params: { lang: string }
}): Promise<Metadata> {
  const { lang } = params
  const pageTitle = lang === "et" ? "Refinantseerimislaen" : "Кредит на рефинансирование"
  const pageDescription =
    lang === "et"
      ? "Leia parim refinantseerimislaen Eestis. Võrdle intresse ja tingimusi."
      : "Найдите лучший кредит на рефинансирование в Эстонии. Сравните проценты и условия."

  return {
    title: `${pageTitle} | LoanFinder`,
    description: pageDescription,
    openGraph: {
      title: `${pageTitle} | LoanFinder`,
      description: pageDescription,
      url: path,
      siteName: "LoanFinder",
    },
  }
}

export default async function RefinancingLoanPage({
  params,
}: {
  params: { lang: string }
}) {
  const { lang } = params
  const dict = await getDictionary(lang)

  const pageData = {
    h1: lang === "et" ? "Refinantseerimislaen" : "Кредит на рефинансирование",
    sisu:
      lang === "et"
        ? "Refinantseerimislaen on laen, mida kasutatakse olemasolevate laenude ühendamiseks või asendamiseks. Refinantseerimislaenu eesmärk on tavaliselt vähendada kuumakseid või saada soodsamat intressimäära."
        : "Кредит на рефинансирование - это кредит, используемый для объединения или замены существующих кредитов. Цель кредита на рефинансирование обычно заключается в снижении ежемесячных платежей или получении более выгодной процентной ставки.",
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <header>
        <h1 className="text-4xl font-bold mb-8">{pageData.h1}</h1>
      </header>

      <article>
        <section className="my-12" aria-label="Информационный текст">
          <SeoTextBlocks lang={lang} content={pageData.sisu} />
        </section>

        <section className="my-16" aria-label="Калькулятор">
          <h2 className="text-3xl font-bold mb-8">{dict.common.calculatorTitle}</h2>
          <LoanCalculator lang={lang} loanType="refinancing" />
        </section>

        <section className="my-16" aria-label="Кредиторы">
          <h2 className="text-3xl font-bold mb-8">{dict.common.creditorsTitle}</h2>
          <CreditorsList lang={lang} loanType="refinancing" />
        </section>

        <section className="my-16" aria-label="Часто задаваемые вопросы">
          <FaqSection lang={lang} category="general" />
        </section>

        <section className="my-16" aria-label="Форма заявки">
          <h2 className="text-3xl font-bold mb-8">{dict.common.contactTitle}</h2>
          <ContactForm lang={lang} />
        </section>
      </article>
    </main>
  )
}
