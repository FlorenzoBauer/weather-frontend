import React, { useState, useEffect } from 'react';
import './Forecast.css';
import { weatherAPI } from '../../api-calls';
import Card from '../Card/Card';

const Forecast = ({ location }) => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  

  const weatherAPICall = async (location) => {
    try {
      const data = await weatherAPI(location);
      setWeatherData(data);
    } catch (error) {
      setError('Error fetching weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    weatherAPICall(location);
  }, [location]);

  console.log('Weather Data:', weatherData);

  const minutelyData = weatherData.timelines?.minutely[0]?.values;
  
  return (
    <div className="forecast-container">
      <h1>Hello</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {weatherData && (
        <div className="minutely-card">
          {minutelyData && minutelyData.length > 0 && (
            <div className="minutely-card">
              {weatherData.map((loca) => (
                <Card 
                 key={loca.name} 
                 code={loca.timelines.minutely[0].values.weatherCode}
                 name={loca.name}
                 humidity={loca.timelines.minutely[0].values.humidity}
                 temperature={loca.timelines.minutely[0].values.temperature}
                 uvIndex={loca.timelines.minutely[0].values.uvIndex}
                 windSpeed={loca.timelines.minutely[0].values.windSpeed}
                 />
              ))}
            </div>
          )}
          <Card name={weatherData.location?.name} />
        </div>
      )}
    </div>
  );
};

export default Forecast;