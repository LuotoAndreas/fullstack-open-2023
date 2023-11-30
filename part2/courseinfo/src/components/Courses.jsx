const Courses = ({course}) => {

  const name = course.name
  const parts = course.parts

  return (
    <div>
      <Header course = {name}/>
      <Content parts = {parts}/>      
      <Total parts = {parts}/>
    </div>      
  )
}

const Header = ({course}) => {
  return(
    <div>
      <h1>
        {course}
      </h1>
    </div>
  ) 
}

const Content = ({ parts }) => 
<>
  {parts.map(part =>
    <Part key = {part.id} 
          part = {part}/>
  )}
</> 


const Part = ({part}) => {
  console.log("part should work", part)

  return (
    <div>
      <p>
        {part.name} {part.exercises}
      </p>
    </div>
  )
}

const Total = ({parts}) => {
  
const sum = parts.reduce((total, part) =>
  total + part.exercises, 0)

  return (
    <div>
      <h4>
        total of {sum} exercises
      </h4>
    </div>

  )
}
  export default Courses