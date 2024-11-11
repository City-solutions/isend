import React, { useEffect, useRef, useState, useContext } from 'react';
import { GoogleMap, useLoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faBox, faCalendarAlt, faImage, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { fetchCategories, submitRequest } from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { useTranslation } from 'react-i18next';

const libraries = ["places", "directions"];

const RequestForm = () => {
  const { t } = useTranslation(); // i18next hook for translation
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
      setError(t('request_form.fetch_error'));
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
      alert(t('request_form.fetch_error'));
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

  if (!isLoaded) return <div>{t('request_form.loading')}</div>;
  if (loadError) return <div>{t('request_form.error_loading_maps')}</div>;

  return (
    <section id="request-form" className="flex flex-col md:flex-row py-10 px-6 md:px-20 bg-white space-x-4">
      <div className="md:w-1/2 lg:w-2/5 mb-8 md:mb-0" data-aos="fade-right">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">{t('request_form.title')}</h2>
        <form className="space-y-6 w-11/12 mx-auto" onSubmit={(e) => e.preventDefault()}>
          <div className="flex items-center border border-gray-300 rounded focus-within:ring-2 focus-within:ring-blue-600">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="p-3 text-gray-400" />
            <input ref={pickupRef} type="text" placeholder={t('request_form.pickup_address')} required className="w-full p-3 focus:outline-none" />
          </div>
          <div className="flex items-center border border-gray-300 rounded focus-within:ring-2 focus-within:ring-blue-600">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="p-3 text-gray-400" />
            <input ref={dropOffRef} type="text" placeholder={t('request_form.dropoff_address')} required className="w-full p-3 focus:outline-none" />
          </div>
          <div className="flex items-center border border-gray-300 rounded focus-within:ring-2 focus-within:ring-blue-600">
            <FontAwesomeIcon icon={faBox} className="p-3 text-gray-400" />
            <input value={itemName} onChange={(e) => setItemName(e.target.value)} type="text" placeholder={t('request_form.item_name')} required className="w-full p-3 focus:outline-none" />
          </div>
          <div className="flex items-center border border-gray-300 rounded focus-within:ring-2 focus-within:ring-blue-600">
            <FontAwesomeIcon icon={faBox} className="p-3 text-gray-400" />
            <textarea value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} placeholder={t('request_form.item_description')} required className="w-full p-3 focus:outline-none" rows="4"></textarea>
          </div>
          <div className="flex items-center border border-gray-300 rounded focus-within:ring-2 focus-within:ring-blue-600">
            <FontAwesomeIcon icon={faCalendarAlt} className="p-3 text-gray-400" />
            <input type="date" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} className="w-full p-3 focus:outline-none" />
          </div>
          <div className="flex items-center border border-gray-300 rounded focus-within:ring-2 focus-within:ring-blue-600">
            <FontAwesomeIcon icon={faImage} className="p-3 text-gray-400" />
            <input type="file" onChange={handleImageChange} className="w-full p-3 focus:outline-none" />
          </div>
          <div className="flex flex-col space-y-4">
            <div className="border border-gray-300 rounded p-3">
              <label className="block text-gray-800 mb-2">{t('request_form.select_category')}</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} required className="w-full p-3 focus:outline-none">
                <option value="">{t('request_form.select_category')}</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center border border-gray-300 rounded focus-within:ring-2 focus-within:ring-blue-600">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="p-3 text-gray-400" />
            <input type="text" value={senderName} onChange={(e) => setSenderName(e.target.value)} placeholder={t('request_form.sender_name')} required className="w-full p-3 focus:outline-none" />
          </div>
          <div className="flex items-center border border-gray-300 rounded focus-within:ring-2 focus-within:ring-blue-600">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="p-3 text-gray-400" />
            <input type="text" value={senderPhone} onChange={(e) => setSenderPhone(e.target.value)} placeholder={t('request_form.sender_phone')} required className="w-full p-3 focus:outline-none" />
          </div>
          <div className="flex items-center border border-gray-300 rounded focus-within:ring-2 focus-within:ring-blue-600">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="p-3 text-gray-400" />
            <input type="text" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} placeholder={t('request_form.recipient_name')} required className="w-full p-3 focus:outline-none" />
          </div>
          <div className="flex items-center border border-gray-300 rounded focus-within:ring-2 focus-within:ring-blue-600">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="p-3 text-gray-400" />
            <input type="text" value={recipientPhone} onChange={(e) => setRecipientPhone(e.target.value)} placeholder={t('request_form.recipient_phone')} required className="w-full p-3 focus:outline-none" />
          </div>
          <div className="w-full mt-6">
            <button onClick={handleSubmit} className="w-full py-3 px-6 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600">{t('request_form.make_request')}</button>
          </div>
        </form>
      </div>
      <div className="md:w-1/2 lg:w-3/5 flex justify-center items-center" data-aos="fade-left">
        <GoogleMap
          center={{ lat: 4.0518, lng: 9.7072 }}
          zoom={13}
          mapContainerClassName="w-full h-96"
        >
          {pickupLat && dropOffLat && (
            <>
              <DirectionsService
                options={{
                  destination: { lat: dropOffLat, lng: dropOffLng },
                  origin: { lat: pickupLat, lng: pickupLng },
                  travelMode: 'DRIVING',
                }}
                callback={handleDirectionsCallback}
              />
              {directions && (
                <DirectionsRenderer
                  directions={directions}
                  options={{ preserveViewport: true }}
                />
              )}
            </>
          )}
        </GoogleMap>
      </div>
    </section>
  );
};

export default RequestForm;
