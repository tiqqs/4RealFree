"use client"

import Link from "next/link"
import { Gamepad2 } from "lucide-react"
import { useLanguage } from "@/components/language-provider-client"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t">
      <div className="container flex flex-col md:flex-row py-8 gap-6 justify-between">
        {/* Linke Seite - Brand und Copyright */}
        <div className="flex flex-col justify-center gap-4">
          <div className="flex items-center gap-3 mb-2">
            <Gamepad2 className="h-10 w-10" />
            <span className="font-bold text-2xl md:text-3xl">{t("common", "title")}</span>
          </div>
          <p className="text-sm text-muted-foreground">&copy; 2025 4RealFree.</p>
        </div>

        {/* Rechte Seite - Rechtliches und API-Info */}
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="font-semibold mb-2">{t("footer", "legal")}</h3>
            <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
              <Link href="/legal/privacy-policy" className="hover:underline hover:text-primary">
                {t("footer", "privacyPolicy")}
              </Link>
              <Link href="/legal/disclaimer" className="hover:underline hover:text-primary">
                {t("footer", "disclaimer")}
              </Link>
              <Link href="/legal/imprint" className="hover:underline hover:text-primary">
                {t("footer", "imprint")}
              </Link>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            {t("footer", "poweredBy")}{" "}
            <a
              href="https://www.freetogame.com/api-doc"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-primary"
            >
              FreeToGame API
            </a>
            . {t("footer", "notAffiliated")}
          </p>
        </div>
      </div>
    </footer>
  )
}
