import React, { useEffect } from 'react';
import axios from 'axios';

function SchoolList({ userLocation, schools, setSchools }) {
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/listSchools', {
          params: {
            latitude: userLocation.latitude,
            longitude: userLocation.longitude
          }
        });

        if (response.data.success) {
          setSchools(response.data.schools);
        }
      } catch (error) {
        console.error('Error fetching schools:', error.response?.data || error.message);
        
      }
    };

    fetchSchools();
  }, [userLocation, setSchools]);

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