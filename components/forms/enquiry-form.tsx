"use client";

import { useMemo, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";

import { submitEnquiry } from "@/app/actions/enquiry";
import { createEnquirySchema, type EnquiryInput } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { cn } from "@/lib/utils";

type EnquiryFormProps = {
  lang: Locale;
  dict: Dictionary;
  source?: EnquiryInput["source"];
  submitLabel?: string;
  onSuccess?: () => void;
  className?: string;
};

export function EnquiryForm({
  lang,
  dict,
  source = "quote-form",
  submitLabel,
  onSuccess,
  className,
}: EnquiryFormProps) {
  const [isPending, startTransition] = useTransition();
  const t = dict.form;

  const schema = useMemo(() => createEnquirySchema(t), [t]);
  const emptyValues: EnquiryInput = {
    name: "",
    email: "",
    phone: "",
    message: "",
    company: "",
    source,
    lang,
  };

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(schema),
    defaultValues: emptyValues,
  });

  const onSubmit = (values: EnquiryInput) => {
    startTransition(async () => {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) =>
        formData.append(key, String(value ?? "")),
      );

      const result = await submitEnquiry({ status: "idle" }, formData);

      if (result.status === "success") {
        toast.success(result.message ?? t.successToast);
        reset(emptyValues);
        onSuccess?.();
      } else {
        if (result.errors) {
          for (const [field, message] of Object.entries(result.errors)) {
            setError(field as keyof EnquiryInput, { message });
          }
        }
        toast.error(result.message ?? t.errorToast);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={cn("grid gap-4", className)}>
      {/* Honeypot — visually hidden, ignored by humans */}
      <div className="absolute -left-[9999px]" aria-hidden>
        <label htmlFor={`${source}-company`}>{t.company}</label>
        <input
          id={`${source}-company`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("company")}
        />
      </div>
      <input type="hidden" {...register("source")} value={source} />
      <input type="hidden" {...register("lang")} value={lang} />

      <div className="grid gap-2">
        <Label htmlFor={`${source}-name`}>{t.name}</Label>
        <Input
          id={`${source}-name`}
          placeholder={t.namePlaceholder}
          autoComplete="name"
          className="h-11"
          aria-invalid={!!errors.name}
          {...register("name")}
        />
        {errors.name ? <FieldError>{errors.name.message}</FieldError> : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor={`${source}-email`}>{t.email}</Label>
          <Input
            id={`${source}-email`}
            type="email"
            inputMode="email"
            placeholder={t.emailPlaceholder}
            autoComplete="email"
            className="h-11"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email ? <FieldError>{errors.email.message}</FieldError> : null}
        </div>
        <div className="grid gap-2">
          <Label htmlFor={`${source}-phone`}>{t.phone}</Label>
          <Input
            id={`${source}-phone`}
            type="tel"
            inputMode="tel"
            placeholder={t.phonePlaceholder}
            autoComplete="tel"
            className="h-11"
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
          {errors.phone ? <FieldError>{errors.phone.message}</FieldError> : null}
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor={`${source}-message`}>{t.message}</Label>
        <Textarea
          id={`${source}-message`}
          rows={4}
          placeholder={t.messagePlaceholder}
          aria-invalid={!!errors.message}
          {...register("message")}
        />
        {errors.message ? <FieldError>{errors.message.message}</FieldError> : null}
      </div>

      <Button type="submit" size="lg" disabled={isPending} className="mt-1 w-full sm:w-auto">
        {isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" /> {dict.common.sending}
          </>
        ) : (
          <>
            <Send className="size-4" /> {submitLabel ?? dict.common.enquireNow}
          </>
        )}
      </Button>
    </form>
  );
}

function FieldError({ children }: { children: React.ReactNode }) {
  return (
    <p role="alert" className="text-sm font-medium text-destructive">
      {children}
    </p>
  );
}
