import NumberBox from "../components/NumberBox";
import Button from "../components/Button";
import { useState, useEffect } from "react";

function Stopwatch({ storageItems, setStorageItems }) {
  // Formatting for the minute
  const minuteFormat = new Intl.NumberFormat("en-US", {
    minimumIntegerDigits: 2,
    maximumIntegerDigit: 3,
    useGrouping: false,
  });

  // Timestamps
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [miliSec, setMiliSec] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [timerId, setTimerId] = useState(localStorage.length + 1);

  // Button state
  const [isStarted, setIsStarted] = useState(false);
  const [btnText, setBtnText] = useState("Start");

  // Elapsed time is in milisecond
  // Store the time in their format
  function formatElapsedTime(msTime) {
    setMiliSec(Math.floor(msTime % 1000));
    setSecond(Math.floor((msTime % 60000) / 1000));
    setMinute(Math.floor(msTime / 60000));
  }

  useEffect(() => {
    let timeInterval = null;
  
    // When the timer button is hit get how much time is elapsed and then show the formatted time
    if (isStarted) {
      timeInterval = setInterval(() => {
        const elapsedTime = new Date().getTime() - startTime;
        formatElapsedTime(elapsedTime);
      }, 1);
    }

    // Clear the interval when changed
    return () => {
      if (timeInterval) {
        clearInterval(timeInterval);
      }
    };
  }, [isStarted, startTime]);

  // When the button is clicked
  function handleClick() {
    // If timer not started
    if (!isStarted) {
      setStartTime(new Date().getTime());

      setIsStarted(true);
      setBtnText("Stop");
    }
    // If timer started
    else {
      localStorage.setItem(
        `${timerId}`,
        `${minuteFormat.format(minute)}:${second
          .toString()
          .padStart(2, "0")}:${miliSec.toString().padStart(2, "0").slice(0, 2)}`
      );

      // Push Item To The The array
      const items = [
        ...storageItems,
        { id: timerId, time: localStorage.getItem(timerId) },
      ];

      setStorageItems(items);
      setTimerId(timerId + 1);
      setStartTime(0);
      formatElapsedTime(0);

      setIsStarted(false);
      setBtnText("Start");
    }
  }

  return (
    <div className="box">
      <div className="timer-box">
        <NumberBox time={minuteFormat.format(minute)} />
        <NumberBox time=":" />
        <NumberBox time={second.toString().padStart(2, "0")} />
        <NumberBox time=":" />
        <NumberBox time={miliSec.toString().padStart(2, "0").slice(0, 2)} />
      </div>

      <Button text={btnText} onButtonClick={handleClick} />
    </div>
  );
}

export default Stopwatch;
