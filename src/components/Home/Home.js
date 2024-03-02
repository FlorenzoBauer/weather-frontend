import React, { useState } from 'react';
import './Home.css';
import { cities } from '../../cities';

const Home = ({ setLocation, savedLocations }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleSearch = async () => {
    setLocation(searchTerm);
  };

  const handleRandomCity = async () => {
    var randomIndex = Math.floor(Math.random() * cities.length);
    setLocation(cities[randomIndex]);
  };

  const handleCityCardClick = (selectedCity) => {
    setLocation(selectedCity);
  };

  return (
    <div className="home-container">
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleRandomCity}>Random City</button>
      </div>
      <div className="weather-info-container">
        {savedLocations.length === 0 ? (
          <p>No saved locations</p>
        ) : (
          <>
            <h2>{savedLocations}</h2>
            {/* Weather data will be displayed here */}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
