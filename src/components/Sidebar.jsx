import React, { useState } from 'react';

const Sidebar = ({ setFilteredBooks }) => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const[selectedRating,setSelectedRating] = useState(0);
  const [selectedSort,setSelectedSort] = useState("");
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleCategoryChange = async (event) => {
    const genre = event.target.id;
    const genreName =
      genre === "fictionId" ? "Fiction" :
      genre === "nonFictionId" ? "Non-Fiction" :
      genre === "otherId" ? "Other" : "";

    let updatedGenres = [...selectedGenres];

    if (event.target.checked) {
      updatedGenres.push(genreName);
    } else {
      updatedGenres = updatedGenres.filter((g) => g !== genreName);
    }

    setSelectedGenres(updatedGenres);

    // fetch filtered books
    if (updatedGenres.length === 1) {
      try {
        const res = await fetch(`${baseUrl}/products/genre/${updatedGenres[0]}`);
        const data = await res.json();

        if (res.ok) {
          setFilteredBooks(data.filteredBooks);
        } else {
          setFilteredBooks([]);
          console.warn(data.message);
        }
      } catch (error) {
        console.error("Error fetching filtered books:", error);
      }
    } else if (updatedGenres.length === 0) {
      // fetch all books again if no filters selected
      try {
        const res = await fetch(`${baseUrl}/products`);
        const data = await res.json();
        setFilteredBooks(data.books);
      } catch (error) {
        console.error("Error fetching all books:", error);
      }
    }
  };


  const handleRatingChange = async(event) =>{
    const rating = Number(event.target.value);

    setSelectedRating(rating);

    try{
         const res = await fetch(`${baseUrl}/products/rating/${rating}`);
         console.log(res);
         const data = await res.json();
        console.log(data);

    if (res.ok) {
         if(data.bookData && data.bookData.length > 0){
           setFilteredBooks(data.bookData);
         }else{
           setFilteredBooks([]);
          alert(`No books found with rating ${rating} `);
         }
    } else {
      setFilteredBooks([]);
      console.warn(data.message);

    }

    }catch(error){
        console.error("Error fetching book by rating", error);
    }
  }

  // price sort handler

 const handlePriceSort = async (event) => {
  const sortValue = event.target.value;
  setSelectedSort(sortValue);

  try {

    let url = `${baseUrl}/products/sort/sort?sort=${sortValue}`;

    if (selectedGenres.length > 0) {
      url += `&genre=${selectedGenres[0]}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    if (res.ok) {
      setFilteredBooks(data.books);
    } else {
      console.warn(data.message);
      setFilteredBooks([]);
    }
  } catch (error) {
    console.error("Error sorting books by price", error);
  }
};


  const handleRemoveFilter = async () => {
    setSelectedGenres([]);
    try {
      const res = await fetch(`${baseUrl}/products`);
      const data = await res.json();
      setFilteredBooks(data.books);
    } catch (error) {
      console.error("Error resetting filters:", error);
    }
  };


  return (
    <div className='p-5'>
      <div className='flex justify-between border-b border-gray-300'>
        <h2 className='font-bold text-gray-800 text-2xl pb-3 text-left'>
          Filters
        </h2>
        <button
          onClick={handleRemoveFilter}
          className='text-sm text-amber-700 hover:text-amber-900 font-semibold transition-colors duration-150 p-1 rounded-md cursor-pointer'
          aria-label="Clear all applied filters"
        >
          Clear All
        </button>
      </div>

      {/* Category Filters */}
      <div className='my-5'>
        <h2 className='text-gray-900 font-bold text-xl'>Category</h2>
        <div className='my-4'>
          <div className='flex items-center mb-2'>
            <label htmlFor='nonFictionId' className='text-gray-700 w-24'>Non-Fiction</label>
            <input
              type='checkbox'
              id='nonFictionId'
              checked={selectedGenres.includes("Non-Fiction")}
              onChange={handleCategoryChange}
              className='ml-4 h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500'
            />
          </div>

          <div className='flex items-center mb-2'>
            <label htmlFor='fictionId' className='text-gray-700 w-24'>Fiction</label>
            <input
              type='checkbox'
              id='fictionId'
              checked={selectedGenres.includes("Fiction")}
              onChange={handleCategoryChange}
              className='ml-4 h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500'
            />
          </div>

          <div className='flex items-center mb-2'>
            <label htmlFor='otherId' className='text-gray-700 w-24'>Other</label>
            <input
              type='checkbox'
              id='otherId'
              checked={selectedGenres.includes("Other")}
              onChange={handleCategoryChange}
              className='ml-4 h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500'
            />
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div className='mt-8 my-10'>
        <h2 className='text-xl font-bold text-gray-900 mb-4 my-5'>Rating</h2>
        <div className='flex flex-col items-center'>
          <input
            type='range'
            id='ratingSlider'
            name='rating'
            min='1'
            max='5'
            step='0.1'
            value={selectedRating}
            onChange={handleRatingChange}
            className='w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer range-lg accent-amber-600'
          />
          <div className='w-full flex justify-between text-sm text-gray-600 mt-2'>
            <span>1 Star</span>
            <span>5 Stars</span>
          </div>
        </div>
      </div>

      {/* Sort by Price */}
      <div className='text-gray-800 my-10'>
        <h2 className='my-2 text-xl font-bold'>Price</h2>
        <input type="radio" id="priceLowHigh" name="priceSort"
         value='asc'
         onChange={handlePriceSort}
        className='text-amber-600 focus:ring-amber-500'
        />

        <label>Price - Low to High</label>
        <br />
        <input type='radio' id="priceHighLow" name="priceSort"
        value='desc'
        // checked={selectedSort === 'desc'}
        onChange={handlePriceSort}
        className='text-amber-600 focus:ring-amber-500'
        />
        <label>Price - High to Low</label>
      </div>
    </div>
  );
};

export default Sidebar;
