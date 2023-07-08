import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { Box, Button, Center, FormControl, FormLabel, Input, Text, VStack, useBreakpointValue, Card } from "@chakra-ui/react"
import axios from "axios"
import backgroundImage from "../styles/image.png"

const RegisterGarde = () => {
  const baseUrl = process.env.REACT_APP_API_URL
  const navigate = useNavigate()

  const [garde, setGarde] = useState({
    id_plante: Number(window.sessionStorage.getItem("plante")),
    begining: "",
    finish: ""
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setGarde((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleOnClick = (event) => {
    try {
      const gardeData = {
        id_plante: garde.id_plante,
        begining: garde.begining + ":00.000Z",
        finish: garde.finish + ":00.000Z"
      }
      event.preventDefault()
      const accessToken = window.sessionStorage.getItem("access_token")
      axios
        .post(`${baseUrl}/plants_garde`, gardeData, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        .then((res) => navigate(`/Plante/${garde.id_plante}`))
        .catch((err) => console.error(err))
    } catch (error) {
      console.error(error)
    }
  }

  const boxWidth = useBreakpointValue({ base: "100%", md: "50%" })
  const boxPadding = useBreakpointValue({ base: "1", md: "5" })
  const centerMarginTop = useBreakpointValue({ base: "0", md: "-20" })

  return (
    <Box
      bgImage={`url(${backgroundImage})`}
      bgRepeat="no-repeat"
      bgSize="cover"
      minH="100vh"
      pt={["20px", "100px"]}
      pb="40px"
      px="20px"
      overflowX="hidden"
    >
      <Center>
        <Card mt={5} p={boxPadding} w={boxWidth} borderWidth={1} borderRadius="md">
          <VStack spacing={6}>
            <Text as="h1">Demande de garde de plante</Text>
            <FormControl>
              <FormLabel htmlFor="begining">
                <Text fontWeight="bold">Début de la garde :</Text>
              </FormLabel>
              <Input
                type="datetime-local"
                id="begining"
                name="begining"
                onChange={handleChange}
                value={garde.begining}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="finish">
                <Text fontWeight="bold">Fin de la garde :</Text>
              </FormLabel>
              <Input
                type="datetime-local"
                id="finish"
                name="finish"
                onChange={handleChange}
                value={garde.finish}
              />
            </FormControl>
            <Center>
              <Button as={Link} to="/" colorScheme="green" type="submit">
                Retour
              </Button>
              <Button colorScheme="green" ml={2} onClick={handleOnClick}>
                Valider
              </Button>
            </Center>
          </VStack>
        </Card>
      </Center>
    </Box>
  )
}

export default RegisterGarde
