import React, { useEffect } from 'react'
import { FiShoppingCart } from "react-icons/fi";
import {FaHeart, FaRegHeart,FaUserCircle } from "react-icons/fa"
import { FaMapLocation } from 'react-icons/fa6';
import AddressManagement from '../pages/AddressManagement';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const userName = "Srushti"
  const [showModal, setShowModal] = useState(false);
  const [wishlistCount, setWishlistCount]= useState(0);
  const [product,setProduct] = useState([]);
  const [cartCount,setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;




  useEffect(()=>{
    const loadWishlistCOunt = () =>{
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistCount(wishlist.length);
    }
    loadWishlistCOunt();


      window.addEventListener("wishlistUpdated", loadWishlistCOunt);
      window.addEventListener("storage", loadWishlistCOunt);

    return () => {
      window.removeEventListener("storage", loadWishlistCOunt);
        };

  },[]);

  useEffect(()=>{
    const loadCartCount = () =>{
      const itemCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(itemCart.length);
    }
   loadCartCount();

   window.addEventListener("DOMContentLoadedcartUpdated",loadCartCount);
   window.addEventListener("storage",loadCartCount);

   return()=>{
    window.removeEventListener("storage",loadCartCount);
   }
  },[]);

  useEffect(()=>{
     if (!searchQuery) return;
    const findBooks = async () =>{
      try {
      const response = await fetch(`${baseUrl}/books/search/${encodeURIComponent(searchQuery)}`);
      if (!response.ok) throw new Error("Failed to fetch books");
      const data = await response.json();
      setSearchResults(data); // save results to state
    } catch (error) {
      console.error("Error fetching books:", error);
    }

    }
    findBooks();
  },[searchQuery])



  return (
    <div className=" top-0 left-0 w-full rounded-b-sm py-5 shadow-sm  z-50">
      <nav className="flex items-center justify-between mx-5">

        {/* Menu items */}
        <ul className="flex gap-8 text-black font-semibold text-xl">
          <li className='  cursor-pointer hover:text-amber-800'><Link to="/">Home</Link></li>
          <li className='  cursor-pointer hover:text-amber-800 '
          // onClick={handleClickProduct}
          ><Link to ="/allProducts">Products</Link> </li>
          <li className='cursor-pointer hover:text-amber-800'>
             <button
              className="flex items-center gap-2 cursor-pointer hover:text-amber-800"
              onClick={() => setShowModal(true)}
            >
              <FaMapLocation className='text-lg' />
              Deliver to {userName}
            </button>
          </li>
        </ul>

        {/*   name */}
        <h3 className='playfair-heading  text-gray-800 text-4xl font-stretch-110%  font-semibold '> KitabKart.com</h3>

        {/* Search  */}
        <div className='flex items-center gap-4 relative'>
          <input
            id="search"
            type='text'
            placeholder="Search books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-40 sm:w-auto border border-gray-300 text-black rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-amber-400'
          />

           {searchResults.length > 0 && (
    <div className="absolute mt-2 w-64 max-h-60 overflow-y-auto bg-white border border-gray-300 rounded shadow-lg z-50">
      {searchResults.map((book) => (
        <Link
          to={`/book/${book._id}`}
          key={book._id}
          className="block px-3 py-2 hover:bg-amber-100 text-gray-800"
        >
          {book.title}
        </Link>
      ))}
    </div>
  )}

          {/* WIshlist icon */}
          <button
          onClick={()=>navigate("/wishlist")}
          className='relative cursor-pointer'>
            <FaRegHeart size={25}className="text-gray-800 hover:text-amber-700"/>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
             {wishlistCount}
            </span>

          </button>

          {/* Cart Icon */}
          <button className="relative">
            <Link to="/cartPage">
            <FiShoppingCart size={30} className="text-gray-800 hover:text-amber-700" />
            </Link>

            {/* Badge for cart count */}
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
              {cartCount}
            </span>
          </button>

          {/* profile */}

  <div className="flex items-center cursor-pointer">

          <Link to="/profile">
          <FaUserCircle className="text-3xl text-gray-700 hover:text-black" /></Link>

</div>
        </div>
      </nav>
      {/* modal */}
       {showModal && (
        <AddressManagement onClose={() => setShowModal(false)} />
      )}
    </div>
  )
}

export default Navbar
