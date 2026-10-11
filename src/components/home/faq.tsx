import { MessageCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { faqs } from "@/data/faqs";
import { whatsappLink } from "@/lib/whatsapp";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-sand-200 py-20 sm:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="faq-title"
            eyebrow="FAQ"
            title="Questions,"
            accent="Answered"
            subtitle="Everything you need to know before you book your Dubai adventure."
          />
          <Reveal delay={0.2} className="mt-10 rounded-[var(--radius-card)] bg-ink-950 p-7 text-sand-50 shadow-card">
            <h3 className="font-display text-3xl">Still Have a Question?</h3>
            <p className="mt-2 text-sm leading-relaxed text-sand-200/80">
              Our team replies on WhatsApp within minutes — day or night.
            </p>
            <MagneticButton
              href={whatsappLink("Hi! I have a question about your tours.")}
              external
              variant="whatsapp"
              icon={<MessageCircle aria-hidden className="size-4" />}
              className="mt-6"
            >
              Ask on WhatsApp
            </MagneticButton>
          </Reveal>
        </div>

        <Reveal>
          <Accordion type="single" collapsible defaultValue="faq-0">
            {faqs.map((f, i) => (
              <AccordionItem key={f.question} value={`faq-${i}`}>
                <AccordionTrigger>
                  <span className="flex items-baseline gap-4">
                    <span aria-hidden className="font-display text-base text-red-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {f.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pl-10">{f.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
