import { useState } from 'react'
import './App.css'

import type { Shift } from "./types/Shift";
import {calculateWorkedHours, parseTime, formatHours} from "./calculations/time";
import {calculateShiftPay, calculateNightPremium, calculateOvertimePremium, calculateTotalPay} from "./calculations/salary";

function App() {
  const [hourlyRate, setHourlyRate] = useState<number>(1550);
  const [regularHours, setRegularHours] = useState<number>(8);
  const [startTime, setStartTime] = useState<string>("17:30");
  const [endTime, setEndTime] = useState<string>("02:30");
  const [overtimePremium, setOvertimePremium] = useState<number>(25);
  const [nightPremium, setNightPremium] = useState<number>(25);
  const [nightPremiumStart, setNightPremiumStart] = useState<string>("22:00");
  const [nightPremiumEnd, setNightPremiumEnd] = useState<string>("05:00");
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
  const parsedNightStart = parseTime(nightPremiumStart);
  const parsedNightEnd = parseTime(nightPremiumEnd);
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

    regularHours: regularHours,

    nightPremium: nightPremium / 100,
    overtimePremium: overtimePremium / 100,

    nightPremiumStartHour: parsedNightStart.hour,
    nightPremiumStartMinute: parsedNightStart.minute,
    nightPremiumEndHour: parsedNightEnd.hour,
    nightPremiumEndMinute: parsedNightEnd.minute,
};

const basePay = calculateShiftPay(shift);
const formattedBasePay = Math.round(basePay).toLocaleString("ja-JP");

const totalPay = calculateTotalPay(shift);
const formattedTotalPay = Math.round(totalPay).toLocaleString("ja-JP");

const totalOvertimePay = calculateOvertimePremium(shift);
const formattedOvertimePremium = Math.round(totalOvertimePay).toLocaleString("ja-JP");

const totalNightPay = calculateNightPremium(shift);
const formattedNightPremium = Math.round(totalNightPay).toLocaleString("ja-JP");

const totalWorkedHour = calculateWorkedHours(shift);

function updateBreak(
  index: number,
  updatedBreak: {
    startTime: string;
    endTime: string;
    paid: boolean;
  }) {
    setBreaks(
      breaks.map((item, itemIndex) =>
      itemIndex === index ? updatedBreak : item)
    )
};

  return(
    <>
      <h1>Salary Calculator</h1>
      <section>
        <h2>Pay Settings</h2>
        <p>Hourly rate: ¥{hourlyRate}</p>
        <input
        type="number"
        value={hourlyRate}
        onChange={(event) => setHourlyRate(Number(event.target.value))}
        />
        <label>
          Regular hours before overtime:
          <input
          type="number"
          value={regularHours}
          onChange={(event) => setRegularHours(Number(event.target.value))}
          />
        </label>
        <p>Overtime premium rate: {overtimePremium}%</p>
        <input
        type="number"
        value={overtimePremium}
        onChange={(event) => setOvertimePremium(Number(event.target.value))}
        />
        <p>Night premium rate: {nightPremium}%</p>
        <input
        type="number"
        value={nightPremium}
        onChange={(event) => setNightPremium(Number(event.target.value))}
        />
      </section>

      <section>
        <h2>Shift Settings</h2>
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
        <label>
          Night premium start time:
          <input
          type="time"
          value={nightPremiumStart}
          onChange={(event) => setNightPremiumStart(event.target.value)}
          />
        </label>
        <label>
          Night premium end time:
          <input
          type="time"
          value={nightPremiumEnd}
          onChange={(event) => setNightPremiumEnd(event.target.value)}
          />
        </label>
      </section>

      <section>
        <h2>Break settings</h2>
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
                onChange={(event) => updateBreak(index, {...breakTime, startTime: event.target.value,})} />
              </label>
              <label>
                Break End:
                <input
                type="time"
                value={breakTime.endTime}
                onChange={(event) => updateBreak(index, {...breakTime, endTime: event.target.value,})} />
              </label>
              <label>
                Paid break:
                <input
                type="checkbox"
                checked={breakTime.paid}
                onChange={(event) => updateBreak(index, {...breakTime, paid: event.target.checked,})} />
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
      </section>

      <section>
        <h2>Results</h2>
        <p>Total worked hours: {formatHours(totalWorkedHour)}</p>
        <p>Base pay: ¥{formattedBasePay}</p>
        <p>Overtime premium: ¥{formattedOvertimePremium}</p>
        <p>Night premium: ¥{formattedNightPremium}</p>
        <p>Total pay: ¥{formattedTotalPay}</p>
      </section>
    </>

  )

}

export default App
