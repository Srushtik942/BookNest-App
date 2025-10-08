import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider  } from 'react-router-dom'
import ProductList from './pages/ProductList.jsx'
import Mainbody from './components/Mainbody.jsx'
import ProductDetails from "./pages/ProductDetails.jsx"
import WishlistPage from "./pages/WishlistPage.jsx"
import CartPage from "./pages/CartPage.jsx"
import AddressManagement from "./pages/AddressManagement.jsx"
import Address from './components/Address.jsx'
import NewAddress from "./components/NewAddress.jsx"
import ProfilePage from "./pages/ProfilePage.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
     children: [
      {
          index: true,
          element: <Mainbody/>
      },
      {
       path : "products",
       element: <ProductList/>
      },
      {
        path:"productDetails",
        element:<ProductDetails/>
      },
      {
        path:"wishlist",
        element:<WishlistPage/>
      },
      {
        path:"cartPage",
        element:<CartPage/>
      },
      {
        path:"address",
        element:<AddressManagement/>
      },
      {
        path:"addAddress",
        element:<Address/>
      },
      {
        path:"newAddress",
        element:<NewAddress/>
      },
      {
        path:"profile",
        element:<ProfilePage/>
      }
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
