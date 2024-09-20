import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom';
import { Circles, FallingLines } from 'react-loader-spinner';
import { cartContext } from '../../Context/cartContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import Products from '../Products/Products';
import { WishlistContext } from './../../Context/wishlistContext';

export default function ProductDetails() {
  const { addProductToWishlist } = useContext(WishlistContext);
  const [sendingLoader, setSendingLoader] = useState(false);
  const { addProductToCart } = useContext(cartContext);
  const [heartStatus, setHeartStatus] = useState({});

  async function toggleHeart(id) {
    const res = await addProductToWishlist(id);
    if (res.status === 'success') {
      setHeartStatus((prev) => ({ ...prev, [id]: !prev[id] }));
      toast.success(res.message, { duration: 2000 });
    } else {
      toast.error(res.message);
    }
  };
  async function addProductDetailsToCart(id) {
    setSendingLoader(true);
    const res = await addProductToCart(id);
    if (res.status === 'success') toast.success(res.message, { duration: 2000 });
    else toast.error(res.message);
    setSendingLoader(false);
  }
  const { id } = useParams();
  console.log(id);
  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
  const { data, isLoading } = useQuery('productDetails', getProductDetails);
  console.log(data?.data.data);
  if (isLoading) {
    return <div className="d-flex justify-content-center align-items-center">
      <Circles
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  }

  return <>
    <Helmet>
      <title>{data.data.data.title.split(' ').slice(0, 2).join(' ')}</title>
    </Helmet>
    <div className='container w-[85%] mx-auto py-5'>
      <div className='flex items-center'>

        <figure className='w-[25%] bg-red-900'>
          <img src={data.data.data.imageCover} alt={data.data.data.title} />
        </figure>


        <div className='details pl-5  w-[75%]'>
          <h1 className='text-2xl '>{data.data.data.title}</h1>
          <p className='text-gray-600 py-5'>{data.data.data.description}</p>
          <h6 >{data.data.data.category.name}</h6>
          <div className='flex justify-between'>
            <h5 className='py-2'>{data.data.data.title.split(' ').slice(0, 2).join(' ')}</h5>
            <i
              onClick={() => toggleHeart(data.data.data.id)}
              className={`fa-heart cursor-pointer text-red-500  ${heartStatus[data.data.data.id] ? 'fa-solid' : 'fa-regular'
                }`}
            ></i>
          </div>
          <div className='flex justify-between'>
            <p>price: {data.data.data.price} EGP</p>
            <p>
              <i className="fa-solid fa-star  "></i>{data.data.data.ratingsAverage}</p>
          </div>

          <button onClick={function () { addProductDetailsToCart(data.data.data.id) }} className='bg-green-700 text-white  rounded w-[100%]'>
            {sendingLoader ?
              <FallingLines color="#4fa94d" width="40" visible={true} ariaLabel="falling-circles-loading" /> : ' + Add To Cart'}
          </button>


        </div>
      </div>
    </div>

  </>
}
