const Person = ({name,number,handleDelete:handle,id}) => {
    return (<div> 
        {name} {number}   <button onClick={()=>handle(id)}>delete</button>
        </div>)
}
export default Person