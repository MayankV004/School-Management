import React, { useEffect } from 'react';
import { useSchools } from '../hooks/useSchools';

function SchoolList({ userLocation }) {
  const { schools, loading, error, fetchNearbySchools } = useSchools();

  useEffect(() => {
    if (userLocation?.latitude && userLocation?.longitude) {
      fetchNearbySchools(userLocation.latitude, userLocation.longitude);
    }
  }, [userLocation, fetchNearbySchools]);

  if (loading) {
    return <p className="text-gray-500 text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">Error: {error}</p>;
  }

  return (
    <div>
      {schools.length === 0 ? (
        <p className="text-gray-500 text-center">No schools found</p>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Address</th>
              <th className="p-2 text-right">Distance (km)</th>
            </tr>
          </thead>
          <tbody>
            {schools.map((school) => (
              <tr key={school.id} className="border-b">
                <td className="p-2">{school.name}</td>
                <td className="p-2">{school.address}</td>
                <td className="p-2 text-right">
                  {school.distance.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SchoolList;