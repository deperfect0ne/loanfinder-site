interface SeoTextBlocksProps {
  lang: string
  content: string
}

export default function SeoTextBlocks({ lang, content }: SeoTextBlocksProps) {
  // Split content into paragraphs
  const paragraphs = content.split(". ").filter((p) => p.trim().length > 0)

  // Group paragraphs into blocks of 2-3
  const blocks = []
  for (let i = 0; i < paragraphs.length; i += 2) {
    blocks.push(paragraphs.slice(i, i + 2).join(". ") + (i + 2 < paragraphs.length ? "." : ""))
  }

  return (
    <section className="space-y-8">
      <h2 className="text-3xl font-bold mb-6">{lang === "et" ? "Kasulik info" : "Полезная информация"}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blocks.map((block, index) => (
          <div key={index} className={`bg-white p-6 rounded-lg shadow-sm border ${index === 0 ? "md:col-span-2" : ""}`}>
            <h3 className="text-xl font-semibold mb-3">
              {lang === "et"
                ? `${index === 0 ? "Ülevaade" : `Info ${index}`}`
                : `${index === 0 ? "Обзор" : `Информация ${index}`}`}
            </h3>
            <p className="text-gray-600">{block}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
