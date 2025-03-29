import React, { useState } from 'react';
import { useSchools } from '../hooks/useSchools';


function SchoolForm() {
  const { addSchool, loading, error } = useSchools();
  const [successMessage, setSuccessMessage] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    latitude: '',
    longitude: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    
    // Convert numeric fields to numbers
    const payload = {
      ...formData,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude)
    };
    
    const result = await addSchool(payload);
    
    if (result.success) {
      setSuccessMessage('School added successfully!');
      // Reset form
      setFormData({
        name: '',
        address: '',
        latitude: '',
        longitude: ''
      });
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Add New School</h2>
      
      {successMessage && (
        <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">
          {successMessage}
        </div>
      )}
      
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-800 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-bold mb-2">
            School Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="Enter school name"
            disabled={loading}
          />
        </div>
        
        <div>
          <label className="block text-gray-700 font-bold mb-2">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="Enter school address"
            disabled={loading}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Latitude
            </label>
            <input
              type="number"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              required
              step="any"
              className="w-full p-2 border rounded"
              placeholder="Latitude"
              disabled={loading}
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Longitude
            </label>
            <input
              type="number"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              required
              step="any"
              className="w-full p-2 border rounded"
              placeholder="Longitude"
              disabled={loading}
            />
          </div>
        </div>
        
        <button
          type="submit"
          className={`w-full ${loading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'} text-white p-2 rounded transition`}
          disabled={loading}
        >
          {loading ? 'Adding School...' : 'Add School'}
        </button>
      </form>
    </div>
  );
}

export default SchoolForm;