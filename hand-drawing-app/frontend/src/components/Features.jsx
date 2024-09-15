import React from 'react';
import './Features.css';

function Features() {
  return (
    <section className="features">
      <div className="container">
        <h2>Project Features</h2>
        <div className="feature-box">
          <h3>Real-time Hand Tracking</h3>
          <p>Using MediaPipe, the system tracks hand gestures in real-time.</p>
        </div>
        <div className="feature-box">
          <h3>Gesture-based Drawing</h3>
          <p>Draw on a canvas using simple hand gestures to switch colors and clear the canvas.</p>
        </div>
        <div className="feature-box">
          <h3>Interactive Experience</h3>
          <p>Visual feedback on the video feed and virtual canvas for a seamless drawing experience.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;
