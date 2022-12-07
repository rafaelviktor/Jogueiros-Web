import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import ModalExcluir from "./ModalExcluir";
import ModalReservas from "./ModalReservas";

const Cards = () => {
  const [card, setCard] = useState(null);
  const history = useHistory()

  const getMyAds = async () => {
    try {
      let res = await fetch("/perfil", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      let parseData = await res.json();
      res = await fetch(`/anuncios/meus-anuncios/${parseData._id}`, {
        method: "GET",
      });
      parseData = await res.json();
      setCard(parseData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getMyAds()
    return history.listen(() => { 
       getMyAds()
    }) 
  },[history]) 

  return (
    <div className="container-reservas justify-content-center col p-2 rounded">
        {
        card && card.map((item) => (
        //Checar informações do anúncio, caso não haja, exibir esqueleto dos cards
          <div className="card mb-3 flex-reservas">
            <div style={{maxWidth: 240}}>
              <img src={`/uploads/${item.imagem}`} className="img-fluid rounded-start img-reservas" alt="Imagem Anúncio" />
            </div>
            <div className="card-body p-4 borderRight">
              <h5 className="card-title">{item.titulo}</h5>
              <ModalReservas className="me-3" id={item.id}/>
            </div>
            <div className="card-body p-4 borderRight">
              <h5 className="card-title">Preço</h5>
              <p className="card-text fw-bold mb-0">{item.preco} R$ /h</p>
            </div>
            <div className="card-body p-4" style={{maxWidth: 283}}>
              <h5 className="card-title">Ações</h5>
              <div className="d-flex">
              <Link to={`/edit-ad/${item.id}`} className="btn btn-warning me-3">Alterar</Link><ModalExcluir className="me-3" excluir={item.id} userid={item.id_anunciante} />
              </div>
            </div>
          </div>
        ))
        }
      
        {(card == "") &&
        <div className="text-center p-5">
        <h2 className="fs-3">Opa! Você ainda não tem anúncios criados.</h2>
        <p>Caso queira cadastrar seu anúncio <Link to="/anunciar" >clique aqui</Link>.</p>
        </div>
        }
        <span className="spacing mt-4"></span>
    </div>
  )
}

export default Cards