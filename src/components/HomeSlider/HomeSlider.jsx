import React from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import imgSlider_1 from "../../assets/images/slider-image-1.jpeg";
import imgSlider_2 from "../../assets/images/slider-image-2.jpeg";
import imgSlider_3 from "../../assets/images/slider-image-3.jpeg";


export default function HomeSlider() {
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000
  };
  return <>
    <Slider {...settings}>



      <div  >
        <img className='lg:h-[400px] lg:w-[100%]  ' src={imgSlider_1} alt="images" />
      </div>
      <div >
        <img className='lg:h-[400px] lg:w-[100%]' src={imgSlider_2} alt="images" />
      </div>
      <div >
        <img className='lg:h-[400px] lg:w-[100%]' src={imgSlider_3} alt="images" />
      </div>

    </Slider>
  </>
}
