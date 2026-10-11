import type { LucideIcon } from "lucide-react";
import {
  Bus,
  Camera,
  Flame,
  MountainSnow,
  Sunset,
  Music,
} from "lucide-react";

export type TimelineStep = {
  icon: LucideIcon;
  title: string;
  time: string;
  description: string;
};

export const timelineSteps: TimelineStep[] = [
  {
    icon: Bus,
    title: "Hotel Pickup",
    time: "3:00 PM",
    description: "Comfortable 4x4 pickup from your hotel or a nearby landmark.",
  },
  {
    icon: MountainSnow,
    title: "Dune Bashing",
    time: "4:00 PM",
    description: "45 minutes of thrilling dune bashing with expert drivers.",
  },
  {
    icon: Camera,
    title: "Camel Ride & Sandboarding",
    time: "5:00 PM",
    description: "Ride a camel across the dunes, then try sandboarding.",
  },
  {
    icon: Sunset,
    title: "Sunset Camp",
    time: "6:00 PM",
    description: "Arrive at camp for sunset views over the red dunes.",
  },
  {
    icon: Flame,
    title: "BBQ & Live Shows",
    time: "7:00 PM",
    description: "Buffet BBQ dinner with tanoura and fire shows.",
  },
  {
    icon: Music,
    title: "Drop-off",
    time: "9:30 PM",
    description: "Relaxed drive back with drop-off at your hotel.",
  },
];
