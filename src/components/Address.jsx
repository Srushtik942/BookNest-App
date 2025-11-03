import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAddress } from "../context/AddressContext";
import {toast, ToastContainer} from "react-toastify"

const Address = () => {
  const navigate = useNavigate();
  const { addresses ,deleteAddress, updateAddress } = useAddress();
  const [editingId, setEditingId] = useState(null);
  const [editAddress, setEditAddress] = useState({});


  const handleEditClick = (addr)=>{
    setEditingId(addr.id);
    setEditAddress({...addr});
  };

  const handleSaveClick = () =>{
    updateAddress(editingId, editAddress);
    setEditingId(null);
    setEditAddress({});
    toast("Address updated successfully!")
  }


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
    className="bg-white rounded-xl w-60  p-4 border border-gray-300 shadow-sm flex flex-col justify-between"
  >
   {editingId === addr.id ? (
  <div className="space-y-2">
    <div>
      <label className="text-gray-700 text-sm font-medium">Name:</label>
      <input
        type="text"
        value={editAddress.name}
        onChange={(e) =>
          setEditAddress({ ...editAddress, name: e.target.value })
        }
        className="w-full border text-black rounded mt-1 px-2 py-1 text-sm"
      />
    </div>

    <div>
      <label className="text-gray-700 text-sm font-medium">Address:</label>
      <input
        type="text"
        value={editAddress.address}
        onChange={(e) =>
          setEditAddress({ ...editAddress, address: e.target.value })
        }
        className="w-full border text-black rounded mt-1 px-2 py-1 text-sm"
      />
    </div>

    <div>
      <label className="text-gray-700 text-sm font-medium">City:</label>
      <input
        type="text"
        value={editAddress.city}
        onChange={(e) =>
          setEditAddress({ ...editAddress, city: e.target.value })
        }
        className="w-full border text-black rounded mt-1 px-2 py-1 text-sm"
      />
    </div>

    <div>
      <label className="text-gray-700 text-sm font-medium">Pincode:</label>
      <input
        type="text"
        value={editAddress.pincode}
        onChange={(e) =>
          setEditAddress({ ...editAddress, pincode: e.target.value })
        }
        className="w-full border text-black rounded mt-1 px-2 py-1 text-sm"
      />
    </div>
  </div>
) : (
              <div>
                <h3 className='text-black font-semibold'>{addr.name}</h3>
                <p className='text-gray-600'>{addr.address}</p>
                <p className='text-gray-600'>{addr.city}</p>
                <p className='text-gray-600'>{addr.pincode}</p>
              </div>
            )}

    {/*  buttons */}
    <div className="flex gap-2 mt-2">
  {editingId === addr.id ? (
    <>
      <button
        onClick={handleSaveClick}
        className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 w-1/2"
      >
        Save
      </button>
      <button
        onClick={() => {
          setEditingId(null);
          setEditAddress({});
        }}
        className="bg-gray-500 text-white px-2 py-1 rounded-md hover:bg-gray-600 w-1/2"
      >
        Cancel
      </button>
    </>
  ) : (
    <>
      <button
        onClick={() => handleEditClick(addr)}
        className="bg-amber-400 text-white px-2 py-1 rounded-md hover:bg-amber-500 w-1/2"
      >
        Edit
      </button>
      <button
        onClick={() => deleteAddress(addr.id)}
        className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 w-1/2"
      >
        Delete
      </button>
    </>
  )}
</div>


  </div>
))}
  </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );

};

export default Address;
