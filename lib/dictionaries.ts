import "server-only"
import { cache } from "react"

// Define the dictionary structure
export type Dictionary = {
  common: {
    calculatorTitle: string
    creditorsTitle: string
    loanTypesTitle: string
    contactTitle: string
    submitButton: string
    amount: string
    term: string
    interest: string
    benefits: string
    moreInfo: string
    visitWebsite: string
    loanDetails: string
    monthlyPayment: string
    totalPayment: string
    email: string
    name: string
    message: string
    successMessage: string
    errorMessage: string
  }
  pages: {
    [key: string]: {
      h1: string
      metatitle: string
      metadescription: string
      sisu: string
      keywords: string
    }
  }
  creditors: {
    ferratum: {
      name: string
      title: string
      description: string
      slogan: string
      amount: string
      term: string
      interest: string
      benefits: string[]
      url: string
    }
    bondora: {
      name: string
      title: string
      description: string
      slogan: string
      amount: string
      term: string
      interest: string
      benefits: string[]
      url: string
    }
    credit24: {
      name: string
      title: string
      description: string
      slogan: string
      amount: string
      term: string
      interest: string
      benefits: string[]
      url: string
    }
    boonuslaen: {
      name: string
      title: string
      description: string
      slogan: string
      amount: string
      term: string
      interest: string
      benefits: string[]
      url: string
    }
  }
  loanTypes: {
    quickLoan: string
    smallLoan: string
    consumerLoan: string
    smsLoan: string
    renovationLoan: string
    refinancingLoan: string
    housingLoan: string
    mortgageLoan: string
    businessLoan: string
    homeLoan: string
    carLoan: string
    carLeasing: string
    studentLoan: string
  }
  faq: {
    title: string
    items: {
      [key: string]: {
        question: string
        answer: string
      }[]
    }
  }
  loanAgreement: {
    sampleTitle: string
    sampleContent: string
  }
  privacy: {
    title: string
    description: string
    introduction: {
      title: string
      content: string
    }
    dataCollection: {
      title: string
      content: string
      items: string[]
    }
    dataUsage: {
      title: string
      content: string
      items: string[]
    }
    cookies: {
      title: string
      content: string
    }
    rights: {
      title: string
      content: string
      items: string[]
    }
    contact: {
      title: string
      content: string
    }
  }
}

// Load dictionaries
const dictionaries = {
  et: () => import("./dictionaries/et.json").then((module) => module.default),
  ru: () => import("./dictionaries/ru.json").then((module) => module.default),
}

// Helper function to get fallback page data
export function getFallbackPageData(
  path: string,
  lang: string,
): {
  h1: string
  metatitle: string
  metadescription: string
  sisu: string
  keywords: string
} {
  // Default fallback content based on path and language
  const fallbacks: Record<string, Record<string, any>> = {
    "/laenud/kodulaen": {
      et: {
        h1: "Kodulaen",
        metatitle: "Kodulaen | Parimad pakkumised Eestis",
        metadescription: "Leia parim kodulaen Eestis. Võrdle intresse ja tingimusi.",
        sisu: "Kodulaen on pikaajaline laen, mida kasutatakse kodu ostmiseks või renoveerimiseks. Kodulaenu tingimused on tavaliselt soodsamad kui teistel laenudel, kuid nõuavad sageli tagatist.",
        keywords: "kodulaen, kodulaenud, kodulaenu tingimused, kodulaenu intress",
      },
      ru: {
        h1: "Домашний кредит",
        metatitle: "Домашний кредит | Лучшие предложения в Эстонии",
        metadescription: "Найдите лучший домашний кредит в Эстонии. Сравните проценты и условия.",
        sisu: "Домашний кредит - это долгосрочный кредит, используемый для покупки или ремонта дома. Условия домашнего кредита обычно более выгодные, чем у других кредитов, но часто требуют залога.",
        keywords: "домашний кредит, домашние кредиты, условия домашнего кредита, процент по домашнему кредиту",
      },
    },
    "/laenud/autolaen": {
      et: {
        h1: "Autolaen",
        metatitle: "Autolaen | Parimad pakkumised Eestis",
        metadescription: "Leia parim autolaen Eestis. Võrdle intresse ja tingimusi.",
        sisu: "Autolaen on laen, mida kasutatakse auto ostmiseks. Autolaenu tingimused sõltuvad auto vanusest, hinnast ja laenuvõtja maksevõimest.",
        keywords: "autolaen, autolaenud, autolaenu tingimused, autolaenu intress",
      },
      ru: {
        h1: "Автокредит",
        metatitle: "Автокредит | Лучшие предложения в Эстонии",
        metadescription: "Найдите лучший автокредит в Эстонии. Сравните проценты и условия.",
        sisu: "Автокредит - это кредит, используемый для покупки автомобиля. Условия автокредита зависят от возраста автомобиля, его цены и платежеспособности заемщика.",
        keywords: "автокредит, автокредиты, условия автокредита, процент по автокредиту",
      },
    },
    "/laenud/tarbimislaen": {
      et: {
        h1: "Tarbimislaen",
        metatitle: "Tarbimislaen | Parimad pakkumised Eestis",
        metadescription: "Leia parim tarbimislaen Eestis. Võrdle intresse ja tingimusi.",
        sisu: "Tarbimislaen on laen, mida kasutatakse igapäevaste kulutuste või suuremate ostude finantseerimiseks. Tarbimislaenu tingimused sõltuvad laenusummast, perioodist ja laenuvõtja maksevõimest.",
        keywords: "tarbimislaen, tarbimislaenud, tarbimislaenu tingimused, tarbimislaenu intress",
      },
      ru: {
        h1: "Потребительский кредит",
        metatitle: "Потребительский кредит | Лучшие предложения в Эстонии",
        metadescription: "Найдите лучший потребительский кредит в Эстонии. Сравните проценты и условия.",
        sisu: "Потребительский кредит - это кредит, используемый для финансирования повседневных расходов или более крупных покупок. Условия потребительского кредита зависят от суммы кредита, периода и платежеспособности заемщика.",
        keywords:
          "потребительский кредит, потребительские кредиты, условия потребительского кредита, процент по потребительскому кредиту",
      },
    },
  }

  // Return fallback data for the specific path and language, or generic fallback
  if (fallbacks[path] && fallbacks[path][lang]) {
    return fallbacks[path][lang]
  }

  // Generic fallback if specific path is not found
  return {
    h1: lang === "et" ? "Laenud" : "Кредиты",
    metatitle: lang === "et" ? "Laenud | LoanFinder" : "Кредиты | LoanFinder",
    metadescription:
      lang === "et"
        ? "Leia parim laenupakkumine Eestis. Võrdle intresse ja tingimusi."
        : "Найдите лучшее кредитное предложение в Эстонии. Сравните проценты и условия.",
    sisu:
      lang === "et"
        ? "Leia parim laenupakkumine Eestis. Võrdle intresse ja tingimusi."
        : "Найдите лучшее кредитное предложение в Эстонии. Сравните проценты и условия.",
    keywords: lang === "et" ? "laen, laenud, laenupakkumised" : "кредит, кредиты, кредитные предложения",
  }
}

// Cache the dictionary to avoid unnecessary imports
export const getDictionary = cache(async (locale: string): Promise<Dictionary> => {
  try {
    return (dictionaries as any)[locale]?.() ?? dictionaries.et()
  } catch (error) {
    console.error(`Error loading dictionary for locale: ${locale}`, error)
    return dictionaries.et()
  }
})
