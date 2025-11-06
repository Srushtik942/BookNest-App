import React, { useState, useEffect } from "react";
import {
  FaUserCircle,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import Address from "../components/Address"

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [orders, setOrders] = useState([]);
  const [address, setAddress] = useState([]);

  // State to control sidebar visibility on mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [profile, setProfile] = useState({
    name: "Srushti Kulkarni",
    dob: "2002-07-15",
    country: "India",
    region: "Pune",
    language: "English (UK)",
    email: "srushtikulkarni@gmail.com",
  });

 const handleChange = (e) => {
  const { name, value } = e.target;
  setProfile(prev => ({
    ...prev,
    [name]: value,
  }));
};


  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    toast(" Profile updated successfully!");
  };

  //fetching data from localstorage
const loadOrderFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("orders");
    if (!data) {
      setOrders([]);
      return;
    }

    const jsonData = JSON.parse(data);

    if (Array.isArray(jsonData)) {

//       const orders= jsonData.map(item => ({
//         id: item._id || Math.random(),
//         ...item,
//         quantity: 1,
//         price: item.originalPrice || 0,
//         purchasedAt: new Date().toISOString()
//       }));

      setOrders(jsonData);
    } else {
      setOrders([]);
    }
  } catch (error) {
    console.error("Failed to load orders from localStorage:", error);
    setOrders([]);
  }
};

useEffect(() => {
  loadOrderFromLocalStorage();
//  (desktop view)
  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setIsSidebarOpen(false);
    }
  };
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);


const formatDate = (iso) => {
  try {
    return new Date(iso).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
};

const orderTotal = (order) => {
  return (order.originalPrice || 0) * (order.quantity || 1);
};

// const grandTotal = orders.reduce((sum, o) => sum + orderTotal(o), 0);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 relative">

      {/* Mobile Sidebar Toggle Button (Visible on mobile) */}
      <div className="md:hidden sticky top-0 z-20 w-full bg-white shadow-md p-3">
        <button
          className="w-full text-center bg-amber-600 text-white py-2 rounded-lg font-medium"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? "Close Menu" : "View Profile Menu"}
        </button>
      </div>

      <aside
        className={`
          ${isSidebarOpen ? 'flex' : 'hidden'}
          md:flex // Always visible on medium screens and up
          w-full md:w-1/4
          h-full md:h-auto // Full height on mobile
          bg-white border-r p-4 sm:p-8
          flex-col items-center md:items-start
          absolute md:relative z-10
        `}
      >
        <div className="flex flex-col items-center mb-10 w-full">
          <FaUserCircle className="text-6xl text-gray-400 mb-3" />
          <h2 className="text-lg font-semibold text-gray-800">{profile.name}</h2>
          <p className="text-sm text-gray-500">{profile.email}</p>
        </div>

        {/* Tab navigation */}
        <nav className="w-full space-y-4 text-gray-600 mb-10">
          <button
            className={`block w-full text-center md:text-left font-medium p-2 rounded-lg transition-colors ${
              activeTab === "personal"
                ? "text-white bg-amber-600"
                : "hover:bg-gray-100 hover:text-amber-600"
            }`}
            onClick={() => { setActiveTab("personal"); setIsSidebarOpen(false); }}
          >
            Personal Information
          </button>

          <button
            className={`block w-full text-center md:text-left font-medium p-2 rounded-lg transition-colors ${
              activeTab === "orders"
                ? "text-white bg-amber-600"
                : "hover:bg-gray-100 hover:text-amber-600"
            }`}
            onClick={() => { setActiveTab("orders"); setIsSidebarOpen(false); }}
          >
            Order History
          </button>

        <button
  className={`block w-full text-center md:text-left font-medium p-2 rounded-lg transition-colors ${
    activeTab === "address"
      ? "text-white bg-amber-600"
      : "hover:bg-gray-100 hover:text-amber-600"
  }`}
  onClick={() => { setActiveTab("address"); setIsSidebarOpen(false); }}
>
  Manage Address
