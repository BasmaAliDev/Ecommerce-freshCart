import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React from 'react'
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Loading from '../Loding/Loading';

export default function AllOrders() {
  const [userOrders, setUserOrders] = useState(null);

  async function getUserOrders(id) {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
      console.log("getUserOrders", data);
      setUserOrders(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    const { id } = jwtDecode(localStorage.getItem('token'));
    getUserOrders(id);
  }, [])
  if (userOrders === null) {
    return <Loading />
  }

  return <>
    <Helmet>
      <title>All Orders</title>
    </Helmet>
    <div className='w-[85%] mx-auto'>
      {userOrders.length > 0 ? (
        <>
          <div className="flex items-center justify-center shadow-lg w-max my-10 py-2  rounded-md mx-auto">
            <h1 className="text-3xl text-center font-semibold text-black p-2">Orders History</h1>
            <i className="fa-solid fa-cart-shopping fa-2x ms-2"></i>
          </div>
          {userOrders.map((order, index) => (
            <div key={index} className="lg:m-5 my-10 p-3 rounded-lg shadow-lg lg:relative ">
              <div className="lg:flex justify-between items-center">
                <h1 className="mb-5 text-green-600 text-xl">Order#{order.id}</h1>
                <h2 className="mb-8 me-12"><span className="text-green-600 font-semibold">Order Date</span>: {order.createdAt.split('').slice(0, 10).join('')}</h2>
              </div>
              {order.cartItems.map((item, index) => (
                <div key={index} className="flex items-center">
                  <img src={item.product.imageCover} className="w-36 mx-6" alt="" />
                  <div>
                    <h2 className="lg:text-xl">{item.product.title}</h2>
                    <h2 ><span className="font-semibold text-green-500">Count</span> : {item.count}</h2>
                    <h2 ><span className="font-semibold text-green-500">Price</span> : {item.price} EGP</h2>
                  </div>
                </div>
              ))}
              <div className="lg:flex items-center lg:gap-x-5 lg:absolute end-3 bottom-5 text-lg">
                <h2 className="my-2">Is Paid: <span className="bg-green-600 rounded-lg px-2 py-1 text-white">{order.isPaid ? "Yes" : "No"}</span></h2>
                <h2 className="my-2">Is Delivered: <span className="bg-red-600 rounded-lg px-2 py-1 text-white">{order.isDelivered ? "Yes" : "No"}</span></h2>
                <h2>Payment Method Type: <span className="text-green-700">{order.paymentMethodType}</span></h2>
                <h2>Total Order Price: <span className="text-green-700">{order.totalOrderPrice} EGP</span></h2>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="flex-col justify-center items-center mb-10">
          <img src={image} className="w-80 m-auto" alt="No Orders" />
          <h2 className="text-center mt-10 text-red-600 font-semibold text-3xl me-10">No orders found</h2>
          <div className="flex gap-x-2 items-center justify-center mt-3">
            <h2 className="text-center text-xl">Start Shopping and discover our great offers</h2>
            <Link to="/" className="text-green-500">Click here</Link>
          </div>
        </div>
      )}
    </div>
  </>
}
