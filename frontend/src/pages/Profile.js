import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProfile, updateProfile, updateProfilePicture, deleteAccount } from '../redux/actions/profileActions';
import ProfileForm from '../components/profile_comp/ProfileForm';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile, error, loading } = useSelector(state => state.profile);
  const [formData, setFormData] = useState({ name: '', email: '', bio: '' });
  const [isModified, setIsModified] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        bio: profile.bio || ''
      });
      setIsModified(false);
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
    setIsModified(true);
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(updateProfile(formData));
    if (result.type === 'profile/updateProfile/fulfilled') {
      setMessage('Profile updated successfully!');
      setIsModified(false);
    }
  };

  const handleChangePassword = async (currentPassword, newPassword) => {
    try {
      await dispatch(updateProfile({
        currentPassword,
        newPassword
      }));
      setMessage('Password changed successfully!');
    } catch (error) {
      setMessage('Failed to change password. Please try again.');
    }
  };

  const handlePictureChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const result = await dispatch(updateProfilePicture(file));
      if (result.type === 'profile/updateProfilePicture/fulfilled') {
        setMessage('Profile picture updated successfully!');
      }
    }
  };

  const handleDeleteAccount = async (password) => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      const result = await dispatch(deleteAccount(password));
      if (result.success) {
        setMessage(result.message);
        setTimeout(() => navigate('/'), 2000);
      } else {
        setMessage(result.message);
      }
    }
  };

  if (loading && !profile) return <div className="text-center">Loading...</div>;

  return (
    <div className="w-full bg-white p-6">
      {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
      {message && <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">{message}</div>}
      <ProfileForm
        profile={profile}
        formData={formData}
        isModified={isModified}
        onSubmit={handleSubmit}
        onChange={handleChange}
        onChangePassword={handleChangePassword}
        onPictureChange={handlePictureChange}
        onDeleteAccount={handleDeleteAccount}
      />
    </div>
  );
};

export default Profile;