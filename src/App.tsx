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
  const [startTime, setStartTime] = useState<string>("17:30");
  const [endTime, setEndTime] = useState<string>("02:30");
  const [breakStartTime, setBreakStartTime] = useState<string>("21:40");
  const [breakEndTime, setBreakEndTime] = useState<string>("22:20");

  return(
    <>
      <h1>Salary Calculator</h1>
      <p>Hourly rate: ¥{hourlyRate}</p>
      <input
      type="number"
      value={hourlyRate}
      onChange={(event) => setHourlyRate(Number(event.target.value))}
      />
      <p>Start time: {startTime}</p>
      <label>
        Start time:
        <input
        type="time"
        value={startTime}
        onChange={(event) => setStartTime(event.target.value)}
        />
      </label>
      <p>End time: {endTime}</p>
      <label>
        End time:
        <input
        type="time"
        value={endTime}
        onChange={(event) => setEndTime(event.target.value)}
        />
      </label>
      <p>Break start time: {breakStartTime}</p>
      <label>
        Break start time:
        <input
        type="time"
        value={breakStartTime}
        onChange={(event) => setBreakStartTime(event.target.value)}
        />
      </label>
      <p>Break end time: {breakEndTime}</p>
      <label>
        Break end time:
        <input
        type="time"
        value={breakEndTime}
        onChange={(event) => setBreakEndTime(event.target.value)}
        />
      </label>
    </>
  )

}

export default App
