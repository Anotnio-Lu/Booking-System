import { useState, React } from 'react';
import Auth from '../utils/auth';
import "@reach/combobox/styles.css";

const LandingPage = () => {
  return (
    <div className="landingpage">
      <h1>Find Your Perfect Technician Today</h1>

      <p className='para'>
      Are you tired of spending endless hours searching for a
      reliable technician to handle your technical woes? 
      Look no further! TechConnect Booking System is your 
      one-stop solution for connecting with skilled technicians
       in your area. Say goodbye to the hassle of endless phone calls 
       and emails – with our user-friendly platform, 
       finding the perfect technician is just a few clicks away.
      </p>


    </div>
  );
};

const MainContent = () => {

   const userType = Auth.getUser().data.userType || '';

    if (userType === "ADMIN") {
      return window.location.assign('/admin');
    } else if (userType === "EMPLOYEE") {
      return window.location.assign('/employee');
    } else if (userType === "CLIENT") {
      return window.location.assign('/client');
    }
  
  return null;
};

const Home = () => {
  return (
    <main>
    <div className="flex-row justify-center">
      <div className="col-12 col-md-8 mb-3">
        {Auth.loggedIn() ? (
          <MainContent />
        ) : (
          <LandingPage />
        )}
      </div>
    </div>
  </main>
  );
};

export default Home;
