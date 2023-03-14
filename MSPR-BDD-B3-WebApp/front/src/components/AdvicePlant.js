import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//import '../styles/Advice.css'

const AdvicePlant = () => {


  const id_plante = Number(sessionStorage.getItem('plante'));

  const id_photo = Number(sessionStorage.getItem('photo'));

  const baseUrl = process.env.REACT_APP_API_URL;

  const [advice, setAdvice] = useState({ advice_title: "", advice: "", id_photo: id_photo });
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAdvice({ ...advice, [name]: value, id_photo: id_photo });
  };

  useEffect(() => {
    // récupérer les infos depuis le sessionStorage
    const fetchData = async () => {
      try {
        const response_user = await axios.get(`${baseUrl}/plantandgallery/${id_plante}`);
        const userData = response_user.data.Plante;
        setUser(userData);
        console.log(userData);
        sessionStorage.setItem("user_plante", JSON.stringify(userData));
      } catch (error) {
        console.error(error)
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(process.env.REACT_APP_API_URL + `/advices`, advice)
        .then(() => {
          navigate(`/Plante/${id_plante}`);
        });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>




      <div className="body">
        <div className="container">
          <h1 style={{ textAlign: 'center' }}>
            <b> Conseils </b>
          </h1>

          <div className="card card-login mx-auto blue-card shadow-lg bg-white rounded" style={{ borderRadius: "15px", border: "2px solid black", width: '50%', height: '35em', marginTop: 0, marginBottom: 0 }}>
            <div className="card-body mx-auto">
              <div className="d-flex justify-content-center margin-login-card" style={{ height: 1000 }}>
                <form className="mx-auto" >
                  {/* <div className="card-body mx-auto" style={{ textAlign: 'center' }}>
                    <img src={user[1].image_data} alt="" style={{ width: "55%", borderRadius: '15px', margin: 'auto' }} />
                  </div> */}
                  <div className="card-body mx-auto" style={{ textAlign: 'center' }}>
                    <label className="card-body mx-auto" htmlFor="begining" style={{ color: 'black', fontSize: '20px' }}> <b>Titre du conseil : </b> </label>
                    <input type="text" name="advice_title" value={advice.advice_title} onChange={handleInputChange} placeholder="Titre" />
                  </div>

                  <div className="card-body mx-auto" style={{ textAlign: 'center' }}>
                    <label className="card-body mx-auto" htmlFor="begining" style={{ color: 'black', fontSize: '20px' }}> <b>Conseil : </b> </label>
                    <input name="advice" value={advice.advice} onChange={handleInputChange} placeholder="Conseil" />
                  </div>

                  <div className=' d-flex align-items-center justify-content-center mt-5'>
                    <button className='btn btn-success mb-5' type="submit" onClick={handleSubmit}>
                      Ajouter
                    </button>
                  </div>
                </form>


              </div>
            </div>
          </div>
        </div>
      </div>



    </>
  );
};

export default AdvicePlant;


