import React, { useEffect, useRef, useState, useContext } from 'react';
import { GoogleMap, useLoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faBox, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { fetchCategories, submitRequest } from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';


const libraries = ["places", "directions"];

const RequestForm = () => {
  const [pickupAddress, setPickupAddress] = useState('');
  const [pickupLat, setPickupLat] = useState('');
  const [pickupLng, setPickupLng] = useState('');
  const [dropOffAddress, setDropOffAddress] = useState('');
  const [dropOffLat, setDropOffLat] = useState('');
  const [dropOffLng, setDropOffLng] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [senderName, setSenderName] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setData } = useContext(AppContext);

  const pickupRef = useRef(null);
  const dropOffRef = useRef(null);
  const directionsFetched = useRef(false);
  const navigate = useNavigate();

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
        setPickupLat(place.geometry?.location?.lat() || '');
        setPickupLng(place.geometry?.location?.lng() || '');
      });

      dropOffAutocomplete.addListener('place_changed', () => {
        const place = dropOffAutocomplete.getPlace();
        setDropOffAddress(place.formatted_address || '');
        setDropOffLat(place.geometry?.location?.lat() || '');
        setDropOffLng(place.geometry?.location?.lng() || '');
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

  const handleSubmit = async () => {
    const formData = {
      from_address: pickupAddress,
      from_latitude: pickupLat,
      from_longitude: pickupLng,
      to_address: dropOffAddress,
      to_latitude: dropOffLat,
      to_longitude: dropOffLng,
      item_name: itemName,
      item_description: itemDescription,
      recipient_name: recipientName,
      recipient_phone: recipientPhone,
      category_id: category,
    };

    setLoading(true);

    try {
      const response = await submitRequest(formData);
      setLoading(false); 
      setData({ data: response.data }); 
      navigate('/success'); 
    } catch (error) {
      setLoading(false);
      console.error("Error submitting request:", error);
      alert("Error submitting request. Please try again."); 
    }
  };

  useEffect(() => {
    if (isLoaded) {
      initAutocomplete();
    }

    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Failed to load categories");
      }
    };

    loadCategories();
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
              placeholder="Item Name"
              required
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="w-full p-3 focus:outline-none"
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded focus-within:ring-2 focus-within:ring-blue-600">
            <FontAwesomeIcon icon={faCalendarAlt} className="p-3 text-gray-400" />
            <input
              type="text"
              placeholder="Item Description"
              required
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              className="w-full p-3 focus:outline-none"
            />
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded"
            required
          >
            <option value="" disabled>Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Recipient Name"
            required
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded"
          />

          <input
            type="tel"
            placeholder="Recipient Phone"
            required
            value={recipientPhone}
            onChange={(e) => setRecipientPhone(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded"
          />

          <button
            type="submit"
            onClick={handleSubmit}
            className={`w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 ${loading ? 'opacity-50' : ''}`}
            disabled={loading}
          >
            {loading ? 
            // show a loading on the page
            
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-white"></div>
              <span className="ml-2">Submitting Request...</span>
            </div>

            :
            // show the button text
            'Submit Request'
            }
          </button>
        </form>
      </div>

      <div className="md:w-1/2 lg:w-3/5 h-96" data-aos="fade-left">
        <GoogleMap
          center={{ lat: 37.7749, lng: -122.4194 }}
          zoom={12}
          mapContainerStyle={{ width: "100%", height: "100%" }}
        >
          {pickupAddress && dropOffAddress && (
            <DirectionsService
              options={{ origin: pickupAddress, destination: dropOffAddress, travelMode: 'DRIVING' }}
              callback={handleDirectionsCallback}
            />
          )}
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
        {error && <p className="text-red-500 text-center">{error}</p>}
      </div>
    </section>
  );
};

export default RequestForm;
