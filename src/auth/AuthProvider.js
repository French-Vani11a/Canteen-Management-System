
import React, { createContext, useContext, useState } from 'react'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const [loggedInUserDetails, setLoggedInUserDetails] = useState(null)
  const [orderNumber, setOrderNumber] = useState(null)
  const [isStudent, setIsStudent] = useState(true)
  const [cartItems, setCartItems] = useState(0)  
  const [cartInfo, setCartInfo] = useState(
    {
      totalItems: 0,
      totalAmount: 0,
      cartItems: {
        // '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
        //   item_name: description,
        //   description: description,
        //   cost_per_item_in_cents: 0,
        //   item_count: 0,
        //   total_cost_of_item_count: 0
        // } 
      }
    }
  )

  const login = () => {
    setIsAuthenticated(true)
  }
  const logout = () => {
    setLoggedInUserDetails(null)
    // if(localStorage.getItem("isAunthenticated")) {
    //   localStorage.setItem("isAunthenticated", false) 
    // }
    setCartInfo({
      totalItems: 0,
      totalAmount: 0,
      cartItems: { 
      }
    })
    localStorage.clear()
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, login, logout, cartItems, setCartItems, cartInfo, setCartInfo, loggedInUserDetails, setLoggedInUserDetails, isStudent, setIsStudent, orderNumber, setOrderNumber }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
