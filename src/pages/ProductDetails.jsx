import React from 'react'
import Read from "../assets/read.png"
import { FaRegHeart } from "react-icons/fa"
import ProductInfo from "./ProductInfo"
import MoreProducts from "./MoreProducts"
const ProductDetails = () => {
  return (
  <div>
    <div className="mb-10 bg-amber-50 my-10 py-10 flex flex-row mx-20">
      <div className="my-5">
        {/* Image wrapper */}
        <div className="relative inline-block mx-10 my-8">
          <img
            className="h-80 w-60 rounded-lg object-cover"
            src={Read}
            alt="read-image"
          />

          {/* Heart icon*/}
          <button className="absolute top-2 right-2 text-gray-800 hover:text-amber-700">
            <FaRegHeart  size={25} />
          </button>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-1 mx-16 gap-y-2.5 mb-5">
          <button className="bg-amber-800 text-white py-1 w-60 -mx-6 rounded">
            Buy Now
          </button>
          <button className="bg-gray-700 text-white py-1 w-60 -mx-6 rounded">
            Add to Cart
          </button>
        </div>

      </div>
      <ProductInfo/>
    </div>
      <hr className="border-t border-gray-300 w-full mt-10" />
      <MoreProducts/>
    </div>
  )
}

export default ProductDetails
