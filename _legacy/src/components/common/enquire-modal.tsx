"use client";

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, Mountain, X } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { siteConfig, whatsappLinkWithMessage } from "@/data/site";

const EnquireContext = createContext<(() => void) | null>(null);
export function useEnquire() {
  const open = useContext(EnquireContext);
  if (!open) throw new Error("useEnquire must be used within EnquireProvider");
  return open;
}

const labels = ["Your name", "Your number", "About the trip"];
const destinations = ["Dubai Desert", "Abu Dhabi", "Hatta", "Dhow Cruise", "Yacht", "Not decided yet"];
const fieldClass = "mt-2 h-12 min-w-0 w-full rounded-xl border border-stone-300 bg-white px-4 text-base font-normal tracking-normal text-ink-950 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20";
const labelClass = "block text-xs font-semibold tracking-[0.16em] text-stone-600";
const nextClass = "focus-ring h-12 flex-1 rounded-full bg-red-500 px-6 text-sm font-bold tracking-wider text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-500";

export function EnquireProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState(0);
  const trigger = useRef<HTMLElement | null>(null);
  return <EnquireContext.Provider value={() => {
    trigger.current = document.activeElement as HTMLElement;
    setSession((value) => value + 1);
    setOpen(true);
  }}>
    {children}
    <Dialog open={open} onOpenChange={setOpen}>
      <EnquireModal key={session} returnFocus={trigger} />
    </Dialog>
  </EnquireContext.Provider>;
}

