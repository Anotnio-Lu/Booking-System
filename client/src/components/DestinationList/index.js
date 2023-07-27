import React from 'react';
import { REMOVE_ADDRESS, APPROVE_RUN, ASSIGN_BOOKING } from '../../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_SINGLE_RUN } from '../../utils/queries';

const DestinationList = ({ run, refetch }) => {

  const { runId } = useParams();
  const { employeeId } = useParams();

  if (!run.length) {
    return <h3>No destination Yet {run}</h3>;
  }


const AddressRemoveButton = ( Ids ) => {

  const [removeAddress, { error }] = useMutation(REMOVE_ADDRESS);
  const [assignBooking, { erro }] = useMutation(ASSIGN_BOOKING);

  const handleButtonClick = async () => {
    try {
      const { data } = await removeAddress({
        variables: {
           runId: Ids.runId,
           addressId: Ids.addressId,
           assigned: false,
           bookingId: Ids.bookingId
        },
      });
      refetch();

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Remove</button>
    </div>
  );
};

  return (
    <div>
      {run &&
        run.map((address) => (
          <div key={address._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {address.address} <br />
            </h4>
            {/* <div className="card-body bg-light p-2">
              <p>{thought.thoughtText}</p>
            </div> */}
            <AddressRemoveButton
              addressId={address._id}
              runId={runId}
              bookingId={address.bookingId}
            />
          </div>
        ))}
        <Confirm
          runId={runId}
          employeeId={employeeId}
        />
    </div>
  );
};

const Confirm = ( runId ) => {
  const [approveRun, { error }] = useMutation(APPROVE_RUN);

  const handleButtonClick = async () => {
    try {
      const { data } = await approveRun({
        variables: {
           runId: runId.runId,
        },
      });

      if (data && data.approveRun.approved) {
        window.location.assign(`/employee/${runId.employeeId}`);
      }
    } catch (err) {
      console.error(err);
    } 
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Confirm Run</button>
    </div>
  );
};


export default DestinationList;
