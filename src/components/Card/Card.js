import React from 'react';
import './Card.css';
import { weatherCodeData } from '../../cities';
const Card = ({ code, name, humidity, temperature, uvIndex, windSpeed, weatherCode }) => {
  const getWeatherCondition = (code) => {

    return weatherCodeData[code] || 'Unknown';
  };
  const favoriteCity = () => {
    
  }
  const weatherCondition = getWeatherCondition(weatherCode);

  return (
    <div className="card">
      <h2>{name}</h2>
      <p>{`Weather Condition: ${weatherCondition}`}</p>
      <p>{`Humidity: ${humidity}%`}</p>
      <p>{`Temperature: ${temperature}°C`}</p>
      <p>{`UV Index: ${uvIndex}`}</p>
      <p>{`Wind Speed: ${windSpeed} m/s`}</p>
      <button onClick={favoriteCity}>❤️</button>
    </div>
  );
};

export default Card;
