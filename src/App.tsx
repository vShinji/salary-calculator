import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

import type { Shift } from "./types/Shift";
import {calculateShiftHours, calculateBreakHours, calculateWorkedHours, calculateNightBreakMinutes, calculateNightHours, parseTime} from "./calculations/time";
import {calculateShiftPay, calculateNightPremium, calculateOvertimePremium, calculateTotalPay} from "./calculations/salary";

const morningShift: Shift = {
  hourlyRate: 1550,

  startHour: 6,
  startMinute: 30,

  endHour: 15,
  endMinute: 30,

  breaks: [
    {
    startHour: 8,
    startMinute: 30,
    endHour: 8,
    endMinute: 40,
    paid: false,
  },
  {
    startHour: 10,
    startMinute: 40,
    endHour: 11,
    endMinute: 20,
    paid: false,
  },
  {
    startHour: 13,
    startMinute: 20,
    endHour: 13,
    endMinute: 30,
    paid: false,
  },
  ],

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

  breaks: [
    {
    startHour: 19,
    startMinute: 30,
    endHour: 19,
    endMinute: 40,
    paid: false,
  },
  {
    startHour: 21,
    startMinute: 40,
    endHour: 22,
    endMinute: 20,
    paid: false,
  },
  {
    startHour: 0,
    startMinute: 20,
    endHour: 0,
    endMinute: 30,
    paid: false,
  },
  ],

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
  const [breaks, setBreaks] = useState([
  {
    startTime: "19:30",
    endTime: "19:40",
    paid: false,
  },
  {
    startTime: "21:40",
    endTime: "22:20",
    paid: false,
  },
  {
    startTime: "00:20",
    endTime: "00:30",
    paid: false,
  },
]);
  // const parsedStartTime = parseTime(startTime);
  // const parsedEndTime = parseTime(endTime);
  // const parsedBreakStartTime = parseTime(breakStartTime);
  // const parsedBreakEndTime = parseTime(breakEndTime);

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
      {breaks.map((breakTime, index) =>{
        return(
          <div key={index}>
            <p>
              Break Start: {index + 1}: {breakTime.startTime}
            </p>
            <p>
              Break End: {index + 1}: {breakTime.endTime}
            </p>
            <label>
              Break Start:
              <input
              type="time"
              value={breakTime.startTime}
              onChange={(event) => setBreaks(
                breaks.map((item, itemIndex) =>
                itemIndex === index ? {...item, startTime: event.target.value} : item)
              )} />
            </label>
            <label>
              Break End:
              <input
              type="time"
              value={breakTime.endTime}
              onChange={(event) => setBreaks(
                breaks.map((item, itemIndex) =>
                itemIndex === index ? {...item, startTime: event.target.value} : item)
              )} />
            </label>
          </div>
        )
      })}

    </>

  )

}

export default App
