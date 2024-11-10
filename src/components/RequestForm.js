import React, { useEffect, useRef, useState, useContext } from 'react';
import { GoogleMap, useLoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faBox, faCalendarAlt, faImage, faSpinner } from '@fortawesome/free-solid-svg-icons';
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
  const [senderPhone, setSenderPhone] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [directions, setDirections] = useState(null);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setData } = useContext(AppContext);
  const [directionsRequested, setDirectionsRequested] = useState(false);

  const pickupRef = useRef(null);
  const dropOffRef = useRef(null);
  const directionsFetched = useRef(false); // Flag to ensure directions are fetched only once
  const navigate = useNavigate();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBEfyuMVyPbaYNEDUXgbEE_SCoNC1y6kaw",
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
        directionsFetched.current = false; 
        setDirectionsRequested(false); 
      });

      dropOffAutocomplete.addListener('place_changed', () => {
        const place = dropOffAutocomplete.getPlace();
        setDropOffAddress(place.formatted_address || '');
        setDropOffLat(place.geometry?.location?.lat() || '');
        setDropOffLng(place.geometry?.location?.lng() || '');
        directionsFetched.current = false; // Reset when address changes
        setDirectionsRequested(false); // Reset directions requested
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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('from_address', pickupAddress);
    formData.append('from_latitude', pickupLat);
    formData.append('from_longitude', pickupLng);
    formData.append('to_address', dropOffAddress);
    formData.append('to_latitude', dropOffLat);
    formData.append('to_longitude', dropOffLng);
    formData.append('item_name', itemName);
    formData.append('item_description', itemDescription);
    formData.append('recipient_name', recipientName);
    formData.append('recipient_phone', recipientPhone);
    formData.append('sender_name', senderName);
    formData.append('sender_phone', senderPhone);
    formData.append('category_id', category);
    if (image) {
      formData.append('item_photo', image);
    }

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
            <input ref={pickupRef} type="text" placeholder="Pickup Address" required className="w-full p-3 focus:outline-none" />
          </div>
          <div className="flex items-center border border-gray-300 rounded focus-within:ring-2 focus-within:ring-blue-600">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="p-3 text-gray-400" />
            <input ref={dropOffRef} type="text" placeholder="Drop-off Address" required className="w-full p-3 focus:outline-none" />
          </div>
          <div className="flex items-center border border-gray-300 rounded focus-within:ring-2 focus-within:ring-blue-600">
            <FontAwesomeIcon icon={faBox} className="p-3 text-gray-400" />
            <input type="text" placeholder="Item Name" required value={itemName} onChange={(e) => setItemName(e.target.value)} className="w-full p-3 focus:outline-none" />
          </div>
          <div className="flex items-center border border-gray-300 rounded focus-within:ring-2 focus-within:ring-blue-600">
            <FontAwesomeIcon icon={faCalendarAlt} className="p-3 text-gray-400" />
            <input type="text" placeholder="Item Description" required value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} className="w-full p-3 focus:outline-none" />
          </div>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border border-gray-300 p-3 rounded" required>
            <option value="" disabled>Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <div className="flex items-center border border-gray-300 rounded focus-within:ring-2 focus-within:ring-blue-600">
            <FontAwesomeIcon icon={faImage} className="p-3 text-gray-400" />
            <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-3 focus:outline-none" />
          </div>
          <input type="text" placeholder="Sender Name" required value={senderName} onChange={(e) => setSenderName(e.target.value)} className="w-full border border-gray-300 p-3 rounded" />
          <input type="tel" placeholder="Sender Phone" required value={senderPhone} onChange={(e) => setSenderPhone(e.target.value)} className="w-full border border-gray-300 p-3 rounded" />
          <input type="text" placeholder="Recipient Name" required value={recipientName} onChange={(e) => setRecipientName(e.target.value)} className="w-full border border-gray-300 p-3 rounded" />
          <input type="tel" placeholder="Recipient Phone" required value={recipientPhone} onChange={(e) => setRecipientPhone(e.target.value)} className="w-full border border-gray-300 p-3 rounded" />
          <button onClick={handleSubmit} disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none">
            {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Make Request'}
          </button>
        </form>
      </div>
      <div className="md:w-1/2 lg:w-3/5" data-aos="fade-left">
        <GoogleMap mapContainerStyle={{ width: '100%', height: '100%' }} center={{ lat: 5.950, lng: 10.159 }} zoom={10}>
          {pickupAddress && dropOffAddress && directions && (
            <DirectionsRenderer directions={directions} />
          )}
          <DirectionsService
            options={{ origin: pickupAddress, destination: dropOffAddress, travelMode: 'DRIVING' }}
            callback={(response, status) => handleDirectionsCallback(response, status)}
          />
        </GoogleMap>
      </div>
    </section>
  );
};

export default RequestForm;
