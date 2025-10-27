import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const SearchResults = () => {
  const { bookName } = useParams();
  const [books, setBooks] = useState([]);
  const [wishlist, setWishlist] = useState({});
  const [cart, setCart] = useState({});
  const baseUrl = import.meta.env.VITE_BASE_URL;

  // Load wishlist and cart from localStorage on mount
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || {};
    const storedCart = JSON.parse(localStorage.getItem("cart")) || {};
    setWishlist(storedWishlist);
    setCart(storedCart);
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${baseUrl}/books/search/${bookName}`);
        const data = await response.json();
        setBooks(data.result || []);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, [bookName]);

  const handleAddToWishlist = (bookId) => {
    setWishlist((prev) => {
      const updated = { ...prev, [bookId]: !prev[bookId] };
      localStorage.setItem("wishlist", JSON.stringify(updated));
      return updated;
    });
    alert("Wishlist updated!");
  };

  const handleAddToCart = (bookId) => {
    setCart((prev) => {
      const updated = { ...prev, [bookId]: true };
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
    alert("Book added to cart!");
  };

  return (
    <div className="px-4 py-10">
      {books.length > 0 ? (
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 justify-center">
            {books.map((book) => (
              <div
                key={book._id}
                className="relative rounded-xl shadow-md p-3 text-center bg-amber-100 text-black hover:shadow-lg transition-all duration-200"
              >
                <img
                  src={book.imageUrl || ""}
                  alt={book.title}
                  className="h-50 w-fit object-cover mb-2 rounded-md mx-auto"
                />
                <h3 className="text-lg font-semibold line-clamp-2">
                  {book.title}
                </h3>
                <p className="text-md text-gray-700">by {book.author}</p>
                <p className="text-md font-semibold mt-1">
                  ₹ {book.originalPrice}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-600 text-center">
          No books found for this search.
        </p>
      )}
    </div>
  );
};

export default SearchResults;
