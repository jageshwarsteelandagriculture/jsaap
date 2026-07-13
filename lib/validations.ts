import { z } from "zod";

export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(80, "Name is too long"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .max(20, "Phone number is too long")
    .regex(/^[+0-9()\-\s]+$/, "Enter a valid phone number"),
  message: z
    .string()
    .trim()
    .min(10, "Please add a few details (min 10 characters)")
    .max(2000, "Message is too long"),
  // Honeypot — must stay empty. Bots tend to fill every field.
  company: z.string().max(0).optional().or(z.literal("")),
  source: z.enum(["quote-form", "quick-inquiry"]),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export type EnquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<keyof EnquiryInput, string>>;
};
