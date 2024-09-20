import React from 'react'
import amazonpay from "../../assets/images/Payment/amazonpay.svg"
import express from "../../assets/images/Payment/american-express.svg"
import mastercard from "../../assets/images/Payment/mastercard.svg"
import paypal from "../../assets/images/Payment/paypal.svg"
import visa from "../../assets/images/Payment/visa.svg"
import appStore from "../../assets/images/Payment/appstore-btn.svg"
import googlePlay from "../../assets/images/Payment/googleplay-btn.svg"
export default function Footer() {
  return <>
    <footer className=' bg-gray-200'>
      <div className=" mx-auto w-[85%]  pt-12 mt-5 font-sans">
        <h1>Get the FreshCart app</h1>
        <h3 className='text-gray-600 py-1'>we will send you a link , open it on your Phon to download the app.</h3>
        <input type="email" placeholder='Email..'
          className=" w-3/4 md:w-4/6 rounded-md border-0  p-2 mr-5"
        />
        <button className='bg-green-600 px-10 py-1 text-white rounded-md '
          type='submit'>Share App Link</button>
        <div className="lg:grid lg:grid-cols-2  py-8 ">
          <div className=' flex justify-center items-center py-2'>
            <p className='px-2 my-auto text-dark  font-w5'>Payment Partners</p>
            <img className='px-2' src={amazonpay} alt="amazonpay" />
            <img className='px-2' src={express} alt="express" />
            <img className='px-2' src={mastercard} alt="mastercard" />
            <img className='px-2' src={paypal} alt=" paypal" />
            <img className='px-2' src={visa} alt="visa" />



          </div>

          <div className=' flex justify-center items-center py-2'>
            <p className='  text-dark font-w5'>Get deliveries with FreshCart</p>
            <img className=' w-24 mx-1' src={appStore} alt=" app Store" />
            <img className=' w-24' src={googlePlay} alt="googlePlay" />
          </div>


        </div>

      </div>


    </footer>





  </>
}
