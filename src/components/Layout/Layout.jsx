import React, { useContext } from 'react'
import Navbar from './../Navbar/Navbar';
import Footer from './../Footer/Footer';
import { Outlet } from 'react-router-dom';
import { authenticationContext } from '../../Context/authentication';
import Login from './../Login/Login';

export default function Layout() {
  const{token}=useContext(authenticationContext)
  return <>
  <Navbar/>
  {token?<Outlet/>:<Login/>}
  <Footer/>
  </>
}
