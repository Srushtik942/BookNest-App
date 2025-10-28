
import React, { useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { FaHeart, FaRegHeart, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { FaMapLocation } from "react-icons/fa6";
import AddressManagement from "../pages/AddressManagement";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const userName = "Srushti";
  const [showModal, setShowModal] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Load Wishlist Count
  useEffect(() => {
    const loadWishlistCount = () => {
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      setWishlistCount(Array.isArray(wishlist) ? wishlist.length : Object.values(wishlist).length);
    };
    loadWishlistCount();
    window.addEventListener("wishlistUpdated", loadWishlistCount);
    window.addEventListener("storage", loadWishlistCount);

    return () => {
      window.removeEventListener("wishlistUpdated", loadWishlistCount);
      window.removeEventListener("storage", loadWishlistCount);
    };
  }, []);

  // Load Cart Count
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
    <header className="top-0 left-0 w-full bg-amber-100 shadow-sm z-50">
      <nav className="flex items-center justify-between mx-5 py-4">
        {/* Left: Logo */}
        <h3
          className="playfair-heading text-gray-800 text-3xl sm:text-4xl font-semibold cursor-pointer"
          onClick={() => navigate("/")}
        >
          KitabKart.com
        </h3>

        {/* Middle: Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-black font-semibold text-lg">
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

        {/* Right: Search + Icons */}
        <div className="flex items-center gap-4">
          <input
            id="search"
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            className="hidden sm:block w-40 md:w-52 border border-gray-300 text-black rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />

          {/* Wishlist */}
          <button
            onClick={() => navigate("/wishlist")}
            className="relative cursor-pointer"
          >
            <FaRegHeart size={23} className="text-gray-800 hover:text-amber-700" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
              {wishlistCount}
            </span>
          </button>

          {/* Cart */}
          <button className="relative">
            <Link to="/cartPage">
              <FiShoppingCart size={25} className="text-gray-800 hover:text-amber-700" />
            </Link>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
              {cartCount}
            </span>
          </button>

          {/* Profile */}
          <Link to="/profile">
            <FaUserCircle className="text-3xl text-gray-700 hover:text-black" />
          </Link>

          {/* Hamburger Icon (Mobile) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-800 text-2xl ml-2 focus:outline-none"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-amber-50 border-t border-gray-200">
          <ul className="flex flex-col items-center gap-4 py-4 text-gray-800 font-semibold text-lg">
            <li>
              <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            </li>
            <li>
              <Link to="/allProducts" onClick={() => setIsMenuOpen(false)}>Products</Link>
            </li>
            <li>
              <button
                onClick={() => {
                  setShowModal(true);
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-2"
              >
                <FaMapLocation className="text-lg" />
                Deliver to {userName}
              </button>
            </li>
            <li>
              <input
                id="search"
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                className="w-60 border border-gray-300 text-black rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </li>
          </ul>
        </div>
      )}

      {/* Address Modal */}
      {showModal && <AddressManagement onClose={() => setShowModal(false)} />}
    </header>
  );
};

export default Navbar;
