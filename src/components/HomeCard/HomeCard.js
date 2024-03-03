import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeCard.css';
import PropTypes from 'prop-types'

const HomeCard = ({ name, setLocation }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    setLocation(name);
    saveLocationToLocalStorage('searchedLocations', name);
    navigate('./forecast');
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
    <section className='home-card'>
      <h1>{name}</h1>
      <div className='card-buttons'>
        <button onClick={handleCardClick}>View Forecast</button>
      </div>
    </section>
  );
};

export default HomeCard;

HomeCard.propTypes = {
  name: PropTypes.string.isRequired,
  setLocation: PropTypes.func.isRequired,
};