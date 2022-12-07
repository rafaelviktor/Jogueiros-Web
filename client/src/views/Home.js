import React from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import "@splidejs/splide/dist/css/splide.min.css"

import NavBar from "./Navbar";
import Cards from "./components/Home/Cards";
import Cards2 from "./components/Home/Cards2";
import Regiao from "./components/Regiao"
import Footer from "./Footer";

function Home () {

  return (
    <>
      <NavBar />
      <header className="masthead">
      <Splide options={{type: 'loop', height: "32rem", pagination: false, arrows: false, autoplay: true}}>
        <SplideSlide>
          <img src={`img/bg-home/bg-head1.jpg`}alt="Imagem Header"/>
        </SplideSlide>
        <SplideSlide>
          <img src={`img/bg-home/bg-head2.jpeg`}alt="Imagem Header"/>
        </SplideSlide>
        <SplideSlide>
          <img src={`img/bg-home/bg-head3.jpeg`}alt="Imagem Header"/>
        </SplideSlide>
        <SplideSlide>
          <img src={`img/bg-home/bg-head4.jpeg`}alt="Imagem Header"/>
        </SplideSlide>
        <SplideSlide>
          <img src={`img/bg-home/bg-head5.jpeg`}alt="Imagem Header"/>
        </SplideSlide>
        <SplideSlide>
          <img src={`img/bg-home/bg-head6.jpeg`}alt="Imagem Header"/>
        </SplideSlide>
      </Splide>
          <div className="masthead-items justify-content-center">
            <div className="col-xl-6">
              <div className="text-center text-white">
                <h1 className="mb-5">Anuncie agora seu espaço esportivo.</h1>
                <form className="d-flex m-2" id="contactForm" action="/pesquisa" method="GET">
                      <input
                        className="form-control form-control-lg me-3"
                        id="homeSearch"
                        type="text"
                        name="q"
                        placeholder="O que está procurando?"
                      />
                      <button
                        className="btn btn-success btn-lg"
                        id="submitButton"
                        type="submit"
                      >
                        Buscar
                      </button>
                </form>
              </div>
            </div>
          </div>
          <div className="masthead-cover"></div>
      </header>
      <section className="societys text-center bg-light">
        <div className="container">
          <h2 className="mb-4">Societys mais populares</h2>
          <Cards />
          <h2 className="mb-4">Societys que acabaram de chegar ao Jogueiros</h2>
          <Cards2 />
          <Regiao />
        </div>
      </section>
      <Footer id="block"/>
    </>
  );
};

export default Home;
