import React from "react";

import NavBar from "./Navbar";
import CardsAnuncios from "./components/MeusAnuncios/CardsAnuncios";
import Regiao from "./components/Regiao";
import Footer from "./Footer";

function MeusAnuncios() {

  return (
    <>
      <NavBar />
      <section className="societys bg-light">
        <div className="container">
          <h1 className="mb-4">Meus Anúncios</h1>
          <CardsAnuncios />
          <Regiao />
        </div>
      </section>
      <Footer id="block"/>
    </>
  );
};

export default MeusAnuncios;