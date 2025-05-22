'use server'

import type { Metadata } from "next"
import { getDictionary } from "@/lib/dictionaries"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return {
    title: dict.privacy.title,
    description: dict.privacy.description,
    openGraph: {
      title: dict.privacy.title,
      description: dict.privacy.description,
      url: "/privaatsuspoliitika",
      siteName: "LoanFinder",
    },
  }
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return (
    <main className="container mx-auto px-4 py-8">
      <header>
        <h1 className="text-4xl font-bold mb-8">{dict.privacy.title}</h1>
      </header>

      <article className="prose max-w-none">
        <section className="mb-8" aria-label="Introduction">
          <h2 className="text-2xl font-bold mb-4">{dict.privacy.introduction.title}</h2>
          <p>{dict.privacy.introduction.content}</p>
        </section>

        <section className="mb-8" aria-label="Data Collection">
          <h2 className="text-2xl font-bold mb-4">{dict.privacy.dataCollection.title}</h2>
          <p>{dict.privacy.dataCollection.content}</p>
          <ul className="list-disc pl-6 mt-4">
            {dict.privacy.dataCollection.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8" aria-label="Data Usage">
          <h2 className="text-2xl font-bold mb-4">{dict.privacy.dataUsage.title}</h2>
          <p>{dict.privacy.dataUsage.content}</p>
          <ul className="list-disc pl-6 mt-4">
            {dict.privacy.dataUsage.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8" aria-label="Cookies">
          <h2 className="text-2xl font-bold mb-4">{dict.privacy.cookies.title}</h2>
          <p>{dict.privacy.cookies.content}</p>
        </section>

        <section className="mb-8" aria-label="Rights">
          <h2 className="text-2xl font-bold mb-4">{dict.privacy.rights.title}</h2>
          <p>{dict.privacy.rights.content}</p>
          <ul className="list-disc pl-6 mt-4">
            {dict.privacy.rights.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8" aria-label="Contact Info">
          <h2 className="text-2xl font-bold mb-4">{dict.privacy.contact.title}</h2>
          <p>{dict.privacy.contact.content}</p>
        </section>
      </article>
    </main>
  )
}
