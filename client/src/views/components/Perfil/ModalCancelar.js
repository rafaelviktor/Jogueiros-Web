import React, { useEffect, useState } from "react";
import { Modal, Button } from 'react-bootstrap';


function ModalExcluir(props) {

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Cancelar reserva
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4 className="fw-normal fs-5">Tem certeza que deseja cancelar esta reserva?</h4>
        <p>Após isso não será possível recuperá-lo, terá que reagendar.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn btn-secondary rounded-pill mt-3 pb-2 pt-2 fw-bold fs-5" onClick={props.onHide}>Voltar</Button>
        <Button className="btn btn-danger rounded-pill mt-3 pb-2 pt-2 fw-bold fs-5" onClick={props.exclusao}>Cancelar reserva</Button>
      </Modal.Footer>
    </Modal>
  );
}

function ModalShow(props) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button className="me-2" variant="outline-danger" onClick={() => setModalShow(true)}>
      Cancelar
      </Button>

      <ModalExcluir
        show={modalShow}
        onHide={() => setModalShow(false)}
        exclusao={props.excluir}
      />
    </>
  );
}

export default ModalShow