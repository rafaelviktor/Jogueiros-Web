import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

import AnuncioTitLoc from "./components/Anuncio/AnuncioTituloLocal";
import AnuncioPreco from "./components/Anuncio/AnuncioPrice";
import AnuncioAutor from "./components/Anuncio/AnuncioAutor";
import AnuncioImagens from "./components/Anuncio/AnuncioImagens";
import AnuncioDescLoc from "./components/Anuncio/AnuncioDescLoc";
import Footer from "./Footer";
import NavBar from "./Navbar";

const Anuncio = () => {
  const params = useParams();
  const id = params.id

  const [data, setData] = useState({});
  const [anunciante, setAnunciante] = useState({});

  const getAd = async () => {
    try {
      let res = await fetch(`/anuncios/${id}`, {
        method: "GET",
      });

      let parseData = await res.json();
      setData(parseData.result);
      try {
        res = await fetch(`/users/${parseData.result.id_anunciante}`, {
          method: "GET",
        });
  
        parseData = await res.json();
        setAnunciante(parseData.result)
      } catch (err) {
        console.error(err.message);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getAd();
  },[]);

  const [open, setOpen] = useState(true);
  const handleClose = () => {
      setOpen(false);
  };

function SetLoading() {
  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

  return (
    <>
      <NavBar />
          <>
            {
              handleClose
            }
            <main className="d-flex flex-column align-items-center">
              <section className="container-ad">
              <div className="col"></div>
              <AnuncioTitLoc titulo={data?.titulo} />
              <div id="containerAd">
                <AnuncioImagens imgAd={data?.imagem}/>
                <aside className="anuncioAside">
                  <AnuncioPreco preco={data?.preco}/>
                  <AnuncioAutor autor={anunciante?.nome} celular={anunciante?.contato} infoAd={data}/>
                </aside>
              </div>
              <div id="containerDescr" className="mt-4">
                <AnuncioDescLoc id={data?._id} views={data?.visualizacoes} descricao={data?.descricao} cep={data?.cep} logradouro={data?.logradouro} bairro={data?.bairro} cidade={data?.cidade} />
              </div>
            </section>
          </main>
          <span className="spacing"/>
          <Footer id="block"/>
          </>
          {
          (!data) &&
            <SetLoading />
          }
    </>
  );
};

export default Anuncio;