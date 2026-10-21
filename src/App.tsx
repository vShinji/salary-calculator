import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

import type { Shift } from "./types/Shift";
import {calculateShiftHours, calculateBreakHours, calculateWorkedHours, calculateNightBreakMinutes, calculateNightHours} from "./calculations/time";
import {calculateShiftPay, calculateNightPremium, calculateOvertimePremium, calculateTotalPay} from "./calculations/salary";

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
console.log(calculateNightHours(nightShift));
console.log(calculateShiftPay(morningShift));
console.log(calculateNightPremium(morningShift));
console.log(calculateOvertimePremium(morningShift));
console.log(calculateTotalPay(morningShift));
console.log(calculateShiftPay(nightShift));
console.log(calculateNightPremium(nightShift));
console.log(calculateOvertimePremium(nightShift));
console.log(calculateTotalPay(nightShift));


function App() {
  const [hourlyRate, setHourlyRate] = useState<number>(1550);

  return(
    <>
      <h1>Salary Calculator</h1>
      <p>Hourly rate: ¥{hourlyRate}</p>
      <input
      type="number"
      value={hourlyRate}
      onChange={(event) => setHourlyRate(Number(event.target.value))} />
    </>
  )

}

export default App
