import Person from './Person'

const People = ({people:people,handleDelete:handle}) => {
    return (
        <div>
            <div>
                {people.map(person => <Person key={person.id} name={person.name} number={person.number} 
                handleDelete={handle} id={person.id}/>)}
            </div>
        </div>
    )
}

export default People