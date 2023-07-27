import React from 'react';
import Auth from '../utils/auth';
import AddUserForm from '../components/AddUserForm';

const NewEmployee = () => {
    const admin = Auth.getUser().data.username

      
  return (
    <div className="adminpage">
    {Auth.loggedIn() ? (
        <>
            <h1>New Employee page!</h1>

            <div className=''>
              <AddUserForm />
            </div>
        </>
      ) : (
        window.location.assign('/')
      )}
    </div>
  );
};

export default NewEmployee;
