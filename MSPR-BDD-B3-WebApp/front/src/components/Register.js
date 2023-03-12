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
            .post(`${baseUrl}/persons`, formData)
            .then(res => console.log(res))
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
        <div className="d-flex align-items-center justify-content-center mx-auto">
            <div className="card card-register card-color d-flex align-items-center justify-content-center" style={{ width: "33%", borderRadius: "75px", border: "1px solid black" }}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="form_label" htmlFor="name">Prénom :</label>
                        <input
                            className="form-control m-2 w-auto"
                            type="text"
                            id="name"
                            name="name"
                            onChange={handleChange}
                            value={formData.name}
                        />
                    </div>
                    <div>
                        <label htmlFor="firstname">Nom :</label>
                        <input
                            className="form-control m-2 w-auto"
                            type="text"
                            id="firstname"
                            name="firstname"
                            onChange={handleChange}
                            value={formData.firstname}
                        />
                    </div>
                    <div>
                        <label htmlFor="phone">Téléphone :</label>
                        <input
                            className="form-control m-2 w-auto"
                            type="tel"
                            id="phone"
                            name="phone"
                            onChange={handlePhoneChange}
                            value={formData.phone}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email :</label>
                        <input
                            className="form-control m-2 w-auto"
                            type="email"
                            id="email"
                            name="email"
                            onChange={handleChange}
                            value={formData.email}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password :</label>
                        <input
                            className="form-control m-2 w-auto"
                            type="password"
                            id="password"
                            name="password"
                            onChange={handleChange}
                            value={formData.password}
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm password :</label>
                        <input
                            className="form-control m-2 w-auto"
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            required
                            onChange={handleChange}
                            value={formData.confirmPassword}
                        />
                    </div>
                    <div className="d-flex align-items-center justify-content-center">
                        <button
                            className="btn form-button btn-dark "
                            onClick={() => NAVIGATE("/login")} // Le onclick prend le dessus sur le onSubmit
                            type="submit">S'inscrire
                        </button>
                        <Link className="btn btn-dark " to="/login">Retour</Link>
                    </div>
                    {error && <p>{error}</p>}
                </form>
            </div>
        </div>
    )
}
export default Register;

