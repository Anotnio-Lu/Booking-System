import React from 'react';

import Auth from '../utils/auth';
import EmployeeRunList from '../components/EmployeeRunList';

const Employee = () => {
  const employee = Auth.getUser().data._id
  const name = Auth.getUser().data.username

  return (
    <div className="employeepage">
    {Auth.loggedIn() ? (
        <>
            <h1>Employee page!</h1>
            <h2>{name}'s</h2>

            <div className='run-list'>
              <EmployeeRunList />

            </div>
        </>
      ) : (
        window.location.assign('/')
      )}
    </div>
  );
};

export default Employee;
