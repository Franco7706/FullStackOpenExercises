const Search = ({filter,handleChange}) =>{
    return(
        <form>
            <div>
                find countries <input value={filter} onChange={handleChange}></input>
            </div>
        </form>
    )
}

export default Search