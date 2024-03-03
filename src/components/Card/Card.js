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
          <h2 className='city-name'>{name}</h2>
          <p className='weatherCondition'>{`Weather Condition: ${weatherCondition}`}</p>
          <p className='humidity'>{`Humidity: ${humidity}%`}</p>
          <p className='temperature'>{`Temperature: ${temperature}°C`}</p>
          <p className='uvIndex'>{`UV Index: ${uvIndex}`}</p>
          <p className='windSpeed'>{`Wind Speed: ${windSpeed} m/s`}</p>
          <button onClick={favoriteCity}>❤️</button>
        </>
      ) : (
        <p>Error: No weather data available</p>
      )}
    </div>
  );
};

export default Card;
