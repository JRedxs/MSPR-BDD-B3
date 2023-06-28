import { useState, useRef } from 'react';
import Logo from '../assets/images/logo.png'
import axios from "axios";
import { useNavigate } from "react-router-dom";


const RegisterPhoto = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

  const baseUrl = process.env.REACT_APP_API_URL;
  const [idPlante, setIdPlante] = useState( Number(sessionStorage.getItem('plante') ) );

  const navigate = useNavigate();

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
    async function postPhoto(){
      const accessToken = window.sessionStorage.getItem("access_token");
      await axios.post(`${baseUrl}/image`, {id_plante: idPlante, data: imageSrc}, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
      })
      // need to become a real error managment
        .then(() => {
          setImageSrc(null);
          navigate(`/Plante/${idPlante}`)
        } )
        .catch(err => console.error(err));
    }
    postPhoto();;
  };


  const handleTakeNewPhoto = () => {
    setImageSrc(null);
    handleStartCamera();
  };

  return (
    <div className='body'>

    
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
            <img src={Logo} className="card-img-top" alt="logo"/>
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
                  <button className='btn btn-success' style={{margin:"1em"}} onClick={handleUploadPhoto}>Enregister la Photo</button>
                  <button className='btn btn-success' style={{margin:"1em"}} onClick={handleTakeNewPhoto}>Prendre une nouvelle Photo</button>
                </div>
              </div>
            </div> 
          </div>
        )
      }
    </div>
    </div>
  );
};
export default RegisterPhoto;
