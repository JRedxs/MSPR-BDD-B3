import React, { useState, useRef } from 'react';
import logo from '../assets/images/logo.png'



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
    console.log(image.src);
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
          <div className="d-flex justify-content-center margin-login-card" style={{margin:"5em"}}>
            <div className="card">
              <video ref={videoRef} autoPlay />
              <div className="card-body">
                <div className="d-flex justify-content-center align-items-center">
                  <b><p className="card-text">Vous pouvez enregistrer ici une nouvelle photo pour votre plante</p></b>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <button className='btn btn-success' style={{margin:"1em"}} onClick={handleTakePhoto}>Prendre une Photo</button>
                  <button className='btn btn-success' style={{margin:"1em"}} onClick={handleStopCamera}>Arreter la Camera</button>
                </div>
              </div>
            </div> 
          </div>
        )
      }
      {
        !isCameraActive && !imageSrc && (
          <div className="d-flex justify-content-center align-items-center" style={{margin:"5em"}}>
            <div className="card  d-flex justify-content-center align-items-center">
            <img src={logo} class="card-img-top" alt="logo"/>
              <div className="card-body ">
                <b><p className="card-text">Vous pouvez enregistrer ici une nouvelle photo pour votre plante</p></b>
              </div>
                <div className="d-flex justify-content-center">
                  <button className='btn btn-success' style={{margin:"2em"}} onClick={handleStartCamera}>Lancer la Camera</button>
                </div>
              </div>
            </div> 
        )
      }
      {
        imageSrc && (
          <div className="d-flex justify-content-center align-items-center"  >
            <div className="card" style={{margin:"5em"}}>
              <img src={imageSrc} alt="" />
              <div className="card-body">
                <div className="d-flex justify-content-center align-items-center"> 
                  <button className='btn btn-success' onClick={handleUploadPhoto}>Enregister la Photo</button>
                  <button className='btn btn-success' onClick={handleTakeNewPhoto}>Prendre une nouvelle Photo</button>
                </div>
              </div>
            </div> 
          </div>
        )
      }
    </div>
  );
};
export default RegisterPhoto;
