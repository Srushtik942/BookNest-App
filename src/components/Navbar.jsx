import React from 'react'
import { FiShoppingCart } from "react-icons/fi";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className=" top-0 left-0 w-full rounded-b-sm py-5 shadow-sm  z-50">
      <nav className="flex items-center justify-between mx-5">

        {/* Menu items */}
        <ul className="flex gap-8 text-black font-semibold text-xl">
          <li className='  cursor-pointer hover:text-amber-800'><Link to="/">Home</Link></li>
          <li className='  cursor-pointer hover:text-amber-800 '><Link to ="/products">Products</Link> </li>
          <li className='  cursor-pointer hover:text-amber-800'>Blogs</li>
        </ul>

        {/* Logo / Brand name */}
        <h3 className='playfair-heading  text-gray-800 text-4xl font-stretch-110%  font-semibold '>Welcome to KitabKart.com!</h3>

        {/* Search input + Cart */}
        <div className='flex items-center gap-4'>
          <input
            id="search"
            type='text'
            placeholder="Search books..."
            className='w-40 sm:w-auto border border-gray-300 text-black rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-amber-400'
          />

          {/* Cart Icon */}
          <button className="relative">
            <FiShoppingCart size={30} className="text-gray-800 hover:text-amber-700" />

            {/* Badge for cart count */}
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
              3
            </span>
          </button>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
