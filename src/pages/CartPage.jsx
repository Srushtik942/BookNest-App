import React, { useState, useEffect } from "react";
import Read from "../assets/read.png";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const CartPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [books, setBooks] = useState([]);

  const pricePerItem = 2000;
  const discount = 1000;
  const deliveryCharges = 499;

  const subtotal = pricePerItem * quantity;
  const totalDiscount = discount * quantity;
  const totalAmount = subtotal - totalDiscount + deliveryCharges;
  const savings = totalDiscount;

  const handleClick = () => {
    alert("🎉 Congratulations, your order has been placed successfully!");
  };

  const handleRemove = (id) => {
    const updatedBooks = books.filter((book) => book._id !== id);
    setBooks(updatedBooks);
    localStorage.setItem("cart", JSON.stringify(updatedBooks));
    alert("Book removed from cart!");
  };

  const handleMoveToWishlist = (book) => {
    // example: add to wishlist
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlist.push(book);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    // remove from cart
    handleRemove(book._id);
    alert("Book moved to wishlist!");
  };

  // ✅ Fetch cart data from localStorage
  useEffect(() => {
    try {
      const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
      setBooks(storedCartItems);
    } catch (error) {
      console.log("Error fetching book data:", error);
    }
  }, []);

  return (
    <div className="py-8 min-h-screen">
      <h2 className="text-black text-3xl font-semibold text-center mb-8">
        My Cart
      </h2>

      <div className="mx-auto max-w-6xl p-4 flex flex-col lg:flex-row gap-6">
        {books.length > 0 ? (
          <>
            {/* 🛒 Cart Items */}
            <div className="flex-1 flex flex-col gap-6">
              {books.map((book, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row gap-6"
                >
                  <img
                    className="h-64 w-44 object-cover rounded mx-auto md:mx-0 flex-shrink-0"
                    src={book.imageUrl || Read}
                    alt={book.title}
                  />

                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <h2 className="text-black text-2xl font-bold">
                        {book.title}
                      </h2>
                      <p className="text-black my-2">
                        by {book.author} | Category: {book.genre}
                      </p>

                      {/* ⭐ Rating */}
                      <div className="flex items-center my-2">
                        <span className="text-yellow-500 flex items-center">
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStarHalfAlt />
                        </span>
                        <span className="ml-2 text-gray-600 text-sm">
                          {book.rating}
                        </span>
                      </div>

                      {/* 💰 Price */}
                      <div className="flex items-center my-2">
                        <span className="text-black text-xl font-semibold">
                          ₹{book.originalPrice || pricePerItem}
                        </span>
                        <span className="text-gray-400 line-through text-lg mx-3">
                          ₹{(book.originalPrice || pricePerItem) + 300}
                        </span>
                        <span className="text-green-600 font-semibold">
                          30% off
                        </span>
                      </div>
                    </div>

                    {/* ➕➖ Quantity & Actions */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center mb-6">
                        <span className="text-black font-semibold mr-4">
                          Quantity:
                        </span>
                        <div className="flex items-center border border-black rounded">
                          <button
                            onClick={() =>
                              setQuantity(quantity > 1 ? quantity - 1 : 1)
                            }
                            className="px-3 py-1 text-lg text-black hover:bg-gray-100 rounded-l transition"
                          >
                            -
                          </button>
                          <span className="px-4 text-black border-l border-r border-black">
                            {quantity}
                          </span>
                          <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="px-3 py-1 text-lg text-black hover:bg-gray-100 rounded-r transition"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <button
                          onClick={() => handleRemove(book._id)}
                          className="flex-1 bg-gray-600 text-white py-2 rounded font-semibold hover:bg-gray-700 transition cursor-pointer"
                        >
                          REMOVE
                        </button>
                        <button
                          onClick={() => handleMoveToWishlist(book)}
                          className="flex-1 bg-gray-200 text-gray-800 py-2 rounded font-semibold hover:bg-gray-300 transition cursor-pointer"
                        >
                          MOVE TO WISHLIST
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 💳 Price Details */}
            <div className="lg:w-96 flex-shrink-0 bg-white p-6 rounded-lg shadow-md h-fit">
              <h2 className="text-black text-xl font-semibold mb-4 border-b pb-2">
                PRICE DETAILS
              </h2>
              <div className="flex justify-between mb-2 text-black">
                <span>
                  Price ({books.length} item{books.length > 1 ? "s" : ""})
                </span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between mb-2 text-black">
                <span>Discount</span>
                <span className="text-black font-semibold">- ₹{totalDiscount}</span>
              </div>
              <div className="flex justify-between mb-2 text-black">
                <span>Delivery Charges</span>
                <span>₹{deliveryCharges}</span>
              </div>
              <hr className="my-3 border-gray-400" />
              <div className="flex justify-between font-bold text-lg mb-2 text-black">
                <span>TOTAL AMOUNT</span>
                <span>₹{totalAmount}</span>
              </div>
              <p className="text-green-600 mb-4 font-medium border-t pt-4">
                You will save ₹{savings} on this order!
              </p>
              <button
                onClick={handleClick}
                className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition duration-150 cursor-pointer"
              >
                PLACE ORDER
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 bg-white p-6 rounded-lg shadow-md text-center text-xl text-gray-700">
            Your cart is empty.
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
