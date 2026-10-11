import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Reveal } from "@/components/ui/reveal";
import { planTrip } from "@/data/home";
import { blurDataURL } from "@/data/media";
import { whatsappLink } from "@/lib/whatsapp";

export function PlanCta() {
  return (
    <section aria-labelledby="plan-title" className="py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="relative isolate overflow-hidden rounded-[var(--radius-panel)] bg-ink-950 px-6 py-16 text-center text-sand-50 sm:px-12 sm:py-24">
          <Image
            src={planTrip.image}
            alt=""
            fill
            sizes="(min-width: 1400px) 1300px, 95vw"
            placeholder="blur"
            blurDataURL={blurDataURL}
            className="-z-20 object-cover"
          />
          <div aria-hidden className="absolute inset-0 -z-10 bg-ink-950/70 [background-image:radial-gradient(60%_80%_at_50%_100%,rgb(200_54_31/0.45),transparent)]" />

          <p className="eyebrow justify-center !text-ember-400">
            <span aria-hidden className="h-px w-8 bg-ember-400" />
            Plan Your UAE Adventure
            <span aria-hidden className="h-px w-8 bg-ember-400" />
          </p>
          <h2 id="plan-title" className="text-fluid-h2 mx-auto mt-5 max-w-3xl font-normal text-balance">
            {planTrip.title} <em className="text-ember-400 italic">{planTrip.accent}</em>
          </h2>

          <ul className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-2.5">
            {planTrip.chips.map((c) => (
              <li key={c} className="glass rounded-full px-4 py-2 text-sm font-semibold">
                {c}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex justify-center">
            <MagneticButton
              href={whatsappLink("Hi! I'd like help planning my Dubai trip.")}
              external
              variant="whatsapp"
              icon={<MessageCircle aria-hidden className="size-4" />}
            >
              Plan My Trip on WhatsApp
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
