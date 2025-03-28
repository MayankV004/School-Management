import { useState } from 'react';

export const useSchoolForm = (initialState = {
  name: '',
  address: '',
  latitude: '',
  longitude: ''
}) => {
  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) errors.name = 'School name is required';
    if (!formData.address.trim()) errors.address = 'Address is required';
    
    if (!formData.latitude) {
      errors.latitude = 'Latitude is required';
    } else if (isNaN(parseFloat(formData.latitude))) {
      errors.latitude = 'Latitude must be a valid number';
    }
    
    if (!formData.longitude) {
      errors.longitude = 'Longitude is required';
    } else if (isNaN(parseFloat(formData.longitude))) {
      errors.longitude = 'Longitude must be a valid number';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
   
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const resetForm = () => {
    setFormData(initialState);
    setFormErrors({});
  };

  return {
    formData,
    formErrors,
    handleChange,
    validateForm,
    resetForm
  };
};