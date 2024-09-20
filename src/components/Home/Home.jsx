import HomeSlider from '../HomeSlider/HomeSlider';
import CategorySlider from '../CategorySlider/CategorySlider';
import banner1 from '../../assets/images/grocery-banner.png';
import banner2 from '../../assets/images/grocery-banner-2.jpeg'
import Products from './../Products/Products';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';


export default function Home() {

   return <>
      <Helmet><title>Home</title></Helmet>
      <div className="container w-[85%]  mx-auto py-5">
         <div className="grid grid-cols-3  mx-auto  ">
            <div className="col-span-2  ">
               <HomeSlider />
            </div>
            <div className="grid grid-rows-2">
               <img className='w-[100%] h-[100%] ' src={banner1} alt="banner" />
               <img className='w-[100%] h-[100%]' src={banner2} alt="banner" />
            </div>
         </div>
         <CategorySlider />

      </div>
      <Products />
   </>

}
