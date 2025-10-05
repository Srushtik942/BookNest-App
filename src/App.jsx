import './App.css'
import Navbar from "./components/Navbar"
import Mainbody from "./components/Mainbody"
import Footer from "./components/footer"
import ProductList from "./pages/ProductList"
import { Outlet } from 'react-router-dom'
function App() {

  return (
    <>
<Navbar/>
 <div className='pt-13'>
    <Outlet />

  </div>
  {/* <ProductList/> */}
  <Footer/>
    </>
  )
}

export default App
