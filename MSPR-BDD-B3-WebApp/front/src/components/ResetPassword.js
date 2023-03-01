import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/ResetPassword.css'




const ResetPassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const baseUrl = process.env.REACT_APP_API_URL;
    const payload = { currentPassword, newPassword}
    const NAVIGATE = useNavigate()

    const handleSubmit = (event) => {
            event.preventDefault();
        if (newPassword !== confirmNewPassword) {
            alert('Les mots de passe ne correspondent pas.');
                return;
        }
        if (!passwordRegex.test(newPassword)) {
            alert('Le nouveau mot de passe doit comporter au moins 8 caractères, une lettre majuscule, un chiffre et un caractère spécial.');
                return;
        }
        axios
            .post(`${baseUrl}/changepass`,payload )
            //APPEL  POST API A COMPLETER 
    }
    return (
        <div class="m-lg-4">
            <div className="d-flex align-items-center justify-content-center">
                <div className="card card-register card-color p-3" style={{ width: "33%", borderRadius: "30px", border: "1px solid black" }}>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="current-password"><b>Mot de passe actuel :</b></label>
                            <input
                                className="form-control"
                                type="password" id="current-password"
                                value={currentPassword}
                                onChange={(event) => setCurrentPassword(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="new-password"> <b>Nouveau mot de passe :</b></label>
                            <input
                                className="form-control"
                                type="password" id="new-password"
                                value={newPassword}
                                onChange={(event) => setNewPassword(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirm-new-password"><b>Confirmer le nouveau mot de passe :</b></label>
                            <input
                                className="form-control"
                                type="password" id="confirm-new-password"
                                value={confirmNewPassword}
                                onChange={(event) => setConfirmNewPassword(event.target.value)}
                            />
                        </div>
                        <div className="d-flex justify-content-center">
                            <button
                                className="btn btn-dark mt-3"
                                onClick={() => NAVIGATE("/login")}
                                type="submit"
                            >
                            Changer votre mot de passe
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default ResetPassword