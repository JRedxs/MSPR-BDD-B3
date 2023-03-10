import React , {useState,useEffect} from "react";
import { Link } from "react-router-dom";


const Garde = () => {
    
    const [infos, setInfos] = useState({});

    useEffect(() => {
    // récupérer les infos depuis le localStorage
    const gardeInfo = JSON.parse(localStorage.getItem('user'));
    setInfos(gardeInfo);
    // console.log(infos[4]["begining"])
    }, []);

    return (
        <>
            <div className="d-flex align-items-center">
                <Link className="btn" type="submit" style={{ color: 'white', backgroundColor: 'green', marginTop: '10px', marginLeft: '10px' }} to="/Map">Retour</Link>
            </div>

            <h1 style={{ textAlign: 'center' }}>
                Informations de la plante :
            </h1>
                <div className="card card-login mx-auto" style={{ width: "27%", borderRadius: "50px", border: "1px solid black"}}>
                    <div className="card-body mx-auto">
                        <div className="d-flex justify-content-center margin-login-card">
                            <form className="mx-auto" style={{ width: "100%" }}>
                                <div className="form-group">

                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="begining"> <b>Date de la garde : </b> </label>
                                    <p>Début : 23 Février 2023 16h00 
                                       Fin : 24 Février 2023 20h00
                                    </p>
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="nom_prenom"><b> Nom & Prénom </b> </label>
                                    <p>Pierre Dubois</p>
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="email"><b> Email : </b> </label>
                                    <p>pierre.dubois@gmail.com</p>
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="phone"><b> Téléphone : </b> </label>
                                    <p>0600000000</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
        </>
    )
}
export default Garde