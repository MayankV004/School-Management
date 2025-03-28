import React, { useState } from 'react';
import axios from 'axios';

function SchoolForm({ setSchools }) {
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
    try {
      // Convert numeric fields to numbers
      const payload = {
        ...formData,
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude)
      };

      const response = await axios.post('http://localhost:3000/api/addSchool', payload);
      
      if (response.data.success) {
        
        // Reset form
        setFormData({
          name: '',
          address: '',
          latitude: '',
          longitude: ''
        });
      }
    } catch (error) {
      console.error('Error adding school:', error.response?.data || error.message);
   
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Add New School</h2>
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
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Add School
        </button>
      </form>
    </div>
  );
}

export default SchoolForm;