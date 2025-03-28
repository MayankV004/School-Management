import { useState, useCallback } from 'react';

export const useLocation = (initialLocation = { latitude: 37.7749, longitude: -122.4194 }) => {
  const [location, setLocation] = useState(initialLocation);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateLocation = useCallback((latitude, longitude) => {
    setLocation({
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude)
    });
  }, []);

  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        setLoading(false);
      },
      (err) => {
        setError(`Error getting location: ${err.message}`);
        setLoading(false);
      }
    );
  }, []);

  return {
    location,
    loading,
    error,
    updateLocation,
    getCurrentLocation
  };
};