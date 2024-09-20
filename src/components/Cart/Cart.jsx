import axios from 'axios'
import React, { useContext } from 'react'

import { cartContext } from '../../Context/cartContext'
import { Circles } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Loading from '../Loding/Loading';

export default function Cart() {
  const { numOfCartItems, totalCartPrice, allCartProducts, deleteProduct, Clearusercart, updateCount } = useContext(cartContext);

  async function deleteElement(id) {
    const res = await deleteProduct(id);
    if (res.status === 'success') toast.success("Product Removed Successfully", { duration: 2000 });
    else toast.error("Error occurred");
  }

  async function updateElementcount(id, count) {
    if (count > 0) {
      const res = await updateCount(id, count);
      if (res.status === 'success') toast.success("Count Update Successfully", { duration: 2000 });
      else toast.error("Error occurred");
    }
    if (count <= 0) { deleteElement(id); }

  }
  async function deleteUserCart() {
    await Clearusercart();
  }


  if (allCartProducts === null) {
    return <Loading />
  }

  if (allCartProducts.length === 0) {
    return <div className=' w-[85%] mx-auto  py-20'>
      <div className='flex justify-center items-center'>
        <Link to={'/home'} className='py-5 shadow-lg w-3/4 flex flex-col  items-center'>


          <i class="ms-2 fa-solid fa-cart-shopping text-green-700 text-9xl"></i>
          <p className='pt-5  text-center text-lg font-semibold text-green-700'>No Products In Your Wishlist
            <br />
            <span className='text-center '>Shoping now</span>
          </p>
        </Link>
      </div>
    </div>
  }



  return <>
    <Helmet><title>Cart</title></Helmet>
    <div className=' w-[85%] mx-auto  '>
      <h6 className='text-black font-bold text-xl py-5'>Total Items : {numOfCartItems} </h6>

      <div className='cart flex lg:flex-row   sm:flex-col-reverse'>

        <div className='lg:w-3/4 py-5 shadow-lg '>
          {allCartProducts.map(function (product, idx) {
            return <div key={idx} className=" border-b-1  p-3">
              <div className="  lg:flex justify-between items-center px-10">
                <figure className='lg:flex items-center text-xl' >
                  <img className='w-16 md:w-32 max-w-full max-h-full me-4' src={product.product.imageCover} alt="Image Cover" />
                  <figcaption><p className='pl-5'>{product.product.title}</p></figcaption>
                </figure>
                <h6 className='font-bold md:text-xl'>Price : {product.price}</h6>
              </div>

              <div className="flex justify-between pe-2">
                <button onClick={() => deleteElement(product.product.id)} className="lg:ms-10 font-medium text-red-600 hover:bg-red-300 px-2 m-3 rounded-md">
                  <i className="fa-regular fa-trash-can me-2"></i>REMOVE
                </button>
                <div className="flex items-center">
                  <button onClick={() => updateElementcount(product.product.id, product.count - 1)}
                    className="px-4 py-1 m-3 bg-green-600 text-sm font-medium text-white rounded-md" type="button">
                    <i className="fa-solid fa-minus"></i>
                  </button>
                  <div><span>{product.count}</span></div>
                  <button onClick={() => updateElementcount(product.product.id, product.count + 1)}
                    className="px-4 py-1 m-3 bg-green-600 text-sm font-medium text-white rounded-md " type="button">
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </div>
              </div>


            </div>
          })}

        </div>


        <div className=' lg:block lg:w-1/4 h-[200px] mx-10 bg-gray-100 p-5 rounded-lg shadow-lg'>

          <h4 className='md:text-base border-b border-gray-400 py-3 font-bold'>CART SUMMARY</h4>
          <h6 className=' md:text-base border-b border-gray-400 py-3 '>Total Cart Price
            <span className='font-bold pl-10'>{totalCartPrice} EGP</span>  </h6>

          <Link to={'/payment'} className='btn py-2 text-center flex items-center justify-center my-4'>
            CheckOut Now</Link>
        </div>
      </div>
      <button onClick={deleteUserCart} className='lg:ms-10 font-medium bg-red-600 text-white p-2 m-3 rounded-md'>Clear user cart</button>
    </div>
  </>
}