"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { PlaceholderImage } from "@/components/placeholder-image";
import { siteConfig } from "@/lib/site-config";

export function VideoCta() {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative isolate overflow-hidden">
      <PlaceholderImage hue={120} icon={false} className="absolute inset-0 size-full" />
      <div className="absolute inset-0 bg-black/65" />

      <div className="container-site relative flex flex-col items-center gap-8 py-24 text-center text-white md:py-32">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Watch our video"
          className="group relative grid size-20 place-items-center rounded-full bg-white/15 backdrop-blur transition-transform hover:scale-105"
        >
          <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-white/20" />
          <span className="relative grid size-16 place-items-center rounded-full bg-brand text-white shadow-lg transition-colors group-hover:bg-brand-light">
            <Play className="size-7 translate-x-0.5 fill-current" />
          </span>
        </button>

        <h2 className="max-w-2xl text-3xl font-bold text-white sm:text-4xl">
          Agriculture Matters to the Future of Development
        </h2>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
          Watch our video
        </p>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl overflow-hidden p-0">
          <DialogTitle className="sr-only">Company video</DialogTitle>
          <div className="aspect-video w-full">
            {open ? (
              <iframe
                className="size-full"
                src={`https://www.youtube-nocookie.com/embed/${siteConfig.videoId}?autoplay=1&rel=0`}
                title="Company video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
