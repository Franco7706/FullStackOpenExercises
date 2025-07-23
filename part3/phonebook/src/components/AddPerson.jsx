const AddPerson = ({name:newName,number:newNumber,changeName:handleNameChange,changeNumber:handleNumberChange,addPerson:handleAddName}) => {
    return (
        <div>
            <form onSubmit={handleAddName}>
                <div>
                    name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    number: <input value={newNumber} onChange={handleNumberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default AddPerson