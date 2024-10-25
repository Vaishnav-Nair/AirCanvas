import React, { useRef } from 'react';
import './Canvas.css';
import html2canvas from 'html2canvas';
import CustomButton from './SaveButton';
import VideoFeed from './VideoFeed';
import PaintCanvas from './PaintCanvas';

function Canvas() {
    const paintAreaRef = useRef(); // Reference to the paint area

    const handleSave = async () => {
        if (paintAreaRef.current) {
            // Capture the paint area including writings
            const canvas = await html2canvas(paintAreaRef.current, {
                useCORS: true, // Enable CORS for images
                backgroundColor: null // Ensures a transparent background if needed
            });
            const imageData = canvas.toDataURL("image/png"); // Convert to data URL
            const link = document.createElement('a'); // Create a link element
            link.href = imageData; // Set the link's href to the image data
            link.download = 'canvas-image.png'; // Specify the download filename
            document.body.appendChild(link); // Append link to the body
            link.click(); // Trigger the download
            document.body.removeChild(link); // Remove the link after download
        }
    };

    return (
        <div className='mainBody'>
            <div className='wrapper'>
                <div className="App contains">
                    <VideoFeed />
                </div>
                <div className='contains' ref={paintAreaRef}>
                    <PaintCanvas /> {/* Renders the image from the server */}
                    {/* Ensure your writings are rendered here */}
                </div>
            </div>
            <CustomButton onClick={handleSave} /> {/* Pass handleSave to CustomButton */}
        </div>
    );
}

export default Canvas;
