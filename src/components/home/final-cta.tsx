import { MessageCircle } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Reveal } from "@/components/ui/reveal";
import { finalCta } from "@/data/home";
import { whatsappLink } from "@/lib/whatsapp";

export function FinalCta() {
  return (
    <section aria-labelledby="final-cta-title" className="py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="relative isolate overflow-hidden rounded-[var(--radius-panel)] bg-gradient-to-br from-red-500 via-red-600 to-ember-600 px-6 py-16 text-center text-sand-50 shadow-lift sm:px-12 sm:py-20">
          <div aria-hidden className="absolute -right-20 -top-24 -z-10 size-[26rem] rounded-full bg-ember-400/40 blur-3xl" />
          <div aria-hidden className="absolute -bottom-32 -left-16 -z-10 size-[24rem] rounded-full bg-red-700/60 blur-3xl" />
          <h2 id="final-cta-title" className="text-fluid-h2 mx-auto max-w-3xl font-normal text-balance">
            {finalCta.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-sand-100/90">{finalCta.text}</p>
          <div className="mt-9 flex justify-center">
            <MagneticButton
              href={whatsappLink("Hi! Can you help me choose the best UAE experience?")}
              external
              variant="light"
              icon={<MessageCircle aria-hidden className="size-4" />}
            >
              Get WhatsApp Help
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
