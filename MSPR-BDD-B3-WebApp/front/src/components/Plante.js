import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  Box,
  Center,
  Flex,
  Image,
  Text,
  useBreakpointValue,
  Button,
} from "@chakra-ui/react"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import axios from "axios"

import backgroundImage from "../styles/image.png"

function Plante(props) {
  const [plante, setPlante] = useState(null)
  let { id_plante } = useParams()

  const url = process.env.REACT_APP_API_URL + `/plantandgallery/${id_plante}`
  const navigate = useNavigate()
  const buttonSize = useBreakpointValue({ base: "sm", md: "md", lg: "lg" })

  const openAdvice = (id_photo) => {
    window.sessionStorage.setItem("photo", JSON.stringify(Number(id_photo)))
    navigate(`/AddAdvice`)
  }

  const openPhoto = () => {
    navigate(`/Photo`)
  }

  const openGarde = () => {
    navigate(`/RegisterGarde`)
  }

  const openAddAdvice = (id_plante) => {
    navigate(`/AddAdvice/`)
  }

  useEffect(() => {
    const accessToken = window.sessionStorage.getItem("access_token")
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => response.data)
      .then((data) => {
        setPlante(data[0].Plante)
        window.sessionStorage.setItem(
          "plante",
          JSON.stringify(Number(id_plante))
        )
        window.sessionStorage.removeItem("photo")
        console.log(plante)
      })
      .catch((error) => console.log(error))
  }, [])

  const renderCarouselItems = () => {
    const filteredPhotos = plante.filter((photo, index) => {
      if (index === 0 || !photo.image_data) {
        return false
      }
      return true
    })

    return filteredPhotos.map((photo) => (
      <Box key={photo.id_photo}>
        <Image
          src={photo.image_data}
          onClick={() => openAdvice(photo.id_photo)}
        />
        {photo.advice_title && (
          <>
            <Text as="h2">{photo.advice_title}</Text>
            <Text>{photo.advice}</Text>
          </>
        )}
      </Box>
    ))
  }

  if (!plante) {
    return (
      <Center>
        <Box
          borderColor="red.500"
          borderWidth={1}
          p={3}
          borderRadius="md"
          bg="red.100"
        >
          <Text as="h1">Aucune donnée...</Text>
        </Box>
      </Center>
    )
  }

  return (
    <Box
      bgImage={`url(${backgroundImage})`}
      bgRepeat="no-repeat"
      bgSize="cover"
      minH="100vh"
      pt={20}
      pb={10}
      px={5}
      overflowX="hidden"
    >
      <Center mb={5}>
        <Box
          bg="#F8F8F8"
          boxShadow="md"
          borderWidth="1px"
          borderRadius="md"
          p={4}
          textAlign="center"
          maxW="90%"
          width={{ base: "90%", md: "auto" }}
        >
          <Text as="h4">Que souhaitez-vous faire ?</Text>
        </Box>
      </Center>
      <Box
        bg="rgba(255, 255, 255, 0.85)"
        boxShadow="lg"
        borderRadius="xl"
        border="2px"
        borderColor="black"
        width={{ base: "100%", md: "30%" }}
        mx="auto"
        my={5}
        p={4}
        textAlign="center"
      >
        {plante && (
          <>
            <Carousel showArrows={true} showThumbs={false}>
              {renderCarouselItems()}
            </Carousel>

            {plante[id_plante] && (
              <>
                <Text fontWeight="bold" fontSize="lg" mt={4}>
                  Titre du conseil: {plante[id_plante].advice_title}
                </Text>
                <Text fontSize="lg" mt={4}>
                  Conseil d'entretien: {plante[id_plante].advice}
                </Text>
              </>
            )}
          </>
        )}
        <Flex justifyContent="center" mt={4} flexWrap="wrap" >
          <Box textAlign="center" maxWidth="80%" m={2} flexBasis={{ base: "100%", md: "33%" }}>
            <Button
              colorScheme="green"
              onClick={openPhoto}
              size={buttonSize}
              mb={2}
            >
              Enregistrer une photo
            </Button>
          </Box>
          <Box textAlign="center" maxWidth="80%" m={2} flexBasis={{ base: "100%", md: "33%" }}>
            <Button
              colorScheme="green"
              onClick={openGarde}
              size={buttonSize}
              mb={2}
            >
              Enregistrer une demande de garde
            </Button>
          </Box>
          <Box textAlign="center" maxWidth="80%" m={2} flexBasis={{ base: "100%", md: "33%" }}>
            <Button
              colorScheme="green"
              onClick={() => openAddAdvice(id_plante)}
              size={buttonSize}
              mb={2}
            >
              Ajouter un conseil
            </Button>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}

export default Plante
