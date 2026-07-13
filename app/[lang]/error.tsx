"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { defaultLocale, hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const pathname = usePathname();
  const segment = pathname.split("/")[1] ?? "";
  const lang = hasLocale(segment) ? segment : defaultLocale;
  const dict = getDictionary(lang);

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container-site flex min-h-[60vh] flex-col items-center justify-center gap-4 py-20 text-center">
      <h1 className="text-2xl font-bold sm:text-3xl">{dict.error.title}</h1>
      <p className="max-w-md text-muted-foreground">{dict.error.body}</p>
      <Button size="lg" onClick={reset}>
        <RotateCcw className="size-4" /> {dict.common.tryAgain}
      </Button>
    </div>
  );
}
