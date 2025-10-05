import React from 'react'

const Sidebar = () => {
    return (
        <div className='p-4'>
            <div className='flex justify-between border-b border-gray-300'>
                <h2 className='font-bold text-gray-800 text-2xl pb-3  text-left'>
                Filters
            </h2>
              <button
                    className='text-sm text-amber-700 hover:text-amber-900 font-semibold transition-colors duration-150 p-1 rounded-md cursor-pointer'
                    aria-label="Clear all applied filters"
                >
                    Clear All
                </button>
            </div>


            {/* Category Filters*/}
            <div>
                <div className='my-5'>
                    <h2 className='text-gray-900 font-bold text-xl'>Category</h2>
                    <div className='my-4'>
                        <div className='flex items-center mb-2'>
                            <label htmlFor='nonFictionId' className='text-gray-700 w-24'>Non-Fiction</label>
                            <input type='checkbox' id="nonFictionId" className='ml-4 h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500' />
                        </div>
                        <div className='flex items-center mb-2'>
                            <label htmlFor='fictionId' className="text-gray-700 w-24">Fiction</label>
                            <input type='checkbox' id="fictionId" className='ml-4 h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500' />
                        </div>
                        <div className='flex items-center mb-2'>
                            <label htmlFor='otherId' className='text-gray-700 w-24'>Other</label>
                            <input type='checkbox' id="otherId" className='ml-4 h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500' />
                        </div>
                    </div>
                </div>

                {/* rate Slider */}
                <div className='mt-8 my-10'>
                    <h2 className='text-xl font-bold text-gray-900 mb-4 my-5'>Rating</h2>

                    <div className='flex flex-col items-center'>
                        <input
                            type='range'
                            id='ratingSlider'
                            name='rating'
                            min='1'
                            max='5'
                            step='1'
                            defaultValue='4'
                            className='w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer range-lg accent-amber-600'
                        />

                        <div className='w-full flex justify-between text-sm text-gray-600 mt-2'>
                            <span>1 Star</span>
                            <span>5 Stars</span>
                        </div>
                    </div>
                </div>

                {/* SOrt by Price */}
                <div className='text-gray-800 my-10'>
                    <h2 className='my-2 text-xl font-bold'>Price</h2>
                    <input type="radio" id="priceId"  name="priceSort" />
                    <label >Price-Low to High</label>
                    <br></br>
                    <input type='radio' id="highPriceId"  name="priceSort" />
                    <label>Price- High to Low</label>
                </div>
            </div>
        </div>
    )
}

export default Sidebar