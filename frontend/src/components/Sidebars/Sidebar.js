import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  HomeIcon, ArrowPathIcon, AcademicCapIcon, 
  UserCircleIcon, ArrowLeftOnRectangleIcon,
  ChevronLeftIcon
} from '@heroicons/react/24/solid';
import { logout } from '../../redux/actions/authActions';

const SidebarItem = ({ icon: Icon, children, to }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <motion.li
      className={`mb-2 ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-700'} rounded-lg overflow-hidden`}
      whileHover={{ backgroundColor: '#E6F3FF' }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        to={to}
        className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors duration-150 ease-in-out ${
          isActive ? 'font-semibold' : ''
        }`}
      >
        <Icon className="h-5 w-5 flex-shrink-0 mr-3" />
        <span className="truncate">{children}</span>
      </Link>
    </motion.li>
  );
};

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsExpanded(false);
      } else {
        setIsExpanded(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const sidebarVariants = {
    expanded: { width: '16rem' },
    collapsed: { width: '5rem' }
  };

  return (
    <motion.nav 
      className="bg-white shadow-lg h-screen fixed top-0 left-0 flex flex-col overflow-hidden"
      initial="expanded"
      animate={isExpanded ? "expanded" : "collapsed"}
      variants={sidebarVariants}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="p-4 flex flex-col h-full">
        <motion.div 
          className="flex items-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {isExpanded ? (
            <h1 className="text-2xl font-bold text-blue-600">
              Skill<span className="text-blue-800">Swap</span>
            </h1>
          ) : (
            <span className="text-2xl font-bold text-blue-600">S</span>
          )}
        </motion.div>

        <ul className="flex-grow">
          <SidebarItem icon={HomeIcon} to="/dashboard">Dashboard</SidebarItem>
          <SidebarItem icon={ArrowPathIcon} to="/exchanges">Exchanges</SidebarItem>
          <SidebarItem icon={AcademicCapIcon} to="/my-skills">My Skills</SidebarItem>
          <SidebarItem icon={UserCircleIcon} to="/profile">Profile</SidebarItem>
        </ul>

        <motion.button
          onClick={handleLogout}
          className="mt-auto w-full text-left px-4 py-2 text-red-600 flex items-center rounded-lg hover:bg-red-50 transition-colors duration-150 ease-in-out"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-3" />
          {isExpanded && <span>Logout</span>}
        </motion.button>
      </div>

      <motion.button
        className="absolute top-1/2 -right-3 bg-white rounded-full p-2 shadow-md z-10 hidden md:block"
        style={{
          transform: 'translateY(-50%) translateX(50%)',
        }}
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={isExpanded ? { rotate: 0 } : { rotate: 180 }}
      >
        <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
      </motion.button>
    </motion.nav>
  );
};

export default Sidebar;