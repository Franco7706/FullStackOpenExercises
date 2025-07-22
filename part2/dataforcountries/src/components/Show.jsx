const Show = ({countries,handleSelect}) =>{
    if(countries.length>10){
        return <div>too many matches, specify another filter</div>
    }
    else if(countries.length>1){
        return(
            <div>
                {countries.map(country=> <div key={country.name.common}>{country.name.common} <button onClick={()=>handleSelect(country.name.common)}>show</button></div>
                )}
            </div>
        )
    }
    else if(countries.length==1){
        const country=countries[0]
        return(
            <div>
                <h1>{country.name.common}</h1>
                <div>capital {country.capital}</div>
                <div>area {country.area}</div>
                <h2>Languages</h2>
                <ul>
                    {Object.entries(country.languages).map(([symbol,language])=><li key={symbol}>{language}</li>)}
                </ul>
                <div style={{fontSize:'50px'}}>{country.flag}</div>
            </div>
        )
    }
    else return <></>
    
}

export default Show