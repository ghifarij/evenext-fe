import React from 'react';

const Loading: React.FC<{ message?: string }> = ({ message }) => {
  return (
    <div className="loader-wrapper">
      <div className="loader-container">
        <div className="loader"></div>
        {message && <p className="loading-message">{message}</p>}
      </div>
    </div>
  );
};

export default Loading;