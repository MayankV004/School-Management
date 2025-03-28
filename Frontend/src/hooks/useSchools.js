import { useState, useCallback } from 'react';
import axios from 'axios';

export const useSchools = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNearbySchools = useCallback(async (latitude, longitude) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get('http://localhost:3000/api/listSchools', {
        params: { latitude, longitude }
      });
      
      if (response.data.success) {
        setSchools(response.data.schools);
      } else {
        setError(response.data.message || 'Failed to fetch schools');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while fetching schools');
      console.error('Error fetching schools:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addSchool = useCallback(async (schoolData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('http://localhost:3000/api/addSchool', schoolData);
      
      if (response.data.success) {
        return { success: true, message: 'School added successfully' };
      } else {
        setError(response.data.message || 'Failed to add school');
        return { success: false, message: response.data.message };
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'An error occurred while adding school';
      setError(errorMsg);
      console.error('Error adding school:', err);
      return { success: false, message: errorMsg };
    } finally {
      setLoading(false);
    }
  }, []);

  return { 
    schools, 
    loading, 
    error, 
    fetchNearbySchools, 
    addSchool 
  };
};