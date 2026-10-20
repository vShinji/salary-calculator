import type { Shift } from "../types/Shift";

export function timeToMinutes(
  hour: number,
  minute: number
): number {
  return hour * 60 + minute;
}

export function calculateShiftHours(shift: Shift): number {
  const day = 1440;
  const startTime = timeToMinutes(shift.startHour, shift.startMinute);
  let endTime = timeToMinutes(shift.endHour, shift.endMinute);

  if (endTime < startTime) {
    endTime += day;
  }

  return (endTime - startTime) / 60;
}
