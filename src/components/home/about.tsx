import Image from "next/image";
import { CalendarCheck, Car, MessageCircle, PackageCheck, ShieldCheck } from "lucide-react";
import { CountUp } from "@/components/ui/count-up";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import landCruiser from "../../../public/desktop_bg.png";
import { about } from "@/data/home";
import { whatsappLink } from "@/lib/whatsapp";

const icons = { steering: Car, package: PackageCheck, calendar: CalendarCheck } as const;

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="bg-sand-200 py-20 sm:py-28">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-panel)] shadow-card sm:aspect-[5/4]">
            {/* Land Cruiser plate, cropped below the baked-in wordmark so only the car + dust show */}
            <Image
              src={landCruiser}
              alt={about.imageAlt}
              width={1599}
              height={984}
              sizes="(min-width: 1024px) 90vw, 180vw"
              placeholder="blur"
              className="absolute bottom-0 left-[-66%] h-[205%] w-auto max-w-none sm:left-[-60%]"
            />
          </div>
          <div className="glass absolute -bottom-6 right-4 flex items-center gap-4 rounded-[var(--radius-card)] bg-ink-950/75 p-4 pr-6 text-sand-50 shadow-lift sm:-right-6">
            <span className="flex size-12 items-center justify-center rounded-[var(--radius-field)] bg-red-500">
              <ShieldCheck aria-hidden className="size-6" />
            </span>
            <div>
              <p className="font-sans text-base font-semibold leading-tight">{about.badge.title}</p>
              <p className="text-xs text-sand-200/80">{about.badge.sub}</p>
            </div>
          </div>
        </Reveal>

        <div>
          <SectionHeading id="about-title" eyebrow={about.eyebrow} title={about.title} accent={about.accent} />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-ink-600">{about.copy}</p>
          </Reveal>

          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {about.features.map((f, i) => {
              const Icon = icons[f.icon];
              return (
                <Reveal as="li" key={f.title} delay={0.1 + i * 0.1}>
                  <div className="h-full rounded-[var(--radius-card)] bg-sand-50 p-5 shadow-soft transition-shadow hover:shadow-card">
                    <span className="flex size-11 items-center justify-center rounded-[var(--radius-field)] bg-red-500/10 text-red-500">
                      <Icon aria-hidden className="size-5" />
                    </span>
                    <h3 className="mt-4 font-sans text-lg font-semibold leading-snug">{f.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{f.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </ul>

          <dl className="mt-10 grid grid-cols-3 gap-4 border-y border-sand-400/60 py-6">
            {about.stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse justify-end">
                <dd className="font-display text-5xl text-ink-950 sm:text-6xl [font-variant-numeric:tabular-nums]">
                  <CountUp value={s.value} decimals={s.decimals} suffix={s.suffix} />
                </dd>
                <dt className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">{s.label}</dt>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <MagneticButton href="/desert-safari">Explore Desert Safaris</MagneticButton>
            <MagneticButton
              href={whatsappLink("Hi! I'd like to know more about your desert safaris.")}
              external
              variant="outline"
              arrow={false}
              icon={<MessageCircle aria-hidden className="size-4" />}
            >
              Chat on WhatsApp
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
