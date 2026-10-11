import type { LucideIcon } from "lucide-react";
import { BadgeCheck, MapPin, MessageCircle, ShieldCheck, Wallet } from "lucide-react";

export type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const features: Feature[] = [
  {
    icon: MapPin,
    title: "Local Dubai team",
    description:
      "Our guides and drivers live and work in Dubai — they know the dunes, the shortcuts and the best light for photos.",
  },
  {
    icon: ShieldCheck,
    title: "Licensed operator",
    description:
      "Fully licensed by Dubai's Department of Economy and Tourism, with insured vehicles and vetted, trained drivers.",
  },
  {
    icon: BadgeCheck,
    title: "Free cancellation",
    description:
      "Plans change. Cancel up to 24 hours before your tour for a full refund, no questions asked.",
  },
  {
    icon: Wallet,
    title: "Pay on arrival",
    description:
      "Reserve your spot with just a WhatsApp message — settle payment in cash or card on the day of your tour.",
  },
  {
    icon: MessageCircle,
    title: "24/7 WhatsApp support",
    description:
      "Real humans on the other end of the line, day or night, for booking changes, pickup questions or anything else.",
  },
];

export type CounterStat = {
  label: string;
  value: number;
  suffix?: string;
  decimals?: number;
};

export const counterStats: CounterStat[] = [
  { label: "Bookings per month", value: 1200, suffix: "+" },
  { label: "Years operating", value: 9, suffix: "+" },
  { label: "Average rating", value: 4.9, suffix: "★", decimals: 1 },
];
