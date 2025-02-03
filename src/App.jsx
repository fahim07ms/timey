import "./styles/App.css";
import Stopwatch from "./components/Stopwatch";
import Timestamp from "./components/TImestamps";
import { useState, useEffect } from "react";

function App() {
  // Local Storage based Timestamp useState
  const [timestamps, setTimestamps] = useState([]);

  return (
    <>
      <Stopwatch storageItems={timestamps} setStorageItems={setTimestamps} />

      <div className="timeStamps">
        {timestamps.map((timestamp) => {
          return (
            <Timestamp
              key={timestamp.id}
              id={timestamp.id}
              time={timestamp.time}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
