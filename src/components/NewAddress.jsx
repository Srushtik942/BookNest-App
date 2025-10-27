import React, { useState } from "react";
import { useAddress } from "../context/AddressContext";
import { useNavigate } from "react-router-dom";

const NewAddress = () => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const navigate = useNavigate();
    const { addAddress } = useAddress();

  const handleSubmit = (e)=>{
    e.preventDefault();


    //  validation for address form
    if(!name || !city || !address || !pincode){
      alert("Please fill in all fields before submitting!");
      return;
    }

    // validation for number
    if (pincode.length !== 6 || isNaN(pincode)) {
       alert("Please enter a valid 6-digit numeric pincode!");
       return;
    }


    addAddress({name,city,address,pincode});
    navigate("/addAddress")
  }

  return (
    <div className="flex justify-center items-center min-h-screen mb-10 ">
      <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md w-[350px] text-black">
        <h2 className="text-center text-3xl font-bold mb-4">Add New Address</h2>

        {/* Full Name */}
        <label className="block text-left mb-1 font-medium">Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your full name"
          className="border border-gray-400 rounded-md p-2 w-full mb-3"
        />

        {/* City */}
        <label className="block text-left mb-1 font-medium">City</label>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border border-gray-400 rounded-md p-2 w-full mb-3"
        >
          <option value="">Select a city</option>
          <option value="Pune">Pune</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Delhi">Delhi</option>
        </select>

        {/* Address */}
        <label className="block text-left mb-1 font-medium">Address</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your address"
          className="border border-gray-400 rounded-md p-2 w-full mb-3"
          rows="3"
        />

        {/* Pincode */}
        <label className="block text-left mb-1 font-medium">Pincode</label>
        <input
          type="text"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          placeholder="Enter pincode"
          className="border border-gray-400 rounded-md p-2 w-full mb-4"
        />

        <button
          type="submit"
          className="bg-yellow-600 text-white px-4 py-2 rounded-md w-full hover:bg-yellow-700"
        >
          Save Address
        </button>
      </form>
    </div>
  );
};

export default NewAddress;
