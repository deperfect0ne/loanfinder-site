'use server'

import type { Metadata } from "next"
import { getDictionary } from "@/lib/dictionaries"
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
  const pageData = dict.pages["/laenuleping"]

  return {
    title: pageData.metatitle,
    description: pageData.metadescription,
    keywords: pageData.keywords,
    openGraph: {
      title: pageData.metatitle,
      description: pageData.metadescription,
      url: "/laenuleping",
      siteName: "LoanFinder",
    },
  }
}

export default async function LoanAgreementPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const pageData = dict.pages["/laenuleping"]

  return (
    <main className="container mx-auto px-4 py-8">
      <header>
        <h1 className="text-4xl font-bold mb-8">{pageData.h1}</h1>
      </header>

      <section className="my-12" aria-label="Loan Agreement Info">
        <SeoTextBlocks lang={lang} content={pageData.sisu} />
      </section>

      <section className="my-16" aria-label="Sample Agreement">
        <article className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">{dict.loanAgreement.sampleTitle}</h2>
          <div className="prose max-w-none">
            <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
              {dict.loanAgreement.sampleContent}
            </pre>
          </div>
        </article>
      </section>

      <section className="my-16" aria-label="FAQ">
        <FaqSection lang={lang} category="loan-agreement" />
      </section>

      <section className="my-16" aria-label="Contact Form">
        <h2 className="text-3xl font-bold mb-8">{dict.common.contactTitle}</h2>
        <ContactForm lang={lang} />
      </section>
    </main>
  )
}
