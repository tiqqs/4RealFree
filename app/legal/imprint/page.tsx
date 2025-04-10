"use client"

import { useLanguage } from "@/components/language-provider-client"

export default function ImprintPage() {
  const { t } = useLanguage()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t("legal", "imprintTitle")}</h1>
      <div className="prose prose-lg dark:prose-invert max-w-none whitespace-pre-line">
        <p>{t("legal", "imprintContent")}</p>
      </div>
    </div>
  )
}
