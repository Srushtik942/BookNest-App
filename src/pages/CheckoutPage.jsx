import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useAddress } from "../context/AddressContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { addresses } = useAddress();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [cart, setCart] = useState([]);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [showPopupSummary, setShowPopupSummary] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const deliveryCharge = 499;

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const subtotal = cart.reduce((acc, item) => acc + item.originalPrice * (item.quantity || 1), 0);
  const discount = cart.reduce((acc, item) => {
    const old = item.oldPrice || Math.round(item.originalPrice / 0.7);
    const qty = item.quantity || 1;
    return acc + (old - item.originalPrice);
  }, 0);

  const totalAmount = subtotal - discount + (cart.length > 0 ? deliveryCharge : 0);
const handlePlaceOrder = () => {
  if (!selectedAddress) {
    toast.error(" Please select a delivery address");
    return;
  }

  if (cart.length === 0) {
    toast.error("Your cart is empty");
    return;
  }

  const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

  const newOrders = cart.map((item) => ({
    ...item,
    address: selectedAddress,
    orderId: Math.random().toString(36).substring(2, 10),
    placedAt: new Date().toISOString(),
  }));

  //  Save order before redirect
  localStorage.setItem("orders", JSON.stringify([...existingOrders, ...newOrders]));

  setShowPopupSummary(true);
};


  return (
  <div className="max-w-6xl mx-auto px-3 md:px-6 py-4">
    <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-800">
      Checkout
    </h1>

    <div className="flex flex-col md:flex-row gap-4 md:gap-6">

      {/* Address Section */}
      <div className="w-full md:w-2/3 bg-white p-4 md:p-5 rounded-lg shadow max-h-[80vh] overflow-y-auto">
        <h2 className="text-lg md:text-xl font-semibold mb-3 text-gray-700">
          Select Delivery Address
        </h2>

        {addresses.length === 0 ? (
          <p className="text-gray-500">No addresses found</p>
        ) : (
          <div className="space-y-3">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className={`border p-3 rounded-lg cursor-pointer w-full ${
                  selectedAddress?.id === addr.id
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedAddress(addr)}
              >
                <p className="font-semibold text-gray-800 text-sm md:text-base">{addr.name}</p>
                <p className="text-gray-600 text-xs md:text-sm">{addr.address}</p>
                {addr.city && (
                  <p className="text-gray-500 text-xs md:text-sm">
                    {addr.city}, {addr.pincode}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Order Summary  */}
      <div className="w-full md:w-1/3 bg-white p-5 rounded-lg shadow h-fit">
        <h2 className="text-xl font-semibold border-b pb-2 text-gray-800">
          Order Summary
        </h2>

        {cart.map((item, i) => (
          <div key={i} className="flex justify-between py-2 border-b text-gray-700">
            <p className="font-medium text-sm md:text-base">{item.title} x {item.quantity || 1}</p>
            <p className="text-sm md:text-base">₹{item.originalPrice}</p>
          </div>
        ))}

        <div className="mt-3 text-sm md:text-base">
          <p className="flex justify-between"><span>Subtotal:</span> <span>₹{subtotal}</span></p>
          <p className="flex justify-between text-green-600"><span>Discount:</span> <span>-₹{discount}</span></p>
          <p className="flex justify-between"><span>Delivery:</span> <span>₹{deliveryCharge}</span></p>
          <p className="flex justify-between font-bold text-lg mt-2 text-gray-800"><span>Total:</span> <span>₹{totalAmount}</span></p>
        </div>

       <button
  onClick={handlePlaceOrder}
  disabled={!selectedAddress || cart.length === 0}
  className={`w-full py-2 rounded-lg mt-4 font-semibold text-white
    ${!selectedAddress
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-blue-600 hover:bg-blue-700"
    }`}
>
  Place Order
</button>
      </div>
    </div>
    <ToastContainer />
    {showPopupSummary && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
    <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
      <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
         Order Placed Successfully!
      </h2>

      <div className="max-h-64 overflow-y-auto space-y-3">
        {cart.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 border-b pb-2">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-14 h-14 rounded object-cover border"
            />
            <div className="flex-1">
              <p className="font-semibold text-gray-800">{item.title}</p>
              <p className="text-sm text-gray-500">{item.author}</p>
              <p className="text-sm text-gray-700">Qty: {item.quantity}</p>
            </div>
            <p className="font-semibold text-gray-800">₹{item.originalPrice}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 border-t pt-3 flex justify-between text-lg font-semibold">
        <span>Total:</span>
        <span>₹{totalAmount}</span>
      </div>

      <button
        className="mt-5 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
        onClick={() => {
          setShowPopupSummary(false);
          localStorage.removeItem("cart");
          window.dispatchEvent(new Event("cartUpdated"));
          navigate("/");
        }}
      >
        Close
      </button>
    </div>
  </div>
)}
  </div>
);
};

export default Checkout;
