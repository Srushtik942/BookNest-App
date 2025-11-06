import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import { toast, ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [books, setBooks] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const { genre } = useParams();

  //  Load books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const endpoint = genre
          ? `${baseUrl}/products/genre/${genre}`
          : `${baseUrl}/books`;

        const response = await fetch(endpoint);
        const data = await response.json();
        setBooks(data.filteredBooks || data.books || []);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [baseUrl, genre]);

  //  Load wishlist from localStorage on mount
 useEffect(() => {
  try {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist"));
    if (Array.isArray(storedWishlist)) {
      setWishlist(storedWishlist);
    } else {
      setWishlist([]);
    }
  } catch (err) {
    console.error("Invalid wishlist data:", err);
    setWishlist([]);
  }
}, []);


  //  Handle Add/Remove Wishlist toggle
  const toggleWishlist = (book) => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isAlreadyWished = storedWishlist.some((item) => item._id === book._id);

    let updatedWishlist;
    if (isAlreadyWished) {
      updatedWishlist = storedWishlist.filter((item) => item._id !== book._id);
      // toast.info("Book removed from wishlist!");
    } else {
      updatedWishlist = [...storedWishlist, book];
      // toast.success("Book added to wishlist!");
    }

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setWishlist(updatedWishlist); //  Update state (triggers re-render)
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  //  Add to Cart
  const handleAddToCart = (book) => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const isAlreadyInCart = storedCart.some((item) => item._id === book._id);

    if (isAlreadyInCart) {
      toast.info("Book already in cart!");
      return;
    }

    storedCart.push(book);
    localStorage.setItem("cart", JSON.stringify(storedCart));
    window.dispatchEvent(new Event("cartUpdated"));
    toast.success("Book added to cart!");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen gap-4 relative">
      {/* Sidebar */}
      {!isSidebarOpen && (
      <button
        className="md:hidden fixed top-16 left-2 z-50 p-2  rounded-md shadow-md text-black"
        onClick={() => setIsSidebarOpen(true)}
      >
        ☰
      </button>
    )}

    {/* Mobile Overlay */}
{isSidebarOpen && (
  <div
    className="fixed inset-0 bg-black/40 z-40 md:hidden"
    onClick={() => setIsSidebarOpen(false)}
  />
)}

{/* Sidebar */}
<div
  className={` top-0 left-0 h-fit z-50 bg-white
  w-56 md:w-64
  transition-transform duration-300
  ${isSidebarOpen ? "translate-x-0" : "-translate-x-full hidden"}
  md:translate-x-0 md:static md:block`}
>
  <Sidebar setFilteredBooks={setBooks} setIsSidebarOpen={setIsSidebarOpen} />
</div>



     {/* {isSidebarOpen && (
      <div
        className="fixed inset-0 bg-opacity-40 z-30 md:hidden"
        onClick={() => setIsSidebarOpen(false)}
      ></div>
    )} */}

      {/* Main Content */}
      <div className="w-full md:flex:grow">
        {loading ? (
          <p className="text-center text-gray-500">Loading books...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-10 max-w-7xl mx-auto">
            {books.map((book) => {
              const isWished =   Array.isArray(wishlist) && wishlist.some((item) => item._id === book._id);

              return (
                <Link
                  Link to={`/newProductDetails/${book._id}`}
                 key={book._id}
                 className="w-full"
                >
                <div
                  className="rounded-2xl shadow-lg flex flex-col items-center justify-center p-3 sm:p-4 hover:bg-amber-300 hover:shadow-2xl cursor-pointer w-full"
                >
                  <img
                    className="h-48 sm:h-56 md:h-64 w-full rounded-2xl mb-3 object-cover"
                    src={book.imageUrl || "/placeholder.png"}
                    alt={book.title}
                  />
                  <h4 className="text-gray-700 font-semibold text-center">
                    {book.title}
                  </h4>
                  <p className="text-gray-700 text-sm mb-2 text-center">
                    by {book.author}
                  </p>

                  <div className="flex flex-row flex-wrap justify-center items-center gap-4 my-4">
                    <p className="text-gray-800">₹ {book.originalPrice}</p>
                    <p className="text-gray-800 flex items-center gap-1">
                      {book.rating}
                      <FaStar className="text-yellow-500 text-base" />
                    </p>
                    <p className="text-gray-800">{book.views}</p>

                    <button
                      onClick={(e) =>
                        {
                          e.preventDefault();
                          toggleWishlist(book)
                        }}
                      className="text-red-900 text-xl sm:text-2xl rounded-full cursor-pointer"
                    >
                      {isWished ? <FaHeart /> : <FaRegHeart />}
                    </button>
                  </div>

                  <button
                    onClick={(e) =>
                      {
                      e.preventDefault();
                      handleAddToCart(book)
                      }}
                    className="text-white bg-amber-800 px-3 sm:px-4 py-1 rounded-xl text-sm sm:text-base w-full hover:bg-amber-900 cursor-pointer"
                  >
                    Add to Cart
                  </button>
                </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
{/*
      <ToastContainer
       autoClose={2000}
      /> */}
    </div>
  );
};

export default ProductList;
