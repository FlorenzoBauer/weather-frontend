import React, { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header'; // Make sure to import your Header component
import Footer from '../Footer/Footer';
import Home from '../Home/Home'; // Import your Home component
import Map from '../Map/Map';
import Forecast from '../Forecast/Forecast'
import NotFound from '../NotFound/NotFound';
import Potato from '../Potato/Potato';

function App() {
  const [location, setLocation] = useState('');
  const [savedLocations, setSavedLocations] = useState([])

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home setLocation={setLocation} savedLocations={savedLocations}/>} />
        <Route path="/forecast" element={<Forecast setSavedLocations={setSavedLocations} location={location}/>} />
        <Route path="/map" element={<Map location={location} />} />
        <Route path="/potato" element={<Potato />} />
        <Route path="/potatoe" element={<Potato />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
