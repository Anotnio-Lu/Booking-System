import React from 'react';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import EmployeeList from '../components/EmployeeList';

import { QUERY_ADMIN_EMPLOYEES } from '../utils/queries';

const Admin = () => {
    const admin = Auth.getUser().data.username
    const { loading, data, refetch } = useQuery(QUERY_ADMIN_EMPLOYEES, {
        variables: { username: admin },
      });
    const employees = data?.adminemployees.employees || [];
      
  return (
    <div className="adminpage">
    {Auth.loggedIn() ? (
        <>
            <h1>Admin page!</h1>

            <div className='employee-list'>
            {loading ? (
                <div>Loading...</div>
            ) : (
              <>
                <EmployeeList
                    employees={employees}
                    refetch={refetch}
                />
                <Link
                  className="btn btn-primary btn-block btn-squared"
                  to={`/newemployee`}
                >Add Employee</Link> 
              </>
            )}
            </div>
        </>
      ) : (
        window.location.assign('/')
      )}
    </div>
  );
};

export default Admin;
