import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAddress } from "../context/AddressContext";

const Address = () => {
  const navigate = useNavigate();
  const { addresses ,deleteAddress } = useAddress();


  return (
    <div className='py-4 my-4 mx-20'>
      <h1 className='text-black text-start my-4 text-4xl font-bold'>Your Addresses</h1>

      <div className="flex gap-4 flex-wrap">
        {/* Add Address button */}
        <div
          onClick={() => navigate("/newAddress")}
          className="bg-white rounded-xl w-60 h-52 border border-gray-300 border-dashed flex flex-col justify-center items-center cursor-pointer hover:bg-gray-50"
        >
          <FaPlus className='text-gray-500 h-10 w-10 mb-2' />
          <h2 className='text-gray-400 text-2xl'>Add Address</h2>
        </div>

       {/* address */}

       {addresses.map((addr) => (
  <div
    key={addr.id}
    className="bg-white rounded-xl w-60 h-52 p-4 border border-gray-300 shadow-sm flex flex-col justify-between"
  >
    {/* Top content */}
    <div>
      <h3 className='text-black font-semibold'>{addr.name}</h3>
      <p className='text-gray-600'>{addr.address}</p>
      <p className='text-gray-600'>{addr.city}</p>
      <p className='text-gray-600'>{addr.pincode}</p>
    </div>

    {/*  buttons */}
    <div className="flex gap-2 mt-2">
      <button
      onClick={() => navigate("/newAddress", { state: { ...addr } })}
      className="bg-amber-300 text-white px-2 py-1 rounded-md hover:bg-yellow-600 w-1/2">
        Edit
      </button>
      <button
        onClick={() => deleteAddress(addr.id)}
      className="bg-gray-600 text-white px-2 py-1 rounded-md hover:bg-red-600 w-1/2">
        Delete
      </button>
    </div>
  </div>
))}
  </div>
    </div>
  );
};

export default Address;
