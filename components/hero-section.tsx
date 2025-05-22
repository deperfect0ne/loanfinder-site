"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { ArrowRight } from "lucide-react"

interface HeroSectionProps {
  lang: string
}

export default function HeroSection({ lang }: HeroSectionProps) {
  const router = useRouter()
  const [amount, setAmount] = useState(1000)
  const [term, setTerm] = useState(12)
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/${lang}/laenud?amount=${amount}&term=${term}&email=${encodeURIComponent(email)}`)
  }

  return (
    <header
      className="py-12 md:py-24 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl"
      aria-label={lang === "et" ? "Hero-sektsioon" : "Заголовочный блок"}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Левый блок с заголовком и кнопками */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {lang === "et"
                ? "Leia parim laenupakkumine minutitega"
                : "Найдите лучшее кредитное предложение за минуты"}
            </h1>
            <p className="text-xl mb-8 text-gray-600">
              {lang === "et"
                ? "Võrdle erinevaid laenupakkujaid ja leia soodsaim laen. Kiire, lihtne ja tasuta."
                : "Сравните различных кредиторов и найдите самый выгодный кредит. Быстро, просто и бесплатно."}
            </p>

            <nav className="flex flex-col sm:flex-row gap-4 mb-8" aria-label={lang === "et" ? "Hero-navigatsioon" : "Навигация в заголовке"}>
              <Button size="lg" onClick={() => router.push(`/${lang}/laenud`)}>
                {lang === "et" ? "Vaata laenupakkumisi" : "Смотреть кредитные предложения"}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() =>
                  document
                    .getElementById("calculator")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                {lang === "et" ? "Kasuta kalkulaatorit" : "Использовать калькулятор"}
              </Button>
            </nav>
          </div>

          {/* Правый блок с формой */}
          <article className="bg-white p-6 rounded-xl shadow-lg" aria-label={lang === "et" ? "Laenutaotluse vorm" : "Форма заявки на кредит"}>
            <h2 className="text-2xl font-bold mb-6">
              {lang === "et" ? "Kiire laenukalkulaator" : "Быстрый кредитный калькулятор"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Сумма */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {lang === "et" ? "Laenusumma" : "Сумма кредита"}: {amount}€
                  </label>
                  <Slider
                    value={[amount]}
                    min={100}
                    max={10000}
                    step={100}
                    onValueChange={(value) => setAmount(value[0])}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>100€</span>
                    <span>10 000€</span>
                  </div>
                </div>

                {/* Срок */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {lang === "et" ? "Laenuperiood" : "Срок кредита"}: {term}{" "}
                    {lang === "et" ? "kuud" : "месяцев"}
                  </label>
                  <Slider
                    value={[term]}
                    min={1}
                    max={60}
                    step={1}
                    onValueChange={(value) => setTerm(value[0])}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>1 {lang === "et" ? "kuu" : "месяц"}</span>
                    <span>60 {lang === "et" ? "kuud" : "месяцев"}</span>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {lang === "et" ? "E-post" : "Эл. почта"}
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={lang === "et" ? "Sisesta e-post" : "Введите эл. почту"}
                    required
                  />
                </div>

                {/* Отправка */}
                <Button type="submit" className="w-full">
                  {lang === "et" ? "Leia parim pakkumine" : "Найти лучшее предложение"}{" "}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </article>
        </div>
      </div>
    </header>
  )
}
