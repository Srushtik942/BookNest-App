
// import React, { useEffect, useState } from 'react';
// import Navbar from "../components/Navbar";
// import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
// import Sidebar from '../components/Sidebar';
// import { useParams, Link } from 'react-router-dom'; // Added Link for better UX

// const ProductList = ({ isWished }) => {
//   const { genre } = useParams();
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true); // Initial state is true
//   const baseUrl = import.meta.env.VITE_BASE_URL;

//   // Handler functions should ideally take the book ID/details to be functional
//   const handleAddToCart = (bookId) => {
//     // In a real app, you'd dispatch an action or make an API call here
//     alert(`Book ${bookId} added to cart!`);
//   };

//   const handleAddToWishlist = (bookId) => {

//     alert(`Book ${bookId} added to wishlist!`);
//   };

//   // Fetch books by genre
//   useEffect(() => {
//     const filterByGenre = async () => {
//       setLoading(true); // Reset loading state when genre changes
//       setBooks([]);
//       try {
//         const response = await fetch(`${baseUrl}/products/genre/${genre}`);
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();

//         setBooks(data.filteredBooks || data.books || []);
//       } catch (error) {
//         console.error("Error fetching books:", error);
//         setBooks([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (genre) {
//         filterByGenre();
//     } else {
//         setLoading(false);
//     }
//   }, [genre, baseUrl]);

//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar */}
//       <div className="w-1/4 bg-amber-50 rounded-xl">
//         <Sidebar setFilteredBooks={setBooks} />
//       </div>

//       {/* Books section */}
//       <div className="w-3/4 p-10">
//         <h2 className="text-gray-700 pb-4 text-3xl playfair-heading text-center mb-10">
//           {genre ? `Showing All Books of ${genre}` : "No genre selected"}
//         </h2>

//         {loading ? (
//           <p className="text-center text-gray-600 text-xl mt-10">
//             Fetching books for {genre}... 📚
//           </p>
//         ) : books.length === 0 ? (
//           <p className="text-center text-gray-600 text-xl mt-10">
//             No books found for "{genre || "this category"}" or the request failed.
//           </p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
//             {books.map((book) => (
//               <div
//                 key={book._id || book.id}
//                 className="rounded-2xl shadow-lg flex flex-col items-center justify-center p-4 hover:bg-amber-300 hover:shadow-2xl transition-all"
//               >
//                 <Link to={`/product/${book._id || book.id}`}>
//                     <img
//                         className="h-50 w-50 rounded-2xl mb-3 object-cover"
//                         src={book.imageUrl}
//                         alt={book.title}
//                     />
//                     <h4 className="text-gray-700 font-semibold text-center hover:underline">{book.title}</h4>
//                 </Link>

//                 <p className="text-gray-700 text-sm mb-2 text-center">by {book.author}</p>

//                 <div className="flex flex-row gap-6 my-6 items-center">
//                   <p className="text-gray-800 font-semibold">₹ {book.originalPrice}</p>
//                   <p className="text-gray-800 flex items-center gap-1">
//                     {book.rating || 0}
//                     <FaStar className="text-yellow-500 text-base" />
//                   </p>
//                   <button
//                     onClick={() => handleAddToWishlist(book._id || book.id)}
//                     className="text-red-900 text-2xl rounded-full cursor-pointer"
//                   >
//                     {isWished ? <FaHeart /> : <FaRegHeart />}
//                   </button>
//                 </div>

//                 <button
//                   onClick={() => handleAddToCart(book._id || book.id)}
//                   className="text-white bg-amber-800 px-4 py-1 rounded-xl hover:bg-amber-900 cursor-pointer"
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductList;


import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import Sidebar from '../components/Sidebar';
import { useParams, Link } from 'react-router-dom'; // Added Link for better UX

const ProductList = ({ isWished }) => {
  const { genre } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); // Initial state is true
  // Added state for mobile sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleAddToCart = (bookId) => {
    alert(`Book ${bookId} added to cart!`);
  };

  const handleAddToWishlist = (bookId) => {
    alert(`Book ${bookId} added to wishlist!`);
  };

  // Fetch books by genre
  useEffect(() => {
    const filterByGenre = async () => {
      setLoading(true); // Reset loading state when genre changes
      setBooks([]);
      try {
        const response = await fetch(`${baseUrl}/products/genre/${genre}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        setBooks(data.filteredBooks || data.books || []);
      } catch (error) {
        console.error("Error fetching books:", error);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    if (genre) {
        filterByGenre();
    } else {
        setLoading(false);
    }
  }, [genre, baseUrl]);

  return (
    <div className="flex min-h-screen relative">
      <button
        className="md:hidden fixed top-20 left-4 z-20 bg-amber-800 text-white p-3 rounded-full shadow-lg"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? 'Close Filters' : 'Filter Books'}
      </button>

      <div className={`
        fixed md:relative
        top-0 left-0 h-full
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
        w-3/4 md:w-1/4
        bg-amber-50 rounded-r-xl md:rounded-xl
        z-10 transition-transform duration-300 ease-in-out p-4 md:p-0
      `}>
        <Sidebar setFilteredBooks={setBooks} />
      </div>

      <div className="w-full md:w-3/4 p-4 sm:p-6 lg:p-10">
        <h2 className="text-gray-700 pb-4 text-2xl sm:text-3xl playfair-heading text-center mt-12 md:mt-0 mb-6 sm:mb-10">
          {genre ? `Books in ${genre}` : "All Books"}
        </h2>

        {loading ? (
          <p className="text-center text-gray-600 text-lg sm:text-xl mt-10">
            Fetching books for {genre}... 📚
          </p>
        ) : books.length === 0 ? (
          <p className="text-center text-gray-600 text-lg sm:text-xl mt-10">
            No books found for "{genre || "this category"}" or the request failed.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
            {books.map((book) => (
              <div
                key={book._id || book.id}
                className="rounded-2xl shadow-lg flex flex-col items-center justify-center p-3 sm:p-4 hover:bg-amber-300 hover:shadow-2xl transition-all"
              >
                <Link to={`/product/${book._id || book.id}`} className='w-full flex flex-col items-center'>
                    <img
                        className="h-50 w-50 rounded-2xl mb-3 object-cover"
                        src={book.imageUrl}
                        alt={book.title}
                    />
                    {/* Truncate title on small screens */}
                    <h4 className="text-gray-700 font-semibold text-center hover:underline text-sm sm:text-base truncate w-full px-1">{book.title}</h4>
                </Link>

                <p className="text-gray-700 text-xs sm:text-sm mb-2 text-center">by {book.author}</p>

                <div className="flex flex-row gap-2 sm:gap-4 my-4 sm:my-6 items-center">
                  <p className="text-gray-800 font-semibold text-sm sm:text-base">₹ {book.originalPrice}</p>
                  <p className="text-gray-800 flex items-center gap-1 text-xs sm:text-base">
                    {book.rating || 0}
                    <FaStar className="text-yellow-500 text-xs sm:text-base" />
                  </p>
                  <button
                    onClick={() => handleAddToWishlist(book._id || book.id)}
                    className="text-red-900 text-xl sm:text-2xl rounded-full cursor-pointer"
                  >
                    {isWished ? <FaHeart /> : <FaRegHeart />}
                  </button>
                </div>

                <button
                  onClick={() => handleAddToCart(book._id || book.id)}
                  className="text-white bg-amber-800 px-3 py-1 text-sm sm:text-base rounded-lg w-full hover:bg-amber-900 cursor-pointer"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;