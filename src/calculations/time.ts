import type { Shift } from "../types/Shift";

export function timeToMinutes(
  hour: number,
  minute: number
): number {
  return hour * 60 + minute;
}

export function calculateShiftHours(shift: Shift): number {
  const day = 1440;
  const hour = 60;

  const startTime = timeToMinutes(shift.startHour, shift.startMinute);
  let endTime = timeToMinutes(shift.endHour, shift.endMinute);

  if (endTime < startTime) {
    endTime += day;
  }

  return (endTime - startTime) / hour;
}

export function calculateBreakHours(shift: Shift): number {
  const hour = 60;

  const breakStart = timeToMinutes(shift.breakStartHour, shift.breakStartMinute);
  const breakEnd = timeToMinutes(shift.breakEndHour, shift.breakEndMinute);

  return (breakEnd - breakStart) / hour;
}
