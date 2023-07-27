import React from 'react';
import Auth from '../utils/auth';
import Map from '../components/EmployeeMap';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const StartRun = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyB5vTyA5a_cDNvN9BN6jeOQn40aRRSEgO8",
    libraries: ["places"],
  })

  if(!isLoaded) return <div>Loading...</div>

  return (
    <div className="page">
    {Auth.loggedIn() ? (
      <Map />
      ) : (
        window.location.assign('/')
      )}
    </div>
  );
};

export default StartRun;
