import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import { Outlet } from "react-router-dom";
import { AddressProvider } from "./context/AddressContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <AddressProvider>
        <Navbar />
        <div className="pt-22">
          <Outlet />
        </div>
        <Footer />

        {/* ✅ Single global Toast container */}
        {/* <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
        /> */}
      </AddressProvider>
    </>
  );
}

export default App;