</button>
      </nav>

       
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 w-full p-4 sm:p-6 md:p-10">
        {activeTab === "personal" && (
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                Personal Information
              </h2>
              <button
                onClick={toggleEdit}
                className="text-amber-600 font-semibold hover:underline text-sm sm:text-base"
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>
            </div>
            <p className="text-gray-500 mb-6 text-sm sm:text-base">
              Manage your personal information, including phone numbers and
              email addresses where you can be contacted.
            </p>

            <form
              onSubmit={handleSave}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 bg-white rounded-xl shadow-sm border p-4 sm:p-6"
            >
              <div>
                <label className="block text-sm text-gray-500 mb-1">Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2 text-gray-800 focus:outline-none focus:ring focus:ring-amber-300 text-sm sm:text-base"
                  />
                ) : (
                  <p className="text-gray-800 font-semibold text-sm sm:text-base">{profile.name}</p>
                )}
              </div>

              {/* DOB */}
              <div>
                <label className="block text-sm text-gray-500 mb-1">Date of Birth</label>
                {isEditing ? (
                  <input
                    type="date"
                    name="dob"
                    value={profile.dob}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2 text-gray-800 focus:outline-none focus:ring focus:ring-amber-300 text-sm sm:text-base"
                  />
                ) : (
                  <p className="text-gray-800 font-semibold text-sm sm:text-base">
                    {new Date(profile.dob).toLocaleDateString()}
                  </p>
                )}
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm text-gray-500 mb-1">Country</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="country"
                    value={profile.country}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2 text-gray-800 focus:outline-none focus:ring focus:ring-amber-300 text-sm sm:text-base"
                  />
                ) : (
                  <p className="text-gray-800 font-semibold text-sm sm:text-base">{profile.country}</p>
                )}
              </div>

              {/* Region */}
              <div>
                <label className="block text-sm text-gray-500 mb-1">Region</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="region"
                    value={profile.region}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2 text-gray-800 focus:outline-none focus:ring focus:ring-amber-300 text-sm sm:text-base"
                  />
                ) : (
                  <p className="text-gray-800 font-semibold text-sm sm:text-base">{profile.region}</p>
                )}
              </div>

              {/* Language */}
              <div>
                <label className="block text-sm text-gray-500 mb-1">Language</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="language"
                    value={profile.language}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2 text-gray-800 focus:outline-none focus:ring focus:ring-amber-300 text-sm sm:text-base"
                  />
                ) : (
                  <p className="text-gray-800 font-semibold text-sm sm:text-base">{profile.language}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm text-gray-500 mb-1">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2 text-gray-800 focus:outline-none focus:ring focus:ring-amber-300 text-sm sm:text-base"
                  />
                ) : (
                  <p className="text-gray-800 font-semibold text-sm sm:text-base">{profile.email}</p>
                )}
              </div>

              {isEditing && (
                <div className="col-span-1 md:col-span-2 mt-4">
                  <button
                    type="submit"
                    className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-semibold w-full sm:w-auto"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </section>
        )}

        {activeTab === "orders" && (
           <section>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Order History</h2>
            <p className="text-gray-500 mb-6 text-sm sm:text-base">Your recent purchases will appear here.</p>

            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="bg-white p-6 rounded-xl border shadow-sm text-gray-600 text-sm">No orders yet.</div>
              ) : (
                <>
                  {/* Header Row (Hidden on mobile for simplification) */}
                  <div className="hidden sm:block bg-white p-6 rounded-xl border shadow-sm text-gray-600">
                    <div className="grid grid-cols-12 gap-4 items-center text-sm">
                      <div className="col-span-8 font-medium">Item</div>
                      <div className="col-span-1 text-right font-medium">Qty</div>
                      <div className="col-span-1 text-right font-medium">Price</div>
                      <div className="col-span-1 text-right font-medium">Total</div>
                    </div>
                  </div>

                    {orders.map((o) => (
  <div
    key={o.id}
    className="bg-white p-4 rounded-xl border shadow-sm text-gray-700"
  >
    {/* Desktop Layout */}
    <div className="hidden sm:grid grid-cols-12 gap-4 items-center">
      {/* Item */}
      <div className="col-span-8">
        <div className="font-semibold text-base">{o.title}</div>
        <div className="text-xs text-gray-500">
          Purchased: {formatDate(o.placedAt)}
        </div>
      </div>

      {/* Qty */}
      <div className="col-span-1 text-right text-sm text-gray-500">
        <span>Qty: {o.quantity || 1}</span>
      </div>

      {/* Price */}
      <div className="col-span-1 text-right text-sm text-gray-700">
        ₹{(o.originalPrice || 0).toFixed(2)}

      </div>

      {/* Total */}
      <div className="col-span-1 text-right font-semibold text-lg">
        ₹{orderTotal(o).toFixed(2)}
      </div>
    </div>

    {/* Mobile Layout */}
    <div className="sm:hidden flex flex-col gap-2">
      <div>
        <div className="font-semibold">{o.title}</div>
        <div className="text-xs text-gray-500">
          Purchased: {formatDate(o.purchasedAt)}
        </div>
      </div>
      <div className="flex justify-between text-sm text-gray-600">
        <span>Qty: {o.quantity || 1}</span>
        <span>₹{(o.originalPrice || 0).toFixed(2)}
</span>
        <span className="font-semibold text-gray-800">
          ₹{orderTotal(o).toFixed(2)}
        </span>
      </div>
    </div>
  </div>
))}
                 
                </>
              )}
            </div>
          </section>
        )}

{activeTab === "address" && (
  <section>
    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
      Manage Addresses
    </h2>

    <Address />
  </section>
)}

      </main>
{/* <ToastContainer
position="bottom-right"
/> */}
    </div>
  );
};

export default ProfilePage;