import React from 'react'

function AnuncioTituloLocal(props) {
  return (
    <article id="AnuncioDescricao" className="col">
        <div className="d-flex justify-content-between">
        <p className="fw-normal mb-4">Código do anúncio: {props.id}</p>
        <p className="fw-normal mb-4">Visualizações: {props.views}</p>
        </div>
        <p className="fw-normal mb-4">{props.descricao}</p>
        <h4 className="mt-5 mb-3">Localização</h4>
        <div className="anuncioLocal">
          <div className="p-2" style={{width: 110}}>
            <h5>CEP</h5>
            <p className="anuncioLocal content">{props.cep}</p>
          </div>
          <div className="p-2">
            <h5>Logradouro</h5>
            <p className="anuncioLocal content">{props.logradouro}</p>
          </div>
          <div className="p-2">
            <h5>Bairro</h5>
            <p className="anuncioLocal content">{props.bairro}</p>
          </div>
          <div className="p-2">
            <h5>Município</h5>
            <p className="anuncioLocal content">{props.cidade}</p>
          </div>
        </div>
    </article>
  )
}

export default AnuncioTituloLocal