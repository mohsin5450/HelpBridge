import React, { useState,useRef,useEffect } from 'react';
import axios from 'axios';
 import { useLocation,Link,useNavigate } from 'react-router-dom';
 
const RegistrationForm = () => {
  
 
  const [isValidated, setIsValidated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    id: '',
    organizationName: '',
    directorName: '',
    email: '',
    phone: '',
    address: '',
    mission: '',
    description: '',
    website: '',
  });

  const [selectedLocation, setSelectedLocation] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleChangeAddress = (e) => {
    const { value } = e.target;
    setSelectedLocation(value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      address: value,
    }));
  };
  const handleSelectLocation = (place) => {
    if (place && place.geometry) {
      const { lat, lng } = place.geometry.location;
      const address = place.formatted_address;
      
      setSelectedLocation(address);
      setFormData((prevFormData) => ({
        ...prevFormData,
        address: address,
      }));
    }
  };

 

  useEffect(() => {
    const script = document.createElement('script');
     script.src = "";
    script.async = true;
    script.onload = () => {
      // Initialize the Autocomplete component
      initAutocomplete();
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initAutocomplete = () => {
    const options = {
      componentRestrictions: { country: 'pk' },
    };

    const input = document.getElementById('pac-input');
    const autocomplete = new google.maps.places.Autocomplete(input, options);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      handleSelectLocation(place);
    });
  };


  const handleSubmit = async (e) => {
    alert("dfvndfjnv");
    e.preventDefault();
    const id = location.state?.id;
    const username = location.state?.name;
    formData.id = id;
    

    if (
      formData.id &&
      formData.organizationName &&
      formData.directorName &&
      formData.email &&
      formData.phone &&
      formData.address &&
      formData.mission &&
      formData.description &&
      formData.website
    ) {
      try {
        const response = await axios.post('http://localhost:4000/register', formData);
        navigate('/orgHome', { state: { name: username, id: id } });
      } catch (error) {
        console.error(error);
      }

      setFormData({
        organizationName: '',
        directorName: '',
        email: '',
        phone: '',
        address: '',
        mission: '',
        description: '',
        website: '',
      });

      setIsValidated(false);
    } else {
      alert("not fill");
      setIsValidated(true);
    }
  };

 const handleClearAddress = () => {
  setSelectedLocation('');
  setFormData((prevFormData) => ({
    ...prevFormData,
    address: '',
  }));
};

  return (
    
    <div className="flex  w-screen justify-center items-center h-full">
    <div className=" mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 text-[#6366F1]">Non-Profit Organization Registration</h1>
      <form  className="max-w-md">
          <div className="mb-4">
            <label className="block font-bold mb-2">Organization Name:</label>
            <input
              type="text"
              name="organizationName"
              value={formData.organizationName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Director Name:</label>
            <input
              type="text"
              name="directorName"
              value={formData.directorName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Phone:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Address:</label>
            <input
  id="pac-input"
  type="text"
  value={selectedLocation}
  onChange={handleChangeAddress}
  onBlur={handleClearAddress}
  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Mission:</label>
            <textarea
              name="mission"
              value={formData.mission}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">About our company:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Website:</label>
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
         
          {isValidated && (
            <p className="text-red-500 mb-4">
              Please fill in all the required fields before submitting the form.
            </p>
          )}
          <Link
          onClick={handleSubmit}
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register
          </Link>
        </form>
      </div>
    </div>

    
    
  );
};

export default RegistrationForm;

