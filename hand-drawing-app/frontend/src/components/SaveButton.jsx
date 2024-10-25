import React from 'react';
import './savebutton.css'; // Assuming your styles are in savebutton.css

function CustomButton({ onClick }) { // Get onClick from props
    return (
        <button className="button" onClick={onClick}> {/* Use onClick here */}
            <span className="shadow"></span>
            <span className="edge"></span>
            <div className="front">
                <span>Save</span>
            </div>
        </button>
    );
}

export default CustomButton;
