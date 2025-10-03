import './App.css'
import Navbar from "./components/Navbar"
import Mainbody from "./components/Mainbody"
import Footer from "./components/footer"

function App() {

  return (
    <>
<Navbar/>
 <div className='pt-32'>
    <Mainbody />
  </div>
  <Footer/>
    </>
  )
}

export default App
