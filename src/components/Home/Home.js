import React, { useState, useEffect } from 'react';
import './Home.css';
import { cities } from '../../cities';
import { useNavigate } from 'react-router-dom';
import HomeCard from '../HomeCard/HomeCard';

const Home = ({ setLocation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [savedLocations, setSavedLocations] = useState([]);
  const [searchedLocations, setSearchedLocations] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedLocationsFromStorage = localStorage.getItem('savedLocations');
    const searchedLocationsFromStorage = localStorage.getItem('searchedLocations');

    if (savedLocationsFromStorage) {
      const parsedSavedLocations = JSON.parse(savedLocationsFromStorage);
      setSavedLocations(parsedSavedLocations);
    }

    if (searchedLocationsFromStorage) {
      const parsedSearchedLocations = JSON.parse(searchedLocationsFromStorage);
      setSearchedLocations(parsedSearchedLocations);
    }
  }, []);

  const handleSearch = () => {
    setLocation(searchTerm);
    saveLocationToLocalStorage('searchedLocations', searchTerm); // Save to searchedLocations storage
    navigate('./forecast');
  };

  const handleRandomCity = async () => {
    let randomIndex = Math.floor(Math.random() * cities.length);
    setLocation(cities[randomIndex]);
    saveLocationToLocalStorage('searchedLocations', cities[randomIndex]); // Save to searchedLocations storage
    navigate('./forecast');
  };

  const handleCityCardClick = (selectedCity) => {
    setLocation(selectedCity);
    saveLocationToLocalStorage('searchedLocations', selectedCity); // Save to searchedLocations storage
    navigate('./forecast');
  };

  const handleFavoriteCity = (name) => {
    if (!savedLocations.includes(name)) {
      setSavedLocations((prevSavedLocations) => [...prevSavedLocations, name]);
      saveLocationToLocalStorage('savedLocations', name); // Save to savedLocations storage
    }
  };

  const saveLocationToLocalStorage = (storageKey, location) => {
    const existingLocations = localStorage.getItem(storageKey);
    let updatedLocations = [];

    if (existingLocations) {
      updatedLocations = JSON.parse(existingLocations);
    }

    updatedLocations.push(location);

    localStorage.setItem(storageKey, JSON.stringify(updatedLocations));
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
          <div className="saved-locations">
            {savedLocations.map((location) => (
              <HomeCard
                key={location}
                name={location}
                setLocation={setLocation}
                onFavorite={() => handleFavoriteCity(location)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
