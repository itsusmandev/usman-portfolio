"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail, MapPin, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { profile } from "@/data/profile";
import { contactSchema, type ContactInput } from "@/lib/validators";
import { cn } from "@/lib/utils";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      website: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setStatus("idle");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error("Failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  });

  return (
    <Section id="contact" labelledBy="contact-heading" className="bg-surface/30">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-muted">
            Contact
          </p>
          <h2
            id="contact-heading"
            className="font-heading text-3xl font-semibold md:text-4xl"
          >
            Let’s build something that converts
          </h2>
          <p className="mt-4 max-w-md text-muted">
            Tell me about your product, store, or idea. I usually reply within one
            business day.
          </p>

          <ul className="mt-8 space-y-4">
            <li>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-3 text-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Mail className="size-4" aria-hidden="true" />
                {profile.email}
              </a>
            </li>
            <li>
              <a
                href={profile.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                WhatsApp
              </a>
            </li>
            <li className="inline-flex items-center gap-3 text-muted">
              <MapPin className="size-4" aria-hidden="true" />
              {profile.location}
            </li>
          </ul>

          <div className="mt-6 flex gap-3">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex size-10 items-center justify-center rounded-full border border-border text-muted hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <FaGithub className="size-4" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex size-10 items-center justify-center rounded-full border border-border text-muted hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <FaLinkedin className="size-4" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={onSubmit}
            noValidate
            className="rounded-2xl border border-border bg-background/80 p-6 md:p-8"
          >
            <div className="grid gap-5">
              <label className="grid gap-2 text-sm">
                <span>Name</span>
                <input
                  {...register("name")}
                  autoComplete="name"
                  className={cn(
                    "rounded-xl border border-border bg-surface px-4 py-3 outline-none transition-colors focus:border-accent",
                    errors.name && "border-red-400",
                  )}
                />
                {errors.name ? (
                  <span className="text-xs text-red-400">{errors.name.message}</span>
                ) : null}
              </label>

              <label className="grid gap-2 text-sm">
                <span>Email</span>
                <input
                  {...register("email")}
                  type="email"
                  autoComplete="email"
                  className={cn(
                    "rounded-xl border border-border bg-surface px-4 py-3 outline-none transition-colors focus:border-accent",
                    errors.email && "border-red-400",
                  )}
                />
                {errors.email ? (
                  <span className="text-xs text-red-400">
                    {errors.email.message}
                  </span>
                ) : null}
              </label>

              <label className="grid gap-2 text-sm">
                <span>Message</span>
                <textarea
                  {...register("message")}
                  rows={5}
                  className={cn(
                    "resize-y rounded-xl border border-border bg-surface px-4 py-3 outline-none transition-colors focus:border-accent",
                    errors.message && "border-red-400",
                  )}
                />
                {errors.message ? (
                  <span className="text-xs text-red-400">
                    {errors.message.message}
                  </span>
                ) : null}
              </label>

              <input
                {...register("website")}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send message"
                )}
              </Button>

              {status === "success" ? (
                <p className="text-sm text-accent" role="status">
                  Message sent. I’ll get back to you soon.
                </p>
              ) : null}
              {status === "error" ? (
                <p className="text-sm text-red-400" role="alert">
                  Something went wrong. Try again or email me directly.
                </p>
              ) : null}
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
