import React, { useState,useEffect } from "react";
import {
  FaUserCircle,

} from "react-icons/fa";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  const[orders, setOrders] = useState([]);

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
    alert(" Profile updated successfully!");
  };

  //fetching data from localstorage
const loadOrderFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("cart");
    if (!data) {
      setOrders([]);
      return;
    }

    const jsonData = JSON.parse(data);

    if (Array.isArray(jsonData)) {

      const orders= jsonData.map(item => ({
        ...item,
        quantity: 1,
        price: item.originalPrice || 0,
        purchasedAt: new Date().toISOString()
      }));

      setOrders(orders);
    } else {
      setOrders([]);
    }
  } catch (error) {
    console.log("Failed to load orders from localStorage:", error);
    setOrders([]);
  }
};

useEffect(() => {
  loadOrderFromLocalStorage();
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
  return (order.price || 0) * (order.quantity || 1);
};

const grandTotal = orders.reduce((sum, o) => sum + orderTotal(o), 0);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-1/4 bg-white border-r p-8 flex flex-col items-start">
        <div className="flex flex-col items-center mb-10">
          <FaUserCircle className="text-6xl text-gray-400 mb-3" />
          <h2 className="text-lg font-semibold text-gray-800">{profile.name}</h2>
          <p className="text-sm text-gray-500">{profile.email}</p>
        </div>

        <nav className="w-full space-y-4 text-gray-600">
          <button
            className={`block w-full text-left font-medium ${
              activeTab === "personal"
                ? "text-amber-600"
                : "hover:text-amber-600"
            }`}
            onClick={() => setActiveTab("personal")}
          >
            Personal Information
          </button>

          <button
            className={`block w-full text-left font-medium ${
              activeTab === "orders"
                ? "text-amber-600"
                : "hover:text-amber-600"
            }`}
            onClick={() => setActiveTab("orders")}
          >
            Order History
          </button>
        </nav>

        <button className="mt-auto text-white bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded-lg w-full font-medium">
          Sign Out
        </button>
      </aside>

      <main className="flex-1 p-10">
        {activeTab === "personal" && (
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Personal Information
              </h2>
              <button
                onClick={toggleEdit}
                className="text-amber-600 font-semibold hover:underline"
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>
            </div>
            <p className="text-gray-500 mb-6">
              Manage your personal information, including phone numbers and
              email addresses where you can be contacted.
            </p>

            <form
              onSubmit={handleSave}
              className="grid grid-cols-2 gap-6 bg-white rounded-xl shadow-sm border p-6"
            >
              {/* Name */}
              <div>
                <label className="block text-sm text-gray-500 mb-1">Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2 text-gray-800 focus:outline-none focus:ring focus:ring-amber-300"
                  />
                ) : (
                  <p className="text-gray-800 font-semibold">{profile.name}</p>
                )}
              </div>

              {/* DOB */}
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  Date of Birth
                </label>
                {isEditing ? (
                  <input
                    type="date"
                    name="dob"
                    value={profile.dob}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2 text-gray-800 focus:outline-none focus:ring focus:ring-amber-300"
                  />
                ) : (
                  <p className="text-gray-800 font-semibold">
                    {new Date(profile.dob).toLocaleDateString()}
                  </p>
                )}
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  Country
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="country"
                    value={profile.country}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2 text-gray-800 focus:outline-none focus:ring focus:ring-amber-300"
                  />
                ) : (
                  <p className="text-gray-800 font-semibold">
                    {profile.country}
                  </p>
                )}
              </div>

              {/* Region */}
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  Region
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="region"
                    value={profile.region}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2 text-gray-800 focus:outline-none focus:ring focus:ring-amber-300"
                  />
                ) : (
                  <p className="text-gray-800 font-semibold">
                    {profile.region}
                  </p>
                )}
              </div>

              {/* Language */}
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  Language
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="language"
                    value={profile.language}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2 text-gray-800 focus:outline-none focus:ring focus:ring-amber-300"
                  />
                ) : (
                  <p className="text-gray-800 font-semibold">
                    {profile.language}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2 text-gray-800 focus:outline-none focus:ring focus:ring-amber-300"
                  />
                ) : (
                  <p className="text-gray-800 font-semibold">{profile.email}</p>
                )}
              </div>

              {isEditing && (
                <div className="col-span-2">
                  <button
                    type="submit"
                    className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-semibold"
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
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Order History</h2>
            <p className="text-gray-500 mb-6">Your recent purchases will appear here.</p>

            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="bg-white p-6 rounded-xl border shadow-sm text-gray-600">No orders yet.</div>
              ) : (
                <>
                  <div className="bg-white p-6 rounded-xl border shadow-sm text-gray-600">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-8 font-medium">Item</div>
                      <div className="col-span-1 text-right font-medium">Qty</div>
                      <div className="col-span-2 text-right font-medium">Price</div>
                      <div className="col-span-1 text-right font-medium">Total</div>
                    </div>
                  </div>

                  {orders.map((o) => (
                    <div key={o.id} className="bg-white p-4 rounded-xl border shadow-sm text-gray-700">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-semibold">{o.title}</div>
                          <div className="text-sm text-gray-500">Purchased: {formatDate(o.purchasedAt)}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm">Qty: {o.quantity}</div>
                          <div className="text-sm">₹{o.price.toFixed(2)}</div>
                          <div className="font-semibold">₹{orderTotal(o).toFixed(2)}</div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="bg-white p-4 rounded-xl border shadow-sm text-gray-800 text-right font-semibold">
                    Grand total: ₹{grandTotal.toFixed(2)}
                  </div>
                </>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default ProfilePage;
