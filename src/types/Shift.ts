export interface Shift {
  hourlyRate: number;

  startHour: number;
  startMinute: number;

  endHour: number;
  endMinute: number;

  breakStartHour: number;
  breakStartMinute: number;
  breakEndHour: number;
  breakEndMinute: number;

  regularHours: number;

  nightPremium: number;
  overtimePremium: number;

  nightPremiumStartHour: number;
  nightPremiumStartMinute: number;
  nightPremiumEndHour: number;
  nightPremiumEndMinute: number;
}
