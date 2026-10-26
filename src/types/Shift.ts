import type { Break } from "./Break";

export interface Shift {
  hourlyRate: number;

  startHour: number;
  startMinute: number;

  endHour: number;
  endMinute: number;

  breaks: Break[];

  regularHours: number;

  nightPremium: number;
  overtimePremium: number;

  nightPremiumStartHour: number;
  nightPremiumStartMinute: number;
  nightPremiumEndHour: number;
  nightPremiumEndMinute: number;
}
