import { notFound, redirect } from "next/navigation";
import { hasLocale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/routing";

export default async function CompanyIndex({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  redirect(localePath(lang, "/company/about"));
}
