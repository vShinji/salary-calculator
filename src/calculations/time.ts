import type { Shift } from "../types/Shift";

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
};

export function calculateNightBreakMinutes(shift: Shift): number {
  const day = 1440;

  let breakStart = timeToMinutes(shift.breakStartHour, shift.breakStartMinute);
  let breakEnd = timeToMinutes(shift.breakEndHour, shift.breakEndMinute);

  const nightStart = timeToMinutes(shift.nightPremiumStartHour, shift.nightPremiumStartMinute);
  const nightEnd = timeToMinutes(shift.nightPremiumEndHour, shift.nightPremiumEndMinute) + day;
  const startTime = timeToMinutes(shift.startHour, shift.startMinute);

  if (breakStart < startTime) {
    breakStart = breakStart + day
  }

  if (breakEnd < breakStart) {
    breakEnd = breakEnd + day
  }

  const overlapStart = Math.max(breakStart, nightStart);
  const overlapEnd = Math.min(breakEnd, nightEnd);

  return Math.max(0, overlapEnd - overlapStart);

}

export function calculateNightHours(shift: Shift): number {
  const day = 1440;
  const hour = 60;

  let endTime = timeToMinutes(shift.endHour, shift.endMinute);
  let nightEndTime = timeToMinutes(shift.nightPremiumEndHour, shift.nightPremiumEndMinute) + day;
  const startTime = timeToMinutes (shift.startHour, shift.startMinute);
  const nightStartTime = timeToMinutes(shift.nightPremiumStartHour, shift.nightPremiumStartMinute);

  const nightBreakTime = calculateNightBreakMinutes(shift)
    if(endTime < startTime) {
      endTime += day;
    };

      const overlapStart = Math.max(startTime, nightStartTime);
      const overlapEnd = Math.min(endTime, nightEndTime);

      return Math.max(0, overlapEnd - overlapStart - nightBreakTime) / hour;
  }

export function parseTime(time: string): {
  hour: number;
  minute: number;
} {
  const timeString = time.split(":");
  const parsedHour = parseInt(timeString[0], 10);
  const parsedMinute = parseInt(timeString[1], 10);
 return {
  hour: parsedHour,
  minute: parsedMinute,
 }
}
