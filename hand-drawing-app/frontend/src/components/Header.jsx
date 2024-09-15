import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <h1>Hand Gesture Drawing</h1>
        <p>Draw with your hands in real-time using gesture recognition powered by OpenCV and MediaPipe.</p>
        <a href="/Canvas" className="cta-btn">Try it Now!</a>
      </div>
    </header>
  );
};

export default Header;
