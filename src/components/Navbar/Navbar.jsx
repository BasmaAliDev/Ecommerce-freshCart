import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // Import NavLink
import freshcartLogo from '../../images/freshcart-logo.svg';
import { authenticationContext } from '../../Context/authentication';
import { cartContext } from '../../Context/cartContext';
import { WishlistContext } from '../../Context/wishlistContext';

export default function Navbar() {
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);
  const { numOfCartItems } = useContext(cartContext);
  const { count } = useContext(WishlistContext);
  const { token, setToken } = useContext(authenticationContext);
  const navigateToLogin = useNavigate();

  function logOut() {
    localStorage.removeItem('token');
    setToken(null);
    navigateToLogin('/login');
  }

  const handleToggle = () => {
    setIsNavbarCollapsed(!isNavbarCollapsed);
  };
  const closeNavbar = () => {
    setIsNavbarCollapsed(true);
  };

  const activeClassName = 'text-green-600 underline underline-offset-4'; 
  const defaultClassName = 'text-black hover:text-green-600 focus:text-green-700';

  return (
    <nav className="bg-white border-b border-gray-200 py-4">
      <div className=" w-3/4 mx-auto px-4 flex lg:flex-row">
        <div className="test1 flex">
          <NavLink className="text-lg font-semibold" to="home">
            <img src={freshcartLogo} alt="FreshCart Logo" className="w-max" />
          </NavLink>
          <button
            className="lg:hidden md:block"
            type="button"
            onClick={handleToggle}
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className={`fa-solid ${isNavbarCollapsed ? 'fa-bars' : 'fa-xmark'} text-right w-[100%] text-xl`}></i>
          </button>
        </div>

        <div
          className={`${
            isNavbarCollapsed ? 'hidden' : 'block shadow-lg border-t border-gray-200'
          } test lg:block lg:flex lg:items-center lg:justify-between pl-5 lg:space-x-6 ml-auto w-[100%]`}
          id="navbarSupportedContent"
        >
          <ul className="flex space-x-4" onClick={closeNavbar}>
            {token ? (
              <>
                <li >
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? activeClassName : defaultClassName
                    }
                    to="home"
                  >
                    Home
                  </NavLink>
                </li>

                <li >
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? activeClassName : defaultClassName
                    }
                    to="products"
                  >
                    Products
                  </NavLink>
                </li>
                <li >
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? activeClassName : defaultClassName
                    }
                    to="Categories"
                  >
                    Categories
                  </NavLink>
                </li>
                <li >
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? activeClassName : defaultClassName
                    }
                    to="brands"
                  >
                    Brands
                  </NavLink>
                </li>

                <li >
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? activeClassName : defaultClassName
                    }
                    to="allorders"
                  >
                    MyOrders
                  </NavLink>
                </li>
              </>
            ) : (
              ''
            )}
          </ul>

          <ul className="flex space-x-4 ml-auto">
            <li className="nav-item relative">
              <NavLink
                className={({ isActive }) =>
                  isActive ? activeClassName : defaultClassName
                }
                to="wishlist"
              >
                <i className="fa-solid fa-heart fa-xl"></i>
                <span className="bg-red-600 text-white text-xs font-bold rounded-full absolute -top-2 -right-2 px-2 py-0.5">
                  {count}
                </span>
              </NavLink>
            </li>
            <li className="nav-item relative">
              <NavLink
                className={({ isActive }) =>
                  isActive ? activeClassName : defaultClassName
                }
                to="cart"
              >
                <i className="fa-solid fa-cart-shopping fa-xl"></i>
                <span className="bg-red-600 text-white text-xs font-bold rounded-full absolute -top-2 -right-2 px-2 py-0.5">
                  {numOfCartItems}
                </span>
              </NavLink>
            </li>

            {/* Social Media Links */}
            <li className="cursor-pointer">
              <i className="fa-brands fa-instagram text-black"></i>
            </li>
            <li className="cursor-pointer">
              <i className="fa-brands fa-facebook text-black"></i>
            </li>
            <li className="cursor-pointer">
              <i className="fa-brands fa-tiktok text-black"></i>
            </li>
            <li className="cursor-pointer">
              <i className="fa-brands fa-youtube text-black"></i>
            </li>

            {token ? (
              <li >
                <span
                  className="text-black hover:text-green-600 focus:text-green-700 cursor-pointer"
                  onClick={logOut}
                >
                  Logout
                </span>
              </li>
            ) : (
              <>
                <li >
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? activeClassName : defaultClassName
                    }
                    to="register"
                  >
                    Register
                  </NavLink>
                </li>
                <li >
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? activeClassName : defaultClassName
                    }
                    to="login"
                  >
                    Login
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
