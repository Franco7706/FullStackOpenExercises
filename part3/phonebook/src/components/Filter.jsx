const Filter = ({ value:newFilter, onChange:handleFilterChange }) => {
    return (
        <form>
            <div>
                filter shown with <input value={newFilter} onChange={handleFilterChange}></input>
            </div>
        </form>
    )
}

export default Filter