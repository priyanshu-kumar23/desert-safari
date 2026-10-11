"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { navigation } from "@/data/navigation";

const allLinks = navigation.flatMap((n) => n.links.map((l) => ({ ...l, group: n.label })));

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return allLinks.slice(0, 6);
    return allLinks.filter((l) => l.title.toLowerCase().includes(term)).slice(0, 8);
  }, [q]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        aria-label="Search tours"
        className="flex size-11 items-center justify-center rounded-full transition-colors hover:bg-current/10"
      >
        <Search aria-hidden className="size-5" />
      </DialogTrigger>
      <DialogContent className="top-24 w-[min(94vw,36rem)] translate-y-0 rounded-[var(--radius-panel)] bg-sand-50 p-5 text-ink-950 shadow-lift">
        <DialogTitle className="font-display text-2xl font-semibold">Search tours</DialogTitle>
        <DialogDescription className="sr-only">Type to find a tour or experience.</DialogDescription>
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Try “sunrise”, “Burj Khalifa”, “buggy”…"
          className="mt-4 h-12 w-full rounded-full border border-sand-300 bg-white px-5 text-base outline-none focus:border-red-500"
          aria-label="Search tours"
        />
        <ul className="mt-3 max-h-[50vh] overflow-y-auto">
          {results.length === 0 && <li className="px-3 py-4 text-sm text-ink-600">No tours match “{q}”.</li>}
          {results.map((r) => (
            <li key={r.href}>
              <Link
                href={r.href}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center justify-between gap-3 rounded-xl px-3 transition-colors hover:bg-sand-200"
              >
                <span className="font-semibold">{r.title}</span>
                <span className="text-xs uppercase tracking-widest text-ink-400">{r.group}</span>
              </Link>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
