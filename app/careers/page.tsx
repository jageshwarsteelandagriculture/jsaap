import type { Metadata } from "next";
import { Mail } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Careers",
  description: `Build your career with ${siteConfig.name}. Explore opportunities in manufacturing, engineering, sales and support.`,
  path: "/careers",
});

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Join the team"
        title="Careers"
        description="We're always looking for talented people who share our passion for building dependable agricultural machinery."
        crumbs={[{ name: "Careers", href: "/careers" }]}
        hue={122}
      />

      <section className="section">
        <div className="container-site max-w-3xl text-center">
          <h2 className="text-3xl font-bold">No open positions right now</h2>
          <p className="mt-4 text-muted-foreground">
            We don&apos;t have any vacancies listed at the moment, but we&apos;re always glad to hear
            from skilled professionals in manufacturing, engineering, sales and after-sales support.
            Send us your résumé and we&apos;ll keep it on file.
          </p>
          <Button
            size="lg"
            className="mt-8"
            render={<a href={`mailto:${siteConfig.contact.email}?subject=Career%20Enquiry`} />}
          >
            <Mail className="size-4" /> Email your résumé
          </Button>
        </div>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
        ])}
      />
    </>
  );
}
