import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from '../../hooks/useLocation';
import { useSchools } from '../../hooks/useSchools';
import SchoolCard from '../SchoolCard/SchoolCard';

function FindSchool() {
  const { location, updateLocation, getCurrentLocation, loading: locationLoading } = useLocation();
  const { schools, loading: schoolsLoading, error, fetchNearbySchools } = useSchools();
  const [searchInitiated, setSearchInitiated] = useState(false);

  const handleLocationChange = (e, field) => {
    const value = e.target.value;
    if (field === 'latitude') {
      updateLocation(value, location.longitude);
    } else {
      updateLocation(location.latitude, value);
    }
  };

  const handleSearch = () => {
    fetchNearbySchools(location.latitude, location.longitude);
    setSearchInitiated(true);
  };

  const handleGetCurrentLocation = async () => {
    await getCurrentLocation();
    
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-xl shadow-xl overflow-hidden"
    >
      <div className="bg-indigo-700 p-6">
        <h2 className="text-2xl font-bold text-white">Find Nearby Schools</h2>
        <p className="text-indigo-200 mt-1">Discover educational institutions in your area</p>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Enter Location</h3>
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <label className="block text-gray-600 mb-2">Latitude</label>
              <input
                type="number"
                value={location.latitude}
                onChange={(e) => handleLocationChange(e, 'latitude')}
                step="any"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
            </div>
            
            <div className="flex-1">
              <label className="block text-gray-600 mb-2">Longitude</label>
              <input
                type="number"
                value={location.longitude}
                onChange={(e) => handleLocationChange(e, 'longitude')}
                step="any"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
            </div>
          </div>
          
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={handleGetCurrentLocation}
              disabled={locationLoading}
              className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-200 transition"
            >
              {locationLoading ? 'Getting location...' : 'Use Current Location'}
            </button>
            
            <button
              type="button"
              onClick={handleSearch}
              disabled={schoolsLoading}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center"
            >
              {schoolsLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Searching...
                </>
              ) : (
                'Search Schools'
              )}
            </button>
          </div>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
            {error}
          </div>
        )}
        
        <div className="results">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Search Results</h3>
          
          {!searchInitiated ? (
            <div className="text-center py-8 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p>Enter a location and click "Search Schools" to find nearby educational institutions</p>
            </div>
          ) : schoolsLoading ? (
            <div className="text-center py-8">
              <svg className="animate-spin h-10 w-10 mx-auto text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="mt-3 text-gray-600">Loading schools...</p>
            </div>
          ) : schools.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-gray-600">No schools found near this location</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {schools.map((school) => (
                <SchoolCard key={school.id} school={school} />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default FindSchool;