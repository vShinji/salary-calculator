import type { Shift } from "../types/Shift";
import {calculateWorkedHours, calculateNightHours} from "./time";

export function calculateShiftPay(shift:Shift): number {
  return calculateWorkedHours(shift) * shift.hourlyRate;
}

export function calculateNightPremium(shift:Shift): number {
  return calculateNightHours(shift) * shift.hourlyRate * shift.nightPremium;
}

export function calculateOvertimeHours(shift:Shift): number {
  const workedHours = calculateWorkedHours(shift);

  if (workedHours > shift.regularHours) {
    return workedHours - shift.regularHours;
  } else {
    return 0
  }
}

export function calculateOvertimePremium(shift:Shift): number {
  return calculateOvertimeHours(shift) * shift.hourlyRate * shift.overtimePremium;
}

export function calculateTotalPay(shift:Shift): number {
  return calculateShiftPay(shift) + calculateNightPremium(shift) + calculateOvertimePremium(shift);
}
