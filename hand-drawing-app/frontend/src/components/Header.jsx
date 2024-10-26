import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <h1>Hand Gesture Drawing</h1>
        <p>Unlock a new way to create art with real-time gesture recognition, where your hands become the brush. Using advanced OpenCV and MediaPipe technology, this tool tracks your hand movements and translates them into dynamic digital drawings. Without any physical tools, you can draw, sketch, or design in real time, experiencing a seamless blend of technology and creativity. Perfect for artists, educators, and tech enthusiasts, this interactive experience redefines digital art by making your hands the primary tool for expression.</p>
        <a href="/Canvas" className="cta-btn">Try it Now!</a>
      </div>
    </header>
  );
};

export default Header;
