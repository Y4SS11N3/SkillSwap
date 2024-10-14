import React, { useState } from 'react';
import ProfilePicture from './ProfilePicture';
import ProfileInput from './ProfileInput';

const MAX_BIO_LENGTH = 50;

const ProfileForm = ({ 
  profile, 
  formData, 
  isModified, 
  onSubmit, 
  onChange, 
  onPictureChange, 
  onDeleteAccount, 
  onChangePassword 
}) => {
  const [deletePassword, setDeletePassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleDeleteAccount = () => {
    onDeleteAccount(deletePassword);
    setDeletePassword('');
  };

  const handleChangePassword = () => {
    onChangePassword(currentPassword, newPassword);
    setCurrentPassword('');
    setNewPassword('');
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <ProfilePicture src={profile?.profilePicture} onPictureChange={onPictureChange} />
      
      <ProfileInput
        label="Name"
        name="name"
        value={formData.name}
        onChange={onChange}
        isModified={isModified}
      />

      <ProfileInput
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={onChange}
        isModified={isModified}
      />

      <ProfileInput
        label="Bio"
        name="bio"
        type="textarea"
        value={formData.bio}
        onChange={onChange}
        isModified={isModified}
        maxLength={MAX_BIO_LENGTH}
      />

<ProfileInput
        label="Current Password"
        name="currentPassword"
        type="password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />

      <ProfileInput
        label="New Password"
        name="newPassword"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <div className="flex justify-between items-center">
        <button 
          type="submit" 
          className={`px-4 py-2 text-white rounded disabled:opacity-50 ${
            isModified ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-teal-600 hover:bg-teal-700'
          }`}
          disabled={!isModified}
        >
          {isModified ? 'Save Changes' : 'No Changes'}
        </button>

        <button 
          type="button" 
          onClick={handleChangePassword} 
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          disabled={!currentPassword || !newPassword}
        >
          Change Password
        </button>
      </div>

      <ProfileInput
        label="Password (required for account deletion)"
        name="deletePassword"
        type="password"
        value={deletePassword}
        onChange={(e) => setDeletePassword(e.target.value)}
      />

      <button 
        type="button" 
        onClick={handleDeleteAccount} 
        className="px-4 py-2 bg-rose-600 text-white rounded hover:bg-rose-700"
      >
        Delete Account
      </button>
    </form>
  );
};

export default ProfileForm;