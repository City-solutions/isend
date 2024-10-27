import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, useLoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faBox, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const libraries = ["places", "directions"];

const RequestForm = () => {
  const [pickupAddress, setPickupAddress] = useState('');
  const [dropOffAddress, setDropOffAddress] = useState('');
  const [packageDetails, setPackageDetails] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [senderName, setSenderName] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [receiverPhone, setReceiverPhone] = useState('');
  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);

  const pickupRef = useRef(null);
  const dropOffRef = useRef(null);
  const directionsFetched = useRef(false);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBEfyuMVyPbaYNEDUXgbEE_SCoNC1y6kaw", // Replace with your API key
    libraries,
  });

  const initAutocomplete = () => {
    if (window.google) {
      const options = {
        types: [],
        componentRestrictions: { country: ['cmr'] },
      };

      const pickupAutocomplete = new window.google.maps.places.Autocomplete(pickupRef.current, options);
      const dropOffAutocomplete = new window.google.maps.places.Autocomplete(dropOffRef.current, options);

      pickupAutocomplete.addListener('place_changed', () => {
        const place = pickupAutocomplete.getPlace();
        setPickupAddress(place.formatted_address || '');
      });

      dropOffAutocomplete.addListener('place_changed', () => {
        const place = dropOffAutocomplete.getPlace();
        setDropOffAddress(place.formatted_address || '');
      });
    }
  };

  const fetchDirections = () => {
    if (pickupAddress && dropOffAddress && !directionsFetched.current) {
      setError(null);
      setDirections(null);
      directionsFetched.current = true;
    }
  };

  const handleDirectionsCallback = (response, status) => {
    if (status === 'OK') {
      setDirections(response);
    } else {
      setError('Error fetching directions. Please try again.');
      directionsFetched.current = false;
    }
  };

  const handleSubmit = () => {
    alert("Request submitted!");
  };

  useEffect(() => {
    if (isLoaded) {
      initAutocomplete();
    }
  }, [isLoaded]);

  useEffect(() => {
    if (pickupAddress && dropOffAddress) {
      fetchDirections();
    }
  }, [pickupAddress, dropOffAddress]);

  if (!isLoaded) return <div>Loading...</div>;
  if (loadError) return <div>Error loading Google Maps</div>;

  return (
    <section id="request-form" className="flex flex-col md:flex-row py-10 px-6 md:px-20 bg-white space-x-4">
      <div className="md:w-1/2 lg:w-2/5 mb-8 md:mb-0" data-aos="fade-right">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">Request a Pickup</h2>
        <form className="space-y-6 w-11/12 mx-auto" onSubmit={(e) => e.preventDefault()}>
          <div className="flex items-center border border-gray-300 rounded focus-within:ring-2 focus-within:ring-blue-600">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="p-3 text-gray-400" />
            <input
              ref={pickupRef}
              type="text"
              placeholder="Pickup Address"
              required
              className="w-full p-3 focus:outline-none"
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded focus-within:ring-2 focus-within:ring-blue-600">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="p-3 text-gray-400" />
            <input
              ref={dropOffRef}
              type="text"
              placeholder="Drop-off Address"
              required
              className="w-full p-3 focus:outline-none"
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded focus-within:ring-2 focus-within:ring-blue-600">
            <FontAwesomeIcon icon={faBox} className="p-3 text-gray-400" />
            <input
              type="text"
              placeholder="Package Details (size, weight)"
              required
              value={packageDetails}
              onChange={(e) => setPackageDetails(e.target.value)}
              className="w-full p-3 focus:outline-none"
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded focus-within:ring-2 focus-within:ring-blue-600">
            <FontAwesomeIcon icon={faCalendarAlt} className="p-3 text-gray-400" />
            <input
              type="datetime-local"
              required
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              className="w-full p-3 focus:outline-none"
            />
          </div>

          <input
            type="text"
            placeholder="Sender Name"
            required
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded"
          />

          <input
            type="text"
            placeholder="Receiver Name"
            required
            value={receiverName}
            onChange={(e) => setReceiverName(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded"
          />

          <input
            type="tel"
            placeholder="Receiver Phone"
            required
            value={receiverPhone}
            onChange={(e) => setReceiverPhone(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded"
          />

          <button
            type="button"
            className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition"
            onClick={handleSubmit}
          >
            Make Request
          </button>
        </form>
      </div>

      <div className="md:w-1/2 lg:w-3/5 h-96 rounded-lg overflow-hidden shadow-lg p-5">
        <GoogleMap
          mapContainerStyle={{ height: '100%', width: '100%', borderRadius: '8px', marginLeft: '16px' }}
          zoom={10}
          center={{ lat: -34.397, lng: 150.644 }}
        >
          {pickupAddress && dropOffAddress && directionsFetched.current && (
            <DirectionsService
              options={{
                origin: pickupAddress,
                destination: dropOffAddress,
                travelMode: 'DRIVING',
              }}
              callback={handleDirectionsCallback}
            />
          )}
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </div>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </section>
  );
};

export default RequestForm;
