import React from 'react';
import './App.css';
import VideoFeed from './components/VideoFeed';
import PaintCanvas from './components/PaintCanvas';


function App() {
  return (
   <div className='wrapper'> 
      <div className="App container">
        <VideoFeed />
      </div>

      <div className='container'>
        <PaintCanvas />
      </div>
    </div> 
  );
}

export default App;

