import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';


function ModalDetalhes(props) {
  const [anuncio, setAnuncio] = useState([]);

  const getAnuncio = async () => {
    try {
        const res = await fetch(`/anuncios/anuncio/${props.idAnuncio}`, {
          method: "GET",
        });
    
        const parseData = await res.json();
        setAnuncio(parseData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getAnuncio();
  }, []);

  let history = useHistory();

  const handleClick = () => {
    window.scrollTo(0, 0)
    history.push(`/anuncio/${props.idAnuncio}`)
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
          Mais detalhes da reserva
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          {anuncio.map((item) => (
          <>
            <h1 className="fw-bold fs-4">Informações do anunciante</h1>
            <section className="flex-dados justify-content-between">
              <h2 className="fw-normal fs-5">Nome completo: <p>{item.user_name}</p></h2>
              <h2 className="fw-normal fs-5">Celular: <p>{item.celular}</p></h2>
            </section>
            <h1 className="fw-bold fs-4">Endereço completo</h1>
            <section className="flex-dados justify-content-between">
            <h2 className="fw-normal fs-5">Endereço: <p>{item.logradouro}, {item.numero} - {item.bairro} ({item.cidade}/{item.estado})</p></h2>
            <h2 className="fw-normal fs-5 me-5">CEP: <p>{item.cep}</p></h2>
            </section>
            </>
              ))}
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn btn-secondary rounded-pill mt-3 pb-2 pt-2 fw-bold fs-5" onClick={props.onHide}>Fechar</Button>
        <Button className="btn btn-success rounded-pill mt-3 pb-2 pt-2 fw-bold fs-5" onClick={handleClick}>Ver anúncio</Button>
      </Modal.Footer>

    </Modal>
  );
}

function ModalShow(props) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button variant="success" onClick={() => setModalShow(true)}>
      Ver detalhes
      </Button>

      <ModalDetalhes
        idAnuncio={props.idAnuncio}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default ModalShow