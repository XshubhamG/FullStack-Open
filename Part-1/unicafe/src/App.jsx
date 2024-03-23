import { useState } from "react";
import Button from "./components/Button";
import Statistics from "./components/Statistics";

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <main>
      <h2>Give Feedback</h2>
      <div>
        <Button text="good" handler={() => setGood(good + 1)} />
        <Button text="neutral" handler={() => setNeutral(neutral + 1)} />
        <Button text="bad" handler={() => setBad(bad + 1)} />
      </div>
      <h2>Statistics</h2>
      {good + neutral + bad == 0 ? (
        <p>No feedback given</p>
      ) : (
        <Statistics good={good} neutral={neutral} bad={bad} />
      )}
    </main>
  );
}

export default App;
