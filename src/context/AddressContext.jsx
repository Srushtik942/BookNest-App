import React, { createContext, useState, useContext } from "react";
import { useEffect } from "react";
//  context
const AddressContext = createContext();

// custom hook
export const useAddress = () => useContext(AddressContext);

export const AddressProvider = ({ children }) => {
 const [addresses, setAddresses] = useState(() => {
    const saved = localStorage.getItem("addresses");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            name: "Srushti Kulkarni",
            address:
              "D Block, Bhagayshree Nagar Society, Upper Indira Nagar, Pune, MAHARASHTRA 411037",
            default: true,
          },
          {
            id: 2,
            name: "Srushti Kulkarni",
            address:
              "Flat no.04 Madhumalti Appt. Lashkar, Solapur, MAHARASHTRA 413003",
            default: false,
          },
        ];

      });

      useEffect (()=>{
        localStorage.setItem("addresses",JSON.stringify(addresses));
      },[addresses]);

  // Function to add a new address
const addAddress = (newAddr) => {
    const updated = [
      ...addresses,
      { id: Date.now(), default: false, ...newAddr },
    ];
    setAddresses(updated);
  };


  // Update  existing address
const updateAddress = (id, updatedData) => {
  const updated = addresses.map(addr =>
    addr.id === id ? { ...addr, ...updatedData } : addr
  );
  setAddresses(updated);
  localStorage.setItem("addresses", JSON.stringify(updated));
};


  // delete
  const deleteAddress = (id) => {
  const updated = addresses.filter(addr => addr.id !== id);
  setAddresses(updated);
  localStorage.setItem("addresses", JSON.stringify(updated));
};


  return (
    <AddressContext.Provider value={{ addresses, addAddress, deleteAddress,updateAddress  }}>
      {children}
    </AddressContext.Provider>
  );
};
