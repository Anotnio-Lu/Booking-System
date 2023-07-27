import React, { useState } from 'react';
import { ADD_ADDRESS, ASSIGN_BOOKING } from '../../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_UNASSIGNED_BOOKINGS } from '../../utils/queries';


const NewBookings = ( fun ) => {

    const { runId } = useParams();

    const { loading, data, refetch } = useQuery(QUERY_UNASSIGNED_BOOKINGS,{
        variables: { assigned: false },
    });

    const allBookings = data?.findUnassignedBookings || [];

    const AddToRun = ( info ) => {
        const [addAddress, { error }] = useMutation(ADD_ADDRESS);

        const handleButtonClick = async () => {
          try {
            const { data } = await addAddress({
              variables: {
                runId: runId,
                address: info.address,
                lat: info.lat.toString(),
                lng: info.lng.toString(),
                bookingId: info.bookingId,
                assigned: true
              },
            });
            refetch();
            fun.refetch()
          } catch (err) {
            console.error(err);
          }
        };
      
        return (
          <div>
            <button onClick={handleButtonClick}>Add to Run</button>
          </div>
        );
      };

  return (
    <div>
        <h2>Client bookings</h2>      
        {allBookings &&
            allBookings.map((booking) => (
            <div key={booking._id} className="card mb-3">
                <h4 className="card-header bg-primary text-light p-2 m-0">
                {booking.address} <br />
                </h4>
                {/* <div className="card-body bg-light p-2">
                <p>{thought.thoughtText}</p>
                </div> */}
                <AddToRun
                    address={booking.address}
                    lat={booking.lat}
                    lng={booking.lng}
                    bookingId={booking._id}
                />
            </div>
        ))}

    </div>
  );
};




export default NewBookings;
