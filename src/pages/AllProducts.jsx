import React, { useEffect } from 'react'
import Navbar from "../components/Navbar"
import Read from "../assets/read.png"
import {FaHeart, FaRegHeart,  FaStar, FaRegStar, FaStarHalfAlt} from "react-icons/fa"
import Sidebar from '../components/Sidebar'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
const ProductList = ({isWished}) => {

   const [books,setBooks] = useState([]);
   const [loading, setLoading] = useState(true);

   const baseUrl = import.meta.env.VITE_BASE_URL;


  useEffect(()=>{
    const filterByGenre = async()=>{
      try{
        const response = await fetch(`${baseUrl}/products/genre/${genre}`);
        console.log(response);

        const data = await  response.json();
        console.log(data);

       setBooks(data.filteredBooks || []);
      }catch(error){
        console.log()
      }
    }
    filterByGenre();
  },[]);


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

  useEffect(()=>{
     const handleClickProduct = async () => {
    try {
      const response = await fetch(`${baseUrl}/books`);
      console.log("response",response);
      const data = await response.json();
      console.log("Products data:", data);
      setBooks(data.books || data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setBooks([]);
    }
  }
  handleClickProduct();

  },[baseUrl]);





  return (

   <div className='flex flex-col md:flex-row min-h-screen gap-4'>

  {/* Sidebar */}
  <div className='w-full md:w-1/4 bg-amber-50 rounded-xl'>
    <Sidebar setFilteredBooks={setBooks}/>
  </div>

  {/* Main Content */}
  <div className='w-full md:w-3/4'>
    <h2 className='text-gray-700 pb-4 text-2xl sm:text-3xl playfair-heading text-center mb-6'>Showing All Books</h2>
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-10 max-w-7xl mx-auto'>
      {books.map(book => (
        <div key={book.id} className='rounded-2xl shadow-lg flex flex-col items-center justify-center p-3 sm:p-4 hover:bg-amber-300 hover:shadow-2xl cursor-pointer w-full'>
          <img className='h-48 sm:h-56 md:h-64 w-full rounded-2xl mb-3 object-cover' src={book.imageUrl} alt={book.title}/>
          <h4 className='text-gray-700 font-semibold text-center'>{book.title}</h4>
          <p className='text-gray-700 text-sm mb-2 text-center'>by {book.author}</p>
          <div className='flex flex-row flex-wrap justify-center items-center gap-4 my-4'>
            <p className='text-gray-800'>₹ {book.originalPrice}</p>
            <p className='text-gray-800 flex items-center gap-1'>
              {book.rating}
              <FaStar className="text-yellow-500 text-base" />
            </p>
            <button onClick={handleAddToWishlist} className="text-red-900 text-xl sm:text-2xl rounded-full cursor-pointer">
              {isWished ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>
          <button onClick={handleAddToCart} className='text-white bg-amber-800 px-3 sm:px-4 py-1 rounded-xl text-sm sm:text-base w-full hover:bg-amber-900 cursor-pointer'>
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