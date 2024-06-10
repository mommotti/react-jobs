import React, { useState } from 'react';

const ApiPasswordPopup = ({ onDelete, onCancel }) => {
  const [password, setPassword] = useState('');

  const handleDelete = () => {
    onDelete(password);
    setPassword('');
  };

  const handleCancel = () => {
    onCancel();
    setPassword('');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Enter API Password</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 mb-4"
          placeholder="API Password"
        />
        <div className="flex justify-end">
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mr-2"
          >
            Delete
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApiPasswordPopup;
