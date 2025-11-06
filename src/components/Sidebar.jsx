import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const Sidebar = ({ setFilteredBooks, setIsSidebarOpen }) => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedSort, setSelectedSort] = useState("");
  const baseUrl = import.meta.env.VITE_BASE_URL;

const handleCategoryChange = async (event) => {
  const genre = event.target.id;
  const genreName =
    genre === "fictionId" ? "Fiction" :
    genre === "nonFictionId" ? "Non-Fiction" :
    genre === "scifiId" ? "Sci-Fi" :
    genre === "comicsId" ? "Comics" :
    genre === "thrillerId" ? "Thriller" : "";

  let updatedGenres = [...selectedGenres];

  if (event.target.checked) {
    updatedGenres.push(genreName);
  } else {
    updatedGenres = updatedGenres.filter((g) => g !== genreName);
  }

  setSelectedGenres(updatedGenres);

  try {
    let res, data;

    if (updatedGenres.length > 1) {
      //  Multi-genre API call
      const genresParam = updatedGenres.join(",");
      res = await fetch(`${baseUrl}/products/genres?genres=${genresParam}`);
      data = await res.json();

      if (res.ok) {
        setFilteredBooks(data.filteredBooks);
      } else {
        setFilteredBooks([]);
      }
    } else if (updatedGenres.length === 1) {

      res = await fetch(`${baseUrl}/products/genre/${updatedGenres[0]}`);
      data = await res.json();

      if (res.ok) {
        setFilteredBooks(data.filteredBooks);
      } else {
        setFilteredBooks([]);
      }
    } else {
      res = await fetch(`${baseUrl}/books`);
      data = await res.json();
      setFilteredBooks(data.books);
    }
  } catch (error) {
    console.error("Error fetching filtered books:", error);
  }
};


  const handleRatingChange = async () => {
  try {
    const res = await fetch(`${baseUrl}/products/rating/${selectedRating}`);
    const data = await res.json();

    if (res.ok) {
      if (data.bookData && data.bookData.length > 0) {
        setFilteredBooks(data.bookData);
      } else {
        setFilteredBooks([]);
        // toast.info(`No books found with rating ${selectedRating}`);
      }
    } else {
      setFilteredBooks([]);
    }
  } catch (error) {
    console.error("Error fetching book by rating", error);
  }
};


  const handlePriceSort = async (event) => {
    const sortValue = event.target.value;
    setSelectedSort(sortValue);

    try {
      let url = `${baseUrl}/products/sort/sort?sort=${sortValue}`;
      if (selectedGenres.length > 0) url += `&genre=${selectedGenres[0]}`;

      const res = await fetch(url);
      const data = await res.json();

      if (res.ok) setFilteredBooks(data.books);
      else setFilteredBooks([]);
    } catch (error) {
      console.error("Error sorting books by price", error);
    }
  };

  //  Remove All Filters
  const handleRemoveFilter = async () => {
    setSelectedGenres([]);
    setSelectedRating(0);
    setSelectedSort("");
    try {
      const res = await fetch(`${baseUrl}/products`);
      const data = await res.json();
      setFilteredBooks(data.books);
    } catch (error) {
      console.error("Error resetting filters:", error);
    }
  };

  return (
<div className="p-4  w-60 md:w-66 bg-white shadow-md rounded-xl border border-gray-200 h-fit">      {/* Header */}
<div className="flex justify-between items-center  border-gray-300 pb-2">
        <h2 className="font-bold text-gray-800 text-xl pb-3 text-left">
          Filters
        </h2>

        <div className="flex items-center gap-3">
          {/* ✕ button visible only on mobile */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-black text-xl hover:text-red-600 md:hidden"
          >
            ✕
          </button>

          <button
            onClick={handleRemoveFilter}
            className="text-sm text-amber-700 hover:text-amber-900 font-semibold transition-colors duration-150 p-1 rounded-md cursor-pointer"
          >
            Clear All
          </button>
        </div>

      </div>

      {/*  Category Filters */}
      <div className="my-5">
        <h2 className="text-gray-900 font-bold text-xl">Category</h2>
        <div className="my-3 space-y-1.5">
          {[
            { id: "fictionId", label: "Fiction" },
            { id: "nonFictionId", label: "Non-Fiction" },
            { id: "scifiId", label: "Sci-Fi" },
            { id: "comicsId", label: "Comics" },
            { id: "thrillerId", label: "Thriller" }
          ].map(({ id, label }) => (
            <div key={id} className="flex items-center">
              <label htmlFor={id} className="text-gray-700 w-24">{label}</label>
              <input
                type="checkbox"
                id={id}
                checked={selectedGenres.includes(label)}
                onChange={handleCategoryChange}
                className="ml-4 h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/*  Rating Filter */}
      <div className="mt-8 my-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Rating</h2>
        <div className="flex flex-col items-center">
          <input
            type="range"
            id="ratingSlider"
            name="rating"
            min="1"
            max="5"
            step="0.1"
            value={selectedRating}
            onChange={(e) => setSelectedRating(Number(e.target.value))}
            onMouseUp={handleRatingChange}
            className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
          />
          <div className="w-full flex justify-between text-sm text-gray-600 mt-2">
            <span>1 Star</span>
            <span>5 Stars</span>
          </div>
        </div>
      </div>

      {/*  Sort by Price */}
      <div className="text-gray-800 my-10">
        <h2 className="my-2 text-xl font-bold">Price</h2>

        <div className="flex flex-col space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="priceSort"
              value="asc"
              checked={selectedSort === "asc"}
              onChange={handlePriceSort}
              className="text-amber-600 focus:ring-amber-500 mr-2"
            />
            Price - Low to High
          </label>

          <label className="flex items-center">
            <input
              type="radio"
              name="priceSort"
              value="desc"
              checked={selectedSort === "desc"}
              onChange={handlePriceSort}
              className="text-amber-600 focus:ring-amber-500 mr-2"
            />
            Price - High to Low
          </label>
        </div>
      </div>
      {/* <ToastContainer
      position='bottom-right'
      /> */}
    </div>
  );
};

export default Sidebar;
