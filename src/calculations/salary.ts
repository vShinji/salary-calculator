import type { Shift } from "../types/Shift";
import {calculateWorkedHours, calculateNightHours} from "./time";

export function calculateShiftPay(shift:Shift): number {
  return calculateWorkedHours(shift) * shift.hourlyRate;
}

export function calculateNightPremium(shift:Shift): number {
  return calculateNightHours(shift) * shift.hourlyRate * shift.nightPremium;
}
