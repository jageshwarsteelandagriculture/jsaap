import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter, Noto_Sans_Devanagari, Noto_Sans_Gujarati, Poppins } from "next/font/google";
import "../globals.css";

import { Toaster } from "@/components/ui/sonner";
import { JsonLd } from "@/components/seo/json-ld";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { InquiryProvider } from "@/components/inquiry/inquiry-modal";
import { FloatingActions } from "@/components/inquiry/floating-actions";
import { LanguageGate } from "@/components/i18n/language-gate";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { hasLocale, locales, localeMeta, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localePath } from "@/lib/i18n/routing";

const inter = Inter({
  variable: "--font-latin",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-latin-heading",
  weight: ["500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

/* Devanagari and Gujarati are not covered by Inter/Poppins. Without these the
 * browser falls back to whatever system font it can find, which renders badly
 * on many Windows and Android devices. `globals.css` swaps them in per `lang`. */
const devanagari = Noto_Sans_Devanagari({
  variable: "--font-devanagari",
  weight: ["400", "500", "600", "700"],
  subsets: ["devanagari", "latin"],
  display: "swap",
});

const gujarati = Noto_Sans_Gujarati({
  variable: "--font-gujarati",
  weight: ["400", "500", "600", "700"],
  subsets: ["gujarati", "latin"],
  display: "swap",
});

const fontVars = [inter, poppins, devanagari, gujarati].map((f) => f.variable).join(" ");

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${siteConfig.name} — ${dict.brand.tagline}`,
      template: `%s | ${siteConfig.name}`,
    },
    description: dict.brand.description,
    applicationName: siteConfig.name,
    keywords: [
      "agricultural machinery",
      "tractor-mounted equipment",
      "hydraulic reversible plough",
      "cultivator",
      "disc harrow",
      "land leveller",
      "farm equipment manufacturer",
    ],
    authors: [{ name: siteConfig.legalName }],
    creator: siteConfig.legalName,
    publisher: siteConfig.legalName,
    alternates: {
      canonical: localePath(lang, "/"),
      // Tells Google these are translations of one page, not duplicates.
      languages: Object.fromEntries(
        locales.map((l) => [localeMeta[l].intl, localePath(l, "/")]),
      ),
    },
    formatDetection: { telephone: true, email: true, address: true },
    icons: { icon: "/favicon.ico" },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const locale: Locale = lang;
  const dict = getDictionary(locale);

  return (
    <html lang={localeMeta[locale].htmlLang} className={`${fontVars} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background">
        <InquiryProvider lang={locale} dict={dict}>
          <Header lang={locale} dict={dict} />
          <main className="flex-1">{children}</main>
          <Footer lang={locale} dict={dict} />
          <FloatingActions lang={locale} dict={dict} />
        </InquiryProvider>
        <LanguageGate dict={dict} />
        <Toaster richColors position="top-center" />
        <JsonLd data={organizationJsonLd(dict.brand.description)} />
        <JsonLd data={websiteJsonLd(dict.brand.description)} />
      </body>
    </html>
  );
}
