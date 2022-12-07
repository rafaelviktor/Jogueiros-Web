import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import ModalCancelar from "./ModalCancelar";
import ModalDetalhes from "./ModalDetalhes";

const Cards = () => {
  const [reservas, setReservas] = useState(null);

  const getReservas = async () => {
    try {
      let res = await fetch("/perfil/minhas-reservas", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      let parseData = await res.json();
        res = await fetch(`/reservas/${parseData._id}`, {
          method: "GET",
          headers: { token: localStorage.token },
        });
    
        parseData = await res.json();
        setReservas(parseData);
    } catch (err) {
      console.error(err.message);
    }
  };

  async function excluir(id)  {
    // Exclusão de agendamento
        try {
          const apagarRecurso = await fetch(
            `/reservas/excluir/${id}`,
            {
              method: "DELETE",
            }
          );
          toast.success("Agendamento cancelado com sucesso");
          getReservas()
        } catch (e) {
          console.log(e);
        }
        return;
  }

  useEffect(() => {
    getReservas();
  }, []);
    
  return (
    <div className="container-reservas justify-content-center col p-2 rounded">
      {
        //Checar informações do anúncio, caso não haja, exibir esqueleto dos cards
        reservas && reservas.map((item) => (
          <div className="card mb-3 flex-reservas">
            <div style={{maxWidth: 240}}>
              <img src={`/uploads/${item.imagem}`} className="img-fluid rounded-start img-reservas" alt="Imagem Anúncio" />
            </div>
            <div className="card-body p-4 borderRight">
              <h5 className="card-title">{item.titulo}</h5>
              <p className="card-text fs-5">{item.preco} R$ /h</p>
              <p className="card-text"><small className="text-muted">Data da solicitação: {item.created_at.substring(0,10).split("-").reverse().join("/")}</small></p>
            </div>
            <div className="card-body p-4 borderRight">
              <h5 className="card-title">Data da reserva</h5>
              <div>
              <p className="card-text fs-5">{item.data_agendamento}</p>
              <p className="card-text fs-5">{item.hora_inicio} às {item.hora_final}</p>
              </div>
            </div>
            <div className="card-body p-4" style={{maxWidth: 283}}>
              <h5 className="card-title">Status</h5>
              <p className="card-text fw-bold mb-0">{item.status}</p>
              <div className="d-flex">
              <ModalCancelar className="me-3" excluir={() => excluir(item.id)} /><ModalDetalhes className="me-3" idAnuncio={item.id_anuncio}/>
              </div>
            </div>
          </div>
        ))
      }

      {(reservas == "") &&
        <div className="text-center p-5">
        <h2 className="fs-3">Opa! Você não possui nenhuma reserva.</h2>
        <p>Caso queira voltar à página inicial <Link to="/" >clique aqui</Link>.</p>
        </div>
      }
    </div>
  )
}

export default Cards