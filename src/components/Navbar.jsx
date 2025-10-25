import React, { useEffect, useState } from 'react';
import { FiShoppingCart } from "react-icons/fi";
import { FaHeart, FaRegHeart, FaUserCircle } from "react-icons/fa";
import { FaMapLocation } from 'react-icons/fa6';
import AddressManagement from '../pages/AddressManagement';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const userName = "Srushti";
  const [showModal, setShowModal] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // 🩷 Load Wishlist Count
  useEffect(() => {
    const loadWishlistCount = () => {
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      setWishlistCount(wishlist.length);
    };

    loadWishlistCount();
    window.addEventListener("wishlistUpdated", loadWishlistCount);
    window.addEventListener("storage", loadWishlistCount);

    return () => {
      window.removeEventListener("wishlistUpdated", loadWishlistCount);
      window.removeEventListener("storage", loadWishlistCount);
    };
  }, []);

  // 🛒 Load Cart Count
  useEffect(() => {
    const loadCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.length);
    };

    loadCartCount();
    window.addEventListener("cartUpdated", loadCartCount);
    window.addEventListener("storage", loadCartCount);

    return () => {
      window.removeEventListener("cartUpdated", loadCartCount);
      window.removeEventListener("storage", loadCartCount);
    };
  }, []);

  // 🔍 Handle Search with Enter Key
  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const query = searchQuery.trim();
      if (query) {
        navigate(`/books/search/${encodeURIComponent(query)}`);
        setSearchQuery("");
      }
    }
  };

  return (
    <div className="top-0 left-0 w-full rounded-b-sm py-5 shadow-sm z-50 bg-amber-100">
      <nav className="flex items-center justify-between mx-5">

        {/* Menu items */}
        <ul className="flex gap-8 text-black font-semibold text-xl">
          <li className="cursor-pointer hover:text-amber-800">
            <Link to="/">Home</Link>
          </li>
          <li className="cursor-pointer hover:text-amber-800">
            <Link to="/allProducts">Products</Link>
          </li>
          <li className="cursor-pointer hover:text-amber-800">
            <button
              className="flex items-center gap-2"
              onClick={() => setShowModal(true)}
            >
              <FaMapLocation className="text-lg" />
              Deliver to {userName}
            </button>
          </li>
        </ul>

        {/* Logo */}
        <h3 className="playfair-heading text-gray-800 text-4xl font-semibold">
          KitabKart.com
        </h3>

        {/* Search & Icons */}
        <div className="flex items-center gap-4 relative">
          <input
            id="search"
            type="text"
            placeholder="Search books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            className="w-40 sm:w-auto border border-gray-300 text-black rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />

          {/* Wishlist Icon */}
          <button
            onClick={() => navigate("/wishlist")}
            className="relative cursor-pointer"
          >
            <FaRegHeart size={25} className="text-gray-800 hover:text-amber-700" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
              {wishlistCount}
            </span>
          </button>

          {/* Cart Icon */}
          <button className="relative">
            <Link to="/cartPage">
              <FiShoppingCart size={30} className="text-gray-800 hover:text-amber-700" />
            </Link>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
              {cartCount}
            </span>
          </button>

          {/* Profile */}
          <div className="flex items-center cursor-pointer">
            <Link to="/profile">
              <FaUserCircle className="text-3xl text-gray-700 hover:text-black" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Address Modal */}
      {showModal && <AddressManagement onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Navbar;
