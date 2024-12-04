import React, { useState, useEffect, useRef } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import { fetchCategories, calculatePrice as calculatePriceAPI } from "../services/apiService";
import { useTranslation } from "react-i18next";
import { CheckCircleIcon, LocationMarkerIcon, CurrencyDollarIcon, RefreshIcon } from '@heroicons/react/outline';
import "react-toastify/dist/ReactToastify.css";

const libraries = ["places"];

const GetPrice = () => {
  const { t } = useTranslation();
  const [pickupAddress, setPickupAddress] = useState("");
  const [dropOffAddress, setDropOffAddress] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(null);
  const [distance, setDistance] = useState(null);
  const [pickupLatLng, setPickupLatLng] = useState(null);
  const [dropOffLatLng, setDropOffLatLng] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const pickupAutocompleteRef = useRef(null);
  const dropOffAutocompleteRef = useRef(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        setErrorMessage(t("Error fetching categories."));
      }
    };

    loadCategories();
  }, [t]);

  const onPickupPlaceChanged = () => {
    const place = pickupAutocompleteRef.current.getPlace();
    if (place.geometry) {
      setPickupAddress(place.formatted_address || "");
      setPickupLatLng({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    } else {
      setErrorMessage(t("Invalid pickup location."));
    }
  };

  const onDropOffPlaceChanged = () => {
    const place = dropOffAutocompleteRef.current.getPlace();
    if (place.geometry) {
      setDropOffAddress(place.formatted_address || "");
      setDropOffLatLng({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    } else {
      setErrorMessage(t("Invalid drop-off location."));
    }
  };

  const calculatePrice = async () => {
    if (!pickupLatLng || !dropOffLatLng || !category) {
      setErrorMessage(t("Please fill all fields to calculate the price."));
      return;
    }

    const data = {
      from_latitude: pickupLatLng.lat,
      from_longitude: pickupLatLng.lng,
      to_latitude: dropOffLatLng.lat,
      to_longitude: dropOffLatLng.lng,
      category_id: category,
    };

    setLoading(true);
    setErrorMessage("");
    try {
      const response = await calculatePriceAPI(data);
      setPrice(response?.data?.price);
      setDistance(response?.data?.distance);
    } catch (error) {
      setErrorMessage(t("Failed to calculate price. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBEfyuMVyPbaYNEDUXgbEE_SCoNC1y6kaw"
      libraries={libraries}
    >
      <div className="absolute inset-0 z-0">
        <div className="bg-blue-300 rounded-full w-64 h-64 absolute top-0 left-10 animate-shape1 opacity-30"></div>
        <div className="bg-blue-400 rounded-full w-48 h-48 absolute top-10 right-10 animate-shape2 opacity-40"></div>
        <div className="bg-blue-500 rounded-full w-72 h-72 absolute bottom-20 left-20 animate-shape3 opacity-30"></div>
        <div className="bg-blue-600 rounded-full w-56 h-56 absolute bottom-10 right-20 animate-shape4 opacity-20"></div>
        <div className="bg-blue-500 rounded-full w-80 h-80 absolute top-1/2 left-1/4 animate-shape5 opacity-25"></div>
        <div className="bg-blue-400 rounded-full w-52 h-52 absolute top-1/4 right-1/4 animate-shape6 opacity-30"></div>
        <div className="bg-blue-300 rounded-full w-36 h-36 absolute bottom-1/4 left-1/4 animate-shape7 opacity-40"></div>
        <div className="bg-blue-600 rounded-full w-40 h-40 absolute top-1/4 left-1/2 animate-shape8 opacity-25"></div>
      </div>
      <div className="flex flex-col lg:flex-row lg:space-x-6 max-w-6xl mx-auto p-8">
        <div className="lg:w-2/3 bg-white p-8 rounded-2xl shadow-xl transition-all transform hover:scale-105">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">{t("Select Items and Calculate Price")}</h2>

          {errorMessage && (
            <div className="bg-red-200 text-red-700 p-3 rounded-md mb-6 text-center">
              {errorMessage}
            </div>
          )}

          {/* Pickup Address Input */}
          <div className="mb-6">
            <label className="block text-md text-gray-600 mb-2">{t("Pickup Address")}</label>
            <div className="flex items-center border-2 border-blue-400 rounded-xl focus-within:ring-2 focus-within:ring-blue-500">
              <LocationMarkerIcon className="w-5 h-5 text-blue-500 p-3" />
              <Autocomplete
                onLoad={(autocomplete) => (pickupAutocompleteRef.current = autocomplete)}
                onPlaceChanged={onPickupPlaceChanged}
              >
                <input
                  type="text"
                  placeholder={t("Enter Pickup Address")}
                  className="w-full py-3 px-4 rounded-r-xl text-gray-700 focus:outline-none"
                />
              </Autocomplete>
            </div>
          </div>

          {/* Drop-Off Address Input */}
          <div className="mb-6">
            <label className="block text-md text-gray-600 mb-2">{t("Drop-Off Address")}</label>
            <div className="flex items-center border-2 border-blue-400 rounded-xl focus-within:ring-2 focus-within:ring-blue-500">
              <LocationMarkerIcon className="w-5 h-5 text-blue-500 p-3" />
              <Autocomplete
                onLoad={(autocomplete) => (dropOffAutocompleteRef.current = autocomplete)}
                onPlaceChanged={onDropOffPlaceChanged}
              >
                <input
                  type="text"
                  placeholder={t("Enter Drop-Off Address")}
                  className="w-full py-3 px-4 rounded-r-xl text-gray-700 focus:outline-none"
                />
              </Autocomplete>
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="mb-6">
            <label className="block text-md text-gray-600 mb-2">{t("Category")}</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full py-3 px-4 border-2 border-blue-400 rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-700"
            >
              <option value="">{t("Select Category")}</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Calculate Button */}
          <button
            onClick={calculatePrice}
            className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all focus:outline-none flex items-center justify-center"
          >
            {loading ? (
              <RefreshIcon className="animate-spin w-6 h-6 text-white" />
            ) : (
              t("Calculate Price")
            )}
          </button>
        </div>

        {/* Result Section */}
        <div className="lg:w-1/3 bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400 p-8 rounded-2xl shadow-xl flex items-center justify-center">
          {loading ? (
            <RefreshIcon className="animate-spin w-10 h-10 text-blue-600" />
          ) : price !== null ? (
            <div className="text-center">
              <CurrencyDollarIcon className="w-10 h-10 text-green-600 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{t("Calculated Price")}</h3>
              <p className="text-3xl font-bold text-blue-600">FCFA {price ? Math.round(price / 100) * 100 : "0"}</p>
              <p className="text-2xl text-gray-600">{t("Distance")} : {distance.toFixed(2)} km</p>
            </div>
          ) : (
            <div className="text-center text-gray-600">
              <p>{t("Enter details to calculate the price.")}</p>
            </div>
          )}
        </div>
      </div>
    </LoadScript>
  );
};

export default GetPrice;
