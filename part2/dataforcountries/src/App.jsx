import React, { useState, useEffect } from 'react';
import RenderCountryList from './components/RenderCountryList';
import RenderSingleCountry from './components/RenderSingleCountry';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountryInfo, setSelectedCountryInfo] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${searchTerm}`);
        const data = await response.json();

        const filteredCountries = data.filter(country => country.name.common.toLowerCase().startsWith(searchTerm.toLowerCase()));
        setCountries(filteredCountries);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    if (searchTerm) {
      fetchCountries();
    }
  }, [searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleButtonClick = async (countryName) => {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
      const data = await response.json();

      setSelectedCountryInfo(data[0]); // Assuming the API returns information for only one country
    } catch (error) {
      console.error('Error fetching country info:', error);
    }
  };  

  return (
    <div>
      <h3>Find countries <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search for a country"/></h3>
      {selectedCountryInfo ? (
        <div>
          <RenderSingleCountry countries={[selectedCountryInfo]} />
        </div>
      ) : (
        <RenderCountryList countries={countries} onButtonClick={handleButtonClick} />
      )}
    </div>
  );
}  

export default App;
