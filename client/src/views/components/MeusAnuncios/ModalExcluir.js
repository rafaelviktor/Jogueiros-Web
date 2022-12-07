import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';
import { toast } from "react-toastify";


function ModalExcluir(props) {
  const history = useHistory();

  const [inputs, setInputs] = useState({
    user_id: `${props.idusuario}`,
    user_password: ""
  });

  const { user_id, user_password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  async function excluir(id)  {
    // Exclusão de agendamento
        try {
          const body = { user_id, user_password };
          const res = await fetch(`/anuncios/excluir/${id}`, {
            method: "DELETE",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(body)
        });
          const parseData = await res.json();
          if(res.status == "201") {
            toast.success(parseData)
            history.push({
              search: '?d'
            })
          } else {
            toast.error(parseData)
          }
        } catch (e) {
          console.error(e);
        }
        return;
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
        Tem certeza que quer excluir este anúncio?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Este processo é irreversível e você perderá todos os agendamentos realizados pelos seus clientes neste anúncio.</p>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <div>
        <label for="senha-exclusao">Insira sua senha para confirmar</label>
        <input type="password" name="user_password" value={user_password} onChange={(e) => onChange(e)} id="senha-exclusao" className="form-control p-1 mt-1"/>
        </div>
        <div>
        <Button className="btn btn-secondary rounded-pill mt-3 pb-2 pt-2 fw-bold fs-5 me-2" onClick={props.onHide}>Cancelar</Button>
        <Button type="submit" className="btn btn-danger rounded-pill mt-3 pb-2 pt-2 fw-bold fs-5" onClick={() => excluir(props.exclusaoid)}>Excluir</Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

function ModalShow(props) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button className="me-2" variant="danger" onClick={() => setModalShow(true)}>
      Excluir
      </Button>

      <ModalExcluir
        show={modalShow}
        onHide={() => setModalShow(false)}
        exclusaoid={props.excluir}
        idusuario={props.userid}
      />
    </>
  );
}

export default ModalShow