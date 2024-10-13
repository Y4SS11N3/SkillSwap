import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  HomeIcon, ArrowPathIcon, AcademicCapIcon, 
  UserCircleIcon, ArrowLeftOnRectangleIcon
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg h-screen fixed top-0 left-0 w-64 flex flex-col overflow-hidden">
      <div className="p-4 flex flex-col h-full">
        <motion.div 
          className="flex items-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-2xl font-bold text-blue-600">
            Skill<span className="text-blue-800">Swap</span>
          </h1>
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
          <span>Logout</span>
        </motion.button>
      </div>
    </nav>
  );
};

export default Sidebar;