import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { toast } from "react-toastify";

import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import brLocale from 'date-fns/locale/pt-BR';

const localeMap = {
  br: brLocale,
};

const maskMap = {
  br: '__/__/____',
};



function ModalCentralizado(props) {
  const location = useLocation();
  const id = location.pathname.replace("/anuncio/", "");

  const [userId, setUserId] = useState("");
  const [userName, setuserName] = useState("");
  const [userCel, setuserCel] = useState("");
  const [infoAd, setInfoAd] = useState(null)

  const getProfile = async () => {
      try {
        let res = await fetch("/perfil", {
          method: "GET",
          headers: { token: localStorage.token },
        });

        let parseData = await res.json();
        setUserId(parseData._id);
        setuserName(parseData.nome);
        setuserCel(parseData.contato);
        setInfoAd(props.infoAd);
      } catch (err) {
        console.error(err.message);
      }
    };

    useEffect(() => {
      getProfile();
    }, []);

    let history = useHistory();

    const [locale, setLocale] = React.useState('br');
    const [valueDate, setValueDate] = React.useState(null);
    const [valueHFim, setValueHFim] = React.useState(null);

    function dateWithMonthsDelay (months) {  
      const date = new Date()
      date.setMonth(date.getMonth() + months, 0)
      return date
    }
    const handleClick = async () => {
      // Formatando entradas
      const data = String(valueDate.toISOString()).substring(0,10).split("-").reverse().join("/")
      const horaInicio = String(valueDate).substring(16,21)
      const horaFim = String(valueHFim).substring(16,21)
      if(!userId) {
        window.scrollTo(0, 0)
        history.push("/login");
        toast.error("Primeiro faça login para realizar o agendamento.");
      } else if(!valueDate || !valueHFim) {
        toast.error("É necessário preencher todos os campos.");
      } else if(infoAd.id_anunciante == userId) {
        toast.error("Você não pode reservar em seu próprio anúncio.");
      } else if(parseInt(horaFim.replace(":","")) <= parseInt(horaInicio.replace(":",""))) {
        toast.error("Formato de horário inválido para o agendamento.");
      } else {
        try {
          const body = { id_anuncio: id, nome_usuario: userName, celular: userCel, titulo: infoAd.titulo, preco: infoAd.preco, imagem: infoAd.imagem, data_agendamento: data, hora_inicio: horaInicio, hora_final: horaFim, status: "Pendente" };
          const response = await fetch(`/reservas/cadastrar/${userId}`, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(body),
          });
          const parseRes = await response.json();
          toast.success(parseRes);
          window.scrollTo(0, 0)
          history.push("/perfil");
        } catch (err) {
          console.error(err.message);
        }
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
          Reservar
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4 className="fw-normal fs-5">Escolha uma data e hora para sua reserva:</h4>
        <p className="mt-4">
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={localeMap[locale]}>
            <div className="mb-4">
              <DatePicker
                label="Selecionar data"
                mask={maskMap[locale]}
                value={valueDate}
                minDate={new Date()}
                maxDate={dateWithMonthsDelay(1)}
                DisableDate={new Date()}
                onChange={(newValue) => {
                  setValueDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              </div>
              <div className="d-flex align-items-center">
              <TimePicker
                label="De"
                value={valueDate}
                onChange={(newValue) => setValueDate(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
              <p className="d-flex align-items-center fs-5 me-2 ms-2"> às </p>
              <TimePicker
                label="Até"
                value={valueHFim}
                onChange={(newValue) => setValueHFim(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
              </div>
          </LocalizationProvider>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn btn-secondary rounded-pill mt-3 pb-2 pt-2 fw-bold fs-5" onClick={props.onHide}>Cancelar</Button>
        <Button className="btn btn-success rounded-pill mt-3 pb-2 pt-2 fw-bold fs-5" onClick={handleClick}>Reservar</Button>
      </Modal.Footer>
    </Modal>
  );
}

function ModalShow(props) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button id="btn-reserva" className="btn btn-success rounded-pill mt-3 pb-2 pt-2 fw-bold fs-5" variant="primary" onClick={() => setModalShow(true)}>
      <i className="bi bi-calendar-week-fill"></i> Reservar
      </Button>

      <ModalCentralizado
        show={modalShow}
        onHide={() => setModalShow(false)}
        infoAd={props.infoAd}
      />
    </>
  );
}

export default ModalShow