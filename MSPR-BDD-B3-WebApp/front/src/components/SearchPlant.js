import { useState, useEffect } from "react"
import { Box, Button, Flex, Heading, Image, Text, Input } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import backgroundImage from "../styles/image.png"
import axios from "axios"

function SearchPlant() {
  const [plants, setPlants] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()
  const url = process.env.REACT_APP_API_URL + "/plant/"

  const openPlante = (id_plante) => {
    navigate(`/Plante/${id_plante}`)
  }

  const openPlanteRegister = () => {
    navigate(`/RegisterPlante`)
  }

  useEffect(() => {
    window.sessionStorage.removeItem("plante")
    const accessToken = window.sessionStorage.getItem("access_token")
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setPlants(response.data.Plants)
      })
      .catch((error) => {
        console.log(error)
        navigate(`/`)
      })
  }, [])

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Box
      bgImage={`url(${backgroundImage})`}
      bgRepeat="no-repeat"
      bgSize="cover"
      minH="100vh"
      pt="100px"
      pb="40px"
      px="20px"
      overflowX="hidden"
    >
      <Box textAlign="center" mb={4}>
        <Input
          borderColor="green.900"
          bg="#F8F8F8"
          type="text"
          placeholder="Rechercher une plante"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          maxWidth="800px"
          mx="auto"
          mb={4}
        />
      </Box>
      <Flex justifyContent="center" my={5}>
        <Box
          bg="#F8F8F8"
          boxShadow="md"
          m={4}
          borderWidth="1px"
          borderRadius="md"
          p={4}
          textAlign="center"
          maxW="300px"
          width="100%"
        >
          <Text as="h4">Si vous souhaitez enregistrer une plante, c'est par ici !</Text>
          <Box mt={4}>
            <Button colorScheme="green" size="lg" onClick={openPlanteRegister}>
              Enregistrer une plante
            </Button>
          </Box>
        </Box>
      </Flex>

      <Flex flexWrap="wrap" alignItems="center" justifyContent="center">
        {filteredPlants.map((plant) => (
          <Box
            key={plant.id_plante}
            m={4}
            maxW="320px"
            borderWidth="1px"
            borderRadius="md"
            overflow="hidden"
            bg="rgba(255, 255, 255, 0.85)"
            boxShadow="2xl"
          >
            <Box boxShadow="lg">
              <Image src={plant.image_data} alt={plant.name} />
            </Box>
            <Box p={4} bg="rgba(149, 102, 87, 0.40)">
              <Heading as="h2" size="lg" textAlign="center" mb={2}>
                {plant.name}
              </Heading>
              <Flex justifyContent="center">
                <Button colorScheme="green" onClick={() => openPlante(plant.id_plante)}>
                  Sélectionner cette plante
                </Button>
              </Flex>
            </Box>
          </Box>
        ))}
      </Flex>
    </Box>
  )
}

export default SearchPlant
