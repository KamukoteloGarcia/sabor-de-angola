"use client";

import { ArrowRight, CircleCheck } from "lucide-react";
import { useState, type FocusEvent, type FormEvent } from "react";
import { buttonClass } from "@/components/ui/ButtonLink";
import { maxGuests, occasions, reservationTimes } from "@/config/reservations";
import { FormField, SelectInput, TextInput } from "./FormField";

type Request = { name: string; date: string; time: string; guests: string };

const guestOptions = Array.from({ length: maxGuests }, (_, i) => ({
  value: String(i + 1),
  label: i === 0 ? "1 pessoa" : `${i + 1} pessoas`,
}));

// Today as yyyy-mm-dd, in the visitor's time zone.
function today() {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
}

// "Today" only exists in the browser, so the limit is set when the field is used (not while rendering).
function setMinToToday(event: FocusEvent<HTMLInputElement>) {
  event.currentTarget.min = today();
}

// Booking request. For now it only confirms on screen.
// TODO: send it to a Server Action (e-mail / WhatsApp to the restaurant).
export function ReservationForm() {
  const [request, setRequest] = useState<Request | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setRequest({
      name: String(data.get("name")),
      date: new Date(`${data.get("date")}T00:00`).toLocaleDateString("pt-AO", { day: "numeric", month: "long" }),
      time: String(data.get("time")),
      guests: String(data.get("guests")),
    });
  }

  if (request) {
    return (
      <div role="status" className="flex min-h-[420px] flex-col items-center justify-center text-center motion-safe:animate-rise">
        <CircleCheck className="size-14 text-gold" strokeWidth={1.2} />
        <p className="mt-6 font-display text-[32px] font-semibold leading-tight">Obrigado, {request.name.split(" ")[0]}!</p>
        <p className="mt-3 max-w-[340px] text-muted">
          Pedido para {request.guests} {request.guests === "1" ? "pessoa" : "pessoas"} a {request.date}, às {request.time}. Vamos
          ligar-lhe para confirmar.
        </p>
        <button type="button" onClick={() => setRequest(null)} className="mt-8 text-[13px] uppercase tracking-[0.2em] text-gold hover:text-gold-bright">
          Fazer outro pedido
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
      <FormField label="Nome" className="sm:col-span-2">
        <TextInput name="name" required autoComplete="name" placeholder="O seu nome" />
      </FormField>
      <FormField label="Telefone">
        <TextInput name="phone" type="tel" required autoComplete="tel" placeholder="+244 9XX XXX XXX" />
      </FormField>
      <FormField label="Pessoas">
        <SelectInput name="guests" defaultValue="2" options={guestOptions} />
      </FormField>
      <FormField label="Data">
        <TextInput name="date" type="date" required onFocus={setMinToToday} />
      </FormField>
      <FormField label="Hora">
        <SelectInput name="time" defaultValue="20:00" options={reservationTimes} />
      </FormField>
      <FormField label="Ocasião" className="sm:col-span-2">
        <SelectInput name="occasion" options={occasions} />
      </FormField>

      <button type="submit" className={`${buttonClass()} mt-2 sm:col-span-2`}>
        Pedir reserva
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </button>
    </form>
  );
}
