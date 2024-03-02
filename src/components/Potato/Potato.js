import React from 'react';
import './Potato.css';

const Potato = () => {
  return (
    <div className="potato-container">
      <h1 className="potato-title">Welcome to Potato World</h1>
      <img
        src="https://www.foodandwine.com/thmb/8f5mFotpx1Ofc84ZZEi9tV9XMqI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/The-Best-Potatoes-for-Mashing-Roasting-Frying-and-So-Much-More-FT-BLOG1023-d1fecdc7091942a1b2ca2c1c88c6afe1.jpg"
        alt="Potato"
        className="potato-image"
      />
    </div>
  );
};

export default Potato;
