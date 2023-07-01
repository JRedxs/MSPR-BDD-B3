import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  useToast,
  Image
} from '@chakra-ui/react';

const AdvicePlant = () => {
  const id_plante = Number(sessionStorage.getItem('plante'));
  const id_photo = Number(sessionStorage.getItem('photo'));
  const baseUrl = process.env.REACT_APP_API_URL;

  const [advice, setAdvice] = useState({ advice_title: '', advice: '', id_photo: id_photo });
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const toast = useToast();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAdvice({ ...advice, [name]: value, id_photo: id_photo });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = window.sessionStorage.getItem('access_token');
        const response_user = await axios.get(`${baseUrl}/plantandgallery/${id_plante}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const userData = response_user.data[0].Plante;
        setUser(userData);
        console.log(userData);
        sessionStorage.setItem('user_plante', JSON.stringify(userData));

        // Mettre à jour les conseils dans l'état advice
        if (userData && userData[id_photo]) {
          setAdvice({
            ...advice,
            advice_title: userData[id_photo].advice_title || '',
            advice: userData[id_photo].advice || '',
          });
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const accessToken = window.sessionStorage.getItem('access_token');
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/advices`, advice, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data);
      navigate(`/Plante/${id_plante}`);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Erreur',
        description: "Une erreur s'est produite lors de l'ajout du conseil.",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Center py="5">
      <Box
        w="20%"
        p="6"
        bg="white"
        rounded="lg"
        boxShadow="lg"
        border="1px solid black"
      >
        <Text textAlign="center" fontSize="2xl" fontWeight="bold" mb="8">
          Proposer un conseil
        </Text>
        <Box mx="auto" maxW="500px">
          {user && (
            <Center mb="6">
              <Image src={user[1].image_data} alt="" w="55%" rounded="md" />
            </Center>
          )}
          <form>
            <FormControl mb="4">
              <FormLabel htmlFor="advice_title">Titre du conseil :</FormLabel>
              <Input
                id="advice_title"
                name="advice_title"
                type="text"
                placeholder="Titre"
                value={advice.advice_title}
                onChange={handleInputChange}
                size="sm"
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel htmlFor="advice">Conseil :</FormLabel>
              <Input
                id="advice"
                name="advice"
                type="text"
                placeholder="Conseil"
                value={advice.advice}
                onChange={handleInputChange}
                size="sm"
              />
            </FormControl>
            <Center mt="8">
              <Button colorScheme="green" onClick={handleSubmit} size="sm">
                Ajouter votre conseil
              </Button>
            </Center>
          </form>
        </Box>

      </Box>
    </Center>
  );
};

export default AdvicePlant;
