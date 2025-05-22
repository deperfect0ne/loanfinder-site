'use server'

import type { Metadata } from "next"
import { getDictionary } from "@/lib/dictionaries"
import LoanCalculator from "@/components/loan-calculator"
import SeoTextBlocks from "@/components/seo-text-blocks"
import FaqSection from "@/components/faq-section"
import ContactForm from "@/components/contact-form"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ArrowUpRight, Check } from "lucide-react"
import Link from "next/link"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return {
    title: dict.creditors.bondora.title,
    description: dict.creditors.bondora.description,
    openGraph: {
      title: dict.creditors.bondora.title,
      description: dict.creditors.bondora.description,
      url: "/bondora",
      siteName: "LoanFinder",
    },
  }
}

export default async function BondoraPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const creditor = dict.creditors.bondora

  return (
    <main className="container mx-auto px-4 py-8">
      <header>
        <h1 className="text-4xl font-bold mb-8">{creditor.name}</h1>
      </header>

      <section className="my-12" aria-labelledby="creditor-overview-title">
        <article>
          <Card className="overflow-hidden">
            <CardHeader className="bg-primary text-white">
              <CardTitle id="creditor-overview-title" className="text-2xl">
                {creditor.name}
              </CardTitle>
              <CardDescription className="text-white/90">{creditor.slogan}</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <section aria-labelledby="loan-details-title">
                  <h2 id="loan-details-title" className="font-semibold text-lg mb-4">
                    {dict.common.loanDetails}
                  </h2>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>
                        {dict.common.amount}: {creditor.amount}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>
                        {dict.common.term}: {creditor.term}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>
                        {dict.common.interest}: {creditor.interest}
                      </span>
                    </li>
                  </ul>
                </section>
                <section aria-labelledby="benefits-title">
                  <h2 id="benefits-title" className="font-semibold text-lg mb-4">
                    {dict.common.benefits}
                  </h2>
                  <ul className="space-y-2">
                    {creditor.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between bg-gray-50 p-6">
              <Button variant="outline">{dict.common.moreInfo}</Button>
              <Button asChild>
                <Link href={creditor.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${creditor.name} website`}>
                  {dict.common.visitWebsite} <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </article>
      </section>

      <section className="my-16" aria-labelledby="calculator-title">
        <h2 id="calculator-title" className="text-3xl font-bold mb-8">
          {dict.common.calculatorTitle}
        </h2>
        <LoanCalculator lang={lang} creditor="bondora" />
      </section>

      <section className="my-16" aria-labelledby="description-title">
        <h2 id="description-title" className="sr-only">Description</h2>
        <SeoTextBlocks lang={lang} content={creditor.description} />
      </section>

      <section className="my-16" aria-labelledby="faq-title">
        <h2 id="faq-title" className="sr-only">FAQ</h2>
        <FaqSection lang={lang} category="bondora" />
      </section>

      <section className="my-16" aria-labelledby="contact-title">
        <h2 id="contact-title" className="text-3xl font-bold mb-8">{dict.common.contactTitle}</h2>
        <ContactForm lang={lang} />
      </section>
    </main>
  )
}
