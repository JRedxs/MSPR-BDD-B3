import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfil = () => {
    const [users, setUsers] = useState([]);
  
    const requestAxios = () => {
      axios.get('http://127.0.0.1:8000/users')
        .then(response => {
          setUsers(response.data.Person)
          
        })
        .catch(error => {
          console.log(error);
        });
    };
  
    useEffect(() => {
      requestAxios();
      
    }, []);
  
    return (
        <>
        <h1>Utilisateurs : </h1>
        {users.length}
        
        <ul>
        {users.map(user => (
          <li key={user.id_person}>
            {user.name} {user.firstname}
          </li>
        ))}
      </ul>
      </>
    );
  };
  
  export default UserProfil;
  