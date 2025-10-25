import React, { useState, useEffect } from 'react'
import Read from "../assets/read.png"
import Girls from "../assets/girls.png"
import { FiArrowDownRight, FiCheckCircle, FiLock, FiTruck } from 'react-icons/fi';
import { FaRegHeart, FaStar, FaHeart } from "react-icons/fa"
import { useNavigate } from 'react-router-dom';
import { Link } from "react-scroll";

const Mainbody = () => {
  const [books, setBooks] = useState([]);
  const [booksRate, setBooksRate] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [addToCart, setAddToCart] = useState([]);

  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  // ✅ Safely get wishlist from localStorage
  const getWishlistFromLocalStorage = () => {
    try {
      const stored = localStorage.getItem("wishlist");
      if (!stored) return [];
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : Object.values(parsed);
    } catch (error) {
      console.error("Error reading wishlist:", error);
      return [];
    }
  };

  // ✅ Save wishlist safely
  const saveWishlistToLocalStorage = (wishlist) => {
    try {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      window.dispatchEvent(new Event("wishlistUpdated"));
    } catch (error) {
      console.error("Error saving wishlist:", error);
    }
  };

  // ✅ Check if book is in wishlist
  const isInWishlist = (bookId) => {
    if (!Array.isArray(wishlist)) return false;
    return wishlist.some(item => item._id === bookId);
  };

  // ✅ Get cart from localStorage
  const getCartItemFromLocalStorage = () => {
    try {
      const cart = localStorage.getItem('cart');
      const parsed = cart ? JSON.parse(cart) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  // ✅ Save cart safely
  const isInLocalStorage = (cart) => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  };

  // ✅ Load wishlist on component mount
  useEffect(() => {
    const storedWishlist = getWishlistFromLocalStorage();
    setWishlist(storedWishlist);
  }, []);

  // ✅ Fetch all books
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/books`);
        const data = await response.json();
        setBooks(data.books || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // ✅ Fetch best-selling books
  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await fetch(`${baseUrl}/books`);
        const data = await response.json();
        const filteredBooks = (data.books || []).filter(book => book.rating > 4.7 && book.rating <= 4.9);
        setBooksRate(filteredBooks);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBookData();
  }, []);

  // ✅ Add to cart
  const handleAddToCart = (book) => {
    try {
      const existingCart = getCartItemFromLocalStorage();

      if (existingCart.some(item => item._id === book._id)) {
        alert("Book already in cart!");
        return;
      }

      const cleanBook = {
        _id: book._id,
        title: book.title,
        author: book.author,
        imageUrl: book.imageUrl,
        originalPrice: book.originalPrice,
        rating: book.rating,
        views: book.views,
        discount: book.discount
      };

      const updatedCart = [...existingCart, cleanBook];
      setAddToCart(updatedCart);
      isInLocalStorage(updatedCart);
      alert("Book added to cart!");
    } catch (error) {
      console.log("Error adding to cart", error);
    }
  };

  // ✅ Add/remove wishlist
  const handleAddToWishlist = (book) => {
    try {
      if (isInWishlist(book._id)) {
        const updatedWishlist = wishlist.filter(item => item._id !== book._id);
        setWishlist(updatedWishlist);
        saveWishlistToLocalStorage(updatedWishlist);
        alert("Book removed from wishlist!");
      } else {
        const updatedWishlist = [...wishlist, book];
        setWishlist(updatedWishlist);
        saveWishlistToLocalStorage(updatedWishlist);
        alert("Book added to wishlist!");
      }
    } catch (error) {
      console.error("Error managing wishlist:", error);
      alert("Error updating wishlist");
    }
  };

  return (
    <div className='flex flex-col items-center px-4 sm:px-5 gap-10 mb-1 w-full'>
      {/* Categories */}
      <div className='flex flex-wrap justify-center gap-3 sm:gap-5 mb-5 w-full'>
        {["Fiction", "Non-Fiction", "Sci-Fi", "Comics", "Thriller"].map(cat => (
          <div
            key={cat}
            onClick={() => navigate(`/products/${cat}`)}
            className='py-2 rounded-xl bg-yellow-800 text-base sm:text-xl px-4 sm:p-5 w-fit cursor-pointer hover:bg-amber-900'>
            <h1>{cat}</h1>
          </div>
        ))}
      </div>

      {/* Hero Section */}
      <div className='w-full flex flex-wrap items-center justify-center lg:items-start lg:justify-between xl:px-30 gap-10 lg:gap-12'>
        <div className='flex-1 min-w-[300px] max-w-full text-center lg:text-left'>
          <h2 className='playfair-heading text-gray-900 text-5xl sm:text-6xl md:text-7xl text-center lg:text-left leading-tight'>
            Experience our<br />
            New Exclusive <br />
            Books
          </h2>
          <p className='text-black bg-amber-100 w-full sm:w-fit my-5 rounded-xl px-5 py-3 mx-auto lg:mx-0'>
            Discover our hand-picked collection of exclusive titles,<br className='hidden sm:block' />
            carefully curated to spark your imagination and elevate<br className='hidden sm:block' />
            your reading experience. Dive into stories you won't<br className='hidden sm:block' />
            find anywhere else.
          </p>
          <button className='mx-auto lg:mx-0'>
            <Link
              to="bestSellingBook"
              smooth={true}
              duration={600}
              className='flex items-center gap-2 text-black rounded-2xl bg-amber-600 px-8 py-2 cursor-pointer'>
              Shop Now <FiArrowDownRight size={20} />
            </Link>
          </button>
        </div>

        {/* Images */}
        <div className='flex gap-4 sm:gap-8 md:gap-20 my-5 justify-center'>
          <div className='bg-amber-700 h-80 rounded-b-full relative hover:z-50 hover:scale-105 transition-all duration-300 -translate-y-3 sm:-translate-y-6'>
            <img className='h-50 w-50 rounded-b-3xl' src={Read} alt="read" />
          </div>
          <div className='bg-amber-700 h-80 rounded-t-full relative hover:z-50 hover:scale-105 transition-all duration-300 translate-y-3 sm:translate-y-6'>
            <img className='h-55 w-50 rounded-t-full' src={Girls} alt="girls" />
          </div>
        </div>
      </div>

      {/* Features */}
      <div className='w-full flex justify-center py-10 sm:py-16'>
        <div className='bg-white shadow-xl rounded-2xl p-6 sm:p-8 max-w-4xl w-full hover:shadow-2xl'>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-gray-200'>
            {/* Certified */}
            <div className='flex flex-col items-center text-center px-4 pt-4 sm:pt-0'>
              <FiCheckCircle size={24} className="text-yellow-800 mb-3" />
              <h4 className='font-bold text-lg text-gray-800 mb-1'>Certified</h4>
              <p className='text-sm text-gray-500'>Available certificates of the authority</p>
            </div>
            {/* Secure */}
            <div className='flex flex-col items-center text-center px-4 sm:pl-8 pt-4 sm:pt-0'>
              <FiLock size={24} className="text-yellow-800 mb-3" />
              <h4 className='font-bold text-lg text-gray-800 mb-1'>Secure</h4>
              <p className='text-sm text-gray-500'>Secure certificates of the authority</p>
            </div>
            {/* Shipping */}
            <div className='flex flex-col items-center text-center px-4 sm:pl-8 pt-4 sm:pt-0'>
              <FiTruck size={24} className="text-yellow-800 mb-3" />
              <h4 className='font-bold text-lg text-gray-800 mb-1'>Shipping</h4>
              <p className='text-sm text-gray-500'>Free, fast, and reliable worldwide</p>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Books */}
      <div className='w-full'>
        <h2 className='text-gray-700 py-4 text-4xl sm:text-5xl playfair-heading text-center mb-7'>Our Popular Books</h2>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 px-2 sm:px-10 max-w-7xl mx-auto'>
          {books.map(book => (
            <div key={book._id} className='bg-yellow-100 rounded-2xl shadow-lg flex flex-col items-center justify-center p-3 sm:p-4 hover:shadow-2xl transition-shadow cursor-pointer'>
              {/* Image remains fixed size (h-50 w-50) */}
              <img className='h-50 w-50 rounded-2xl mb-3 object-cover' src={book.imageUrl} alt={book.title} />
              <h4 className='text-gray-700 font-semibold text-center text-base sm:text-lg truncate w-full px-1'>{book.title}</h4>
              <p className='text-gray-700 text-xs sm:text-sm mb-2'>by {book.author}</p>
              <div className='flex flex-row gap-2 sm:gap-6 my-4 sm:my-6 items-center'>
                <p className='text-gray-800 text-sm sm:text-base'>₹ {book.originalPrice}</p>
                <p className='text-gray-800 flex items-center gap-1 text-sm sm:text-base'>
                  {book.rating}
                  <FaStar className="text-yellow-500 text-xs sm:text-base" />
                </p>
                <button
                  onClick={() => handleAddToWishlist(book)}
                  className="text-red-900 text-xl sm:text-2xl rounded-full cursor-pointer hover:scale-110 transition-transform">
                  {isInWishlist(book._id) ? <FaHeart /> : <FaRegHeart />}
                </button>
              </div>
              <button
                onClick={() => handleAddToCart(book)}
                className='text-white bg-amber-800 px-3 py-1 text-sm sm:text-lg rounded-lg w-full hover:bg-amber-900 cursor-pointer'>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      <hr className='text-gray-900 w-full' />

      {/* Best Selling Books */}
      <div id="bestSellingBook" className='w-full my-4'>
        <h2 className='text-gray-700 py-4 text-4xl sm:text-5xl playfair-heading text-center mb-7 '>Our Best Selling Books</h2>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 px-2 sm:px-10 max-w-7xl mx-auto'>
          {booksRate.map(book => (
            <div key={book._id} className='rounded-2xl shadow-lg flex flex-col items-center justify-center p-3 sm:p-4 hover:shadow-2xl transition-shadow cursor-pointer'>
              {/* Image remains fixed size (h-50 w-50) */}
              <img className='h-50 w-50 rounded-2xl mb-3 object-cover' src={book.imageUrl} alt={book.title} />
              <h4 className='text-gray-700 font-semibold text-center text-base sm:text-lg truncate w-full px-1'>{book.title}</h4>
              <p className='text-gray-700 text-xs sm:text-sm mb-2'>by {book.author}</p>
              <div className='flex flex-row gap-2 sm:gap-6 my-4 sm:my-6 items-center'>
                <p className='text-gray-800 text-sm sm:text-base'>₹ {book.originalPrice}</p>
                <p className='text-gray-800 flex items-center gap-1 text-sm sm:text-base'>
                  {book.rating}
                  <FaStar className="text-yellow-500 text-xs sm:text-base" />
                </p>
                <button
                  onClick={() => handleAddToWishlist(book)}
                  className="text-red-900 text-xl sm:text-2xl rounded-full cursor-pointer hover:scale-110 transition-transform">
                  {isInWishlist(book._id) ? <FaHeart /> : <FaRegHeart />}
                </button>
              </div>
              <button
                onClick={() => handleAddToCart(book)}
                className='text-white bg-amber-800 px-3 py-1 w-full rounded-lg text-sm sm:text-lg hover:bg-amber-900 cursor-pointer'>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Mainbody;