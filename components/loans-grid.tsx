import { getDictionary } from "@/lib/dictionaries"
import Link from "next/link"

interface LoansGridProps {
  lang: string
}

export default async function LoansGrid({ lang }: LoansGridProps) {
  const dict = await getDictionary(lang)

  const loanTypes = [
    {
      id: "quickLoan",
      path: "/",
      icon: "⚡",
    },
    {
      id: "smallLoan",
      path: "/laenud/vaikelaen",
      icon: "💰",
    },
    {
      id: "consumerLoan",
      path: "/laenud/tarbimislaen",
      icon: "🛒",
    },
    {
      id: "smsLoan",
      path: "/laenud/smslaen",
      icon: "📱",
    },
    {
      id: "renovationLoan",
      path: "/laenud/remondilaen",
      icon: "🔨",
    },
    {
      id: "refinancingLoan",
      path: "/laenud/refinantseerimine",
      icon: "🔄",
    },
    {
      id: "housingLoan",
      path: "/laenud/elusasemelaen",
      icon: "🏠",
    },
    {
      id: "mortgageLoan",
      path: "/laenud/hupoteeklaen",
      icon: "📝",
    },
    {
      id: "businessLoan",
      path: "/laenud/arilaen",
      icon: "💼",
    },
    {
      id: "homeLoan",
      path: "/laenud/kodulaen",
      icon: "🏡",
    },
    {
      id: "carLoan",
      path: "/laenud/autolaen",
      icon: "🚗",
    },
    {
      id: "carLeasing",
      path: "/laenud/autoliising",
      icon: "🚙",
    },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {loanTypes.map((loan) => (
        <Link
          key={loan.id}
          href={`/${lang}${loan.path}`}
          className="bg-white border rounded-lg p-4 text-center hover:shadow-md transition-shadow flex flex-col items-center"
        >
          <span className="text-3xl mb-2">{loan.icon}</span>
          <span className="font-medium">{dict.loanTypes[loan.id as keyof typeof dict.loanTypes]}</span>
        </Link>
      ))}
    </div>
  )
}
