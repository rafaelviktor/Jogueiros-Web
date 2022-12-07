import React from 'react'
import ModalReservar from "./ModalReservar";

function AnuncioAutor(props) {
  return (
    <div id="adInfo" className="p-3 pb-4">
        <h3 className="fw-normal mb-3">
            {props.autor}
        </h3>
        <span className="divider"></span>
        <p className="mt-3 mb-2">Contato:</p>
        <p className="fw-bold mb-4">
            {props.celular}
        </p>
      <ModalReservar infoAd={props.infoAd}/>
    </div>
  )
}

export default AnuncioAutor