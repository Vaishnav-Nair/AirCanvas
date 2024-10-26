import React from 'react';
import './savebutton.css';

function CustomButton({ onClick }) {
  return (
    <div className="button-container">
      <button className="button" onClick={onClick}>
        <span className="shadow"></span>
        <span className="edge"></span>
        <div className="front">
          <span>Save</span>
        </div>
      </button>
    </div>
  );
}

export default CustomButton;
