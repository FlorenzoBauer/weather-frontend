import React, { useState, useEffect } from 'react';
import './Forecast.css';
import { weatherAPI } from '../../api-calls';
import Card from '../Card/Card';
import PropTypes from 'prop-types'

const Forecast = ({ setSavedLocations }) => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchedLocationsFromStorage = localStorage.getItem('searchedLocations');
  const searchedLocations = searchedLocationsFromStorage ? JSON.parse(searchedLocationsFromStorage) : [];

  const defaultLocation = searchedLocations.length > 0 ? searchedLocations[searchedLocations.length - 1] : '';

  const weatherAPICall = async (location) => {
    try {
      const data = await weatherAPI(location);
      setWeatherData(data);
    } catch (error) {
      setError(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    weatherAPICall(defaultLocation);
  }, [defaultLocation]);

  console.log(weatherData);

  const name = weatherData?.name;
  const firstMinutely = weatherData?.timelines?.minutely?.[0]?.values;

  const cityCard = firstMinutely ? (
    <Card
      key={firstMinutely.time}
      name={name}
      code={firstMinutely.weatherCode}
      humidity={firstMinutely.humidity}
      temperature={firstMinutely.temperature}
      uvIndex={firstMinutely.uvIndex}
      windSpeed={firstMinutely.windSpeed}
      setSavedLocations={setSavedLocations}
      error={error}
    />
  ) : null;

  return (
    <div className="forecast-container">
      {loading && <p>Loading...</p>}
      {error && <div className='error'><p>{error}</p></div>}
      {weatherData && (
        <div className="card-section">
          {cityCard}
        </div>
      )}
    </div>
  );
};

export default Forecast;

Forecast.propTypes = {
  setSavedLocations: PropTypes.func.isRequired,
};