import React from 'react';
import { motion } from 'framer-motion';

function Header() {
  return (
    <header className="text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-indigo-800">
          School Management System
        </h1>
        <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
          Easily add new schools to our database and find educational institutions near any location.
        </p>
      </motion.div>
    </header>
  );
}

export default Header;