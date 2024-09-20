import axios from "axios";
import { createContext ,useEffect,useState} from "react";
import { toast } from 'react-hot-toast';
export const cartContext=createContext();
export function CartContextProvider({children}){
    /************************ States ************************/
    const [allProducts, setAllProducts] = useState(null);
    const [cartId, setCartId] = useState(null);
    const [numOfCartItems, setNumOfCartItems] = useState(0);
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const [allCartProducts, setAllCartProducts] = useState(null);
    /************************ API Methods  *************************/
    /************************ addProductToCart  *************************/
    async function addProductToCart(id){
       try{
        const {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/cart',
                                {"productId": id},
                                {headers:{token:localStorage.getItem('token')}})
                              getUserCarts();                           
             return data;
            }
       catch(error){
        console.log('error ',error);
       }
    }
/*************************addProductDetailsToCart************************* */
async function addProductDetailsToCart(id) {
    try {
      const res = await addProductToCart(id);
  
      if (res.status === 'success') {
        toast.success(res.message, { duration: 2000 });
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      // Handling any unexpected errors like network issues, etc.
      toast.error('An error occurred while adding the product to the cart.');
      console.error('Error adding product to cart:', error);
    }
  }
  
/*************************getUserCarts************************* */
    async function getUserCarts(){
        try{
            const {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/cart',
            {headers:{token:localStorage.getItem('token')}});
            setNumOfCartItems(data.numOfCartItems);
            setTotalCartPrice(data.data.totalCartPrice);
            setAllCartProducts(data.data.products);
            setCartId(data.data._id);
            console.log('dddddddddddd',data.data._id);
        }catch(error){
            console.log('getUserCarts',error);
        }
    }
   /****************************deleteProduct**************************** */
   async function deleteProduct(id){
    try{
        const {data}= await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
         {headers:{token:localStorage.getItem('token')}})
         setNumOfCartItems(data.numOfCartItems);
         setTotalCartPrice(data.data.totalCartPrice);
         setAllCartProducts(data.data.products);
         return data;
    }
    catch(error){
        console.log('error',error);
    }
   }
    /****************************Clearusercart**************************** */
      async function Clearusercart(){
        try{
            const {data}= await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
             {headers:{token:localStorage.getItem('token')}})
             setNumOfCartItems(0);
             setTotalCartPrice(0);
             setAllCartProducts([]);
             return data;
        }
        catch(error){
            console.log('error',error);
        }
       }
   /****************************updateCount**************************** */
   async function updateCount(id,count){
    try{
    const {data}=await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    {'count':count},{headers:{token:localStorage.getItem('token')}})
    setNumOfCartItems(data.numOfCartItems);
    setTotalCartPrice(data.data.totalCartPrice);
    setAllCartProducts(data.data.products);
    return data;
  }
  catch(error){
   console.log('error',error);
}
   }
   /***************************************** */
    useEffect(function(){
        getUserCarts();
    },[])



    return<cartContext.Provider 
    value={{allProducts, setAllProducts,addProductToCart,addProductDetailsToCart,getUserCarts,deleteProduct,Clearusercart,updateCount,setAllCartProducts,setNumOfCartItems,setTotalCartPrice,cartId,numOfCartItems,totalCartPrice,allCartProducts}}>
        {children}
    </cartContext.Provider>
}