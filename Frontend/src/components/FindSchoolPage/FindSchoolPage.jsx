import React from 'react';
import { motion } from 'framer-motion';
import FindSchool from '../FindSchool/FindSchool';
import BackButton from '../BackButton/BackButton';

const FindSchoolPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <BackButton />
      <FindSchool />
    </motion.div>
  );
};

export default FindSchoolPage;