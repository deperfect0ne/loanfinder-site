// components/faq-section.tsx
import { getDictionary } from "@/lib/dictionaries"
import Script from "next/script"
import type { Metadata } from "next"

interface FaqSectionProps {
  lang: string
  category?: string
}

export default async function FaqSection({
  lang,
  category = "general",
}: FaqSectionProps) {
  const dict = await getDictionary(lang)
  const faqItems = dict.faq.items[category] ?? dict.faq.items.general

  // Собираем JSON-LD
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }

  return (
    <section aria-labelledby="faq-heading" className="w-full my-16">
      <h2 id="faq-heading" className="text-3xl font-bold mb-8">
        {dict.faq.title}
      </h2>

      <div className="space-y-6">
        {faqItems.map((item, index) => (
          <article
            key={index}
            className="bg-white rounded-lg shadow-sm border p-6"
          >
            <h3 className="text-xl font-semibold mb-3">
              {item.question}
            </h3>
            <div className="prose text-gray-600">
              <p>{item.answer}</p>
            </div>
          </article>
        ))}
      </div>

      {/* Вставляем структурированные данные */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        // JSON.stringify без вариантов, экранирование Next.js сделает сам
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </section>
  )
}
