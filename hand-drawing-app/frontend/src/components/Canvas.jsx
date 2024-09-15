import React from 'react';
import './Canvas.css';
import VideoFeed from './VideoFeed'
import PaintCanvas from './PaintCanvas';

function Canvas() {
    return (
    <div className='mainBody'>
     <div className='wrapper'> 
        <div className="App contains">
          <VideoFeed />
        </div>
  
        <div className='contains'>
          <PaintCanvas /> 
        </div>
      </div> 
    </div>
    );
  }

export default Canvas;



