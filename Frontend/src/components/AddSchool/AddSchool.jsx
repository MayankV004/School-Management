import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSchoolForm } from '../../hooks/useSchoolForm';
import { useSchools } from '../../hooks/useSchools';
import { useLocation } from '../../hooks/useLocation';

function AddSchool() {
  const { formData, formErrors, handleChange, validateForm, resetForm } = useSchoolForm();
  const { addSchool, loading, error } = useSchools();
  const { location, getCurrentLocation, loading: geoLoading } = useLocation();
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Convert string values to numbers for latitude and longitude
    const payload = {
      ...formData,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude)
    };
    
    const result = await addSchool(payload);
    
    if (result.success) {
      setSuccessMessage('School added successfully!');
      resetForm();
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };
  
  const useCurrentLocation = () => {
    getCurrentLocation();
    if (location) {
      handleChange({ 
        target: { name: 'latitude', value: location.latitude.toString() } 
      });
      handleChange({ 
        target: { name: 'longitude', value: location.longitude.toString() } 
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-xl shadow-xl overflow-hidden"
    >
      <div className="bg-indigo-700 p-6">
        <h2 className="text-2xl font-bold text-white">Add New School</h2>
        <p className="text-indigo-200 mt-1">Register a new educational institution</p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
            {successMessage}
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}
        
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            School Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition ${
              formErrors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter school name"
          />
          {formErrors.name && (
            <p className="mt-1 text-red-500 text-sm">{formErrors.name}</p>
          )}
        </div>
        
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition ${
              formErrors.address ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter school address"
          />
          {formErrors.address && (
            <p className="mt-1 text-red-500 text-sm">{formErrors.address}</p>
          )}
        </div>
        
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex-1 mb-4 md:mb-0">
            <label className="block text-gray-700 font-semibold mb-2">
              Latitude
            </label>
            <input
              type="text"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition ${
                formErrors.latitude ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter latitude"
            />
            {formErrors.latitude && (
              <p className="mt-1 text-red-500 text-sm">{formErrors.latitude}</p>
            )}
          </div>
          
          <div className="flex-1">
            <label className="block text-gray-700 font-semibold mb-2">
              Longitude
            </label>
            <input
              type="text"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition ${
                formErrors.longitude ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter longitude"
            />
            {formErrors.longitude && (
              <p className="mt-1 text-red-500 text-sm">{formErrors.longitude}</p>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={useCurrentLocation}
            disabled={geoLoading}
            className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-200 transition"
          >
            {geoLoading ? 'Getting location...' : 'Use Current Location'}
          </button>
          
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition flex items-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              'Add School'
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}

export default AddSchool;