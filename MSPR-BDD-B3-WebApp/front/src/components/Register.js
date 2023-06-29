import { useNavigate } from "react-router-dom"
import React, { useState } from "react"
import { useCustomToast } from "../libs/Alert"
import { GenericButton } from "../libs/Button"
import axios from 'axios'
import { Box, VStack,Flex, Heading, HStack, Input, FormControl } from "@chakra-ui/react"
import backgroundImage from '../styles/image.png';


const Register = () => {
	const showToast = useCustomToast()
	const baseUrl   = process.env.REACT_APP_API_URL
    const NAVIGATE = useNavigate()
    const [formData, setFormData] = useState({
        name     : "",
        firstname: "",
        password : "",
        email    : "",
        phone    : "",
    })
    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        })
    }

  const handleSubmit = (event) => {
    if (event) {
        event.preventDefault()
    }

    for (let [key, value] of Object.entries(formData)) {
      if (!value) {
        showToast({
          title      : "Erreur",
          description: `Le champ ${key} est obligatoire.`,
          status     : "error",
        })
        return
      }
    }

    if (!formData.email) {
      showToast({
        title      : "Erreur",
        description: "Le champ email est obligatoire.",
        status     : "error",
      })
      return
    }

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
    if (!emailRegex.test(formData.email)) {
      showToast({
        title      : "Erreur",
        description: "L'adresse email n'est pas valide.",
        status     : "error",
      })
      return
    }

    const phoneRegex = /^\d{10}$/
    if (!phoneRegex.test(formData.phone)) {
      showToast({
        title      : "Erreur",
        description: "Le champ Téléphone doit contenir exactement 10 chiffres.",
        status     : "error",
      })
      return
    }

    if (formData.password !== formData.confirmPassword) {
      showToast({
        title      : "Erreur",
        description: "Les mots de passe ne correspondent pas.",
        status     : "error",
      })
      return
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    if (!passwordRegex.test(formData.password)) {
      showToast({
        title      : "Erreur",
        description: 
          "Le mot de passe ne respecte pas les critères requis, il doit être composé au minimum de 8 caractères dont 1 Majuscule, 1 Chiffre et 1 caractère spécial",
        status: "error",
      })
      return
      
    }

    showToast({
      title      : "Succès",
      description: "Tous les champs sont correctement remplis.",
      status     : "success",
    })
    
    axios
      .post(`${baseUrl}/register`, formData)
      .then((res) => {
        console.log(res)
        NAVIGATE('/login')
      })
      .catch((err) => {
        console.error(err)
        showToast({
          title      : "Erreur",
          description: "Une erreur s'est produite lors de l'envoi des données.",
          status     : "error",
        })
      })
      
  }

  return (
    <Box
      bgImage={`url(${backgroundImage})`}
      bgRepeat="no-repeat"
      bgSize="cover"
      minH="120vh"
      pt="100px"
      w="100%"    
    >
    <Flex    w = "100%"  h= "100%" p = {5} alignItems = "center" justifyContent = "center">
    <Box     w= "100%" p = {5} shadow="2xl" borderWidth= "2px" borderRadius = "md" maxW = "1000px" bg="rgba(255, 255, 255, 0.85)">
    <VStack  spacing   = {4} align   = "stretch">
    <Heading textAlign = "center" mb = {5}>Inscription</Heading>
    <HStack  spacing   = {4} >
            <FormControl>
              <Input
                borderColor="green.900"
                focusBorderColor =" green"
                placeholder = "Prénom"
                id          = "name"
                name        = "name"
                onChange    = {handleChange}
                value       = {formData.name}
              />
            </FormControl>
            <FormControl>
              <Input
              borderColor="green.900"
              focusBorderColor =" green"
                placeholder = "Nom"
                id          = "firstname"
                name        = "firstname"
                onChange    = {handleChange}
                value       = {formData.firstname}
              />
            </FormControl>
          </HStack>
          <FormControl>
            <Input
            borderColor="green.900"
            focusBorderColor =" green"
              placeholder = "Numéro de téléphone"
              id          = "phone"
              name        = "phone"
              onChange    = {handleChange}
              value       = {formData.phone}
            />
          </FormControl>
          <FormControl>
            <Input
            borderColor="green.900"
            focusBorderColor =" green"
              placeholder = "Adresse Email"
              id          = "email"
              name        = "email"
              onChange    = {handleChange}
              value       = {formData.email}
            />
          </FormControl>
          <FormControl>
            <Input
            borderColor="green.900"
            focusBorderColor =" green"
              placeholder = "Password"
              type        = "password"
              id          = "password"
              name        = "password"
              onChange    = {handleChange}
              value       = {formData.password}
            />
          </FormControl>
          <FormControl>
            <Input
            borderColor="green.900"
            focusBorderColor =" green"
              placeholder = "Confirmer votre password"
              type        = "password"
              id          = "confirmPassword"
              name        = "confirmPassword"
              onChange    = {handleChange}
              value       = {formData.confirmPassword}
            />
          </FormControl>
          <HStack justify = "center">
          <GenericButton
            loadingText = "Envoie en cours"
            label       = "Retour"
            to          = "/Login"
            colorScheme = "green"
            />
            <GenericButton
            loadingText = "Envoie en cours"
            label       = "Valider"
            colorScheme = "green"
            onClick     = {handleSubmit}
          />
          </HStack>
        </VStack>
      </Box>
    </Flex>
  </Box>
  )
  }
export default Register





