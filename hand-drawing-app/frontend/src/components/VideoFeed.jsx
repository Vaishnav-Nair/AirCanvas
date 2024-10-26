import React, { useState, useRef } from 'react';

function VideoFeed() {
  const videoRef = useRef(null); 
  const mediaRecorderRef = useRef(null); 
  const [recording, setRecording] = useState(false); 
  const [videoBlob, setVideoBlob] = useState(null); 

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { 
          mediaSource: "screen" 
        }
      });
      
      // Initialize MediaRecorder
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      let chunks = [];

      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/mp4' });
        setVideoBlob(URL.createObjectURL(blob));
      };

      // Start recording the stream
      mediaRecorder.start();
      setRecording(true);
    } catch (err) {
      console.error("Error starting recording:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const downloadVideo = () => {
    const a = document.createElement('a');
    a.href = videoBlob;
    a.download = 'recorded-canvas.mp4';
    a.click();
  };

  return (
    <div>
      <img
        ref={videoRef}
        src="http://127.0.0.1:5000/video_feed"
        alt="Video Feed"
        style={{ width: '640px', height: '480px' }}
      />
      {/*
      <div>
        {!recording ? (
          <button onClick={startRecording}>Start Recording Canvas</button>
        ) : (
          <button onClick={stopRecording}>Stop Recording</button>
        )}
      </div>

       Display and download the recorded video 
      {videoBlob && (
        <div>
          <h3>Recorded Canvas:</h3>
          <video src={videoBlob} controls style={{ width: '320px', height: '240px' }}></video>
          <button onClick={downloadVideo}>Download Video</button>
        </div>
      )}
      */}
    </div>
  );
}

export default VideoFeed;
