import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';




function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const getLocation = () =>{
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);

    });
  }
  return (
    <div className="App">
      <header className="App-header">
      <span>Teste</span>
      <button onClick={getLocation}>CLIQUE AQUI</button>
      <label>Latitude: {latitude}</label>
      <label>Longitude:{longitude}</label>
      </header>
      
    </div>
  );
}

export default App;
