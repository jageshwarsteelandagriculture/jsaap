"use server";

import { createEnquirySchema, type EnquiryState } from "@/lib/validations";
import { defaultLocale, hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

/**
 * Handle an enquiry / quote request.
 *
 * Frontend-first build: this validates on the server with Zod and currently
 * logs the enquiry. To persist, swap the `// TODO: persist` block for a
 * Mongoose `Enquiry.create(data)` call (and optionally an email/WhatsApp
 * notification). The function signature already matches `useActionState`.
 *
 * The form posts the visitor's locale so every message we send back — field
 * errors included — is in the language they are reading the site in.
 */
export async function submitEnquiry(
  _prevState: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const rawLang = String(formData.get("lang") ?? "");
  const lang = hasLocale(rawLang) ? rawLang : defaultLocale;
  const t = getDictionary(lang).form;

  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
    company: formData.get("company") ?? "",
    source: formData.get("source") ?? "quote-form",
    lang,
  };

  const parsed = createEnquirySchema(t).safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: EnquiryState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof typeof fieldErrors;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return {
      status: "error",
      message: t.correctFields,
      errors: fieldErrors,
    };
  }

  // Honeypot tripped — pretend success, drop silently.
  if (parsed.data.company) {
    return { status: "success", message: t.thankYou };
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
      lang: parsed.data.lang,
    };
    console.info("[enquiry] received", enquiry);

    return { status: "success", message: t.successMessage };
  } catch (error) {
    console.error("[enquiry] failed to process", error);
    return { status: "error", message: t.errorMessage };
  }
}
