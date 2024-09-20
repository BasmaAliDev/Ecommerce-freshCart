import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from '../Loding/Loading';

export default function CategorySlider() {
  function getAllCategories() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }
  const { data, isLoading } = useQuery('allCategories', getAllCategories);
  if (isLoading) {
    return <Loading />
  }

  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 500,
    dots: true
  };
  return <>
    <h3 className='pt-5 text-2xl font-bold text-center py-5'>Shop Popular Categories</h3>
    <Slider {...settings}>
      {data?.data.data.map(function (category, idx) {
        return <div key={idx} className="">
          <div className="item">
            <img className='lg:w-[200px] lg:h-[200px] md:w-[150px] md:h-[150px] ' src={category.image} alt="" />
            <h5 >{category.name}</h5>

          </div>
        </div>
      })}
    </Slider>
  </>
}


