import React, { useState } from 'react'
import Read from "../assets/read.png"
import Girls from "../assets/girls.png"
import { FiArrowDownRight , FiCheckCircle, FiLock, FiTruck } from 'react-icons/fi';
import {FaRegHeart,FaStar } from "react-icons/fa"
import AddressManagement from '../pages/AddressManagement';
import { Navigate } from 'react-router-dom';
import { Link } from "react-scroll";


const Mainbody = ({isWished}) => {


   const features = [
    {
      icon: FiCheckCircle,
      title: "Certified",
      description: "Available certificates of the authority"
    },
    {
      icon: FiLock,
      title: "Secure",
      description: "Secure certificates of the authority"
    },
    {
      icon: FiTruck,
      title: "Shipping",
 description: "Free, fast, and reliable worldwide"
 },
 ];

 const books = [
 { id: 1, title: "Book One", author: "Author One", img: Read },
 { id: 2, title: "Book Two", author: "Author Two", img: Read },
 { id: 3, title: "Book Three", author: "Author Three", img: Read },
 { id: 4, title: "Book Four", author: "Author Four", img: Read },
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
<div className='flex flex-col items-center px-5 gap-10 mb-1 w-full'>
 <div className='flex flex-wrap justify-center gap-5 mb-5'>
 {["Fiction", "Non-Fiction", "Sci-Fi", "Comics", "Thriller"].map(cat => (
 <div key={cat} className='py-2 rounded-xl bg-yellow-800 text-xl p-5 w-fit cursor-pointer hover:bg-amber-900'>
 <h1>{cat}</h1>
</div>
))}
 </div>

      {/* Two-column section: text left, images right */}
      <div className='w-full flex flex-wrap items-start px-30 gap-12'>
        {/* Left column: Text */}
        <div className='flex-1 min-w-[300px]'>
          <h2 className='playfair-heading text-gray-900 text-7xl text-left'>
           Experience our<br />
            New Exclusive <br />
            Books
          </h2>
          <p className='text-black bg-amber-100 w-fit my-5 rounded-xl px-5 py-3'>
               Discover our hand-picked collection of exclusive titles,<br/>
            carefully curated to spark your imagination and elevate<br />
             your reading experience. Dive into stories you won't<br />
              find anywhere else.
          </p>
        <div>
          <button>
            <Link
              to="bestSellingBook"
              smooth={true}
              duration={600}
           className='flex items-center gap-2 text-black rounded-2xl bg-amber-600 px-8 py-2 cursor-pointer'>Shop Now <FiArrowDownRight size={20} /> </Link>
          </button>
           
          </div>
        </div>

        {/* Right column: Images */}
        <div className='flex gap-4 md:gap-20 my-5'>
          {/* Left image (slightly higher) */}
          <div className='bg-amber-700 h-80 rounded-b-full relative hover:z-50 hover:scale-105 transition-all duration-300 -translate-y-6'>
            <img
              className='h-50 w-50 rounded-b-3xl'
              src={Read} alt="read"
            />
          </div>

          {/* Right image (slightly lower) */}
          <div className='bg-amber-700 h-80 rounded-t-full relative hover:z-50 hover:scale-105 transition-all duration-300 translate-y-6'>
             <img
              className='h-55 w-50 rounded-t-full'
              src={Girls} alt="girls"
            />
          </div>
        </div>

     <div className='w-full flex justify-center py-16'>
    {/* card container */}

    <div className='bg-white shadow-xl rounded-2xl p-8 max-w-4xl w-full hover:shadow-2xl'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 divide-x divide-gray-200'>

            {/*  Certified */}
            <div className='flex flex-col items-center text-center px-4'>
                <FiCheckCircle size={24} className="text-yellow-800 mb-3" />
                <h4 className='font-bold text-lg text-gray-800 mb-1'>Certified</h4>
                <p className='text-sm text-gray-500'>Available certificates of the authority</p>
            </div>

            {/* Secure */}
            <div className='flex flex-col items-center text-center px-4 md:pl-8'>
                <FiLock size={24} className="text-yellow-800 mb-3" />
                <h4 className='font-bold text-lg text-gray-800 mb-1'>Secure</h4>
                <p className='text-sm text-gray-500'>Secure certificates of the authority</p>
            </div>

            {/*  Shipping*/}
            <div className='flex flex-col items-center text-center px-4 md:pl-8'>
                <FiTruck size={24} className="text-yellow-800 mb-3" />
                <h4 className='font-bold text-lg text-gray-800 mb-1'>Shipping</h4>
                <p className='text-sm text-gray-500'>Free, fast, and reliable worldwide</p>
            </div>

        </div>
    </div>
</div>

  <div className='w-full'>
 <h2 className='text-gray-700  py-4 text-5xl playfair-heading text-center mb-7'>Our Popular Books</h2>
 <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-10 max-w-7xl mx-auto'>
        {books.map(book => (
          <div key={book.id} className='bg-yellow-100 rounded-2xl shadow-lg flex flex-col items-center justify-center p-4 hover:shadow-2xl cursor-pointer'>
            <img className='h-50 w-50 rounded-2xl mb-3' src={book.img} alt={book.title}/>
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
                          className='text-white bg-amber-800 px-4 py-1 text-lg  rounded-lg w-full hover:bg-amber-900 cursor-pointer'>
                              Add to Cart
              </button>

         </div>
        ))}
      </div>
  </div>
<hr className='text-gray-900 '/>

  {/* best selling books */}
    <div id="bestSellingBook" className='  w-full my-4'>
 <h2 className='text-gray-700  py-4 text-5xl playfair-heading text-center mb-7 '>Our Best Selling Books</h2>
 <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-10 max-w-7xl mx-auto  '>
        {books.map(book => (
          <div key={book.id} className=' rounded-2xl shadow-lg flex flex-col items-center justify-center p-4 hover:shadow-2xl cursor-pointer'>
            <img className='h-50 w-50 rounded-2xl mb-3' src={book.img} alt={book.title}/>
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
              className='text-white bg-amber-800 px-4 py-1 w-full rounded-lg text-lg hover:bg-amber-900 cursor-pointer'>
                  Add to Cart
                </button>

          </div>
        ))}
      </div>
  </div>

 </div>
    </div>
  )
}

export default Mainbody