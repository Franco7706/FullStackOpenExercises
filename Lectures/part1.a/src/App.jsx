const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>Hello world {props.name},
        you are {props.age} years old
      </p>
    </div>
  )
}
const Footer = () => {
  return (
    <div>
      greeting app created by <a href="https://github.com/Franco7706">Franco</a>
    </div>
  )
}

const App = () => {
  const name='Peter'
  const age=10
  const friends = [
    {name: 'Peter', age:4},
    {name: 'Maya',age:10},
  ]
  
  return (
    <>
      <h1>Greetings</h1>
      <Hello name={name} age={age} />
      <p>{friends[0].name}</p>
      <p>{friends[1].age}</p>
      <Footer/>
    </>
  )
}

export default App