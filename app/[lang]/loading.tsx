"use client";

import { Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { defaultLocale, hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default function Loading() {
  const pathname = usePathname();
  const segment = pathname.split("/")[1] ?? "";
  const lang = hasLocale(segment) ? segment : defaultLocale;

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-muted-foreground">
      <Loader2 className="size-8 animate-spin text-brand" />
      <p className="text-sm font-medium">{getDictionary(lang).common.loading}</p>
    </div>
  );
}
