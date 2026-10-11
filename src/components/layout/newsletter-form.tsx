"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { whatsappLink } from "@/lib/whatsapp";

// TODO: replace with a real newsletter provider. Until then the signup is sent to the
// operator's WhatsApp so no subscriber is silently dropped.
export function NewsletterForm() {
  const [email, setEmail] = useState("");

  return (
    <form
      className="mt-8 max-w-sm"
      onSubmit={(e) => {
        e.preventDefault();
        window.open(
          whatsappLink(`Please add ${email} to your offers list.`),
          "_blank",
          "noopener,noreferrer",
        );
      }}
    >
      <label htmlFor="newsletter-email" className="text-xs font-bold uppercase tracking-[0.2em] text-sand-50">
        Get offers first
      </label>
      <div className="mt-3 flex h-14 items-center rounded-full border border-sand-50/20 bg-sand-50/5 pl-5 pr-1.5 focus-within:border-red-500">
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          autoComplete="email"
          className="min-w-0 flex-1 bg-transparent text-sm text-sand-50 outline-none placeholder:text-sand-200/40"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-red-500 text-sand-50 transition-colors hover:bg-red-400"
        >
          <ArrowRight aria-hidden className="size-5" />
        </button>
      </div>
    </form>
  );
}
