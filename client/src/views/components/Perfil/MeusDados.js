import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

const Dados = (props) => {
  const [profile, setProfile] = useState({});

  const getProfile = async () => {
    try {
      const res = await fetch("/perfil", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseData = await res.json();
      setProfile(parseData.result)
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const celular = profile.contato ? profile.contato : "00000000000";

  return (
    <>
      <h1 className="mb-4">Meus dados</h1>
      <article className="flex-dados justify-content-around">
        <aside>
          <h2 className="fs-5 fw-normal">Nome completo:</h2>
          <p>{profile.nome}</p>
          <h2 className="fs-5 fw-normal">Celular:</h2>
          <p>{celular}</p>
        </aside>
        <aside>
          <h2 className="fs-5 fw-normal">E-Mail:</h2>
          <p>{profile.email}</p>
        </aside>
        <aside>
          <Link to={"/edit-profile"} className="btn btn-success rounded-pill mt-5 pb-2 pt-2 fw-bold fs-5" >Alterar dados</Link>
        </aside>
      </article>
    </>
  )
}

export default Dados