import { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={() => setGood((prevState) => prevState + 1)}>
        Good
      </button>
      <button onClick={() => setNeutral((prevState) => prevState + 1)}>
        Neutral
      </button>
      <button onClick={() => setBad((prevState) => prevState + 1)}>Bad</button>

      <div>
        <h2>Statistics</h2>
        <p>Good {good}</p>
        <p>Neutral {neutral}</p>
        <p>Bad {bad}</p>
      </div>
    </div>
  );
};

export default App;
