import React from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import "@splidejs/splide/dist/css/splide.min.css"


function AnuncioImagens(props) {
  return (
        <div className="anuncioImgSlider">
            <Splide>
                <SplideSlide>
                    <img src={`https://i.imgur.com/${props.imgAd}`} className="img-fluid-ad" alt="Imagem do Anúncio"/>
                </SplideSlide>
            </Splide>
        </div>
  )
}

export default AnuncioImagens