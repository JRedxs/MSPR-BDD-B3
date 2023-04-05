import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from 'axios';
import '../styles/Register.css';


const Register = () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const [error, setError] = useState("");
    const baseUrl = process.env.REACT_APP_API_URL;

    const NAVIGATE = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        firstname: "",
        password: "",
        email: "",
        phone: "",
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = event => {
        event.preventDefault();
        if (!formData.name || !formData.firstname || !formData.phone || !formData.email || !formData.password) {
            setError("Tous les champs sont requis.");
            return;
        }
        if (!passwordRegex.test(formData.password)) {
            setError("Le mot de passe ne respecte pas les critères requis, il doit être composé au minimum de 8 caractères dont 1 Majuscule, 1 Chiffre et 1 caractère spécial");
            return;
        }
        axios
            .post(`${baseUrl}/token`, formData)
            .then(res => {
                console.log(res);
                NAVIGATE('/login')
            })
            .catch(err => console.error(err));
    };

    const handlePhoneChange = event => {
        const phone = event.target.value;
        if (!/^\d+$/.test(phone)) {
            setError("Le champ Téléphone ne peut contenir que des chiffres.");
        } else {
            setFormData({ ...formData, phone });
            setError("");
        }
    };

    return (
        <div className="body">
            <section className="h-100 form-register">
                <div className="card card-register card-registration d-flex justify-content-center my-4">
                    <div className="card-body   text-black">
                        <form onSubmit={handleSubmit}>
                            <h3 className="mb-5 text-uppercase" style={{ display: 'flex', justifyContent: 'center' }}>Inscription</h3>

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
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        onChange={handlePhoneChange}
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
                                        type="email"
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
                                        required
                                        onChange={handleChange}
                                        value={formData.confirmPassword}
                                    />
                                </div>
                            </div>
                            <div className="d-flex justify-content-center pt-3">
                                <Link className="btn btn-warning btn-lg ms-2" type="button" style={{ backgroundColor: '#8E685A ', color: 'white' }} to="/Login">Retour</Link>
                                <button type="submit" className="btn btn-warning btn-lg ms-2" style={{ backgroundColor: '#8E685A', color: 'white' }}>Valider</button>
                            </div>
                            {error && <p>{error}</p>}
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Register;

