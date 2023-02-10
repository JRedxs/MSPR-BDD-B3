import React, { useState, useRef } from 'react';

const RegisterPlante = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef(null);

  const handleStartCamera = () => {
    setIsCameraActive(true);
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
      });
  };

  const handleStopCamera = () => {
    setIsCameraActive(false);
    const stream = videoRef.current.srcObject;
    stream.getTracks().forEach(track => track.stop());
  };

  const handleTakePhoto = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);

    const dataUrl = canvas.toDataURL('image/jpeg');
    // do something with the dataUrl, for example, send it to the server
  };

  return (
    <div>
      {
        isCameraActive && (
          <>
            <video ref={videoRef} autoPlay />
            <button onClick={handleTakePhoto}>Take photo</button>
            <button onClick={handleStopCamera}>Stop camera</button>
          </>
        )
      }
      {
        !isCameraActive && (
          <button onClick={handleStartCamera}>Start camera</button>
        )
      }
    </div>
  );
};

export default RegisterPlante;
