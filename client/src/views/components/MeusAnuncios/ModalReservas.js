import React, { useEffect, useState } from "react";
import { Modal, Button } from 'react-bootstrap';

function ModalReservas(props) {
  const [reservas, setReservas] = useState("")

  const getReservas = async () => {
    try {
      const res = await fetch(`/reservas/anuncio/${props.idAd}`, {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseData = await res.json();
      setReservas(parseData)
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getReservas();
  }, []);

  async function aprovar(idRes) {
    try {
      const res = await fetch(`/reservas/aprovar/${idRes}`, {
        method: "PUT",
        headers: { token: localStorage.token },
      });
      getReservas()
    } catch (err) {
      console.error(err.message);
    }
  }

  async function recusar(idRes) {
    try {
      const res = await fetch(`/reservas/recusar/${idRes}`, {
        method: "PUT",
        headers: { token: localStorage.token },
      });
      getReservas()
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Solicitações de reserva
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          reservas && reservas.map((item) => (
            <>
            <hr/>
            <section className="flex-dados justify-content-between p-2">
            <div>
            <h4 className="fw-normal fs-5">Cliente:</h4>
            <p>{item.nome_usuario.split(' ')[0]+" "+item.nome_usuario.split(' ')[1]}</p>
            </div>
            <div>
            <h4 className="fw-normal fs-5">Contato:</h4>
            <p>{item.celular}</p>
            </div>
            <div>
            <h4 className="fw-normal fs-5">Data agendamento:</h4>
            <p>{item.data_agendamento}</p>
            <p>{item.hora_inicio} às {item.hora_final}</p>
            </div>
            <div>
            <h4 className="fw-normal fs-5">Situação</h4>
            <p className="fw-bold">{item.status}</p>
            <Button className="btn btn-success me-2" onClick={() => aprovar(item.id)}>Aprovar</Button>
            <Button className="btn btn-danger" onClick={() => recusar(item.id)}>Recusar</Button>
            </div>
            </section>
            <hr/>
            </>
          ))
        }

      {(reservas == "") &&
        <div className="text-center p-4">
        <h2 className="fs-4">Você ainda não possui nenhuma reserva.</h2>
        <p>Não desanime, logo logo irão começar a aparecer.</p>
        </div>
      }
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn btn-success rounded-pill mt-3 pb-2 pt-2 fw-bold fs-5" onClick={props.onHide}>Fechar</Button>
      </Modal.Footer>
    </Modal>
  );
}

function ModalShow(props) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button variant="success" onClick={() => setModalShow(true)}>
      Ver reservas
      </Button>

      <ModalReservas
        idAd={props.id}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default ModalShow