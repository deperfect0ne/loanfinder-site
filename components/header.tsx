"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Header({ lang }: { lang: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Remove the language prefix from the pathname
  const pathnameWithoutLang = pathname.replace(`/${lang}`, "")

  // Create the alternate language path
  const alternateLang = lang === "et" ? "ru" : "et"
  const alternatePath = `/${alternateLang}${pathnameWithoutLang}`

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  href={`/${lang}`}
                  className="text-lg font-medium transition-colors hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {lang === "et" ? "Avaleht" : "Главная"}
                </Link>
                <Link
                  href={`/${lang}/laenud`}
                  className="text-lg font-medium transition-colors hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {lang === "et" ? "Laenud" : "Кредиты"}
                </Link>
                <Link
                  href={`/${lang}/laenuleping`}
                  className="text-lg font-medium transition-colors hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {lang === "et" ? "Laenuleping" : "Кредитный договор"}
                </Link>
                <Link
                  href={`/${lang}/privaatsuspoliitika`}
                  className="text-lg font-medium transition-colors hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {lang === "et" ? "Privaatsuspoliitika" : "Политика конфиденциальности"}
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href={`/${lang}`} className="flex items-center space-x-2">
            <span className="font-bold text-xl">LoanFinder</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href={`/${lang}`} className="text-sm font-medium transition-colors hover:text-primary">
            {lang === "et" ? "Avaleht" : "Главная"}
          </Link>
          <Link href={`/${lang}/laenud`} className="text-sm font-medium transition-colors hover:text-primary">
            {lang === "et" ? "Laenud" : "Кредиты"}
          </Link>
          <Link href={`/${lang}/laenuleping`} className="text-sm font-medium transition-colors hover:text-primary">
            {lang === "et" ? "Laenuleping" : "Кредитный договор"}
          </Link>
          <Link
            href={`/${lang}/privaatsuspoliitika`}
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {lang === "et" ? "Privaatsuspoliitika" : "Политика конфиденциальности"}
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link href={alternatePath} className="flex items-center gap-1 text-sm font-medium">
            <Globe className="h-4 w-4" />
            <span>{alternateLang.toUpperCase()}</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
