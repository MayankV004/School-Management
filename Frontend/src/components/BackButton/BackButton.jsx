import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MoveLeft } from 'lucide-react';

const BackButton = () => {
  const navigate = useNavigate();
  
  return (
    <div className="mt-6 mb-4">
      <button
        onClick={() => navigate('/')}
        className="px-4 py-2 flex gap-2 text-gray-700 rounded-md hover:scale-102 transition items-center"
      >
        <MoveLeft /> Back to Options
      </button>
    </div>
  );
};

export default BackButton;