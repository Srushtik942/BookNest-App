import React from 'react'
import Read from "../assets/read.png"


const MoreProducts = () => {
     const books = [
     { id: 1, title: "Book One", author: "Author One", img: Read },
     { id: 2, title: "Book Two", author: "Author Two", img: Read },
     { id: 3, title: "Book Three", author: "Author Three", img: Read },
     { id: 4, title: "Book Four", author: "Author Four", img: Read },
    ]

  return (
    <div>
         {/* best selling books */}
    <div className='  w-full my-4 '>
 <h2 className='text-gray-700  py-4 text-5xl playfair-heading text-center mb-7'>More Books you may like</h2>
 <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-10 max-w-7xl mx-auto'>
        {books.map(book => (
          <div key={book.id} className=' rounded-2xl shadow-lg flex flex-col items-center justify-center p-4'>
            <img className='h-50 w-50 rounded-2xl mb-3' src={book.img} alt={book.title}/>
            <h4 className='text-gray-700 font-semibold'>{book.title}</h4>
            <p className='text-gray-700 text-sm my-3'>by {book.author}</p>
            <div className='flex flex-row gap-6 my-6'>
              <p className='text-gray-800 '>₹ 1000</p>
           
            </div>
            <button className='text-white bg-amber-800 px-3 py-1 mb-4 rounded-lg w-full hover:bg-amber-900 cursor-pointer'>
              Buy Now
            </button>
          </div>
        ))}
      </div>
  </div>

    </div>
  )
}

export default MoreProducts
