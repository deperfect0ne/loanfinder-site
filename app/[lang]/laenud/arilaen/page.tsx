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
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;      // ← await here
  const dict = await getDictionary(lang);

  const pageTitle = lang === "et" ? "Ärilaen" : "Бизнес-кредит";
  const pageDescription =
    lang === "et"
      ? "Leia parim ärilaen Eestis. Võrdle intresse ja tingimusi."
      : "Найдите лучший бизнес-кредит в Эстонии. Сравните проценты и условия.";

  return {
    title: `${pageTitle} | LoanFinder`,
    description: pageDescription,
    openGraph: {
      title: `${pageTitle} | LoanFinder`,
      description: pageDescription,
      url: "/laenud/arilaen",
      siteName: "LoanFinder",
    },
  };
}


export default async function BusinessLoanPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;      // ← await here
  const dict = await getDictionary(lang);

  const pageData = {
    h1: lang === "et" ? "Ärilaen" : "Бизнес-кредит",
    sisu:
      lang === "et"
        ? "Ärilaen on laen, mida kasutatakse äri alustamiseks, laiendamiseks või käibekapitali suurendamiseks. Ärilaenu tingimused sõltuvad äri suurusest, vanusest ja finantsseisust."
        : "Бизнес-кредит - это кредит, используемый для начала, расширения бизнеса или увеличения оборотного капитала. Условия бизнес-кредита зависят от размера, возраста и финансового состояния бизнеса.",
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <header>
        <h1 className="text-4xl font-bold mb-8">{pageData.h1}</h1>
      </header>

      <article>
        <section className="my-12" aria-label="SEO text">
          <SeoTextBlocks lang={lang} content={pageData.sisu} />
        </section>

        <section className="my-16" aria-label="Loan calculator">
          <h2 className="text-3xl font-bold mb-8">{dict.common.calculatorTitle}</h2>
          <LoanCalculator lang={lang} loanType="business" />
        </section>

        <section className="my-16" aria-label="Creditors">
          <h2 className="text-3xl font-bold mb-8">{dict.common.creditorsTitle}</h2>
          <CreditorsList lang={lang} loanType="business" />
        </section>

        <section className="my-16" aria-label="FAQ">
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
