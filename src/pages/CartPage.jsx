import React, { useState, useEffect } from "react";
import Read from "../assets/read.png";
import { FaStar, FaStarHalfAlt, FaShopify } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [books, setBooks] = useState([]);
  const [showSummary, setShowSummary] = useState(false);


  const deliveryCharges = 499;

  const subtotal = books.reduce((acc,book)=> acc + (book.originalPrice)*quantity,0)

  const totalDiscount = books.reduce((acc, book) => {
  const oldPrice = book.oldPrice || (book.originalPrice / 0.7);
  const discountPerBook = (oldPrice - book.originalPrice) * quantity;
  return acc + (discountPerBook > 0 ? discountPerBook : 0);
}, 0);

  const totalAmount = subtotal - totalDiscount + (books.length > 0 ? deliveryCharges : 0);

  const savings = totalDiscount;

  const handleClick = () => {
    toast.success("🎉 Congratulations, your order has been placed successfully!");
    setShowSummary(true);
  };

  const handleRemove = (id, showToast= true) => {
    const updatedBooks = books.filter((book) => book._id !== id);
    setBooks(updatedBooks);
    localStorage.setItem("cart", JSON.stringify(updatedBooks));

    window.dispatchEvent(new Event("cartUpdated"));

   if (showToast) toast.info("Book removed from cart!");
  };

  const handleMoveToWishlist = (book) => {

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlist.push(book);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));

      window.dispatchEvent(new Event("wishlistUpdated"));
  window.dispatchEvent(new Event("cartUpdated"));

    // remove from cart

    toast("Book moved to wishlist!");
  };

  // Fetch cart data from localStorage
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
      <h1 className="text-black text-5xl font-bold text-center mb-8">
        My Cart
      </h1>

      <div className="mx-auto max-w-6xl p-4 flex flex-col lg:flex-row gap-6">
        {books.length > 0 ? (
          <>
            {/* Cart Items */}
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

                      {/*  Rating */}
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

                      {/*  Price */}
                      <div className="flex items-center my-2">
                        <span className="text-black text-xl font-semibold">
                          ₹{book.originalPrice}
                        </span>
                        <span className="text-gray-400 line-through text-lg mx-3">
                          ₹{book.oldPrice || Math.round(book.originalPrice / 0.7)}
                        </span>
                        <span className="text-green-600 font-semibold">
                           {Math.round(
                             ((book.oldPrice || book.originalPrice / 0.7) - book.originalPrice) /
                             (book.oldPrice || book.originalPrice / 0.7) *
                              100
    )} % off
                        </span>
                      </div>
                    </div>

                    {/*  Quantity & Actions */}
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

            {/*  Price Details */}
            <div className="lg:w-96 flex-shrink-0 bg-white p-6 rounded-lg shadow-md h-fit">
              <h2 className="text-black text-xl font-semibold mb-4 border-b pb-2">
                PRICE DETAILS
              </h2>
              <div className="flex justify-between mb-2 text-black">
                <span>
                  Price ({books.length} item{books.length > 1 ? "s" : ""})
                </span>
                <span>₹{Math.round(subtotal)}</span>
              </div>
              <div className="flex justify-between mb-2 text-black">
                <span>Discount</span>
                <span className="text-black font-semibold">- ₹{totalDiscount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2 text-black">
                <span>Delivery Charges</span>
                <span>₹{deliveryCharges}</span>
              </div>
              <hr className="my-3 border-gray-400" />
              <div className="flex justify-between font-bold text-lg mb-2 text-black">
                <span>TOTAL AMOUNT</span>
                <span>₹{Math.round(totalAmount)}</span>
              </div>
              <p className="text-green-600 mb-4 font-medium border-t pt-4">
                You will save ₹{savings.toFixed(2)} on this order!
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
          <div className="flex-1 bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-xl text-gray-700">
  <p className="mb-4 text-center">Cart is empty.</p>

  <Link
    to="/allProducts"
    className="flex items-center gap-2 text-md font-bold text-amber-700 hover:text-amber-800 transition"
  >
    <FaShopify className="text-lg" />
    Let's Shop Something!
  </Link>
</div>


        )}
      </div>

{showSummary && (
  <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50">
    <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-2xl animate-fadeIn">
      <h2 className="text-2xl font-bold text-black mb-4 text-center">Order Summary</h2>

      <div className="max-h-64 overflow-y-auto">
        {books.length > 0 ? (
          books.map((book, i) => (
            <div
              key={i}
              className="flex justify-between items-center border-b border-gray-200 py-2"
            >
              <div>
                <h3 className="text-black font-semibold">{book.title}</h3>
                <p className="text-gray-500 text-sm">{book.author}</p>
              </div>
              <p className="text-black font-medium">₹{book.originalPrice || 2000}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center py-4">Your cart was empty.</p>
        )}
      </div>

      <div className="mt-4 border-t border-gray-300 pt-4">
        <p className="text-lg font-semibold text-black flex justify-between">
          <span>Total:</span>
          <span>₹{Math.round(totalAmount)}</span>
        </p>
        <p className="text-green-600 text-sm mt-2 text-center">
          You saved ₹{savings.toFixed(2)} on this order!
        </p>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={() => {
      setShowSummary(false)
      setBooks([]);
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("cartUpdated"));

          }}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
 <ToastContainer
      //  position="bottom-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
    </div>
  );
};

export default CartPage;
