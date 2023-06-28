import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function useCurrentUser() {
    const [currentUser, setCurrentUser] = useState({name:"",firstname:"",email:"",phone:""})
    const baseUrl                       = process.env.REACT_APP_API_URL
    const navigate                      = useNavigate()

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const accessToken = window.sessionStorage.getItem("access_token")
                const response    = await axios.get(`${baseUrl}/user/me`, {
                    headers: {
                    Authorization: `Bearer ${accessToken}`,
                    },
                })
                .catch(error => {   
                    console.log(error)
                    navigate(`/`)
                })
                setCurrentUser(response.data.user)
            } catch (error) {
                console.error(error)
            }
        }
        fetchCurrentUser()
    })

    return currentUser;
}
