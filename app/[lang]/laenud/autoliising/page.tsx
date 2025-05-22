// app/[lang]/laenud/autoliising/page.tsx
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
  params: { lang: string }
}): Promise<Metadata> {
  const { lang } = params
  const dict = await getDictionary(lang)
  const pageTitle = lang === "et" ? "Autoliising" : "Автолизинг"
  const pageDescription =
    lang === "et"
      ? "Leia parim autoliising Eestis. Võrdle intresse ja tingimusi."
      : "Найдите лучший автолизинг в Эстонии. Сравните проценты и условия."

  return {
    title: `${pageTitle} | LoanFinder`,
    description: pageDescription,
    openGraph: {
      title: `${pageTitle} | LoanFinder`,
      description: pageDescription,
      url: "/laenud/autoliising",
      siteName: "LoanFinder",
    },
  }
}

export default async function CarLeasingPage({
  params,
}: {
  params: { lang: string }
}) {
  const { lang } = params
  const dict = await getDictionary(lang)

  const pageData = {
    h1: lang === "et" ? "Autoliising" : "Автолизинг",
    sisu:
      lang === "et"
        ? "Autoliising on auto soetamise viis, kus auto jääb liisinguandja omandisse kuni liisinguperioodi lõpuni. Autoliisingul on tavaliselt soodsamad tingimused kui autolaenul, kuid auto ei kuulu liisinguvõtjale enne liisinguperioodi lõppu."
        : "Автолизинг - это способ приобретения автомобиля, при котором автомобиль остается в собственности лизингодателя до конца периода лизинга. Автолизинг обычно имеет более выгодные условия, чем автокредит, но автомобиль не принадлежит лизингополучателю до конца периода лизинга.",
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
          <LoanCalculator lang={lang} loanType="car-leasing" />
        </section>

        <section className="my-16" aria-label="Creditors list">
          <h2 className="text-3xl font-bold mb-8">{dict.common.creditorsTitle}</h2>
          <CreditorsList lang={lang} loanType="car-leasing" />
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
