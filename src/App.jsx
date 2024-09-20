import React from 'react'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import Products from './components/Products/Products';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import { AuthenticationProvider } from './Context/authentication';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductDetails from './components/ProductDetails/ProductDetails';
import { CartContextProvider } from './Context/cartContext';
import { Toaster } from 'react-hot-toast';
import Payment from './components/Payment/Payment';
import AllOrders from './components/AllOrders/AllOrders';
import { Offline } from 'react-detect-offline';
import ProductsProvider from './Context/Products';
import Wishlist from './components/Wishlist/Wishlist';
import WishlistProvider from './Context/wishlistContext';
import Categories from './components/Categories/Categories';
import Brands from './components/Brands/Brands';
import ProductsWithCategory from './components/ProductsWithCategory/ProductsWithCategory';
import ProductsWithSameBrand from './components/ProductsWithSameBrand/ProductsWithSameBrand';
import NotFound from './components/NotFound/NotFound';







const router=createBrowserRouter([
  {path:'/',element:<Layout/>,children:[
    {path:'/',element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:'home',element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:'cart',element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:'categories',element:<ProtectedRoute><Categories/></ProtectedRoute>},
    {path:'products',element:<ProtectedRoute><Products/></ProtectedRoute>},
    {path:'productDetails/:id',element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path:'ProductsWithCategory/:categoryName',element:<ProtectedRoute><ProductsWithCategory/></ProtectedRoute>},
    {path:'ProductsWithSameBrand/:brandName',element:<ProtectedRoute><ProductsWithSameBrand/></ProtectedRoute>},
    {path:'wishlist',element:<ProtectedRoute><Wishlist/></ProtectedRoute>},
    {path:'brands',element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:'payment',element:<ProtectedRoute><Payment/></ProtectedRoute>},
    {path:'allorders',element:<ProtectedRoute><AllOrders/></ProtectedRoute>},
    {path:'register',element:<Register/>},
    {path:'login',element:<Login/>},
    {path:'*',element:<NotFound/>},
  ]}
])
export default function App() {
  let clientQuery=new QueryClient();
  return <>
  <QueryClientProvider client={clientQuery}>
    <WishlistProvider>
    <CartContextProvider>
  <AuthenticationProvider>
    <ProductsProvider>
  <RouterProvider router={router}/>
  </ProductsProvider>
  </AuthenticationProvider>
  </CartContextProvider>
  </WishlistProvider>
  <Toaster />
  </QueryClientProvider>
  <Offline>
<div className='bg-info position-fixed'>
Only shown offline (surprise!)
</div>
</Offline>
  </>
}
