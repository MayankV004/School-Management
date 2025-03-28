import React from 'react';
import { motion } from 'framer-motion';

function SchoolCard({ school }) {
  // Function to determine distance color
  const getDistanceColor = (distance) => {
    if (distance <= 1) return 'text-green-600';
    if (distance <= 3) return 'text-blue-600';
    if (distance <= 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition"
    >
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800">{school.name}</h3>
        <p className="text-gray-600 mt-1">{school.address}</p>
        
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className={`font-medium ${getDistanceColor(school.distance)}`}>
              {school.distance.toFixed(2)} km away
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default SchoolCard;