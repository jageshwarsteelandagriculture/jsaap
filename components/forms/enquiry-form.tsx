"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";

import { submitEnquiry } from "@/app/actions/enquiry";
import { enquirySchema, type EnquiryInput } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type EnquiryFormProps = {
  source?: EnquiryInput["source"];
  submitLabel?: string;
  onSuccess?: () => void;
  className?: string;
};

export function EnquiryForm({
  source = "quote-form",
  submitLabel = "Enquire Now",
  onSuccess,
  className,
}: EnquiryFormProps) {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { name: "", email: "", phone: "", message: "", company: "", source },
  });

  const onSubmit = (values: EnquiryInput) => {
    startTransition(async () => {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) =>
        formData.append(key, String(value ?? "")),
      );

      const result = await submitEnquiry({ status: "idle" }, formData);

      if (result.status === "success") {
        toast.success(result.message ?? "Enquiry sent!");
        reset({ name: "", email: "", phone: "", message: "", company: "", source });
        onSuccess?.();
      } else {
        if (result.errors) {
          for (const [field, message] of Object.entries(result.errors)) {
            setError(field as keyof EnquiryInput, { message });
          }
        }
        toast.error(result.message ?? "Could not send your enquiry.");
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={cn("grid gap-4", className)}
    >
      {/* Honeypot — visually hidden, ignored by humans */}
      <div className="absolute -left-[9999px]" aria-hidden>
        <label htmlFor="company">Company</label>
        <input id="company" type="text" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>
      <input type="hidden" {...register("source")} value={source} />

      <div className="grid gap-2">
        <Label htmlFor={`${source}-name`}>Name</Label>
        <Input
          id={`${source}-name`}
          placeholder="Your full name"
          autoComplete="name"
          aria-invalid={!!errors.name}
          {...register("name")}
        />
        {errors.name ? <FieldError>{errors.name.message}</FieldError> : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor={`${source}-email`}>Email</Label>
          <Input
            id={`${source}-email`}
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email ? <FieldError>{errors.email.message}</FieldError> : null}
        </div>
        <div className="grid gap-2">
          <Label htmlFor={`${source}-phone`}>Phone</Label>
          <Input
            id={`${source}-phone`}
            type="tel"
            placeholder="+91 98791 71496"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
          {errors.phone ? <FieldError>{errors.phone.message}</FieldError> : null}
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor={`${source}-message`}>Message</Label>
        <Textarea
          id={`${source}-message`}
          rows={4}
          placeholder="Tell us which machinery you're interested in and your requirements…"
          aria-invalid={!!errors.message}
          {...register("message")}
        />
        {errors.message ? <FieldError>{errors.message.message}</FieldError> : null}
      </div>

      <Button type="submit" size="lg" disabled={isPending} className="mt-1 w-full sm:w-auto">
        {isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Send className="size-4" /> {submitLabel}
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
