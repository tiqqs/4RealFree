"use client"

import { useLanguage } from "@/components/language-provider-client"

export default function PrivacyPolicyPage() {
  const { t } = useLanguage()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t("legal", "privacyPolicyTitle")}</h1>
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>{t("legal", "privacyPolicyContent")}</p>

        <h2 className="text-xl font-semibold mt-6 mb-4">1. {t("legal", "privacyPolicyTitle")}</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl
          nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl
          aliquam nisl, eget ultricies nisl nisl eget nisl.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-4">2. {t("legal", "privacyPolicyTitle")}</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl
          nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl
          aliquam nisl, eget ultricies nisl nisl eget nisl.
        </p>
      </div>
    </div>
  )
}
