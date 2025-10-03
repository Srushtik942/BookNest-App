import React from 'react'
import Navbar from "../components/Navbar"
import Read from "../assets/read.png"

const ProductList = () => {

   const books = [
   { id: 1, title: "Book One", author: "Author One", img: Read },
   { id: 2, title: "Book Two", author: "Author Two", img: Read },
   { id: 3, title: "Book Three", author: "Author Three", img: Read },
   { id: 4, title: "Book Four", author: "Author Four", img: Read },
  ]

  return (
    <div>

  {/* best selling books */}
    <div className='  w-full mb-20'>
 <h2 className='text-gray-700  py-4 text-5xl playfair-heading text-center mb-20'>Our Best Selling Books</h2>
 <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-10 max-w-7xl mx-auto'>
        {books.map(book => (
          <div key={book.id} className=' rounded-2xl shadow-lg flex flex-col items-center justify-center p-4'>
            <img className='h-50 w-50 rounded-2xl mb-3' src={book.img} alt={book.title}/>
            <h4 className='text-gray-700 font-semibold'>{book.title}</h4>
            <p className='text-gray-700 text-sm mb-2'>by {book.author}</p>
            <div className='flex flex-row gap-6 my-6'>
              <p className='text-gray-800'>₹ 1000</p>
            <button className='text-white bg-amber-800 px-3 py-1 rounded-xl hover:bg-amber-900 cursor-pointer'>
              Buy Now +
            </button>
            </div>

          </div>
        ))}
      </div>
  </div>

    </div>
  )
}

export default ProductList
