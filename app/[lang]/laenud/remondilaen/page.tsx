'use server'

import type { Metadata } from "next"
import { getDictionary } from "@/lib/dictionaries"
import LoanCalculator from "@/components/loan-calculator"
import CreditorsList from "@/components/creditors-list"
import SeoTextBlocks from "@/components/seo-text-blocks"
import FaqSection from "@/components/faq-section"
import ContactForm from "@/components/contact-form"

const path = "/laenud/remondilaen"

export async function generateMetadata({
  params,
}: {
  params: { lang: string }
}): Promise<Metadata> {
  const { lang } = params
  const pageTitle = lang === "et" ? "Remondilaen" : "Кредит на ремонт"
  const pageDescription =
    lang === "et"
      ? "Leia parim remondilaen Eestis. Võrdle intresse ja tingimusi."
      : "Найдите лучший кредит на ремонт в Эстонии. Сравните проценты и условия."

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

export default async function RenovationLoanPage({
  params,
}: {
  params: { lang: string }
}) {
  const { lang } = params
  const dict = await getDictionary(lang)

  const pageData = {
    h1: lang === "et" ? "Remondilaen" : "Кредит на ремонт",
    sisu:
      lang === "et"
        ? "Remondilaen on laen, mida kasutatakse kodu või muu kinnisvara renoveerimiseks. Remondilaenu tingimused sõltuvad renoveerimise ulatusest ja laenuvõtja maksevõimest."
        : "Кредит на ремонт - это кредит, используемый для ремонта дома или другой недвижимости. Условия кредита на ремонт зависят от объема ремонта и платежеспособности заемщика.",
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <header>
        <h1 className="text-4xl font-bold mb-8">{pageData.h1}</h1>
      </header>

      <article>
        <section className="my-12" aria-label="Информация о кредите">
          <SeoTextBlocks lang={lang} content={pageData.sisu} />
        </section>

        <section className="my-16" aria-label="Калькулятор кредита">
          <h2 className="text-3xl font-bold mb-8">{dict.common.calculatorTitle}</h2>
          <LoanCalculator lang={lang} loanType="renovation" />
        </section>

        <section className="my-16" aria-label="Список кредиторов">
          <h2 className="text-3xl font-bold mb-8">{dict.common.creditorsTitle}</h2>
          <CreditorsList lang={lang} loanType="renovation" />
        </section>

        <section className="my-16" aria-label="Вопросы и ответы">
          <FaqSection lang={lang} category="general" />
        </section>

        <section className="my-16" aria-label="Контактная форма">
          <h2 className="text-3xl font-bold mb-8">{dict.common.contactTitle}</h2>
          <ContactForm lang={lang} />
        </section>
      </article>
    </main>
  )
}
