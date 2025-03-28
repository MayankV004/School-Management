import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AddSchool from './components/AddSchool/AddSchool';
import FindSchool from './components/FindSchool/FindSchool';
import Header from './components/Header/Header';
import { MoveLeft } from 'lucide-react';

function App() {
  const [activeView, setActiveView] = useState(null);

  const renderContent = () => {
    if (!activeView) {
      return (
        <div className="landing-options">
          <motion.div 
            className="option-card"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveView('add')}
          >
            <div className="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h2 className="text-xl font-bold">Add School</h2>
            <p className="text-gray-600">Register a new school in the database</p>
          </motion.div>
          
          <motion.div 
            className="option-card"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveView('find')}
          >
            <div className="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold">Find Schools</h2>
            <p className="text-gray-600">Discover schools near a specific location</p>
          </motion.div>
        </div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
         <div className="mt-6 mb-4">
          <button 
            onClick={() => setActiveView(null)} 
            className="px-4 py-2  flex gap-2 text-gray-700 rounded-md hover:scale-102 transition items-center"
          >
            <MoveLeft /> Back to Options
          </button>
        </div>
        {activeView === 'add' ? <AddSchool /> : <FindSchool />}
        
       
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="container max-w-6xl mx-auto">
        <Header />
        
        <div className="mt-12">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default App;