import React from 'react';

const ProfileInput = ({ label, name, value, onChange, type = 'text', isModified, maxLength }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
      {type === 'textarea' ? (
        <>
          <textarea
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            rows="4"
            maxLength={maxLength}
            className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 ${
              isModified ? 'border-yellow-500' : 'border-gray-300'
            }`}
          />
          {maxLength && (
            <p className="mt-1 text-sm text-gray-500">
              {maxLength - value.length} characters remaining
            </p>
          )}
        </>
      ) : (
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 ${
            isModified ? 'border-yellow-500' : 'border-gray-300'
          }`}
          required={type !== 'password'}
        />
      )}
    </div>
  );
};

export default ProfileInput;