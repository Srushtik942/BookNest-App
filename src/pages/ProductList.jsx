import React from 'react'
import Navbar from "../components/Navbar"
import Read from "../assets/read.png"
import {FaHeart, FaRegHeart,  FaStar, FaRegStar, FaStarHalfAlt} from "react-icons/fa"
import Sidebar from '../components/Sidebar'
import { useState } from 'react'
const ProductList = ({isWished}) => {

   const books = [
   { id: 1, title: "Book One", author: "Author One", img: Read, rating:4.5 },
   { id: 2, title: "Book Two", author: "Author Two", img: Read, rating:3.5 },
   { id: 3, title: "Book Three", author: "Author Three", img: Read, rating:5.1 },
   { id: 4, title: "Book Four", author: "Author Four", img: Read, rating:2.5 },
  ]

  const [addToCart, setAddToCart] = useState(true);
  const [wishlist, setWishlist] = useState(true);



  const handleAddToCart = () =>{
          setAddToCart(false);
          alert("Book added to cart!")
  }

  const handleAddToWishlist = () =>{
          setWishlist(false);
          alert("Book added to wishlist!")
  }


  return (

    <div className='flex min-h-screen'>

      {/* Sidebar container */}

      <div className='w-1/4 bg-amber-50 rounded-xl'>
       <Sidebar/>
      </div>

      {/* best selling books */}
      <div className='w-3/4'>

        <h2 className='text-gray-700 pb-4 text-3xl playfair-heading  text-center mb-10'>Showing All Books</h2>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-10 max-w-7xl mx-auto '>
          {books.map(book => (
            <div key={book.id} className=' rounded-2xl shadow-lg flex flex-col items-center justify-center p-4 hover:bg-amber-300'>
              <img className='h-50 w-50 rounded-2xl mb-3  ' src={Read} alt={book.title}/>
              <h4 className='text-gray-700 font-semibold'>{book.title}</h4>
              <p className='text-gray-700 text-sm mb-2'>by {book.author}</p>
              <div className='flex flex-row gap-6 my-6'>
                <p className='text-gray-800'>₹ 1000</p>
                <p className='text-gray-800 flex items-center gap-1'>
                  {book.rating}
                  <FaStar className="text-yellow-500 text-base" />

                </p>

                <button
                onClick={handleAddToWishlist}
                className="text-red-900 text-2xl rounded-full cursor-pointer">
                  {isWished ? <FaHeart /> : <FaRegHeart />}
                </button>
              </div>
              <button
              onClick={handleAddToCart}
              className='text-white bg-amber-800 px-4 py-1  rounded-xl hover:bg-amber-900 cursor-pointer'>
                  Add to Cart
                </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductList