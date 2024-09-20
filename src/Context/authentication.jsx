import { createContext, useEffect, useState } from "react";

export const authenticationContext = createContext();

export function AuthenticationProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);  
    }
  }, []);

  return (
    <authenticationContext.Provider value={{ token, setToken }}>
      {children}
    </authenticationContext.Provider>
  );
}
