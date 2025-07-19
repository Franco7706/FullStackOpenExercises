import { useState } from 'react'


const Button = ({onClick:eventHandler,text:text}) => <button onClick={eventHandler}>{text}</button>
const StatisticLine = ({text,value,symbol}) => {
  return(
    <>
    <tr>
    <td> {text} </td>
    <td> {value} </td>
    <td> {symbol}</td>
    </tr>
    </>
  )
}

const Statistics = (props) =>{
  const {good,neutral,bad}=props
  const all=good+neutral+bad
  const pos=100*good/all
  if(all){
    const avg=((1*good)+(-1*bad))/all // adding 0*neutral would be unnecessary
      return  (
        <div>
        <table>
          <tbody>
            <StatisticLine text='good' value={good}/>
            <StatisticLine text='neutral' value={neutral}/>
            <StatisticLine text='bad' value={bad}/>
            <StatisticLine text='all' value={all}/>
            <StatisticLine text='average' value={avg.toFixed(1)}/>
            <StatisticLine text='positive' value={pos.toFixed(1)} symbol='%'></StatisticLine>
          </tbody>
        </table>
        </div>
      )
  }
  return(
    <div>
      <p>No feedback given</p>
    </div>
  )
  
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)



  return (
    <div>
      <h1>give feedback</h1>
      <div>
      <Button onClick={() => setGood(good+1)} text='good'/>
      <Button onClick={() => setNeutral(neutral+1)} text='neutral'/>
      <Button onClick={() => setBad(bad+1)} text='bad'/>
      </div>
      <h1>statistics</h1>

      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}
export default App