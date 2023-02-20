import React, { useState } from "react";
import axios from "axios";

const AdvicePlant = () => {
  const [advice, setAdvice] = useState({ advice_title: "", advice: "", id_plante: "" });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAdvice({ ...advice, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/advices", advice);
      console.log(response.data);
      setAdvice({ advice_title: "", advice: "", id_plante: "" });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Titre :
        <input type="text" name="advice_title" value={advice.advice_title} onChange={handleInputChange} />
      </label>
      <label>
        Conseil :
        <textarea name="advice" value={advice.advice} onChange={handleInputChange} />
      </label>
      <label>
        ID Plante :
        <input type="text" name="id_plante" value={advice.id_plante} onChange={handleInputChange} />
      </label>
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default AdvicePlant;
