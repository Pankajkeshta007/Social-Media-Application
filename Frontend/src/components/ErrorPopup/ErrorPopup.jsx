// ErrorPopup.jsx
import React from 'react';

const ErrorPopup = ({ message, onClose }) => {
  return (
    <div className="error-popup">
      <p>{message}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ErrorPopup;
