import "./styles/App.css";
import Stopwatch from "./components/Stopwatch";
import Timestamp from "./components/TImestamps";
import { useState, useEffect } from "react";

function App() {
    const [timestamps, setTimestamps] = useState([]);

    useEffect(() => {
      const items = [];
      for (let i = 1; i <= localStorage.length; i++)
      {
        items.push({id: i, time: localStorage.getItem(i)});
      }

      setTimestamps(items);
    }, []);


  return (
    <>
      <Stopwatch storageItems={timestamps} setStorageItems={setTimestamps} />

      <div className="timeStamps">
        {timestamps.map(timestamp => {
          return <Timestamp key={timestamp.id} id={timestamp.id} time={timestamp.time} />
        })}
      </div>
    </>
  );
}

export default App;
