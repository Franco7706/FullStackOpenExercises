import Part from './Part'

const Content = ({parts}) =>{
    console.log(parts)
    return (
        <div>
            {parts.map(part=><Part key={part.id} name={part.name} exercises={part.exercises} />)}
        </div>
    )
}

export default Content