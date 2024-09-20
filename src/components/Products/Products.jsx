
import React, { useContext } from 'react'
import Loading from '../Loding/Loading';
import { Link } from 'react-router-dom';
import { cartContext } from './../../Context/cartContext';
import { productsContext } from './../../Context/Products';
import { WishlistContext } from './../../Context/wishlistContext';
import { Helmet } from 'react-helmet';



export default function Products() {
  const { addProductDetailsToCart } = useContext(cartContext);
  const { allProducts } = useContext(productsContext);
  const { heartStatus, toggleHeart } = useContext(WishlistContext);


  if (allProducts === null) {
    return <Loading />
  }
  return <>
    <Helmet><title>Products</title></Helmet>
    <div className=" w-[85%]  mx-auto py-5">

      <div className=" pt-3  ">
        <h2 className='pt-5 text-2xl font-bold pb-5 text-green-600'>Popular Products</h2>
        <div className='grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-4 shadow-xl'>
          {allProducts?.map(function (product, idx) {
            return <div key={idx} className=" pt-3 ">
              <div className="flex flex-col items-center product p-5 bg-white shadow-lg  group  hover:shadow-2xl  
                      transform transition-all duration-300 lg:hover:scale-105">
                <i
                  onClick={() => toggleHeart(product.id)}
                  className={`fa-heart cursor-pointer text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-right w-[100%] ${heartStatus[product.id] ? 'fa-solid' : 'fa-regular'
                    }`}
                ></i>

                <Link to={`/productDetails/${product.id}`} >

                  <img src={product.imageCover} alt={product.title} className='' />
                  <h3 className='text-green-600  '>{product.category.name}</h3>
                  <h3 className="mb-3 "> {product.title.split(" ").slice(0, 2).join(" ")}</h3>

                  <div className='flex justify-between pb-2'>
                    <p>{product.price} EGP</p>
                    <p><i className="fa-solid fa-star text-yellow-300 "></i>{product.ratingsAverage}</p>
                  </div>
                </Link>

                <button onClick={() => addProductDetailsToCart(product.id)} className='opacity-0 bg-green-700 text-white  rounded w-[80%] 
         group-hover:opacity-100 transition-opacity duration-300'>Add to Cart</button>



              </div>
            </div>
          })}
        </div>
      </div>
    </div>
  </>

}
