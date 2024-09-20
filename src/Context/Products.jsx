import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const productsContext=createContext();

export default function ProductsProvider({children}){
    const [allProducts, setAllProducts] = useState(null);
     async function getAllProducts(){
       try {
        const {data}= await axios.get('https://ecommerce.routemisr.com/api/v1/products');
        setAllProducts(data.data);
        console.log('ProductsProvider ',data.data);
       } catch (error) {
        console.log(error);
       }
      }

      

useEffect(function(){
    getAllProducts();
},[])







    return<productsContext.Provider value={{allProducts, setAllProducts}} >
{children}
    </productsContext.Provider>
}
