import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
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
    const [currentUser, setCurrentUser] = useState({name:"",firstname:"",email:"",phone:""});
    const baseUrl                       = process.env.REACT_APP_API_URL;
    const navigate                      = useNavigate();

    useEffect(() => {
      const fetchCurrentUser = async () => {
        try {
          const accessToken = window.sessionStorage.getItem("access_token");
          const response    = await axios.get(`${baseUrl}/user/me`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .catch(error => {   
              console.log(error);
              navigate(`/`);
          });
          setCurrentUser(response.data.user);  //a vérifier asynchrone lors de la récupération des infos
                                               // console.log(response.data.user)
        } catch (error) {
          console.error(error);
        }
      };
      fetchCurrentUser();
    }, []);
  
  
    return (
        <>
      <section      style     = {{ backgroundColor: '#eee' }}>
      <MDBContainer className = "py-5">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className = "bg-light rounded-3 p-3 mb-4">
              <MDBBreadcrumbItem>
                <a href = '/'>Home</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol      lg        = "4">
          <MDBCard     className = "mb-4">
          <MDBCardBody className = "text-center">
                <MDBCardImage
                  src       = "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt       = "avatar"
                  className = "rounded-circle"
                  style     = {{ width: '150px' }}
                  fluid />
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol  lg        = "8">
          <MDBCard className = "mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm = "3">
                    <MDBCardText>Nom: {currentUser.name}</MDBCardText>
                  </MDBCol>
                  <MDBCol sm = "9">
                    
                    <MDBCardText className = "text-muted">
      </MDBCardText>
                  </MDBCol>
                </MDBRow>

                <hr />
                <MDBRow>
                  <MDBCol sm = "3">
                    <MDBCardText>Prénom: {currentUser.firstname} </MDBCardText>
                  </MDBCol>
                  <MDBCol      sm        = "9">
                  <MDBCardText className = "text-muted"></MDBCardText>
                  </MDBCol>
                </MDBRow>

                <hr />
                <MDBRow>
                  <MDBCol sm = "3">
                    <MDBCardText>Email: {currentUser.email} </MDBCardText>
                  </MDBCol>
                  <MDBCol      sm        = "9">
                  <MDBCardText className = "text-muted"></MDBCardText>
                  </MDBCol>
                </MDBRow>

                <hr />
                <MDBRow>
                  <MDBCol sm = "3">
                    <MDBCardText>Téléphone: {currentUser.phone} </MDBCardText>
                  </MDBCol>
                  <MDBCol      sm        = "9">
                  <MDBCardText className = "text-muted"></MDBCardText>
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
  