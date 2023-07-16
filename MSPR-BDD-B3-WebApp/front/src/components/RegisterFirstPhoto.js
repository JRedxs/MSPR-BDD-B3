import { useState, useRef } from 'react'
import { Box, Button, Center, HStack, Text, VStack, Image, Input } from '@chakra-ui/react'
import { Carousel } from 'react-responsive-carousel'
import { useNavigate } from 'react-router-dom'
import Logo from '../assets/images/logo.png'
import { useCustomToast } from '../libs/Alert'
import backgroundImage from '../styles/image.png'

const RegisterFirstPhoto = () => {
  const [isCameraActive, setIsCameraActive] = useState(false)
  const videoRef = useRef(null)
  const [imageSrcs, setImageSrcs] = useState([])
  const baseUrl = process.env.REACT_APP_API_URL
  const [idPlante, setIdPlante] = useState(1)

  const navigate = useNavigate()
  const showToast = useCustomToast()

  const handleStartCamera = () => {
    setIsCameraActive(true);
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) =>{
        showToast({
          title: 'Erreur de caméra',
          description: "Votre appareil n'a pas de caméra ou elle n'est pas accessible.",
          status: 'error',
        })
      });
  };

  const handleStopCamera = () => {
    setIsCameraActive(false)
    const stream = videoRef.current.srcObject
    stream.getTracks().forEach((track) => track.stop())
  }

  const handleTakePhoto = () => {
    const canvas = document.createElement('canvas')
    canvas.width = videoRef.current.videoWidth
    canvas.height = videoRef.current.videoHeight
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0)

    const image = new window.Image()
    image.src = canvas.toDataURL()
    handleStopCamera()
    setImageSrcs((oldSrcs) => [...oldSrcs, image.src])
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      setImageSrcs((oldSrcs) => [...oldSrcs, reader.result])
    }
    reader.readAsDataURL(file)
  }

  const handleUploadPhoto = () => {
    window.sessionStorage.setItem('photo', JSON.stringify(imageSrcs))
    setImageSrcs([])
    navigate('/RegisterPlante')
  }

  const handleTakeNewPhoto = () => {
    setImageSrcs([])
    handleStartCamera()
  }

  return (
    <Box bgImage  = {`url(${backgroundImage})`} bgRepeat = "no-repeat" bgSize   = "cover" minH= "120vh" pt= "100px" w= "100%">
      <Center minHeight="100vh" flexDirection="column">
        <Box boxShadow="xl" p="6" rounded="md" bg="white">
          {isCameraActive ? (
            <VStack spacing={5}>
              <video ref={videoRef} autoPlay />
              <Text fontWeight="bold">Vous pouvez enregistrer ici une nouvelle photo pour votre plante</Text>
              <HStack spacing={3}>
                <Button colorScheme="green" onClick={handleTakePhoto}>
                  Prendre une Photo
                </Button>
                <Button colorScheme="green" onClick={handleStopCamera}>
                  Arrêter la Caméra
                </Button>
              </HStack>          
            </VStack>
          ) : (
            <VStack spacing={5}>
              {imageSrcs.length ? (
                <Carousel dynamicHeight={false} showThumbs={false}>
                  {imageSrcs.map((src, index) => (
                    <div key={index}>
                      <Image src={src} alt={`photo ${index}`} boxSize="100%" objectFit="cover" />
                    </div>
                  ))}
                </Carousel>
              ) : (
                <Image src={Logo} boxSize="300px" objectFit="contain" />
              )}
              <Text fontWeight="bold">Vous pouvez enregistrer ici une nouvelle photo pour votre plante</Text>
              <HStack spacing={3}>
                <Button colorScheme="green" onClick={handleStartCamera}>
                  Lancer la Caméra
                </Button>
                <Input type="file" accept="image/*" multiple onChange={handleFileUpload} />
                {imageSrcs.length ? (
                  <Button colorScheme="green" onClick={handleUploadPhoto}>
                    Enregistrer les Photos
                  </Button>
                ) : null}
              </HStack>
            </VStack>
          )}
        </Box>
      </Center>
    </Box>
  )
}

export default RegisterFirstPhoto





