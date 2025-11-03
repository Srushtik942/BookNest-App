

import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import Sidebar from '../components/Sidebar';
import { useParams, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const ProductList = ({ isWished }) => {
  const { genre } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const baseUrl = import.meta.env.VITE_BASE_URL;


  const getFromLocalStorage = (key) => {
    try {
      const stored = localStorage.getItem(key);
      if (!stored) return [];
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : Object.values(parsed);
    } catch (error) {
      console.error(`Error reading ${key}:`, error);
      return [];
    }
  };

  //  Save data to localStorage
  const saveToLocalStorage = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      window.dispatchEvent(new Event(`${key}Updated`));
    } catch (error) {
      console.error(`Error saving ${key}:`, error);
    }
  };


  const isInWishlist = (bookId) => wishlist.some((item) => item._id === bookId);

  const handleAddToWishlist = (book) => {
    if (isInWishlist(book._id)) {
      const updatedWishlist = wishlist.filter((item) => item._id !== book._id);
      setWishlist(updatedWishlist);
      saveToLocalStorage("wishlist", updatedWishlist);
      toast("Book removed from wishlist!");
    } else {
      const updatedWishlist = [...wishlist, book];
      setWishlist(updatedWishlist);
      saveToLocalStorage("wishlist", updatedWishlist);
      toast("Book added to wishlist!");
    }
  };


  const isInCart = (bookId) => cart.some((item) => item._id === bookId);

  const handleAddToCart = (book) => {
    if (isInCart(book._id)) {
      toast.warning("This book is already in your cart!");
      return;
    }
    const updatedCart = [...cart, book];
    setCart(updatedCart);
    saveToLocalStorage("cart", updatedCart);
    toast("Book added to cart!");
  };


  useEffect(() => {
    const fetchBooksByGenre = async () => {
      setLoading(true);
      setBooks([]);
      try {
        const response = await fetch(`${baseUrl}/products/genre/${genre}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setBooks(data.filteredBooks || data.books || []);
      } catch (error) {
        console.error("Error fetching books:", error);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    if (genre) fetchBooksByGenre();
    else setLoading(false);
  }, [genre, baseUrl]);


  useEffect(() => {
    setWishlist(getFromLocalStorage("wishlist"));
    setCart(getFromLocalStorage("cart"));
  }, []);


  return (
    <div className="flex min-h-screen relative">

{/* Sidebar Toggle for Mobile */}
{!isSidebarOpen && (
<button
  className={`md:hidden fixed top-18 left-4 z-50 p-2 rounded-md h-8 w-8 shadow-md transition-all duration-300 text-black`}
  onClick={() => setIsSidebarOpen(true)}
>
  ☰
</button>
)}




      {/* Sidebar */}
      <div
        className={`
          fixed md:relative
          top-0 left-0 h-full
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
          w-3/4 md:w-1/4
         rounded-r-xl md:rounded-xl
          z-10 transition-transform duration-300 ease-in-out p-4 md:p-0
        `}
      >
        <Sidebar setFilteredBooks={setBooks} setIsSidebarOpen={setIsSidebarOpen} />
      </div>

      {/* Main Content */}
      <div className="w-full md:w-3/4 p-4 sm:p-6 lg:p-10">
        {/* <h2 className="text-gray-700 pb-4 text-2xl sm:text-3xl playfair-heading text-center mt-12 md:mt-0 mb-6 sm:mb-10">
          {genre ? `Books in ${genre}` : "All Books"}
        </h2> */}

        {loading ? (
          <p className="text-center text-gray-600 text-lg sm:text-xl mt-10">
            Fetching books for {genre}...
          </p>
        ) : books.length === 0 ? (
          <p className="text-center text-gray-600 text-lg sm:text-xl mt-10">
            No books found for "{genre || "this category"}".
          </p>
        ) : (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
            {books.map((book) => (
              <div
                key={book._id || book.id}
                className="rounded-2xl shadow-lg flex flex-col items-center justify-center p-3 sm:p-4 hover:bg-amber-300 hover:shadow-2xl transition-all"
              >
                {/* <Link to={`/product/${book._id || book.id}`} className="w-full flex flex-col items-center"> */}
                  <img
                    className="h-48 sm:h-56 md:h-64 w-full rounded-2xl mb-3 object-cover"
                    src={book.imageUrl}
                    alt={book.title}
                  />
                  <h4 className="text-gray-700 font-semibold text-center hover:underline text-sm sm:text-base truncate w-full px-1">
                    {book.title}
                  </h4>
                {/* </Link> */}

                <p className="text-gray-700 text-xs sm:text-sm mb-2 text-center">by {book.author}</p>

                <div className="flex flex-row gap-2 sm:gap-4 my-4 sm:my-6 items-center">
                  <p className="text-gray-800 font-semibold text-sm sm:text-base">₹ {book.originalPrice}</p>
                  <p className="text-gray-800 flex items-center gap-1 text-xs sm:text-base">
                    {book.rating || 0}
                    <FaStar className="text-yellow-500 text-xs sm:text-base" />
                  </p>

                  {/* Wishlist */}
                  <button
                    onClick={() => handleAddToWishlist(book)}
                    className="text-red-900 text-xl sm:text-2xl rounded-full cursor-pointer hover:scale-110 transition-transform"
                  >
                    {isInWishlist(book._id) ? <FaHeart /> : <FaRegHeart />}
                  </button>
                </div>

                {/*  Add to Cart */}
                <button
                  onClick={() => handleAddToCart(book)}
                  className="text-white bg-amber-800 px-3 py-1 text-sm sm:text-base rounded-lg w-full hover:bg-amber-900 cursor-pointer"
                >
                  {isInCart(book._id) ? "In Cart " : "Add to Cart"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
