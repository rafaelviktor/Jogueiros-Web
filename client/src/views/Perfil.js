import React, { useEffect, useState } from "react";

import Footer from "./Footer";
import NavBar from "./Navbar";
import Dados from "./components/Perfil/MeusDados"
import Reservas from "./components/Perfil/MinhasReservas"

const Perfil = () => {
  return (
    <>
      <NavBar />
      <main className="societys bg-light">
        <section className="container">
            <div className="row">
                <Dados />
            </div>
            <hr/>
            <div className="row">
                <Reservas />
            </div>
          </section>
        </main>
      <Footer id="block"/>
    </>
  );
};

export default Perfil;