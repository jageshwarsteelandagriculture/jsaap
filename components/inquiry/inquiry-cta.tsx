"use client";

import { MessageSquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useInquiryModal } from "@/components/inquiry/inquiry-modal";

/**
 * Client island: a button that opens the global Quick Inquiry modal.
 * Safe to drop into otherwise-server-rendered pages.
 */
export function InquiryButton({
  label = "Quick Inquiry",
  size = "lg",
  variant = "outline",
}: {
  label?: string;
  size?: "sm" | "lg" | "default";
  variant?: "default" | "outline" | "secondary";
}) {
  const { open } = useInquiryModal();
  return (
    <Button type="button" size={size} variant={variant} onClick={open}>
      <MessageSquarePlus className="size-4" /> {label}
    </Button>
  );
}
