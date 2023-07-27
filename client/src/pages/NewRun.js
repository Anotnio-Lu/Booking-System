import { useState, React, useMemo, useCallback, useRef } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
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

import { QUERY_SINGLE_RUN } from '../utils/queries';
import DestinationList from '../components/DestinationList';
import NewBookings from '../components/NewBookings';
import { ADD_ADDRESS } from '../utils/mutations';

const NewRun = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyB5vTyA5a_cDNvN9BN6jeOQn40aRRSEgO8",
    libraries: ["places"],
  })

  if(!isLoaded) return <div>Loading...</div>

  return (
    <main>
      <div 
      // className="flex-row justify-center"
      >
        <div
          // className="col-12 col-md-10 mb-3 p-4"
          style={{ border: '1px dotted #1a1a1a' }}
        > <Map/>

        </div>
        <div className="col-12 col-md-8 mb-3">

        </div>
      </div>
    </main>
  );
};

function Map() {
  const { runId } = useParams();
  const mapRef = useRef();
  const center = useMemo(() => ({ lat:-33.891717, lng: 151.179462 }), []);
  const [selected, setSelected] = useState(null);
  const [newAddress, setNewAddress] = useState();
  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );
  const onLoad = useCallback((map) => (mapRef.current = map), []);

  const { loading, data, refetch } = useQuery(QUERY_SINGLE_RUN, {
    variables: { runId: runId },
  });

  const run = data?.run.addresses || [];
  
const MyButton = ( info ) => {
  const [addAddress, { error }] = useMutation(ADD_ADDRESS);
  const runId = info.runId
  const address = info.address
  const lat = info.latlng.lat.toString()
  const lng = info.latlng.lng.toString()


  const handleButtonClick = async () => {
    try {
      const { data } = await addAddress({
        variables: {
          runId: runId,
          address: address,
          lat: lat,
          lng: lng,
        },
      });
      refetch();
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
    <>
    <div className='main-container'>
      <div className='controls'>
        <h1>destinations</h1>
        <div className='destination-list'>
          <DestinationList 
            run={run}
            refetch={refetch}
          />
        </div>
        <div className="">
        <PlacesAutocomplete           
          setSelected={(position) => {
            setSelected(position);
            mapRef.current?.panTo(position);
          }}
          setNewAddress={setNewAddress}
        />
          <div>
            {newAddress ? 
            <div>
              <p>{newAddress}</p> 
              <MyButton
                address={newAddress}
                runId={runId}
                latlng={selected}
                // setNewAddress={setNewAddress}
              />
            </div>
            : null}
            <div>
              <NewBookings
                refetch={refetch}
              />
            </div>
          </div>
        </div> 
      </div>
      <div className='map'>
          <GoogleMap
            zoom={15}
            center={center}
            mapContainerClassName="map-container"
            options={options}
            onLoad={onLoad}
            >
            {selected && <Marker position={selected} />}
          </GoogleMap>
        </div> 
    </div>
    </>
  );
}


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



export default NewRun;
