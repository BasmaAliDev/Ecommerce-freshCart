import axios from 'axios'
import React, { useContext } from 'react'
import { WishlistContext } from '../../Context/wishlistContext'
import { cartContext } from '../../Context/cartContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Wishlist() {
  const { allWishlist, count, deleteProductFromWishlist } = useContext(WishlistContext);
  const { addProductToCart } = useContext(cartContext);
  async function addProductDetailsToCart(id) {
    const res = await addProductToCart(id);
    if (res.status === 'success') toast.success(res.message, { duration: 2000 });
    else toast.error(res.message)

  }
  console.log(allWishlist);

  return <>
  <Helmet><title>Wishlist</title></Helmet>
    <section className='py-5 '>
      <div className="container w-[85%] mx-auto pt-10 ">
        <div className='flex flex-col items-center'>
          <div>
            <p className='text-center  text-3xl'><i class="fa-regular fa-heart text-red-600"></i></p>
            <h2 className='text-center pb-3 '>MY Wishlist </h2>
            <p className='text-center pb-5'>There are {count} products in this wishlist.</p>
          </div>
          {allWishlist.length > 0 ?
            <table className='w-3/4 shadow-lg '>
              <tbody>
                {allWishlist.map(function (item, idx) {
                  console.log(item);
                  return <tr className='flex items-center justify-between shadow-lg p-5' key={idx}>
                    <div className='flex items-center w-1/4'>
                      <i onClick={function () { deleteProductFromWishlist(item.id) }} style={{ cursor: 'pointer' }} class="me-4 cursor-pointer fa-solid fa-x"></i>
                      <img className='w-16 md:w-32 max-w-full max-h-full' src={item.imageCover} alt="Image Cover" />

                    </div>
                    <div className=' my-5 text-xl text-gray-600'>{item.title}</div>
                    <div className=' my-5 font-semibold text-black '>{item.price} EGP</div>
                    <div >
                      <button onClick={() => addProductDetailsToCart(item.id)}
                        className='my-5  w-full  btn p-2 text-center flex items-center justify-center'>Add to Cart

                        <i class="ms-2 fa-solid fa-cart-shopping text-white text-xl"></i>
                      </button>
                    </div>


                  </tr>



                })}

              </tbody>
            </table>
            :
            <Link to={'/home'} className='py-5 shadow-lg w-3/4 flex flex-col  items-center'>


              <i class="ms-2 fa-solid fa-cart-shopping text-green-700 text-9xl"></i>
              <p className='pt-5  text-center text-lg font-semibold text-green-700'>No Products In Your Wishlist
                <br />
                <span className='text-center '>Shoping now</span>
              </p>
            </Link>}
        </div>
      </div>
    </section>

  </>
}
