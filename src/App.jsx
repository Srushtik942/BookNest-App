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
        <Navbar className="overflow-x: hidden;" />
        <div className="pt-22 ">
          <Outlet />
        </div>
        <Footer />
      </AddressProvider>
         <ToastContainer
  position={window.innerWidth <= 768 ? "bottom-center" : "bottom-right"}
  autoClose={2000}
  hideProgressBar={false}
  pauseOnHover
  closeOnClick
  toastClassName="w-[90vw] sm:w-auto"
/>

    </>
  );
}

export default App;
