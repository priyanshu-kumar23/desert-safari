import { Sparkles } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";
import { usps } from "@/data/home";

export function TrustMarquee() {
  return (
    <section aria-label="Why book with us" className="bg-red-500 py-5 text-sand-50">
      <Marquee>
        <ul className="flex shrink-0 items-center">
          {usps.map((u) => (
            <li
              key={u}
              className="flex items-center gap-8 whitespace-nowrap px-4 font-display text-lg font-semibold italic sm:text-2xl"
            >
              {u}
              <Sparkles aria-hidden className="size-5 text-sand-50/70" />
            </li>
          ))}
        </ul>
      </Marquee>
    </section>
  );
}
