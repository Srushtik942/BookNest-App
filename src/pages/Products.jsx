import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaStar, FaEye, FaFire } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";

const Products = () => {
  const [book, setBook] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const { id } = useParams();

  // Load book details
  useEffect(() => {
    const loadBook = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${baseUrl}/newProductDetails/${id}`);
        const data = await response.json();
        console.log("Book data:", data);

        if (response.ok && data.book) {
          setBook(data.book);
        } else {
          toast.error("Book not found");
        }
      } catch (error) {
        console.error("Error fetching book", error);
        toast.error("Failed to load book details");
      } finally {
        setLoading(false);
      }
    };

    if (id) loadBook();
  }, [id, baseUrl]);

  //  Load wishlist
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  //  Toggle Wishlist
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
    setWishlist(updatedWishlist);
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
    // toast.success("Book added to cart!");
  };

  if (loading)
    return (
      <p className="text-center text-gray-500 mt-10">Loading book details...</p>
    );

  if (!book)
    return (
      <p className="text-center text-gray-600 mt-10">No book found.</p>
    );

  const isWished =   Array.isArray(wishlist) && wishlist.some((item) => item._id === book._id);

  return (
    <div className="flex justify-center items-center min-h-screen px-4 ">
    {/* <h2 h2 className="text-black text-3xl">Book Details</h2> */}
      <div className="bg-amber-200 rounded-2xl shadow-xl p-6 sm:p-10 max-w-5xl w-full hover:bg-amber-300 min-h-[550px]">
        <div className="flex flex-col md:flex-row items-center gap-8 ">
          <div className="relative">
          {/* Image */}
          <img
            className="w-64 h-[20rem] object-cover rounded-2xl shadow-lg"
            src={book.imageUrl || "/placeholder.png"}
            alt={book.title}
          />
          {book.bestSeller && (
              <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                <FaFire className="text-yellow-300" /> Best Seller
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {book.title}
            </h2>
            <p className="text-gray-600 text-sm mb-4">by {book.author}</p>

            <div className="flex justify-center md:justify-start items-center gap-4 text-gray-700 mb-4">
              <span className="flex items-center gap-1">
                <FaStar className="text-yellow-500" /> {book.rating}
              </span>
              <span className="flex items-center gap-1">
                <FaEye className="text-gray-600" /> {book.views}
              </span>
              <button
                onClick={() => toggleWishlist(book)}
                className="text-xl text-amber-800"
              >
                {isWished ? <FaHeart /> : <FaRegHeart />}
              </button>
            </div>

            <p className="text-gray-800 mb-2">
              <strong>Genre:</strong> {Array.isArray(book.genre) ? book.genre.join(", ") : book.genre}
            </p>

            {book.summary && (
              <p className="text-gray-700 text-base  leading-relaxed mb-4">
                {book.summary}
              </p>
            )}

            <p className="text-lg font-semibold text-gray-900 mb-4">
              ₹ {book.originalPrice}
            </p>

            <button
              onClick={() => handleAddToCart(book)}
              className="bg-amber-800 hover:bg-amber-900 text-white px-6 py-2 rounded-xl w-full sm:w-auto"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <ToastContainer
      autoClose={2000}
      />
    </div>
  );
};

export default Products;
