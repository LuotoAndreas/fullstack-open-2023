
const RenderCountryList = (props) => {
  return (
    <div>
      {props.countries.length <= 10 && props.countries.length > 1 &&
        props.countries.map((country) => (
          <RenderCountry key={country.name.common} country={country} onButtonClick={props.onButtonClick} />
        ))}

      {props.countries.length > 10 && <p>Too many matches. Please specify your search.</p>}
    </div>
  )  
}

const RenderCountry = (props) =>  {
    return (
        <div key={props.country.name.common}>
            <p>{props.country.name.common} <button onClick={() => props.onButtonClick(props.country.name.common)}>
                show </button>
            </p>
        </div>
    );  
}    
  
export default RenderCountryList 
  