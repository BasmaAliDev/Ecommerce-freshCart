import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";



export const WishlistContext=createContext();

export default function WishlistProvider({children}){
    const [allWishlist, setAllWishlist] = useState(null);
    const [count, setCount] = useState(0);
    const [heartStatus, setHeartStatus] = useState({});

       /*********************** add product to wishlist *******************/
       async function addProductToWishlist(productId){
        try {
         const {data}=  await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
             {"productId": productId},
             {headers:{token:localStorage.getItem('token')}});
             getUserWishlist();
             console.log(data);
             return data;
 
        } catch (error) {
         console.log("addProductToWishlist ",error);
        }
     }
 /*********************** toggleHeart *******************/
    async function toggleHeart (id)  {
      const res = await addProductToWishlist(id);
      if (res.status === 'success') {
        setHeartStatus((prev) => ({ ...prev, [id]: !prev[id] }));
        toast.success(res.message, { duration: 2000 });
      } else {
        toast.error(res.message);
      }
    };
 

    /************************ get user wishlist ***********************/
    async function getUserWishlist(){
        try {
            const {data}=  await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
                {headers:{token:localStorage.getItem('token')}});
                setAllWishlist(data.data);
                setCount(data.count);
        } catch (error) {
            console.log('wishlist error ' ,error);
        }

    }

     /************************ delete product from wishlist ***********************/
     async function deleteProductFromWishlist(id){
        try {
            const {data}=  await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
                {headers:{token:localStorage.getItem('token')}});
                getUserWishlist();
                console.log(data);
                return data;
    
           } catch (error) {
            console.log("deleteProductFromWishlist ",error);
           }
     }

    useEffect(function(){
        getUserWishlist();
    },[])
    return <WishlistContext.Provider value={{count,allWishlist,heartStatus, setHeartStatus,toggleHeart,addProductToWishlist,deleteProductFromWishlist}}>
            {children}
    </WishlistContext.Provider>
}