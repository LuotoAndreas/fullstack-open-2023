const RenderSingleCountry = ({ countries }) => (

    <div>
      <h2>{countries[0].name.common}</h2>            
      <p>Capital: {countries[0].capital}</p>
      <p>Area: {countries[0].area} km²</p>            
      <h3>Languages: </h3>
      <ul>{Object.values(countries[0].languages).map((language) => <li key={language}>{language}</li>)}</ul>
      <img src={countries[0].flags.png} alt={`Flag of ${countries[0].name.common}`} />
    </div>
  );

export default RenderSingleCountry