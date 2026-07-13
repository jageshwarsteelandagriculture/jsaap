"use client";

import { MessageCircleMore, MessageSquarePlus } from "lucide-react";
import { useInquiryModal } from "@/components/inquiry/inquiry-modal";
import { whatsappLink } from "@/lib/site-config";

export function FloatingActions() {
  const { open } = useInquiryModal();

  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <a
        href={whatsappLink("Hello! I'd like to know more about your agricultural machinery.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="group flex size-12 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg shadow-black/15 transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-whatsapp sm:size-14"
      >
        <MessageCircleMore className="size-6 sm:size-7" />
      </a>
      <button
        type="button"
        onClick={open}
        aria-label="Open quick inquiry form"
        className="flex items-center gap-2 rounded-full bg-brand px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-black/15 transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        <MessageSquarePlus className="size-5" />
        <span className="hidden sm:inline">Quick Inquiry</span>
      </button>
    </div>
  );
}
