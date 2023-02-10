import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Register.css';


const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const NAVIGATE = useNavigate();
  
    const handleSubmit = (event) => {
      event.preventDefault();
    };

    return (
        <>  
        <div className="d-flex align-items-center justify-content-center">
            <div className="card  card-color w-25 d-flex align-items-center justify-content-center">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className="form_label" htmlFor="firstName">Prénom :</label>
                                <input
                                    className="form-control m-2 w-auto"
                                    type="text"
                                    id="firstName"
                                    value={firstName}
                                    onChange={(event) => setFirstName(event.target.value)}
                                />
                        </div>
                            <div>
                                <label htmlFor="lastName">Nom :</label>
                                <input
                                    className="form-control m-2 w-auto"
                                    type="text"
                                    id="lastName"
                                    value={lastName}
                                    onChange={(event) => setLastName(event.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="phone">Téléphone :</label>
                                <input
                                    className="form-control m-2 w-auto"
                                    type="tel"
                                    id="phone"
                                    value={phone}
                                    onChange={(event) => setPhone(event.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="email">Email :</label>
                                <input
                                    className="form-control m-2 w-auto"
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Password :</label>
                                <input
                                    className="form-control m-2 w-auto"
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                            </div>
                            <div>
                            <label htmlFor="confirmPassword">Confirmer password :</label>
                                <input
                                    className="form-control m-2 w-auto"
                                    type="password"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(event) => setConfirmPassword(event.target.value)}
                                />
                            </div>
                            <div className="d-flex align-items-center justify-content-center">
                                <button className="btn btn-dark" type="submit">S'inscrire</button>
                            </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default Register;

