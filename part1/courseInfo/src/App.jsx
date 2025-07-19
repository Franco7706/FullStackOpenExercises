const Header = ({course:{name,parts}}) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}
const Part = ({part}) => {
  return(
    <div>
      <p>{part.name} {part.exercises}</p>
    </div>
  )
}
const Content = ({course:{name,parts}}) => {
  return (
    <div>
      <Part part={parts[0]}/>
      <Part part={parts[1]}/>
      <Part part={parts[2]}/>
    </div>
  )
}
const Total = ({course:{name,parts}}) => {
  let total=parts[0].exercises+
  parts[1].exercises+parts[2].exercises
  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  )
}
const App = () => {
  const course = {
  name:  'Half Stack application development',
  parts: [
    {name:'Fundamentals of React',exercises: 10},
    {name:'Using props to pass data',exercises: 7},
    {name:'State of a component',exercises: 14}
  ]
}

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App