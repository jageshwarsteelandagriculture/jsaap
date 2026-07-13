"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type InquiryContextValue = { open: () => void; close: () => void };

const InquiryContext = createContext<InquiryContextValue | null>(null);

export function useInquiryModal() {
  const ctx = useContext(InquiryContext);
  if (!ctx) throw new Error("useInquiryModal must be used within InquiryProvider");
  return ctx;
}

export function InquiryProvider({
  children,
  lang,
  dict,
}: {
  children: React.ReactNode;
  lang: Locale;
  dict: Dictionary;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo<InquiryContextValue>(
    () => ({ open: () => setIsOpen(true), close: () => setIsOpen(false) }),
    [],
  );

  const handleSuccess = useCallback(() => {
    // close shortly after success so the toast is visible
    setTimeout(() => setIsOpen(false), 1200);
  }, []);

  return (
    <InquiryContext.Provider value={value}>
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-h-[90vh] max-w-[calc(100vw-2rem)] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl">{dict.inquiryModal.title}</DialogTitle>
            <DialogDescription>{dict.inquiryModal.description}</DialogDescription>
          </DialogHeader>
          <EnquiryForm
            lang={lang}
            dict={dict}
            source="quick-inquiry"
            submitLabel={dict.common.requestNow}
            onSuccess={handleSuccess}
          />
        </DialogContent>
      </Dialog>
    </InquiryContext.Provider>
  );
}
