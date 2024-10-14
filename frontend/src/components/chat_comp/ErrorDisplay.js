import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ErrorDisplay = ({ error }) => (
  <AnimatePresence>
    {error && (
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 shadow-md"
        role="alert"
      >
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </motion.div>
    )}
  </AnimatePresence>
);

export default ErrorDisplay;