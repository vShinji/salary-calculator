import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

import type { Shift } from "./types/Shift";
import {calculateShiftHours, calculateBreakHours, calculateWorkedHours, calculateNightBreakMinutes} from "./calculations/time";

const morningShift: Shift = {
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

const nightShift: Shift = {
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

console.log(calculateShiftHours(nightShift));
console.log(calculateBreakHours(nightShift));
console.log(calculateWorkedHours(nightShift));
console.log(calculateNightBreakMinutes(nightShift));
console.log(calculateNightBreakMinutes(morningShift));

function App() {
  return <h1>Salary Calculator</h1>;
}

export default App
