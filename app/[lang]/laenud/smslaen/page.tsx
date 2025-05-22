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
  const path = "/laenud/smslaen"
  const dict = await getDictionary(lang)
  const pageData = dict.pages[path] || getFallbackPageData(path, lang)

  return {
    title: pageData.metatitle || (lang === "et" ? "SMS laen | LoanFinder" : "SMS кредит | LoanFinder"),
    description:
      pageData.metadescription ||
      (lang === "et"
        ? "Leia parim SMS laen Eestis. Võrdle intresse ja tingimusi."
        : "Найдите лучший SMS кредит в Эстонии. Сравните проценты и условия."),
    keywords: pageData.keywords,
    openGraph: {
      title: pageData.metatitle || (lang === "et" ? "SMS laen | LoanFinder" : "SMS кредит | LoanFinder"),
      description:
        pageData.metadescription ||
        (lang === "et"
          ? "Leia parim SMS laen Eestis. Võrdle intresse ja tingimusi."
          : "Найдите лучший SMS кредит в Эстонии. Сравните проценты и условия."),
      url: path,
      siteName: "LoanFinder",
    },
  }
}

export default async function SmsLoanPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const path = "/laenud/smslaen"
  const pageData = dict.pages[path] || getFallbackPageData(path, lang)

  return (
    <main className="container mx-auto px-4 py-8">
      <header>
        <h1 className="text-4xl font-bold mb-8">{pageData.h1}</h1>
      </header>

      <article>
        <section className="my-12" aria-label="Информация о кредите">
          <SeoTextBlocks lang={lang} content={pageData.sisu} />
        </section>

        <section className="my-16" aria-label="Калькулятор SMS кредита">
          <h2 className="text-3xl font-bold mb-8">{dict.common.calculatorTitle}</h2>
          <LoanCalculator lang={lang} loanType="sms" />
        </section>

        <section className="my-16" aria-label="Кредиторы по SMS кредитам">
          <h2 className="text-3xl font-bold mb-8">{dict.common.creditorsTitle}</h2>
          <CreditorsList lang={lang} loanType="sms" />
        </section>

        <section className="my-16" aria-label="Часто задаваемые вопросы">
          <FaqSection lang={lang} category="general" />
        </section>

        <section className="my-16" aria-label="Форма обратной связи">
          <h2 className="text-3xl font-bold mb-8">{dict.common.contactTitle}</h2>
          <ContactForm lang={lang} />
        </section>
      </article>
    </main>
  )
}
