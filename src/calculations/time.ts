import type { Shift } from "../types/Shift";

const nightShift = {
  hourlyRate: 1550,
  startHour: 17,
  startMinute: 30,
  endHour: 2,
  endMinute: 30,
  breakStartHour: 21,
  breakStartMinute: 40,
  breakEndHour: 22,
  breakEndMinute: 20,
  regularHours: 8,
  nightPremium: 0.25,
  overtimePremium: 0.25,
  nightPremiumStartHour: 22,
  nightPremiumStartMinute: 0,
  nightPremiumEndHour: 5,
  nightPremiumEndMinute: 0,
};

const morningShift = {
  hourlyRate: 1550,
  startHour: 6,
  startMinute: 30,
  endHour: 15,
  endMinute: 30,
  breakStartHour: 10,
  breakStartMinute: 40,
  breakEndHour: 11,
  breakEndMinute: 20,
  regularHours: 8,
  nightPremium: 0.25,
  overtimePremium: 0.25,
  nightPremiumStartHour: 22,
  nightPremiumStartMinute: 0,
  nightPremiumEndHour: 5,
  nightPremiumEndMinute: 0,
};

export function timeToMinutes(
  hour: number,
  minute: number
): number {
  return hour * 60 + minute;
};

export function calculateShiftHours(shift: Shift): number {
  const day = 1440;
  const hour = 60;

  const startTime = timeToMinutes(shift.startHour, shift.startMinute);
  let endTime = timeToMinutes(shift.endHour, shift.endMinute);

  if (endTime < startTime) {
    endTime += day;
  }

  return (endTime - startTime) / hour;
};

export function calculateBreakHours(shift: Shift): number {
  const hour = 60;

  const breakStart = timeToMinutes(shift.breakStartHour, shift.breakStartMinute);
  const breakEnd = timeToMinutes(shift.breakEndHour, shift.breakEndMinute);

  return (breakEnd - breakStart) / hour;
};

export function calculateWorkedHours(shift: Shift): number {
  return calculateShiftHours(shift) - calculateBreakHours(shift);
}


console.log(calculateWorkedHours(morningShift));
