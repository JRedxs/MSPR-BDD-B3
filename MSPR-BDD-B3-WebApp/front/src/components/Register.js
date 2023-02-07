import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../styles/Register.css';


const Register = () => {

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const [error, setError] = useState("");


    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const NAVIGATE = useNavigate();
    const handleSubmit = event => {
        event.preventDefault();
        if (!passwordRegex.test(formData.password)) {
            console.error("Le mot de passe ne respecte pas les critères requis, il doit être composé au minimum de 8 caractères dont 1 Majuscule, 1 Chiffre et 1 caractère spécial");
            alert("Le mot de passe ne respecte pas les critères requis, il doit être composé au minimum de 8 caractères dont 1 Majuscule, 1 Chiffre et 1 caractère spécial")
        } else {
            axios
                .post("API_URL", formData)

                    .then(res => console.log(res))
                        .catch(err => console.error(err));
            
        }
        if (!formData.firstName || !formData.lastName || !formData.phone || !formData.email || !formData.password || !formData.confirmPassword) {
            setError("Tous les champs sont requis.");
            console.log("TEST 1")
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            console.log("TEST 2")
            return;
        }
    };


    const handleFirstNameChange = event => {
        const firstName = event.target.value
        setFormData({...formData,firstName});

    }

    const handleLastNameChange = event =>{
        const lastName = event.target.value
        setFormData({...formData,lastName})
    }

    const handlePhoneChange = event => {
        const phone = event.target.value;
        if (!/^\d+$/.test(phone)) {
            setError("Le champ Téléphone ne peut contenir que des chiffres.");
        } else {
            setFormData({ ...formData, phone });
            setError("");
        }
    };

    const handleEmailChange = event => {
        const email = event.target.value;
        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setError("L'adresse email est incorrecte.");
        } else {
            setFormData({ ...formData, email });
            setError("");
        }
    };


    const handlePasswordChange = event => {
        const password = event.target.value
        setFormData({...formData, password})
    }

    const handleConfirmPasswordChange = event => {
        const confirmPassword = event.target.value
        setFormData({...formData, confirmPassword})
    }

    return (
    <>  
        <div className="d-flex align-items-center justify-content-center mx-auto" >
            <div className="card card-register  card-color  d-flex align-items-center justify-content-center" style={{width: "33%" ,  borderRadius: "75px", border: "1px solid black"}}>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className="form_label" htmlFor="firstName">Prénom :</label>
                                <input
                                    className="form-control m-2 w-auto"
                                    type="text"
                                    id="firstName"
                                    onChange={handleFirstNameChange}
                                    value={formData.firstName}        
                                />
                        </div>
                            <div>
                                <label htmlFor="lastName">Nom :</label>
                                <input
                                    className="form-control m-2 w-auto"
                                    type="text"
                                    id="lastName"
                                    onChange={handleLastNameChange}
                                    value={formData.lastName}
                                    
                                />
                            </div>
                            <div>
                                <label htmlFor="phone">Téléphone :</label>
                                <input
                                    className="form-control m-2 w-auto"
                                    type="tel"
                                    id="phone"
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
                                    onChange={handleEmailChange}
                                    value={formData.email}
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Password :</label>
                                <input
                                    className="form-control m-2 w-auto"
                                    type="password"
                                    id="password"
                                    onChange={handlePasswordChange}
                                    value={formData.password}
                                />
                            </div>
                            <div>
                            <label htmlFor="confirmPassword">Confirm password :</label>
                                <input
                                    className="form-control m-2 w-auto"
                                    type="password"
                                    id="confirmPassword"
                                    required 
                                    onChange={handleConfirmPasswordChange}
                                    // value={event => setFormData({ ...formData, confirmPassword: event.target.value })}
                                    value={formData.confirmPassword}
                                />
                            </div>
                            <div className="d-flex align-items-center justify-content-center">
                                <button 
                                    className="btn form-button btn-dark " 
                                //    onClick={() => NAVIGATE("/")} // Le onclick prend le dessus sur le onSubmit
                                    type="submit">S'inscrire
                                </button>  
                            </div>
                            {error && <p>{error}</p>}
                    </form>
                </div>
            </div>
        </>
    )
}
export default Register;

