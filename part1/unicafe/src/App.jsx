import { useState } from "react";

const Header = ({ title }) => <h1>{title}</h1>;

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>;

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ allClicks }) => {
  const { good, neutral, bad } = allClicks;

  if (Object.values(allClicks).reduce((c, v) => c + v, 0) == 0) {
    return <div>No feedback given</div>;
  }

  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = (good / all) * 100;

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive + "%"} />
      </tbody>
    </table>
  );
};

const App = () => {
  const [clicks, setClicks] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleGood = () => setClicks({ ...clicks, good: clicks.good + 1 });
  const handleNeutral = () => setClicks({ ...clicks, neutral: clicks.neutral + 1 });
  const handleBad = () => setClicks({ ...clicks, bad: clicks.bad + 1 });

  return (
    <div>
      <Header title="give feedback" />
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />
      <Header title="statistics" />
      <Statistics allClicks={clicks} />
    </div>
  );
};

export default App;
