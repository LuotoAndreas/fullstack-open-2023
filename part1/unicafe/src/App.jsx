import React, { useState } from 'react';

const Header = ({ header }) => {
  return (
    <h1>{header}</h1>
  )
}

const Statistics = (props) => {
  const { good, neutral, bad } = props;

  const sum = good + neutral + bad;
  if (sum === 0) {
    return (
      <div>
        <p>no feedback given</p>
      </div>
    )
  }

  const all = good + neutral + bad;
  const average = ((good + neutral * 0 + bad * -1) / all).toFixed(1);
  const positive = ((good / all) * 100).toFixed(1);

  return (
    <table>
      <tbody>
      <StatisticLine text="good" value ={good} />
      <StatisticLine text="neutral" value ={neutral} />
      <StatisticLine text="bad" value ={bad} />
      <StatisticLine text="all" value ={all} />
      <StatisticLine text="average" value ={average} />
      <StatisticLine text="positive" value ={positive + "%"} />
      </tbody>      
    </table>
  )
}

const StatisticLine = (props) => {

  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const header = "give feedback";
  const header2 = "statistics";

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const increaseGood = () => {
    setGood(good + 1);
  }

  const increaseNeutral = () => {
    setNeutral(neutral + 1);
  }

  const increaseBad = () => {
    setBad(bad + 1);
  }

  return (
    <div>
      <Header header={header} />

      <Button handleClick={increaseGood} text='good' />
      <Button handleClick={increaseNeutral} text='neutral' />
      <Button handleClick={increaseBad} text='bad' />

      <Header header={header2} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App;
