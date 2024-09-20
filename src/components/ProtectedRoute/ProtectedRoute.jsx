/*import React, { useContext } from 'react'
import { authenticationContext } from '../../Context/authentication'
import { Navigate } from 'react-router-dom';



export default function ProtectedRoute({children}) {
 
  
    const {token}=useContext(authenticationContext);
    console.log("============================",token);
    console.log("ProtectedRoute",token);
    if(token===null){return <Navigate to={'/login'}/>}
  return <>
  {children}
  </>
}*/
import React, { useContext, useEffect, useState } from 'react';
import { authenticationContext } from '../../Context/authentication';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const { token } = useContext(authenticationContext);
  const [isLoaded, setIsLoaded] = useState(false);
 
  useEffect(() => {
    // Ensure token is loaded before rendering
    if (token !== null) {
      setIsLoaded(true);
    }
  }, [token]);

  if (!isLoaded) {
    return <div>Loading...</div>; // Render a loading spinner if needed
  }

  if (!token) {
    return <Navigate to={'/login'} />;
  }

  return <>{children}</>;
}
