import React, { useState, useRef } from 'react';

const RegisterPhoto = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

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
    
    const image = new Image();
    image.src = canvas.toDataURL();
    handleStopCamera();
    setImageSrc(image.src);
  };

  const handleUploadPhoto = () => {
    console.log("Uploading");
  };

  const handleTakeNewPhoto = () => {
    setImageSrc(null);
    handleStartCamera();
  };

  return (
    <div>
      {
        isCameraActive && (
          <>
            <video ref={videoRef} autoPlay />
            <button onClick={handleTakePhoto}>Prendre une Photo</button>
            <button onClick={handleStopCamera}>Arreter la Camera</button>
          </>
        )
      }
      {
        !isCameraActive && !imageSrc && (
          <button onClick={handleStartCamera}>Lancer la Camera</button>
        )
      }
      {
        imageSrc && (
          <>
            <img src={imageSrc} />
            <button onClick={handleUploadPhoto}>Enregister la Photo</button>
            <button onClick={handleTakeNewPhoto}>Prendre une nouvelle Photo</button>
          </>
        )
      }
    </div>
  );
};

export default RegisterPhoto;
