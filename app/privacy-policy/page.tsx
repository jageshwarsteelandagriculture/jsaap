import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses and protects your personal information.`,
  path: "/privacy-policy",
});

const sections = [
  {
    heading: "Information we collect",
    body: "When you submit an enquiry or quote request we collect the details you provide — your name, email, phone number and message — solely to respond to your request.",
  },
  {
    heading: "How we use your information",
    body: "We use your information to respond to enquiries, prepare quotes, process dealership applications and, where you have consented, to send relevant product updates. We do not sell your data.",
  },
  {
    heading: "Data retention",
    body: "We keep enquiry information only as long as necessary to serve your request and to comply with applicable legal obligations.",
  },
  {
    heading: "Cookies",
    body: "Our website may use essential cookies to ensure the site functions correctly. You can control cookies through your browser settings.",
  },
  {
    heading: "Your rights",
    body: "You may request access to, correction of, or deletion of your personal data at any time by contacting us using the details below.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader
        title="Privacy Policy"
        description="Your privacy matters to us. This policy explains how we handle your information."
        crumbs={[{ name: "Privacy Policy", href: "/privacy-policy" }]}
        hue={160}
      />

      <section className="section">
        <div className="container-site max-w-3xl space-y-8">
          <p className="text-muted-foreground">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}
          </p>
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="text-xl font-bold">{s.heading}</h2>
              <p className="mt-2 text-muted-foreground">{s.body}</p>
            </div>
          ))}
          <div>
            <h2 className="text-xl font-bold">Contact us</h2>
            <p className="mt-2 text-muted-foreground">
              For any privacy-related questions, contact us at{" "}
              <a href={`mailto:${siteConfig.contact.email}`} className="font-medium text-brand hover:underline">
                {siteConfig.contact.email}
              </a>{" "}
              or {siteConfig.contact.phone}.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
