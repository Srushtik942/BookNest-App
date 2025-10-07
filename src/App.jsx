import './App.css'
import Navbar from "./components/Navbar"
import Mainbody from "./components/Mainbody"
import Footer from "./components/footer"
import ProductList from "./pages/ProductList"
import { Outlet } from 'react-router-dom'
import {AddressProvider} from "./context/AddressContext"
function App() {

  return (
    <>
    <AddressProvider>
      <Navbar/>
 <div className='pt-13'>
    <Outlet />

  </div>
  {/* <ProductList/> */}
  <Footer/>
    </AddressProvider>

    </>
  )
}

export default App
