import Link from "next/link"

export default function Footer({ lang }: { lang: string }) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">{lang === "et" ? "LoanFinder" : "LoanFinder"}</h3>
            <p className="text-gray-600">
              {lang === "et"
                ? "Aitame leida parima laenupakkumise Eestis."
                : "Помогаем найти лучшее кредитное предложение в Эстонии."}
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">{lang === "et" ? "Laenutüübid" : "Типы кредитов"}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${lang}/laenud/vaikelaen`} className="text-gray-600 hover:text-primary">
                  {lang === "et" ? "Väikelaen" : "Малый кредит"}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/laenud/tarbimislaen`} className="text-gray-600 hover:text-primary">
                  {lang === "et" ? "Tarbimislaen" : "Потребительский кредит"}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/laenud/kodulaen`} className="text-gray-600 hover:text-primary">
                  {lang === "et" ? "Kodulaen" : "Домашний кредит"}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/laenud/autolaen`} className="text-gray-600 hover:text-primary">
                  {lang === "et" ? "Autolaen" : "Автокредит"}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">{lang === "et" ? "Laenupakkujad" : "Кредиторы"}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${lang}/ferratum`} className="text-gray-600 hover:text-primary">
                  Ferratum
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/bondora`} className="text-gray-600 hover:text-primary">
                  Bondora
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/credit24`} className="text-gray-600 hover:text-primary">
                  Credit24
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/boonuslaen`} className="text-gray-600 hover:text-primary">
                  Boonuslaen
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">{lang === "et" ? "Info" : "Информация"}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${lang}/laenuleping`} className="text-gray-600 hover:text-primary">
                  {lang === "et" ? "Laenuleping" : "Кредитный договор"}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/privaatsuspoliitika`} className="text-gray-600 hover:text-primary">
                  {lang === "et" ? "Privaatsuspoliitika" : "Политика конфиденциальности"}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
          <p>
            © {currentYear} LoanFinder. {lang === "et" ? "Kõik õigused kaitstud." : "Все права защищены."}
          </p>
        </div>
      </div>
    </footer>
  )
}
