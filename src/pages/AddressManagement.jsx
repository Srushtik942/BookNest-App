import React, { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAddress } from "../context/AddressContext";

const AddressManagement = ({onClose }) => {
  const [selected, setSelected] = useState(null);
  const navigate  = useNavigate();
  const { addresses } = useAddress();

  // const addresses = [
  //   {
  //     id: 1,
  //     name: "Srushti Kulkarni",
  //     address:
  //       "D Block, Bhagayshree Nagar Society, Upper Indira Nagar, Pune, MAHARASHTRA 411037",
  //     default: true,
  //   },
  //   {
  //     id: 2,
  //     name: "Srushti Kulkarni",
  //     address:
  //       "Flat no.04 Madhumalti Appt. Lashkar, Solapur, MAHARASHTRA 413003",
  //     default: false,
  //   },
  //   {
  //     id: 3,
  //     name: "Srushti Satish Kulkarni",
  //     address:
  //       "Flat no.04 Madhumalti Appartment, South Sadar Bazar, Solapur, MAHARASHTRA 413003",
  //     default: false,
  //   },
  // ];

    return (


    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white w-[400px] rounded-lg shadow-lg p-4 text-black">

        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-semibold">Choose your location</h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Info */}
        <p className="text-sm text-gray-600 mt-2">
          Select a delivery location to see product availability and delivery
          options.
        </p>

        {/* Address List */}
        <div className="mt-4 space-y-3 max-h-[250px] overflow-y-auto">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              onClick={() => setSelected(addr.id)}
              className={`p-3 border rounded-lg cursor-pointer ${
                selected === addr.id
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-300"
              }`}
            >
              <p className="font-semibold">{addr.name}</p>
              <p className="text-sm text-gray-700">{addr.address}</p>
              {addr.default && (
                <p className="text-xs text-blue-600 font-medium mt-1">
                  Default address
                </p>
              )}
              {addr.city && (
                  <p className="text-sm text-gray-600">
                    {addr.city}, {addr.pincode}
                       </p>
                   )}

               {addr.default && (
                  <p className="text-xs text-blue-600 font-medium mt-1">
                   Default address
                </p>
               )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 border-t pt-3">
          <button
          onClick={
           ()=>{
            onClose();
            navigate("/newAddress")
          }
        }
          className="text-blue-700 text-sm font-medium cursor-pointer">
            Add an address
          </button>


          <div className="flex items-center mt-3 gap-2">
            <input
              type="text"
              placeholder="or enter an Indian pincode"
              className="border border-black-300 rounded-md p-2 flex-grow text-sm"
            />
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm font-medium">
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressManagement;
