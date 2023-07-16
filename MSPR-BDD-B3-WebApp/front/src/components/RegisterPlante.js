import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Box, Heading, FormLabel, Input, Button, VStack, HStack, FormControl,  Flex } from "@chakra-ui/react"
import backgroundImage from '../styles/image.png'

function RegisterPlante(){

    const  [person,setPerson]           = useState( JSON.parse(window.sessionStorage.getItem('person')) || 1)
    const  [name,setName]               = useState( JSON.parse(window.sessionStorage.getItem('name')) || '')
    const  [number, setNumber]          = useState( JSON.parse(window.sessionStorage.getItem('number')) || '')
    const  [road, setRoad]              = useState( JSON.parse(window.sessionStorage.getItem('road')) || '')
    const  [complement, setComplement]  = useState( JSON.parse(window.sessionStorage.getItem('complement')) || '')
    const  [town, setTown]              = useState( JSON.parse(window.sessionStorage.getItem('town')) || '')
    const  [code, setCode]              = useState( JSON.parse(window.sessionStorage.getItem('code')) || '')
    const  [photo, setPhoto]            = useState( JSON.parse(window.sessionStorage.getItem('photo')) || null)
    
    const baseUrl = process.env.REACT_APP_API_URL
    const navigate = useNavigate()

    const changeName = (event) => {
        window.sessionStorage.setItem('name', JSON.stringify(event.target.value))
        setName(event.target.value)
    }

    const changeNumber = (event) => {
        window.sessionStorage.setItem('number', JSON.stringify(event.target.value))
        setNumber(event.target.value)
    }

    const changeRoad = (event) => {
        window.sessionStorage.setItem('road', JSON.stringify(event.target.value))
        setRoad(event.target.value)
    }

    const changeComplement = (event) => {
        window.sessionStorage.setItem('complement', JSON.stringify(event.target.value))
        setComplement(event.target.value)
    }

    const changeTown = (event) => {
        window.sessionStorage.setItem('town', JSON.stringify(event.target.value))
        setTown(event.target.value)
    }

    const changeCode = (event) => {
        window.sessionStorage.setItem('code', JSON.stringify(event.target.value))
        setCode(event.target.value)
    }

    const openPhoto = () => {
        navigate("/FirstPhoto")
    }

    const uploadPlante = async () => {
        // This function will be ugly and will work
    
        let querry = "https://api-adresse.data.gouv.fr/search/?q="
        querry += number.toString() + "+"
        querry += road.trim().replace(' ','+') + '+'
        querry += town.trim().replace(' ','+') + '+'
        querry += code.toString()
        const accessToken = window.sessionStorage.getItem("access_token")
        await axios.get(querry)
            .then( async (apiAdresseResponse) => {
                const coordinates = apiAdresseResponse.data.features[0].geometry.coordinates
                await axios.post(`${baseUrl}/plante`, {id_person: person, name: name, number: number, road_first: road, road_second: complement, town: town, postal_code: code, latitude: coordinates[1], longitude: coordinates[0]}, {
                    headers: {
                        //'Access-Control-Allow-Origin': '*',
                        Authorization: `Bearer ${accessToken}`,
                    }
                })
                    .then( async (planteResponse) => {
                        await axios.post(`${baseUrl}/image`, {id_plante: planteResponse.data.id_plante, data: photo}, {
                            headers: {
                                //'Access-Control-Allow-Origin': '*',
                                Authorization: `Bearer ${accessToken}`,
                            }
                        })
                        .then( () => {
                            navigate(`/SearchPlant`)
                        })
                    })
            })
    
    }

    return (
        <Flex
        bgImage  = {`url(${backgroundImage})`}
        bgRepeat = "no-repeat"
        bgSize   = "cover"
        minH     = "100vh"
        w        = "100%"
        align    = "center"
        justify  = "center"
        >
            <Box bg="white" borderRadius='lg' borderWidth='1px' shadow='lg' p={8} w={['90%', '80%', '50%']}>
                <VStack alignItems='center'>
                    <Heading as='h1' size='lg'><u>Enregistrer une Plante</u></Heading>
                    <VStack as='form' spacing={4} w='100%'>
                        <FormControl id="inputname">
                            <FormLabel><b>Nom de la plante :</b></FormLabel>
                            <Input placeholder='Nom de votre plante' value={name} onChange={changeName} />
                        </FormControl>
                        <FormControl id="number">
                            <FormLabel><b>Numero :</b></FormLabel>
                            <Input placeholder='Numero' value={number} onChange={changeNumber} />
                        </FormControl>
                        <FormControl id="road">
                            <FormLabel><b>Rue :</b></FormLabel>
                            <Input placeholder='Rue' value={road} onChange={changeRoad} />
                        </FormControl>
                        <FormControl>
                            <FormLabel><b>Complément d'Adresse :</b></FormLabel>
                            <Input placeholder='Complement' value={complement} onChange={changeComplement} />
                        </FormControl>
                        <FormControl id="town">
                            <FormLabel><b>Ville :</b></FormLabel>
                            <Input placeholder='Ville' value={town} onChange={changeTown} />
                        </FormControl>
                        <FormControl id="code">
                            <FormLabel><b>Code Postal :</b></FormLabel>
                            <Input placeholder='Code Postal' value={code} onChange={changeCode} />
                        </FormControl>
                        <HStack spacing={4} justifyContent='center'>
                            <Button colorScheme='green' onClick={openPhoto}>Prendre une Photo</Button>
                            {photo && (<Button colorScheme='green' onClick={uploadPlante}>Enregistrer votre plante</Button>)}
                        </HStack>
                    </VStack>
                </VStack>
            </Box>
        </Flex>
    )
}

export default RegisterPlante
