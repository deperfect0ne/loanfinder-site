"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface ContactFormProps {
  lang: string
}

export default function ContactForm({ lang }: ContactFormProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: lang === "et" ? "Sõnum saadetud!" : "Сообщение отправлено!",
          description:
            lang === "et"
              ? "Täname teiega ühendust võtmast. Vastame esimesel võimalusel."
              : "Спасибо за обращение. Мы ответим вам при первой возможности.",
        })
        setFormData({ name: "", email: "", message: "" })
      } else {
        throw new Error("Failed to submit form")
      }
    } catch (error) {
      toast({
        title: lang === "et" ? "Viga!" : "Ошибка!",
        description:
          lang === "et"
            ? "Sõnumi saatmisel tekkis viga. Palun proovige hiljem uuesti."
            : "При отправке сообщения произошла ошибка. Пожалуйста, попробуйте позже.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium">
          {lang === "et" ? "Nimi" : "Имя"}
        </label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder={lang === "et" ? "Sisesta oma nimi" : "Введите ваше имя"}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium">
          {lang === "et" ? "E-post" : "Эл. почта"}
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder={lang === "et" ? "Sisesta oma e-post" : "Введите вашу эл. почту"}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium">
          {lang === "et" ? "Sõnum" : "Сообщение"}
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          placeholder={lang === "et" ? "Sisesta oma sõnum" : "Введите ваше сообщение"}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting
          ? lang === "et"
            ? "Saatmine..."
            : "Отправка..."
          : lang === "et"
            ? "Saada sõnum"
            : "Отправить сообщение"}
      </Button>
    </form>
  )
}
