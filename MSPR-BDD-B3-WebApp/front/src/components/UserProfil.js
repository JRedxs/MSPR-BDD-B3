import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBreadcrumb,
  MDBBreadcrumbItem
} from 'mdb-react-ui-kit';

const UserProfil = () => {
    const [users, setUsers] = useState([{firstname:"",email:"",phone:""}]);
    const [person] = useState(Number(sessionStorage.getItem('person')));
  
    const requestAxios = () => {
      console.log("request axios")
      axios.get(process.env.REACT_APP_API_URL + `/users/${person}`)
        .then(response => {
          setUsers(response.data.Person)
          console.log(response.data.Person)
          
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
        <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
              <MDBBreadcrumbItem>
                <a href='#'>Home</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                <a href="#">User</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Nom</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    
                    <MDBCardText className="text-muted">
        {
        users.map(user => (
          <p key={user.id_person}> {user.name}</p>     
        ))}
      </MDBCardText>
                  </MDBCol>
                </MDBRow>

                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Prénom</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{users[0].firstname}</MDBCardText>
                  </MDBCol>
                </MDBRow>

                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{users[0].email}</MDBCardText>
                  </MDBCol>
                </MDBRow>

                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Téléphone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{users[0].phone}</MDBCardText>
                  </MDBCol>
                </MDBRow>


              </MDBCardBody>
            </MDBCard>

            
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>

        </>
    );
  };
  
  export default UserProfil;
  