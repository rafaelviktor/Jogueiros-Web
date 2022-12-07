import React, { useEffect, useState } from "react";
import { useLocation, Link } from 'react-router-dom';
import "@splidejs/splide/dist/css/splide.min.css"

import NavBar from "./Navbar";
import Footer from "./Footer";

function Home () {
    const params = useLocation();
    const pesquisaEstado = params.pathname.substring(0,8);
    const uf = params.pathname.substring(8,10)
    const pesquisaURL = params.search.substring(3).replaceAll('+',' ')

    const [pesquisa, setPesquisa] = useState("")
    const [resultados, setResultados] = useState([])
    const [display, setDisplay] = useState([])

    const onChange = (e) => {
      setPesquisa(e.target.value);
    };

    const onSubmitForm = async (e) => {
      e.preventDefault();
      try {
        let response = await fetch(`/pesquisa/?q=${pesquisa}`, {
          method: "GET",
        });
        const parseRes = await response.json();
        setResultados(parseRes);
        if (pesquisa === "") {
          setDisplay("")
        } else {
          setDisplay(`Resultados da pesquisa: "${pesquisa}"`)
        }
      } catch (err) {
        console.error(err.message);
      }
    };

    useEffect(async () => {
      if(pesquisaEstado == "/estado/") {
        try {
          let response = await fetch(`/pesquisa/estado/${uf}`, {
            method: "GET",
          });
          const parseRes = await response.json();
          setResultados(parseRes);
          setDisplay(`Resultados da pesquisa do estado: "${uf}"`)
        } catch (err) {
          console.error(err.message);
        }
      } else {
        try {
          let response = await fetch(`/pesquisa/?q=${pesquisaURL}`, {
            method: "GET",
          });
          const parseRes = await response.json();
          setResultados(parseRes);
          if (pesquisaURL === "") {
            setDisplay("")
          } else {
            setDisplay(`Resultados da pesquisa: "${pesquisaURL}"`)
          }
        } catch (err) {
          console.error(err.message);
        }
      }
    }, [])

  return (
    <>
    <header>
        <NavBar />
    </header>
      <section className="societys bg-light">
      <div id="search-box">
            <form className="d-flex m-2" id="contactForm" onSubmit={(e) => onSubmitForm(e)}>
                <input
                    className="form-control form-control-lg me-3"
                    type="text"
                    value={pesquisa}
                    onChange={(e) => onChange(e)}
                    placeholder="O que está procurando?"
                  />
                <input
                    type="submit"
                    className="btn btn-success btn-lg"
                    value="Buscar"
                  />
            </form>
        </div>
        <div className="container">
            <h1 className="fs-4 mb-4 mt-4">{display}</h1>
          {
            resultados && resultados.map((item) => (
            //Checar informações do anúncio, caso não haja, exibir esqueleto dos cards
            <Link to={`/anuncio/${item.id}`} className="card mb-3 flex-reservas">
             <div style={{maxWidth: 240}}>
                <img src={`/uploads/${item.imagem}`} className="img-fluid rounded-start img-reservas" alt="Imagem Anúncio" />
              </div>
              <div className="card-body card-title-display p-4 borderRight">
                <h5 className="card-title">{item.titulo}</h5>
                <p className="card-text fw-bold mb-0">{item.preco} R$ /h</p>
              </div>
              <div className="card-body card-title-display p-4">
                <h5 className="card-title">Localização</h5>
                <p className="card-text fw-bold mb-0">{item.cidade}/{item.estado}</p>
              </div>
            </Link>
        ))
        }

        {(resultados == "") &&
        <div className="text-center p-5">
        <h2 className="fs-3">Opa! Nenhum anúncio foi encontrado.</h2>
        <p>Caso queira voltar à página inicial <Link to="/" >clique aqui</Link>.</p>
        </div>
        }
        </div>
      </section>
      <Footer id="block"/>
    </>
  );
};

export default Home;
