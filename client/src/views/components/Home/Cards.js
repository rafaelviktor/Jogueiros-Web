import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import "@splidejs/splide/dist/css/splide.min.css"
import { Skeleton } from '@mui/material';

const Cards = () => {
  const [data, setData] = useState([]);

  const getAds = async () => {
    try {
      const res = await fetch("/anuncios/populares", {
        method: "GET",
      });

        const parseData = await res.json();
        setData(parseData.result);
    } catch (err) {
      console.error(err.message);
    }
  };
  
  useEffect(() => {
    getAds();
  },[]);

function SetSkeleton() {
  return (
      <div className="card card2">
          <Skeleton variant="rectangular" animation="wave" width={286} height={180} />
          <div className="card-body-skeleton">
              <p>
              <Skeleton variant="text" animation="wave"/>
              </p>
              <p>
                  <Skeleton variant="text" animation="wave"/>
              </p>
          </div>
      </div>
  );
}

  function GetCard(props) {
    return (
        <Link to={props.route} className="card card2">
            <img src={`https://i.imgur.com/${props.imgAd}`} className="card-img-top" alt="Imagem do Anúncio"/>
            <div className="card-body">
                <p className="card-title text-start">
                    {props.title}
                </p>
                <h5 className="card-price text-start">{props.price}  R$<span className='priceSuffix'> /h</span></h5>
            </div>
        </Link>
    );
}
    
  return (
    <div className="row">
        <Splide aria-label="Anúncios-1" options={{perPage: 4,
        breakpoints: {
		    578: {
			    perPage: 1,
		    },
        800: {
			    perPage: 2,
		    },
        1000: {
          perPage: 3,
        },
        }, gap: "3rem", pagination: false}}>
        {
        //Checar informações do anúncio, caso não haja, exibir esqueleto dos cards
        data && data.map((item, index) => (
          <SplideSlide>
            <GetCard key={index} route={`/anuncio/${item._id}`} title={item.titulo} price={item.preco} imgAd={item.imagem} />
          </SplideSlide>
        ))
        }

        {!data &&
        <>
        <SplideSlide>
        <SetSkeleton/>
        </SplideSlide>
        <SplideSlide>
        <SetSkeleton/>
        </SplideSlide>
        <SplideSlide>
        <SetSkeleton/>
        </SplideSlide>
        <SplideSlide>
        <SetSkeleton/>
        </SplideSlide>
        </>}
        </Splide>
        <span className="spacing mt-4"></span>
    </div>
  )
}

export default Cards