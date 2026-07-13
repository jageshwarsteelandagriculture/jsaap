"use server";

import { enquirySchema, type EnquiryState } from "@/lib/validations";

/**
 * Handle an enquiry / quote request.
 *
 * Frontend-first build: this validates on the server with Zod and currently
 * logs the enquiry. To persist, swap the `// TODO: persist` block for a
 * Mongoose `Enquiry.create(data)` call (and optionally an email/WhatsApp
 * notification). The function signature already matches `useActionState`.
 */
export async function submitEnquiry(
  _prevState: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
    company: formData.get("company") ?? "",
    source: formData.get("source") ?? "quote-form",
  };

  const parsed = enquirySchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: EnquiryState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof typeof fieldErrors;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return {
      status: "error",
      message: "Please correct the highlighted fields.",
      errors: fieldErrors,
    };
  }

  // Honeypot tripped — pretend success, drop silently.
  if (parsed.data.company) {
    return { status: "success", message: "Thank you! We'll be in touch shortly." };
  }

  try {
    // TODO: persist to MongoDB via Mongoose, e.g.
    //   await dbConnect();
    //   await Enquiry.create({ ...enquiry, createdAt: new Date() });
    // and/or send a notification email / WhatsApp message.
    const enquiry = {
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      message: parsed.data.message,
      source: parsed.data.source,
    };
    console.info("[enquiry] received", enquiry);

    return {
      status: "success",
      message: "Thank you! Your enquiry has been received — our team will contact you shortly.",
    };
  } catch (error) {
    console.error("[enquiry] failed to process", error);
    return {
      status: "error",
      message: "Something went wrong while sending your enquiry. Please try again or call us.",
    };
  }
}
