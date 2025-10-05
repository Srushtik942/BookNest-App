import React, { useState } from 'react'
import {FaStar,FaStarHalfAlt,FaUndo,FaMoneyBillAlt,FaTruck, FaLock} from "react-icons/fa"
const ProductInfo = () => {
    const [quantity, setQuantity] = useState(1);
  return (
    <div className='my-12 mx-48'>
        {/* book title */}
       <h2 className='text-black text-2xl font-bold'>The Power of Habit</h2>

       <p className='text-black my-3'>by Charles Duhigg | Category: Self-Help</p>

       {/* rating */}
          <div className="flex items-center my-3">
        <span className="text-yellow-500 flex items-center">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStarHalfAlt />
        </span>
        <span className="ml-2 text-gray-600 text-sm">4.5 (2,341 reviews)</span>
      </div>
      {/* price */}
      <div>
        <span className='text-black text-xl font-semibold'>₹700</span>
        <span className="text-gray-400 line-through text-lg mx-3">₹1000</span>
      </div>
      <p className='text-gray-500 text-lg font-semibold'>30% off</p>

      <div className='text-black font-semibold text-lg flex items-center mb-5 '>
        Quantity:
        <div className="flex items-center border rounded mx-5">
          <button
            onClick={() => setQuantity(quantity > 0 ? quantity - 1 : 0)}
            className="px-3 py-1 text-lg "
          >
            -
          </button>
          <span className="px-4">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-3 py-1 text-lg"
          >
            +
          </button>
        </div>

      </div>

       {/* Delivery & Payment Info */}
      <div className="border-t  border-gray-900 border-b py-10 my-10 mb-5 grid grid-rows -mx-4 md:grid-cols-4 gap-4 text-center">
        <div>
          <FaUndo className="mx-auto text-gray-700 text-2xl mb-1 " />
          <p className="text-sm text-gray-600">10-day Return</p>
        </div>
        <div>
          <FaMoneyBillAlt className="mx-auto text-gray-700 text-xl mb-1" />
          <p className="text-sm text-gray-600">Cash on Delivery</p>
        </div>
        <div>
          <FaTruck className="mx-auto text-gray-700 text-xl mb-1" />
          <p className="text-sm text-gray-600">Free Shipping</p>
        </div>
        <div>
          <FaLock className="mx-auto text-gray-700 text-xl mb-1" />
          <p className="text-sm text-gray-600">Secure Payment</p>
        </div>

      </div>
       {/* Description */}
      <div>
        <p className="font-semibold mb-2 text-gray-950">Book Summary:</p>
        <ul className="list-disc ml-6 text-gray-700 text-sm space-y-1">
          <li>
            Discover how habits shape our lives and how we can change them for
            better productivity and success.
          </li>
          <li>
            Backed by neuroscience and real-world examples, this book explains
            the power of small behavioral changes.
          </li>
          <li>
            Ideal for readers interested in self-development, motivation, and
            psychology.
          </li>
          <li>Language: English</li>
          <li>Pages: 371 | Publisher: Random House</li>
        </ul>
      </div>
    </div>
  )
}

export default ProductInfo
