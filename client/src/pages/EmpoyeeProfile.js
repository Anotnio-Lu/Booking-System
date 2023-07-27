import React from 'react';
import Auth from '../utils/auth';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import RunList from '../components/RunList';
import { ADD_RUN } from '../utils/mutations';
import { GET_EMPLOYEE } from '../utils/queries';

const EmployeeProfile = () => {
    const { employeeId } = useParams();
    const [addRun, { error }] = useMutation(ADD_RUN);
    const { loading, data } = useQuery(GET_EMPLOYEE, {
        variables: { userId: employeeId },
    });
    const runs = data?.user.runs || [];
    const user = data?.user || [];

      if (loading) {
        return <h3>Loading</h3>;
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

  return (
    <div className="employeeprofilepage">
    {Auth.loggedIn() ? (
        <>
                    <button
              className="btn btn-primary btn-block btn-squared"
              onClick={() => window.location.assign('/')}
            > MainPage
            </button>
            <h1>Employee Profile</h1>
            <h2>{user.username}</h2>

            <div className=''>
                <RunList 
                runs={runs}
                />
            </div>
            <button
              className="btn btn-primary btn-block btn-squared"
              onClick={() => CreateRun(employeeId)}
            > ADD NEW RUN
            </button>
        </>
      ) : (
        window.location.assign('/')
      )}
    </div>
  );
};

export default EmployeeProfile;
