import React, { createContext, useState, useContext } from "react";

//  context
const AddressContext = createContext();

// custom hook
export const useAddress = () => useContext(AddressContext);

export const AddressProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([
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
  ]);

  // Function to add a new address
  const addAddress = (newAddr) => {
    setAddresses((prev) => [
      ...prev,
      { id: Date.now(), default: false, ...newAddr },
    ]);
  };

  // delete
  const deleteAddress = (id) => {
  const updated = addresses.filter(addr => addr.id !== id);
  setAddresses(updated);
  localStorage.setItem("addresses", JSON.stringify(updated));
};


  return (
    <AddressContext.Provider value={{ addresses, addAddress, deleteAddress }}>
      {children}
    </AddressContext.Provider>
  );
};
