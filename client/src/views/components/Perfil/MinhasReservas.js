import React from "react";
import CardsReservas from "./CardsReservas";

const MinhasReservas = (props) => {
  
  return (
    <>
      <h1>Minhas reservas</h1>
      <article className="d-flex justify-content-center">
        <CardsReservas />
      </article>
    </>
  )
}

export default MinhasReservas