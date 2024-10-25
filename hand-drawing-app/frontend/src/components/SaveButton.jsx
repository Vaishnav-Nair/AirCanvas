import React from 'react';
import './savebutton.css'; // Assuming your styles are in savebutton.css

function CustomButton({ onClick }) {
    return (
        <div className="button-container"> {/* New container for positioning */}
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

