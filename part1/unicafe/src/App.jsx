import { useState } from 'react'

const Header = ({header}) => {
  return (
    <h1>{header}</h1>
  );
};

const Display = ({ counterG, counterB, counterN }) => {
  return (
    <div> 
      <p>good {counterG} </p>
      <p>neutral {counterN} </p>
      <p>bad {counterB} </p>
    </div>
  )
}


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {

  const header = "give feedback"
  const header2 = "statistics"

  const [ good, setCounter ] = useState(0)  
  const [ neutral, setCounter2 ] = useState(0)
  const [ bad, setCounter3 ] = useState(0)

  const increaseGood = () => setCounter(good + 1)
  const increaseNeutral = () => setCounter2(neutral + 1)
  const increaseBad = () => setCounter3(bad + 1)

  return (
    <div>
      <Header header = {header} />

      <Button
        handleClick={increaseGood}
        text='good'
      />
      <Button
        handleClick={increaseNeutral}
        text='neutral'
      />     
      <Button
        handleClick={increaseBad}
        text='bad'
      />

      <Header header = {header2}/>          
          
      <Display counterG={good} counterN={neutral} counterB={bad}/>
    </div>
  )
}

export default App