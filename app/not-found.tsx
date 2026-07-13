import Link from "next/link";
import { Home, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export default function NotFound() {
  return (
    <div className="container-site flex min-h-[60vh] flex-col items-center justify-center gap-4 py-20 text-center">
      <p className="text-6xl font-extrabold text-brand">404</p>
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="max-w-md text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has moved. Explore our products or get
        in touch with our team.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button render={<Link href="/" />}>
          <Home className="size-4" /> Back to home
        </Button>
        <Button variant="outline" render={<a href={siteConfig.contact.phoneHref} />}>
          <Phone className="size-4" /> Call us
        </Button>
      </div>
    </div>
  );
}
