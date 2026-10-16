"use client";

import { ArrowRight, CircleCheck } from "lucide-react";
import { useState, type FormEvent } from "react";
import { buttonClass } from "@/components/ui/ButtonLink";

// Club sign-up. For now it only confirms on screen.
// TODO: send it to a Server Action (mailing list).
export function NewsletterForm() {
  const [email, setEmail] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEmail(String(new FormData(event.currentTarget).get("email")));
  }

  if (email) {
    return (
      <p role="status" className="flex items-center gap-3 text-[16px] text-fg motion-safe:animate-rise">
        <CircleCheck aria-hidden="true" className="size-6 shrink-0 text-gold" />
        Bem-vindo ao Clube! Enviámos a primeira carta para {email}.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <label className="flex-1">
        <span className="sr-only">E-mail</span>
        <input name="email" type="email" required autoComplete="email" placeholder="O seu e-mail" className="h-13 w-full rounded-full border border-line bg-bg px-6 text-[15px] text-fg outline-none transition placeholder:text-subtle focus:border-gold user-invalid:border-ember" />
      </label>
      <button type="submit" className={buttonClass()}>
        Juntar-me
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </button>
    </form>
  );
}
