import React, { useState } from "react";
import {  useParams} from "react-router-dom";
import axios from "axios";

const AdvicePlant = () => {
  const [advice, setAdvice] = useState({ advice_title: "", advice: "", id_plante: "" });

  let { id } = useParams();
    //console.log(id)

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAdvice({ ...advice, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(process.env.REACT_APP_API_URL + `/advices/${id}`, advice);
      console.log(response.data);
      setAdvice({ advice_title: "", advice: ""});
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <div className="card card-login mx-auto" style={{ width: "33%", borderRadius: "50px", border: "1px solid black" }}>
                <div className="card-body mx-auto">
                    <div className="d-flex justify-content-center margin-login-card">
                        <form className="mx-auto" onSubmit={handleSubmit} style={{ width: "100%" }}>
                            <div className="form-group">
                                <label className="form-label" htmlFor="exampleInputTitre"> <b>Titre : </b> </label>
                                <input type="text" name="advice_title" value={advice.advice_title} onChange={handleInputChange} placeholder="Titre" />
                            </div>
                            <br />
                            <div className="form-group">
                                <label className="form-label" htmlFor="exampleInputConseil"><b> Conseil : </b> </label>
                                <input name="advice" value={advice.advice} onChange={handleInputChange} placeholder="Conseil" />
                            </div>
                            <br />
                            
                            <button type="submit">Ajouter</button>
                        </form>
                    </div>
                </div>

            </div>

   

    </>
  );
};

export default AdvicePlant;
