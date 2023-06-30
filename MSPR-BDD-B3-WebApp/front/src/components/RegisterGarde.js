import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Box, Button, Center, FormControl, FormLabel, Input } from "@chakra-ui/react";
import axios from "axios";

const RegisterGarde = () => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const [garde, setGarde] = useState({
    id_plante: Number(window.sessionStorage.getItem("plante")),
    begining: "",
    finish: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setGarde((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleOnClick = (event) => {
    try {
      const gardeData = {
        id_plante: garde.id_plante,
        begining: garde.begining + ":00.000Z",
        finish: garde.finish + ":00.000Z"
      };
      event.preventDefault();
      const accessToken = window.sessionStorage.getItem("access_token");
      axios
        .post(`${baseUrl}/plants_garde`, gardeData, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        .then((res) => navigate(`/Plante/${garde.id_plante}`))
        .catch((err) => console.error(err));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Center>
      <Box mt={5} p={5} width="50%" borderWidth="1px" borderRadius="md">
        <Center>
          <h1>
              <p>Demande de garde de plante</p>
          </h1>
        </Center>
        <Center mt={-20}>
          <Box
            className=" card-register "
            width="80%"
            borderRadius="75px"
            border="1px solid black"
            p={10}
            
          >
            <form>
              <FormControl>
                <FormLabel htmlFor="begining">
                  <b>Début de la garde :</b>
                </FormLabel>
                <Input
                  type="datetime-local"
                  id="begining"
                  name="begining"
                  onChange={handleChange}
                  value={garde.begining}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel htmlFor="finish">
                  <b>Fin de la garde :</b>
                </FormLabel>
                <Input
                  type="datetime-local"
                  id="finish"
                  name="finish"
                  onChange={handleChange}
                  value={garde.finish}
                />
              </FormControl>
              <Center mt={6}>
                <Button as={Link} to="/" colorScheme="green" type="submit">
                  Retour
                </Button>

                <Button colorScheme="green" mr={2} onClick={handleOnClick}>
                  Valider
                </Button>
              </Center>
            </form>
          </Box>
        </Center>
      </Box>
    </Center>
  );
};

export default RegisterGarde;
