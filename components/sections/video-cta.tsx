"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { PlaceholderImage } from "@/components/placeholder-image";
import { siteConfig } from "@/lib/site-config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function VideoCta({ dict }: { dict: Dictionary }) {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative isolate overflow-hidden">
      <PlaceholderImage hue={120} icon={false} className="absolute inset-0 size-full" />
      <div className="absolute inset-0 bg-black/65" />

      <div className="container-site relative flex flex-col items-center gap-6 py-16 text-center text-white sm:gap-8 sm:py-24 md:py-32">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={dict.a11y.watchOurVideo}
          className="group relative grid size-20 place-items-center rounded-full bg-white/15 backdrop-blur transition-transform hover:scale-105"
        >
          <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-white/20" />
          <span className="relative grid size-16 place-items-center rounded-full bg-brand text-white shadow-lg transition-colors group-hover:bg-brand-light">
            <Play className="size-7 translate-x-0.5 fill-current" />
          </span>
        </button>

        <h2 className="max-w-2xl text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
          {dict.videoCta.title}
        </h2>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80 sm:text-sm">
          {dict.videoCta.caption}
        </p>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[calc(100vw-2rem)] overflow-hidden p-0 sm:max-w-3xl">
          <DialogTitle className="sr-only">{dict.a11y.companyVideo}</DialogTitle>
          <div className="aspect-video w-full">
            {open ? (
              <iframe
                className="size-full"
                src={`https://www.youtube-nocookie.com/embed/${siteConfig.videoId}?autoplay=1&rel=0`}
                title={dict.a11y.companyVideo}
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
