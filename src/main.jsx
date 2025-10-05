import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider  } from 'react-router-dom'
import ProductList from './pages/ProductList.jsx'
import Mainbody from './components/Mainbody.jsx'
import ProductDetails from "./pages/ProductDetails.jsx"
import WishlistPage from "./pages/WishlistPage.jsx"

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
      }
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
