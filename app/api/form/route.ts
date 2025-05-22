import { NextResponse } from "next/server"
import { mkdir, appendFile } from "fs/promises"
import { join } from "path"

const logDir = join(process.cwd(), "log")
const successLogPath = join(logDir, "success.log")
const errorLogPath = join(logDir, "error.log")

async function logToFile(path: string, content: string) {
  try {
    await mkdir(logDir, { recursive: true })
    await appendFile(path, content + "\n", "utf8")
  } catch (err) {
    console.error("Ошибка при записи лога:", err)
  }
}

export async function GET() {
  return NextResponse.json(
    {
      message: "Form submission API endpoint",
      usage: "Send a POST request with name, email, and message fields",
    },
    { status: 200 },
  )
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { name, email, message } = data

    if (!name || !email || !message) {
      const errorEntry = `⛔ ${new Date().toISOString()} | Missing fields`
      await logToFile(errorLogPath, errorEntry)
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // 1) Режим логирования — просто пишем в success.log
    const logEntry = `✅ ${new Date().toISOString()} | Name: ${name}, Email: ${email}, Message: ${message}`
    await logToFile(successLogPath, logEntry)

    // 2) Если включён SMTP-режим, отправляем письмо
    if (process.env.SMTP_ENABLED === "true") {
      // динамически импортируем nodemailer, чтобы не падать, если не установлен
      const nodemailer = (await import("nodemailer")).default

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })

      await transporter.sendMail({
        from: `"Website Contact" <${process.env.SMTP_FROM}>`,
        to: process.env.CONTACT_EMAIL,
        subject: `New message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        html: `<p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p>${message}</p>`,
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    const errorEntry = `❌ ${new Date().toISOString()} | Error: ${
      error instanceof Error ? error.message : String(error)
    }`
    await logToFile(errorLogPath, errorEntry)

    return NextResponse.json({ success: false, error: "Failed to process form submission" }, { status: 500 })
  }
}
