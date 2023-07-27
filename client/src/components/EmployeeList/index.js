import React from 'react';
import { Link } from 'react-router-dom';
import { REMOVE_EMPLOYEE, ADD_RUN } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { useMutation, useQuery } from '@apollo/client';

const EmployeeList = ({ employees, refetch }) => {
  const admin = Auth.getUser().data.username
  const [addRun, { error }] = useMutation(ADD_RUN);

  if (!employees.length) {
    return <h3>No employees Yet</h3>;
  }

  const CreateRun = async ( employeeId ) => {

    try {
      const { data } = await addRun({
        variables: { userId: employeeId }
      });
  
      if (data && data.addRun) {
        window.location.assign(`/run/${data.addRun._id}/${employeeId}`);
      }
    } catch (err) {
      console.error(err);
    }

  }

  const Delete = ( userId ) => {
    const [removeEmployee, { error }] = useMutation(REMOVE_EMPLOYEE);

  
    const handleButtonClick = async () => {

      try {
        const { data } = await removeEmployee({
          variables: {
            admin: admin,
            userId: userId.userId,
          },
        });
  
          refetch()

      } catch (err) {
        console.error(err);
      } 
    };
  
    return (
      <div>
        <button 
          className="btn btn-primary btn-block btn-squared"
          onClick={handleButtonClick}>Remove employee</button>
      </div>
    );
  };

  return (
    <div>
      <h3>Employee list </h3>
      {employees &&
        employees.map(( employee ) => (
          <div key={employee._id} className="card mb-3">
            <div className="card-body bg-light p-2">
                <p> Employee name: {employee.username}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/employee/${employee._id}`}
            >
              Profile
            </Link>
            <button
              className="btn btn-primary btn-block btn-squared"
              onClick={() => CreateRun(employee._id)}
            > ADD NEW RUN
            </button>
            <Delete
                  userId={employee._id}
                />
          </div>
        ))}



        
    </div>
  );
};


export default EmployeeList;
