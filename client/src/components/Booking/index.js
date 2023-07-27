import React, { useState, useMemo } from 'react';
import Auth from '../../utils/auth';
import { ADD_BOOKING } from '../../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';
// import { useParams } from 'react-router-dom';
import { QUERY_BOOKINGS } from '../../utils/queries';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

const Booking = () => {
  const [selected, setSelected] = useState(null);
  const [newAddress, setNewAddress] = useState();
  const [selectedTime, setSelectedTime] = useState('');
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyB5vTyA5a_cDNvN9BN6jeOQn40aRRSEgO8",
    libraries: ["places"],
  })

  const [selectedDate, setSelectedDate] = useState('');
  const clientId = Auth.getUser().data._id
  const hasRequiredFields = useMemo(() => {
    return newAddress && selectedDate && selectedTime;
  }, [newAddress, selectedDate, selectedTime]);
const { loading, data, refetch } = useQuery(QUERY_BOOKINGS, {
    // pass URL parameter
    variables: { userId: clientId },
});
const [addBooking, { error }] = useMutation(ADD_BOOKING);

const bookings = data?.findUserBooks || {};


  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };
const handleTimeChange = (event) => {
  setSelectedTime(event.target.value);
};

const AddBookingButton = ( ) => {

  const handleButtonClick = async () => {
    try {
      const { data } = await addBooking({
        variables: {
          userId: clientId, 
          date: selectedDate,
          time: selectedTime,
          address: newAddress,
          lat: selected.lat.toString(),
          lng: selected.lng.toString()
        },
      });
      refetch();
      setNewAddress("")
      setSelectedTime("")
      selectedDate(null)
      selected(null)
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
        {hasRequiredFields ? (
          <button onClick={handleButtonClick}>Add Booking</button>
        ) : (
          <p>Fill in all required fields to add a booking</p>
        )}
    </div>
  );
};

if(!isLoaded) return <div>Loading...</div>


// const last = user.runs.length-1

if (loading) {

return <h3>Loading...</h3>;
}


  return (
    <div>
      <h2>BookNOW!</h2>
      <div>
        {bookings &&
          bookings.map((booking) => (
            <div key={booking._id} className="card mb-3">
              <h4 className="card-header bg-primary text-light p-2 m-0">
                Address: {booking.address} <br />
              </h4>
              <div className="card-body bg-light p-2">
                <p>Date: {booking.date}</p>
                <p>Time: {booking.time}</p>
              </div>
            </div>
          ))}
      </div>
        <div>
          <h3>Date Input Example</h3>
          <label htmlFor="dateInput">Select a date:</label>
          <input
            type="date"
            id="dateInput"
            value={selectedDate}
            onChange={handleDateChange}
          />
          <p>Selected date: {selectedDate}</p>
        </div>
        <div>
          <h3>Time Input Example</h3>
          <label htmlFor="timeInput">Select a time:</label>
          <input
            type="time"
            id="timeInput"
            value={selectedTime}
            onChange={handleTimeChange}
          />
          <p>Selected time: {selectedTime}</p>
        </div>
        <h3>Address</h3>
        <PlacesAutocomplete           
          setSelected={(position) => {
            setSelected(position);
          }}
          setNewAddress={setNewAddress}
        />
        <p>Selected address: {newAddress}</p>

        <AddBookingButton/>
    </div>
  );
};


const PlacesAutocomplete = ({ setSelected, setNewAddress }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
    setNewAddress(address);
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="combobox-input"
        placeholder="Search an address"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};

export default Booking;
