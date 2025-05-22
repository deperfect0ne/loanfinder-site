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
  const pageTitle = lang === "et" ? "Eluasemelaen" : "Жилищный кредит"
  const pageDescription =
    lang === "et"
      ? "Leia parim eluasemelaen Eestis. Võrdle intresse ja tingimusi."
      : "Найдите лучший жилищный кредит в Эстонии. Сравните проценты и условия."

  return {
    title: `${pageTitle} | LoanFinder`,
    description: pageDescription,
    openGraph: {
      title: `${pageTitle} | LoanFinder`,
      description: pageDescription,
      url: "/laenud/eluasemelaen",
      siteName: "LoanFinder",
    },
  }
}

export default async function HousingLoanPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  const pageData = {
    h1: lang === "et" ? "Eluasemelaen" : "Жилищный кредит",
    sisu:
      lang === "et"
        ? "Eluasemelaen on pikaajaline laen, mida kasutatakse eluaseme ostmiseks või ehitamiseks. Eluasemelaenu tingimused on tavaliselt soodsamad kui teistel laenudel, kuid nõuavad sageli tagatist."
        : "Жилищный кредит - это долгосрочный кредит, используемый для покупки или строительства жилья. Условия жилищного кредита обычно более выгодные, чем у других кредитов, но часто требуют залога.",
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <header>
        <h1 className="text-4xl font-bold mb-8">{pageData.h1}</h1>
      </header>

      <article>
        <section className="my-12" aria-label="SEO information">
          <SeoTextBlocks lang={lang} content={pageData.sisu} />
        </section>

        <section className="my-16" aria-label="Loan calculator">
          <h2 className="text-3xl font-bold mb-8">{dict.common.calculatorTitle}</h2>
          <LoanCalculator lang={lang} loanType="housing" />
        </section>

        <section className="my-16" aria-label="Creditors list">
          <h2 className="text-3xl font-bold mb-8">{dict.common.creditorsTitle}</h2>
          <CreditorsList lang={lang} loanType="housing" />
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
