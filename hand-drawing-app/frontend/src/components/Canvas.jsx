import React, { useRef } from 'react';
import './Canvas.css';
import html2canvas from 'html2canvas';
import CustomButton from './SaveButton';
import VideoFeed from './VideoFeed';
import PaintCanvas from './PaintCanvas';

function Canvas() {
    const paintAreaRef = useRef(); 

    const handleSave = async () => {
        if (paintAreaRef.current) {
            const canvas = await html2canvas(paintAreaRef.current, {
                useCORS: true,
                backgroundColor: null 
            });
            const imageData = canvas.toDataURL("image/png");
            const link = document.createElement('a');
            link.href = imageData;
            link.download = 'canvas-image.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="mainBody">
          <div className='outer-container'>
            <div className="wrapper">
                <div className="card">
                    <div className="canvas-container">
                        <VideoFeed />
                    </div>
                    <div className="canvas-container" ref={paintAreaRef}>
                        <PaintCanvas />
                    </div>
                </div>
                <div className="save-button">
                    <CustomButton onClick={handleSave} />
                </div>
            </div>
          </div>
        </div>
    );
}

export default Canvas;
