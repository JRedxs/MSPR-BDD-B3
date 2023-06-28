import { Link, useNavigate } from "react-router-dom"
import React, { useState } from "react"
import { useCustomToast } from "../libs/Alert"
import { GenericButton } from "../libs/Button"
import axios from 'axios'
import '../styles/Register.css'

const Register = () => {
  const showToast = useCustomToast()
  const baseUrl = process.env.REACT_APP_API_URL
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    firstname: "",
    password: "",
    email: "",
    phone: "",
  })

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = (event) => {
    if (event) {
        event.preventDefault();
    }

    for (let [key, value] of Object.entries(formData)) {
      if (!value) {
        showToast({
          title: "Erreur",
          description: `Le champ ${key} est obligatoire.`,
          status: "error",
        })
        return
      }
    }

    if (!formData.email) {
      showToast({
        title: "Erreur",
        description: "Le champ email est obligatoire.",
        status: "error",
      })
      return
    }

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
    if (!emailRegex.test(formData.email)) {
      showToast({
        title: "Erreur",
        description: "L'adresse email n'est pas valide.",
        status: "error",
      })
      return
    }

    const phoneRegex = /^\d{10}$/
    if (!phoneRegex.test(formData.phone)) {
      showToast({
        title: "Erreur",
        description: "Le champ Téléphone doit contenir exactement 10 chiffres.",
        status: "error",
      })
      return
    }

    if (formData.password !== formData.confirmPassword) {
      showToast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
        status: "error",
      })
      return
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    if (!passwordRegex.test(formData.password)) {
      showToast({
        title: "Erreur",
        description:
          "Le mot de passe ne respecte pas les critères requis, il doit être composé au minimum de 8 caractères dont 1 Majuscule, 1 Chiffre et 1 caractère spécial",
        status: "error",
      })
      return
      
    }

    showToast({
      title: "Succès",
      description: "Tous les champs sont correctement remplis.",
      status: "success",
    })
    
    axios
      .post(`${baseUrl}/token`, formData)
      .then((res) => {
        console.log(res)
        navigate('/login')
      })
      .catch((err) => {
        console.error(err)
        showToast({
          title: "Erreur",
          description: "Une erreur s'est produite lors de l'envoi des données.",
          status: "error",
        })
      })
      navigate("/Login")
  }

  return (
    <div className="body">
      <section className="h-100 form-register">
        <div className="card card-register card-registration d-flex justify-content-center my-4">
          <div className="card-body text-black">
            <form onSubmit={handleSubmit}>
              <h3 className="mb-5 text-uppercase" style={{ display: 'flex', justifyContent: 'center' }}>
                Inscription
              </h3>
              <div className="row">
                <div className="col-md-6 mb-4">
                  <div className="form-outline">
                    <input
                      placeholder="Prénom"
                      className="form-control form-control-lg shadow"
                      htmlFor="name"
                      type="text"
                      id="name"
                      name="name"
                      onChange={handleChange}
                      value={formData.name}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="form-outline">
                    <input
                      placeholder="Nom"
                      className="form-control form-control-lg shadow"
                      type="text"
                      id="firstname"
                      name="firstname"
                      onChange={handleChange}
                      value={formData.firstname}
                    />
                  </div>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="form-outline mb-4">
                  <input
                    placeholder="Numéro de téléphone"
                    className="form-control form-control-lg shadow"
                    id="phone"
                    name="phone"
                    onChange={handleChange}
                    value={formData.phone}
                  />
                </div>
              </div>
              <br />
              <div className="row">
                <div className="form-outline mb-4">
                  <input
                    placeholder="Adresse Email"
                    className="form-control form-control-lg shadow"
                    id="email"
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                  />
                </div>
              </div>
              <br />
              <div className="row">
                <div className="form-outline mb-4">
                  <input
                    placeholder="Password"
                    className="form-control form-control-lg shadow"
                    type="password"
                    id="password"
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                  />
                </div>
              </div>
              <br />
              <div className="row">
                <div className="form-outline mb-4">
                  <input
                    placeholder="Confirmer votre password"
                    className="form-control form-control-lg shadow"
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    onChange={handleChange}
                    value={formData.confirmPassword}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-center pt-3">
                <Link
                  className="btn btn-warning btn-lg ms-2"
                  type="button"
                  style={{ backgroundColor: '#8E685A ', color: 'white' }}
                  to="/Login"
                >
                  Retour
                </Link>
                <button
                  type="submit"
                  className="btn btn-warning btn-lg ms-2"
                  style={{ backgroundColor: '#8E685A', color: 'white' }}
                >
                  Valider
                </button>
              </div>
              <div className="d-flex justify-content-center pt-3">
                <Link
                  className="btn btn-warning btn-lg ms-2"
                  type="button"
                  style={{ backgroundColor: '#8E685A ', color: 'white' }}
                  to="/Login"
                >
                  Retour
                </Link>
                <GenericButton
                  loadingText="Envoie en cours"
                  label="Valider"
                  colorScheme="blue"
                  onClick={handleSubmit}
                />
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Register
