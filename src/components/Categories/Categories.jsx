import React from 'react'
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Circles } from 'react-loader-spinner';
import Loading from '../Loding/Loading';
import { Link } from 'react-router-dom';

export default function Categories() {

  function getAllCategories() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }
  const { data, isLoading } = useQuery('allCategories', getAllCategories);
  if (isLoading) {
    return <Loading />
  }


  return <>
    <Helmet>
      <title>Categories</title>
    </Helmet>
    <div className='w-[85%] mx-auto py-10'>
      <div className='flex flex-wrap justify-center items-center gap-10'>
        {data?.data.data.map(function (category, idx) {
          return <div key={idx} className="w-max ">
            <Link to={`/ProductsWithCategory/${category.name}`}>
              <div className=" shadow-lg  p-8">
                <img style={{ width: '250px', height: '250px' }} src={category.image} alt="" />
                <h5>{category.name}</h5>

              </div>
            </Link>
          </div>
        })}
      </div>
    </div>
  </>
}
