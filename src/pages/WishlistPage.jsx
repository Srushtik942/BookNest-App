import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import Read from "../assets/read.png";

const WishlistPage = () => {
  const [books, setBooks] = useState([]);
  const [wishlist, setWishlist] = useState(true);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const RemoveProduct = (id) => {
    const updatedBooks = books.filter((book) => book._id !== id);
    setBooks(updatedBooks);
    localStorage.setItem("wishlist", JSON.stringify(updatedBooks));
  };

  const handleToCart = () => {
    setWishlist(false);
    alert("Book added to the cart!");
  };

  useEffect(() => {
    try {
      const storedWishlist = JSON.parse(localStorage.getItem("wishlist"));

      if (storedWishlist) {
        // Convert object with numeric keys into array + remove non-object values
        const wishlistArray = Array.isArray(storedWishlist)
          ? storedWishlist
          : Object.values(storedWishlist).filter(
              (item) => typeof item === "object"
            );

        setBooks(wishlistArray);
      } else {
        setBooks([]);
      }
    } catch (error) {
      console.error("Error fetching wishlist from localStorage:", error);
      setBooks([]);
    }
  }, []);

  return (
    <div className="py-10 min-h-screen flex justify-center">
      <div className="w-full max-w-6xl px-6">
        <h2 className="text-5xl text-center text-gray-800 font-bold -my-4 mb-8">
          My Wishlist
        </h2>

        {/* Grid of book cards */}
        {Array.isArray(books) && books.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <div
                key={book._id}
                className="relative bg-yellow-200 rounded-xl shadow-md p-4 flex flex-col items-center hover:shadow-xl transition"
              >
                {/* heart icon */}
                <button
                  onClick={() => RemoveProduct(book._id)}
                  className="absolute top-3 -mx-2 right-3 text-red-500 hover:text-red-600 transition cursor-pointer"
                >
                  <FaHeart size={25} />
                </button>

                <img
                  src={book.imageUrl || Read}
                  alt={book.title}
                  className="h-50 w-50 object-cover rounded-md mb-3"
                />

                <h3 className="text-lg font-semibold text-gray-800">
                  {book.title}
                </h3>
                <p className="text-black mb-3">by {book.author}</p>
                <p className="text-black font-semibold text-xl mb-3">
                  ₹{book.originalPrice}
                </p>

                <button
                  onClick={handleToCart}
                  className="text-white bg-amber-800 px-4 py-1 rounded-lg w-full hover:bg-amber-900 cursor-pointer"
                >
                  Move To Cart
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg">
            Your wishlist is empty!
          </p>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