function EnquireModal({ returnFocus }: { returnFocus: React.RefObject<HTMLElement | null> }) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+971 ");
  const [destination, setDestination] = useState("Not decided yet");
  const [month, setMonth] = useState("Flexible");
  const [guests, setGuests] = useState("2");
  const [success, setSuccess] = useState(false);
  const firstField = useRef<HTMLInputElement | HTMLSelectElement | null>(null);
  const reducedMotion = useReducedMotion();
  const [months] = useState(() => {
    const now = new Date();
    return Array.from({ length: 12 }, (_, index) => new Date(now.getFullYear(), now.getMonth() + index + 1, 1).toLocaleDateString("en-GB", { month: "long", year: "numeric" }));
  });
  const phoneDigits = phone.replace(/\D/g, "");
  const validPhone = /^\+?[\d\s()-]+$/.test(phone.trim()) && phoneDigits.length >= 8 && phoneDigits.length <= 15;
  const valid = step === 0 ? name.trim().length > 0 : step === 1 ? validPhone : true;
  const move = (next: number) => { setDirection(next > step ? 1 : -1); setStep(next); };
  const focusField = useCallback((element: HTMLInputElement | HTMLSelectElement | null) => {
    firstField.current = element;
    element?.focus({ preventScroll: true });
  }, []);
  const message = `Hi! I'd like to plan a trip.\nName: ${name.trim()}\nWhatsApp: ${phone.trim()}\nWhere to: ${destination}\nMonth: ${month}\nGuests: ${guests}`;

  return <DialogContent
    showCloseButton={false}
    initialFocus={() => firstField.current}
    finalFocus={returnFocus}
    overlayClassName="bg-black/65 backdrop-blur-md"
    className="max-h-[100dvh] max-w-full gap-0 overflow-x-hidden overflow-y-auto rounded-none border-0 bg-[#F7F1E8] p-0 text-ink-950 duration-300 data-open:zoom-in-[0.96] data-closed:zoom-out-[0.96] sm:max-h-[90dvh] sm:max-w-[620px] sm:rounded-3xl"
  >
    <div className="relative overflow-hidden bg-ink-950 px-5 py-6 sm:px-8 sm:py-7">
      <Mountain aria-hidden className="pointer-events-none absolute -right-12 -bottom-12 size-48 -rotate-12 text-white opacity-[0.06]" strokeWidth={1} />
      <p className="relative text-xs font-bold tracking-[0.22em] text-amber-400">ENQUIRE NOW</p>
      <DialogTitle className="relative mt-2 font-display text-3xl font-semibold text-white sm:text-4xl">Plan my trip</DialogTitle>
      <DialogDescription className="relative mt-2 text-sand-200/70" aria-live="polite">
        {success ? "Your trip starts here" : `Step ${step + 1} of 3 · ${labels[step]}`}
      </DialogDescription>
      <DialogClose className="focus-ring absolute top-4 right-4 flex size-10 items-center justify-center rounded-full text-white/80 hover:bg-white/10" aria-label="Close enquiry">
        <X className="size-5" />
      </DialogClose>
    </div>
    <div className="px-5 py-6 sm:px-8 sm:py-7">
      <div className="mb-6 flex gap-2" aria-label={success ? "All steps complete" : `Step ${step + 1} of 3`}>
        {labels.map((label, index) => <div key={label} className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#E5D9C8]">
          <motion.div className="h-full rounded-full bg-red-500" initial={false} animate={{ width: success || index <= step ? "100%" : "0%" }} transition={{ duration: reducedMotion ? 0 : 0.35 }} />
        </div>)}
      </div>
      <AnimatePresence mode="wait" custom={direction} initial={false}>
        {success ? <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-2 text-center">
          <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-red-500 text-white"><Check className="size-8" /></span>
          <h2 tabIndex={-1} ref={(element) => element?.focus()} className="mt-5 text-3xl font-semibold outline-none">Thanks, {name.trim()}</h2>
          <p className="mt-3 text-stone-600">Send your enquiry below and our team will message you on WhatsApp to plan your trip.</p>
          <a href={whatsappLinkWithMessage(message)} target="_blank" rel="noopener noreferrer" className={`${nextClass} mt-5 inline-flex items-center justify-center`}>Open WhatsApp →</a>
        </motion.div> : <motion.form key={step} custom={direction}
          variants={{ enter: (d: number) => ({ x: reducedMotion ? 0 : d * 45, opacity: 0 }), center: { x: 0, opacity: 1 }, exit: (d: number) => ({ x: reducedMotion ? 0 : d * -45, opacity: 0 }) }}
          initial="enter" animate="center" exit="exit" transition={{ type: "spring", stiffness: 320, damping: 30 }}
          onSubmit={(event) => { event.preventDefault(); if (!valid) return; if (step < 2) move(step + 1); else setSuccess(true); }}
        >
          {step === 0 && <label className={labelClass}>YOUR NAME<input ref={focusField} className={fieldClass} placeholder="Full name" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} required /></label>}
          {step === 1 && <><label className={labelClass}>PHONE / WHATSAPP<input ref={focusField} className={fieldClass} type="tel" inputMode="tel" autoComplete="tel" placeholder="+971 …" value={phone} onChange={(event) => setPhone(event.target.value)} aria-describedby="phone-hint" required /></label><p id="phone-hint" className="mt-2 text-xs text-stone-500">Include your country code and 8–15 digits.</p></>}
          {step === 2 && <div className="space-y-5">
            <label className={labelClass}>WHERE TO<select ref={focusField} className={fieldClass} value={destination} onChange={(event) => setDestination(event.target.value)}>{destinations.map((item) => <option key={item}>{item}</option>)}</select></label>
            <div className="grid grid-cols-1 gap-4 min-[380px]:grid-cols-2">
              <label className={labelClass}>MONTH PREFERRED<select className={fieldClass} value={month} onChange={(event) => setMonth(event.target.value)}>{["Flexible", ...months].map((item) => <option key={item}>{item}</option>)}</select></label>
              <label className={labelClass}>GUESTS<select className={fieldClass} value={guests} onChange={(event) => setGuests(event.target.value)}>{Array.from({ length: 10 }, (_, index) => index === 9 ? "10+" : String(index + 1)).map((item) => <option key={item}>{item}</option>)}</select></label>
            </div>
          </div>}
          <div className="mt-5 flex gap-3">
            {step > 0 && <button type="button" onClick={() => move(step - 1)} className="focus-ring h-12 rounded-full border border-stone-400 px-6 text-sm font-bold text-ink-950 hover:bg-white/60">BACK</button>}
            <button type="submit" disabled={!valid} className={nextClass}>{step === 2 ? "ENQUIRE NOW →" : "NEXT →"}</button>
          </div>
        </motion.form>}
      </AnimatePresence>
      <p className="mt-5 text-center text-xs leading-relaxed text-stone-500">No spam, no payment now. Just a quick WhatsApp reply from {siteConfig.whatsapp}.</p>
    </div>
  </DialogContent>;
}
