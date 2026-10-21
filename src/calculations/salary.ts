import type { Shift } from "../types/Shift";
import {calculateWorkedHours, calculateNightHours} from "./time";

export function calculateShiftPay(shift:Shift): number {
  return calculateWorkedHours(shift) + shift.hourlyRate;
}
