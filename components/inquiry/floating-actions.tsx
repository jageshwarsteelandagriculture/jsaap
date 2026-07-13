"use client";

import { MessageCircleMore, MessageSquarePlus } from "lucide-react";
import { useInquiryModal } from "@/components/inquiry/inquiry-modal";
import { whatsappLink } from "@/lib/site-config";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function FloatingActions({ dict }: { lang: Locale; dict: Dictionary }) {
  const { open } = useInquiryModal();

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <a
        href={whatsappLink(dict.inquiryModal.description)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={dict.a11y.chatWhatsapp}
        className="group flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg shadow-black/15 transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-whatsapp"
      >
        <MessageCircleMore className="size-7" />
      </a>
      <button
        type="button"
        onClick={open}
        aria-label={dict.a11y.openInquiry}
        className="flex min-h-12 items-center gap-2 rounded-full bg-brand px-4 text-sm font-semibold text-white shadow-lg shadow-black/15 transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        <MessageSquarePlus className="size-5" />
        <span className="hidden sm:inline">{dict.common.quickInquiry}</span>
      </button>
    </div>
  );
}
