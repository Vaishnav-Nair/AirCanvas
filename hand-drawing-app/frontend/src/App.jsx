import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Features from './components/Features';
import Canvas from './components/Canvas';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <Features />
              <Footer />
            </>
          } />
          <Route path="/Canvas" element={<Canvas />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

