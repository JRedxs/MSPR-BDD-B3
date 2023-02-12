import React, { useState } from 'react';

const AddAdvice = () => {
  const [adviceTitle, setAdviceTitle] = useState('');
  const [advice, setAdvice] = useState('');
  const [idPlante, setIdPlante] = useState('');

  const handleSubmit = async () => {
    const response = await fetch('/photos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        advice_title: adviceTitle,
        advice: advice,
        id_plante: idPlante
      })
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Advice Title"
        value={adviceTitle}
        onChange={e => setAdviceTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Advice"
        value={advice}
        onChange={e => setAdvice(e.target.value)}
      />
      <input
        type="text"
        placeholder="Id Plante"
        value={idPlante}
        onChange={e => setIdPlante(e.target.value)}
      />
      <button onClick={handleSubmit}>Valider</button>
    </div>
  );
};

export default AddAdvice;
