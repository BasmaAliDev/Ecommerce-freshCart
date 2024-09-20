import React, { useContext } from 'react'
import { cartContext } from '../../Context/cartContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function Payment() {
    const { setAllCartProducts, setNumOfCartItems, setTotalCartPrice, cartId } = useContext(cartContext);
    async function confirmCashPayment() {
        const phoneValue = document.getElementById('phone').value;
        const cityValue = document.getElementById('city').value;
        const detailsValue = document.getElementById('details').value;
        const shippingAddress = {
            "details": detailsValue,
            "phone": phoneValue,
            "city": cityValue
        }
        try {
            const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, shippingAddress,
                { headers: { token: localStorage.getItem('token') } }); console.log(data);
            if (data.status === 'success') {
                setAllCartProducts([]);
                setNumOfCartItems(0);
                setTotalCartPrice(0);
                toast.success('Order Successfully initalized ', { duration: 2000 });
            }
            else toast.error('Error on creating Order');


        } catch (error) {
            console.log('payment ', error);
        }

    }
    async function confirmOnlinePayment() {
        const phoneValue = document.getElementById('phone').value;
        const cityValue = document.getElementById('city').value;
        const detailsValue = document.getElementById('details').value;
        const shippingAddress = {
            "details": detailsValue,
            "phone": phoneValue,
            "city": cityValue
        }
        try {
            const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`, shippingAddress,
                {
                    headers: { token: localStorage.getItem('token') },
                    params: { url: 'http://localhost:5173' }
                });
            window.open(data.session.url, '_blank');


        } catch (error) {
            console.log('payment2 ', error);
        }

    }
    return <>
        <Helmet>
            <title>Payment</title>
        </Helmet>
        <div className='container w-[85%] mx-auto py-8 '>
            <form className='w-1/2 m-auto py-5'>
                <input id='phone' type="tel" placeholder='Phone' className='w-full p-2 border-0 border-b border-gray-300 rounded mb-4
                    focus:outline-none focus:ring-0 focus:ring-green-600' />


                <input id='city' type="text" placeholder='City' className='w-full p-2 border-0 border-b border-gray-300 rounded mb-4
                    focus:outline-none focus:ring-0 focus:ring-green-600' />


                <input id='details' type="tex" placeholder='Details' className='w-full p-2 border-0 border-b border-gray-300 rounded mb-4
                    focus:outline-none focus:ring-0 focus:ring-green-600' />
                <button onClick={confirmCashPayment} type='button' className='bg-green-700 px-8 py-2 text-white rounded-md m-1'>Confirm Cash Payment</button>
                <button onClick={confirmOnlinePayment} type='button' className='bg-green-700 px-8 py-2 text-white rounded-md m-1'>Confirm Online Payment</button>
            </form>
        </div>
    </>


}
