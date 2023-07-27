import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Navigate, useParams } from 'react-router-dom';
import { ADD_RUN } from '../../utils/mutations';

const RunList = ({ runs }) => {
    const { employeeId } = useParams();
    const [addRun, { error }] = useMutation(ADD_RUN);

  if (!runs.length) {
    return <h3>No destinations Yet</h3>;
  }

  return (
    <div>
      <h3>Run list </h3>
      {runs &&
        runs.map((run, index) => (
          <div key={run._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {index + 1} <br />
              Live: {run.approved ? "True" : "False"}
              {run.approved ? (
                <>👍</>
              ) : (
                <>
                  <EditButton
                    runId={run._id}
                  />
                </>
              )}

            </h4>
            <div className="card-body bg-light p-2">
                {
                    run.addresses.map((address) => (
                        <div key={address.address._id}>
                           <p>{address.address}</p>
                        </div>
                    ))
                }
            </div>
          </div>
        ))}
    </div>
  );
};

const EditButton = ( runId ) => {
  const { employeeId } = useParams();

  const handleButtonClick = () => {
    window.location.assign(`/run/${runId.runId}/${employeeId}`);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>EDIT</button>
    </div>
  );
};

export default RunList;
