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

type InquiryContextValue = { open: () => void; close: () => void };

const InquiryContext = createContext<InquiryContextValue | null>(null);

export function useInquiryModal() {
  const ctx = useContext(InquiryContext);
  if (!ctx) throw new Error("useInquiryModal must be used within InquiryProvider");
  return ctx;
}

export function InquiryProvider({ children }: { children: React.ReactNode }) {
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
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl">Quick Inquiry</DialogTitle>
            <DialogDescription>
              Send us your requirement and our team will get back to you shortly.
            </DialogDescription>
          </DialogHeader>
          <EnquiryForm
            source="quick-inquiry"
            submitLabel="Request Now"
            onSuccess={handleSuccess}
          />
        </DialogContent>
      </Dialog>
    </InquiryContext.Provider>
  );
}
