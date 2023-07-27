import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { EMPLOYEE_RUN } from '../../utils/queries';

const EmployeeRunList = () => {
    const employeeId = Auth.getUser().data._id

    const { loading, data } = useQuery(EMPLOYEE_RUN, {
        variables: { employeeId: employeeId },
    });
    
    const user = data?.employeeruns || {};

  if (loading) {

    return <h3>Loading...</h3>;
  }

  return (
    <div>
      <h3>Runs</h3>
      {user.runs &&
        user.runs.map((run, index) => (
          <>
              {run.approved ? (
                <div key={run._id} className="card mb-3">
                    <h4 className="card-header bg-primary text-light p-2 m-0">
                    {index + 1} <br />
                    </h4>
                    <div className="card-body bg-light p-2">
                        {
                            run.addresses.map((address) => (
                                <div key={address.address._id}>
                                <p>{address.address}</p>
                                </div>
                            ))
                        }
                        {user.runs.length-1 == index ? (
                            <StartRun
                                runId={run._id}
                            />
                        ):(null)}
                    </div>
                </div>
              ) : (null)}
          </>
        ))}
    </div>
  );
};

const StartRun = ( runId ) => {
//   const { employeeId } = useParams();

  const handleButtonClick = () => {
    window.location.assign(`/employeerun/${runId.runId}`);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Start Run</button>
    </div>
  );
};

export default EmployeeRunList;
