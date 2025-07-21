const Total = ({parts}) => {
    const accumulate = (current,next) => current+next.exercises
    const total=parts.reduce(accumulate,0)
    return (
        <h4>total of {total} exercises</h4>
    )
}

export default Total