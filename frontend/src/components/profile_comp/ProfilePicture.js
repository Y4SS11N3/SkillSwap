import React from 'react';

const ProfilePicture = ({ src, onPictureChange }) => {
  return (
    <div className="flex items-center space-x-6">
      <img
        src={src || 'https://via.placeholder.com/150'}
        alt="Profile"
        className="w-32 h-32 rounded-full"
      />
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={onPictureChange}
          className="hidden"
          id="profile-picture"
        />
        <label
          htmlFor="profile-picture"
          className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700 cursor-pointer"
        >
          Change Picture
        </label>
      </div>
    </div>
  );
};

export default ProfilePicture;