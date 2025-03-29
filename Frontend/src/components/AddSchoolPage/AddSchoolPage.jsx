import React from 'react';
import { motion } from 'framer-motion';
import AddSchool from '../AddSchool/AddSchool';
import BackButton from '../BackButton/BackButton';

const AddSchoolPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <BackButton />
      <AddSchool />
    </motion.div>
  );
};

export default AddSchoolPage;