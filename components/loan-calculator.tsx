"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

interface LoanCalculatorProps {
  lang: string
  loanType?: string
  creditor?: string
  /** Начальные значения (опционально), если нужно задавать из URL на уровне страницы */
  initialAmount?: number
  initialTerm?: number
}

export default function LoanCalculator({
  lang,
  loanType,
  creditor,
  initialAmount = 1000,
  initialTerm = 12,
}: LoanCalculatorProps) {
  const [amount, setAmount] = useState(initialAmount)
  const [term, setTerm] = useState(initialTerm)
  const [rate, setRate] = useState(15) // Default interest rate
  const [monthlyPayment, setMonthlyPayment] = useState(0)
  const [totalPayment, setTotalPayment] = useState(0)

  // Determine min/max based on loanType/creditor
  const getMinMaxValues = () => {
    if (creditor === "ferratum") {
      return { minAmount: 100, maxAmount: 5000, minTerm: 1, maxTerm: 36 }
    } else if (creditor === "bondora") {
      return { minAmount: 500, maxAmount: 10000, minTerm: 3, maxTerm: 60 }
    } else if (creditor === "credit24") {
      return { minAmount: 100, maxAmount: 7500, minTerm: 1, maxTerm: 48 }
    } else if (creditor === "boonuslaen") {
      return { minAmount: 300, maxAmount: 3000, minTerm: 3, maxTerm: 24 }
    } else if (loanType === "small") {
      return { minAmount: 100, maxAmount: 5000, minTerm: 1, maxTerm: 36 }
    } else {
      return { minAmount: 100, maxAmount: 10000, minTerm: 1, maxTerm: 60 }
    }
  }

  const { minAmount, maxAmount, minTerm, maxTerm } = getMinMaxValues()

  // Пересчёт платежей при изменении amount, term или rate
  useEffect(() => {
    const monthlyRate = rate / 100 / 12

    let mp: number
    if (monthlyRate === 0) {
      mp = amount / term
    } else {
      const x = Math.pow(1 + monthlyRate, term)
      mp = (amount * monthlyRate * x) / (x - 1)
    }
    setMonthlyPayment(mp)
    setTotalPayment(mp * term)
  }, [amount, term, rate])

  return (
    <Card id="calculator" className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>
          {lang === "et" ? "Laenukalkulaator" : "Кредитный калькулятор"}
        </CardTitle>
        <CardDescription>
          {lang === "et"
            ? "Arvuta oma laenu kuumakse ja kogumakse"
            : "Рассчитайте ежемесячный и общий платеж по кредиту"}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Сумма */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium">
              {lang === "et" ? "Laenusumma" : "Сумма кредита"}
            </label>
            <span className="font-medium">{amount}€</span>
          </div>
          <Slider
            value={[amount]}
            min={minAmount}
            max={maxAmount}
            step={100}
            onValueChange={(val) => setAmount(val[0])}
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>{minAmount}€</span>
            <span>{maxAmount}€</span>
          </div>
        </div>

        {/* Срок */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium">
              {lang === "et" ? "Laenuperiood" : "Срок кредита"}
            </label>
            <span className="font-medium">
              {term} {lang === "et" ? "kuud" : "месяцев"}
            </span>
          </div>
          <Slider
            value={[term]}
            min={minTerm}
            max={maxTerm}
            step={1}
            onValueChange={(val) => setTerm(val[0])}
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>
              {minTerm} {lang === "et" ? "kuu" : "месяц"}
            </span>
            <span>
              {maxTerm} {lang === "et" ? "kuud" : "месяцев"}
            </span>
          </div>
        </div>

        {/* Процентная ставка */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium">
              {lang === "et" ? "Intressimäär" : "Процентная ставка"}
            </label>
            <span className="font-medium">{rate}%</span>
          </div>
          <Slider
            value={[rate]}
            min={5}
            max={30}
            step={0.1}
            onValueChange={(val) => setRate(val[0])}
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>5%</span>
            <span>30%</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col">
        <div className="w-full p-4 bg-gray-50 rounded-lg mb-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">
                {lang === "et" ? "Kuumakse" : "Ежемесячный платеж"}
              </p>
              <p className="text-2xl font-bold">{monthlyPayment.toFixed(2)}€</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">
                {lang === "et" ? "Kogumakse" : "Общая сумма выплаты"}
              </p>
              <p className="text-2xl font-bold">{totalPayment.toFixed(2)}€</p>
            </div>
          </div>
        </div>
        <Button className="w-full">
          {lang === "et" ? "Vaata laenupakkumisi" : "Смотреть кредитные предложения"}
        </Button>
      </CardFooter>
    </Card>
  )
}
