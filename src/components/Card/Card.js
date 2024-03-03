import React from 'react';
import './Card.css';
import { weatherCodeData } from '../../cities';

const Card = ({ code, name, humidity, temperature, uvIndex, windSpeed, setSavedLocations, error }) => {
  const getWeatherCondition = (code) => {
    return weatherCodeData[code] || 'Unknown';
  };

  const favoriteCity = () => {
    const savedLocationsString = localStorage.getItem('savedLocations');
    const savedLocations = savedLocationsString ? JSON.parse(savedLocationsString) : [];

    if (!savedLocations.includes(name)) {

      savedLocations.push(name);

      localStorage.setItem('savedLocations', JSON.stringify(savedLocations));

      setSavedLocations(savedLocations);
    }
  };

  const weatherCondition = getWeatherCondition(String(code));

  return (
    <div className="card">
      {name ? (
        <>
          <h2>{name}</h2>
          <p>{`Weather Condition: ${weatherCondition}`}</p>
          <p>{`Humidity: ${humidity}%`}</p>
          <p>{`Temperature: ${temperature}°C`}</p>
          <p>{`UV Index: ${uvIndex}`}</p>
          <p>{`Wind Speed: ${windSpeed} m/s`}</p>
          <button onClick={favoriteCity}>❤️</button>
        </>
      ) : (
        <p>Error: No weather data available</p>
      )}
    </div>
  );
};

export default Card;
