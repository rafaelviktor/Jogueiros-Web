import React from 'react'

function AnuncioTituloLocal(props) {
  return (
    <article className="col-sm-8">
        <h1 className="fw-normal mb-4">{props.titulo}</h1>
    </article>
  )
}

export default AnuncioTituloLocal