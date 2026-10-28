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
  const [overtimePremium, setOvertimePremium] = useState<number>(0.25);
  const [nightPremium, setNightPremium] = useState<number>(0.25);
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
  const parsedStart = parseTime(startTime);
  const parsedEnd = parseTime(endTime);
  const parsedBreaks = breaks.map((breakTime) => {
    const start = parseTime(breakTime.startTime);
    const end = parseTime(breakTime.endTime);

    return ({
      startHour: start.hour,
      startMinute: start.minute,
      endHour: end.hour,
      endMinute: end.minute,
      paid: breakTime.paid,
    })
  });

  const shift: Shift = {
    hourlyRate: hourlyRate,

    startHour: parsedStart.hour,
    startMinute: parsedStart.minute,

    endHour: parsedEnd.hour,
    endMinute: parsedEnd.minute,

    breaks: parsedBreaks,

    regularHours: 8,

    nightPremium: 0.25,
    overtimePremium: 0.25,

    nightPremiumStartHour: 22,
    nightPremiumStartMinute: 0,
    nightPremiumEndHour: 5,
    nightPremiumEndMinute: 0,
};

const totalPay = calculateTotalPay(shift);
const formattedTotalPay = Math.round(totalPay).toLocaleString("ja-JP");

const overtimePremiumRate = shift.hourlyRate * shift.overtimePremium;
const totalOvertimePay = calculateOvertimePremium(shift);
const formattedOvertimePremium = Math.round(totalOvertimePay).toLocaleString("ja-JP");

const nightPremiumRate = shift.hourlyRate * shift.overtimePremium;
const totalNightPay = calculateNightPremium(shift);
const formattedNightPremium = Math.round(totalNightPay).toLocaleString("ja-JP");

const totalWorkedHour = calculateWorkedHours(shift);

  return(
    <>
      <h1>Salary Calculator</h1>
      <p>Hourly rate: ¥{hourlyRate}</p>
      <input
      type="number"
      value={hourlyRate}
      onChange={(event) => setHourlyRate(Number(event.target.value))}
      />
      <p>Overtime premium rate: ¥{overtimePremiumRate}</p>
      <input
      type="number"
      value={overtimePremium}
      onChange={(event) => setOvertimePremium(Number(event.target.value))}
      />
      <p>Night premium rate: ¥{nightPremiumRate}</p>
      <input
      type="number"
      value={nightPremiumRate}
      onChange={(event) => setNightPremium(Number(event.target.value))} />
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
                itemIndex === index ? {...item, endTime: event.target.value} : item)
              )} />
            </label>
            <label>
              Paid break:
              <input
              type="checkbox"
              checked={breakTime.paid}
              onChange={(event) => setBreaks(
                breaks.map((item, itemIndex) =>
                itemIndex === index ? {...item, paid: event.target.checked} : item)
              )} />
            </label>
              <button
              type="button"
              onClick={() => {setBreaks(
                breaks.filter((_, itemIndex) =>
                itemIndex !== index)
              )}}>
                Remove Break
              </button>
          </div>
        )
      })}
    <button
      type="button"
      onClick={() => {setBreaks([...breaks,{
              startTime:"00:00",
              endTime:"00:00",
              paid: false,
            },
            ])}}>
              Add break
    </button>
    <p>Total worked hours: {totalWorkedHour}</p>
    <p>Total overtime: ¥{formattedOvertimePremium}</p>
    <p>Total night premium: ¥{formattedNightPremium}</p>
    <p>Total pay: ¥{formattedTotalPay}</p>
    </>

  )

}

export default App
