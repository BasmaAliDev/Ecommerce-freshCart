import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from './../Loding/Loading';
import { Helmet } from "react-helmet";

export default function Brands() {
  let [brands, setBrands] = useState([]);
  async function getBrands() {
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then((resp) => {
        setBrands(resp.data.data);
      })
      .catch(() => { });
  }



  useEffect(() => {
    getBrands();
  }, []);

  return (
    <>
      <Helmet><title>Brands</title></Helmet>
      <div className="w-[85%] mx-auto text-gray-600 mt-14 ">
        <div className="flex gap-x-10 justify-center flex-wrap">
          {brands.length > 0 ? (
            brands.map((brand, index) => (

              <div key={index} className=" lg:w-1/4 h-[350px]">
                <Link to={`/ProductsWithSameBrand/${brand.name}`}>
                  <img
                    src={brand?.image}
                    className="shadow-lg w-96 transform transition-transform duration-300 hover:scale-105 border"
                    alt=""
                  />
                </Link>
              </div>
            ))
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </>
  );
}