const People = ({people}) => {
    return (
        <div>
            <div>
                {people.map(person => <div key={person.name}> {person.name} {person.number}</div>)}
            </div>
        </div>
    )
}

export default People