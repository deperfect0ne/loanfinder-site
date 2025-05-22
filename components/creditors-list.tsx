import { getDictionary } from "@/lib/dictionaries"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Check } from "lucide-react"
import Link from "next/link"

interface CreditorsListProps {
  lang: string
  loanType?: string
}

export default async function CreditorsList({ lang, loanType }: CreditorsListProps) {
  const dict = await getDictionary(lang)

  // Собираем массив { key, данные }
  const creditors = [
    { key: "ferratum",     data: dict.creditors.ferratum },
    { key: "bondora",      data: dict.creditors.bondora  },
    { key: "credit24",     data: dict.creditors.credit24 },
    { key: "boonuslaen",   data: dict.creditors.boonuslaen },
  ]

  return (
    <section
      aria-label={lang === "et" ? "Krediidipakkujad" : "Кредиторы"}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {creditors.map(({ key, data: creditor }) => (
        <article key={key} className="overflow-hidden rounded-lg shadow border bg-white">
          <header className="bg-primary text-white p-4">
            <h3 className="text-xl font-semibold">{creditor.name}</h3>
            <p className="text-sm text-white/90">{creditor.slogan}</p>
          </header>

          <div className="p-6">
            <section aria-labelledby={`loan-details-${key}`} className="mb-6">
              <h4 id={`loan-details-${key}`} className="font-semibold text-lg mb-2">
                {dict.common.loanDetails}
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>
                    <strong>{dict.common.amount}:</strong> {creditor.amount}
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>
                    <strong>{dict.common.term}:</strong> {creditor.term}
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>
                    <strong>{dict.common.interest}:</strong> {creditor.interest}
                  </span>
                </li>
              </ul>
            </section>

            <section aria-labelledby={`benefits-${key}`}>
              <h4 id={`benefits-${key}`} className="font-semibold text-lg mb-2">
                {dict.common.benefits}
              </h4>
              <ul className="space-y-2">
                {creditor.benefits.map((b, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <footer className="flex justify-between bg-gray-50 p-4">
            <Button variant="outline" asChild>
              <Link href={`/${lang}/${key}`}>{dict.common.moreInfo}</Link>
            </Button>
            <Button asChild>
              <Link href={creditor.url} target="_blank" rel="noopener noreferrer">
                {dict.common.visitWebsite} <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </footer>
        </article>
      ))}
    </section>
  )
}
