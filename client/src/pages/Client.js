import React from 'react';

import Auth from '../utils/auth';
import ClientProfile from '../components/ClientProfile';
import Booking from '../components/Booking';

const Client = () => {


  return (
    <div className="clientpage">
    {Auth.loggedIn() ? (
        <>
            <h1>Client page!</h1>
            <ClientProfile/>
            <div className=''>
              <Booking />

            </div>
        </>
      ) : (
        window.location.assign('/')
      )}
    </div>
  );
};

export default Client;
