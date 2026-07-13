import { z } from "zod";

import { locales } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

/**
 * The enquiry schema is built per-locale so validation errors reach the visitor
 * in their own language. The form posts a `lang` field, which lets the server
 * action rebuild the very same schema — messages match on both sides.
 */
export function createEnquirySchema(t: Dictionary["form"]) {
  return z.object({
    name: z.string().trim().min(2, t.errors.nameMin).max(80, t.errors.nameMax),
    email: z
      .string()
      .trim()
      .min(1, t.errors.emailRequired)
      .email(t.errors.emailInvalid),
    phone: z
      .string()
      .trim()
      .min(7, t.errors.phoneInvalid)
      .max(20, t.errors.phoneMax)
      .regex(/^[+0-9()\-\s]+$/, t.errors.phoneInvalid),
    message: z
      .string()
      .trim()
      .min(10, t.errors.messageMin)
      .max(2000, t.errors.messageMax),
    // Honeypot — must stay empty. Bots tend to fill every field.
    company: z.string().max(0).optional().or(z.literal("")),
    source: z.enum(["quote-form", "quick-inquiry"]),
    lang: z.enum(locales),
  });
}

export type EnquiryInput = z.infer<ReturnType<typeof createEnquirySchema>>;

export type EnquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<keyof EnquiryInput, string>>;
};
