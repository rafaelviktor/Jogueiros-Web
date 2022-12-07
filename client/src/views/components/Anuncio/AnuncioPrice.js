import React from 'react'

function AnuncioPrice(props) {
  return (
        <div id="priceTag">
            <span className="anuncioPricePrefix me-2">R$</span>
            <h2>
            {props.preco} <span className="anuncioPriceSuffix">/h</span>
            </h2>
        </div>
  )
}

export default AnuncioPrice