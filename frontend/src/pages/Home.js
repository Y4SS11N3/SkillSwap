import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRightIcon, LightBulbIcon, UsersIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
  >
    <Icon className="h-10 w-10 text-sky-500 mb-4" />
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const Home = () => {
  return (
    <div className="bg-gradient-to-b from-sky-50 to-white min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="py-20 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold text-gray-900 mb-6"
          >
            Welcome to <span className="text-sky-600">SkillSwap</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl text-gray-600 mb-8"
          >
            Connect, Learn, and Grow with our innovative skill-sharing platform.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Link
              to="/register"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700"
            >
              Get Started
              <ChevronRightIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
            </Link>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose SkillSwap?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={LightBulbIcon}
              title="Smart Matching"
              description="Connect with perfect learning partners based on your skills and goals."
            />
            <FeatureCard
              icon={UsersIcon}
              title="Global Network"
              description="Join a worldwide community of learners and experts."
            />
            <FeatureCard
              icon={GlobeAltIcon}
              title="Diverse Opportunities"
              description="Explore a wide range of skills from tech to creative arts."
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-gray-600 mb-8">Join our community of global learners today!</p>
          <Link
            to="/register"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700"
          >
            Sign Up Now
            <ChevronRightIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
          </Link>
        </section>
      </main>
    </div>
  );
};

export default Home;