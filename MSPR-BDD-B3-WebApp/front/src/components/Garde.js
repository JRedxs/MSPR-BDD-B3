import React from "react";
import { Link } from "react-router-dom";



const Garde = () => {



    return (
        <>
            <div className="d-flex align-items-center">
                <Link className="btn" type="submit" style={{ color: 'white', backgroundColor: 'green', marginTop: '10px', marginLeft: '10px' }} to="/Map">Retour</Link>
            </div>

            <h1 style={{ textAlign: 'center' }}>
                Informations de la plante :
            </h1>
                <div className="card card-login mx-auto" style={{ width: "27%", borderRadius: "50px", border: "1px solid black" }}>
                    <div className="card-body mx-auto">
                        <div className="d-flex justify-content-center margin-login-card">
                            <form className="mx-auto" style={{ width: "100%" }}>
                                <div className="form-group">

                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="date_garde"> <b>Date de la garde : </b> </label>
                                    <input type="date" className="form-control" id="date" name="date"/>
                                </div>
                                <br />
                                <div className="form-group">
                                    <label className="form-label" htmlFor="nom_prenom"><b> Nom & Prénom </b> </label>
                                    <p>Nom & Prénom à écrire</p>
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="email"><b> Email : </b> </label>
                                    <p>Email à écrire</p>
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="phone_number"><b> Téléphone : </b> </label>
                                    <p>Téléphone à écrire</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default Garde