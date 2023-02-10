import React, { useState, useEffect } from "react";

function RegisterPlante (){
    const [stream, setStream] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);
    const videoRef = React.createRef();
    const [cameraOpen, setCameraOpen] = useState(false);
    const [cameraShouldOpen, setCameraShouldOpen] = useState(true);
    const [firstRender, setFirstRender] = useState(true);

    const clickPhoto = () => {
        if ( cameraOpen )
        {
            handleTakePhoto();
        } else {
            setCameraShouldOpen(!cameraShouldOpen);
        }
        
    };
    useEffect(() => {
        if(firstRender){
            setFirstRender(false);
            return
        }
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
          .then((stream, videoRef) => {
            setStream(stream);
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
            }
          })
          .catch(err => {
            console.error(err);
          });
        setCameraOpen(true);
      }, [cameraShouldOpen]);

    const handleTakePhoto = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const video = videoRef.current;
    
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
        const image = new Image();
        image.src = canvas.toDataURL();
        setImageSrc(image.src);
      };

    const UploadPhoto = () => {
        if (stream) {
            stream.getTracks().forEach(track => {
              track.stop();
            });
            setStream(null);
          }
        
        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
        setCameraOpen(false);
    };

    return (
        <>
            <div>
                <video ref={videoRef} autoPlay={true}/>
                <button onClick={clickPhoto}>Photo</button>
                <button onClick={UploadPhoto}>Upload</button>
                {imageSrc && <img src={imageSrc} />}
            </div>
        </>
    )
}
//export default RegisterPlante;