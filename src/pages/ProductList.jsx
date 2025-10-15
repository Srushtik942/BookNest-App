// import React, { useEffect, useState } from 'react';
// import Navbar from "../components/Navbar";
// import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
// import Sidebar from '../components/Sidebar';
// import { useParams } from 'react-router-dom';

// const ProductList = ({ isWished }) => {
//   const { genre } = useParams();
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [addToCart, setAddToCart] = useState(true);
//   const [wishlist, setWishlist] = useState(true);
//   const baseUrl = import.meta.env.VITE_BASE_URL;

//   // Fetch books by genre
//   useEffect(() => {
//     const filterByGenre = async () => {
//       try {
//         const response = await fetch(`${baseUrl}/products/genre/${genre}`);
//         const data = await response.json();
//         console.log("Fetched data:", data);

//         // Safe handling for different backend response shapes
//         setBooks(data.filteredBooks || data.books || []);
//       } catch (error) {
//         console.error("Error fetching books:", error);
//         setBooks([]); // fallback to avoid undefined
//       } finally {
//         setLoading(false);
//       }
//     };

//     filterByGenre();
//   }, [genre, baseUrl]);

//   const handleAddToCart = () => {
//     setAddToCart(false);
//     alert("Book added to cart!");
//   };

//   const handleAddToWishlist = () => {
//     setWishlist(false);
//     alert("Book added to wishlist!");
//   };

//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar */}
//       <div className="w-1/4 bg-amber-50 rounded-xl">
//         <Sidebar setFilteredBooks={setBooks} />
//       </div>

//       {/* Books section */}
//       <div className="w-3/4">
//         <h2 className="text-gray-700 pb-4 text-3xl playfair-heading text-center mb-10">
//           {genre ? `Showing All Books of ${genre}` : "No genre selected"}
//         </h2>

//          { books.length === 0 ? (
//           <p className="text-center text-gray-600 text-xl">
//             No books found for {genre || "this category"}.
//           </p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-10 max-w-7xl mx-auto">
//             {books.map((book) => (
//               <div
//                 key={book._id || book.id} // handles both MongoDB (_id) or normal id
//                 className="rounded-2xl shadow-lg flex flex-col items-center justify-center p-4 hover:bg-amber-300 hover:shadow-2xl transition-all"
//               >
//                 <img
//                   className="h-50 w-50 rounded-2xl mb-3"
//                   src={book.imageUrl}
//                   alt={book.title}
//                 />
//                 <h4 className="text-gray-700 font-semibold text-center">{book.title}</h4>
//                 <p className="text-gray-700 text-sm mb-2 text-center">by {book.author}</p>

//                 <div className="flex flex-row gap-6 my-6 items-center">
//                   <p className="text-gray-800 font-semibold">₹ {book.originalPrice}</p>
//                   <p className="text-gray-800 flex items-center gap-1">
//                     {book.rating || 0}
//                     <FaStar className="text-yellow-500 text-base" />
//                   </p>
//                   <button
//                     onClick={handleAddToWishlist}
//                     className="text-red-900 text-2xl rounded-full cursor-pointer"
//                   >
//                     {isWished ? <FaHeart /> : <FaRegHeart />}
//                   </button>
//                 </div>

//                 <button
//                   onClick={handleAddToCart}
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
  const baseUrl = import.meta.env.VITE_BASE_URL;

  // Handler functions should ideally take the book ID/details to be functional
  const handleAddToCart = (bookId) => {
    // In a real app, you'd dispatch an action or make an API call here
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
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-amber-50 rounded-xl">
        <Sidebar setFilteredBooks={setBooks} />
      </div>

      {/* Books section */}
      <div className="w-3/4 p-10">
        <h2 className="text-gray-700 pb-4 text-3xl playfair-heading text-center mb-10">
          {genre ? `Showing All Books of ${genre}` : "No genre selected"}
        </h2>

        {loading ? (
          <p className="text-center text-gray-600 text-xl mt-10">
            Fetching books for {genre}... 📚
          </p>
        ) : books.length === 0 ? (
          <p className="text-center text-gray-600 text-xl mt-10">
            No books found for "{genre || "this category"}" or the request failed.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {books.map((book) => (
              <div
                key={book._id || book.id}
                className="rounded-2xl shadow-lg flex flex-col items-center justify-center p-4 hover:bg-amber-300 hover:shadow-2xl transition-all"
              >
                <Link to={`/product/${book._id || book.id}`}>
                    <img
                        className="h-50 w-50 rounded-2xl mb-3 object-cover"
                        src={book.imageUrl}
                        alt={book.title}
                    />
                    <h4 className="text-gray-700 font-semibold text-center hover:underline">{book.title}</h4>
                </Link>

                <p className="text-gray-700 text-sm mb-2 text-center">by {book.author}</p>

                <div className="flex flex-row gap-6 my-6 items-center">
                  <p className="text-gray-800 font-semibold">₹ {book.originalPrice}</p>
                  <p className="text-gray-800 flex items-center gap-1">
                    {book.rating || 0}
                    <FaStar className="text-yellow-500 text-base" />
                  </p>
                  <button
                    onClick={() => handleAddToWishlist(book._id || book.id)}
                    className="text-red-900 text-2xl rounded-full cursor-pointer"
                  >
                    {isWished ? <FaHeart /> : <FaRegHeart />}
                  </button>
                </div>

                <button
                  onClick={() => handleAddToCart(book._id || book.id)}
                  className="text-white bg-amber-800 px-4 py-1 rounded-xl hover:bg-amber-900 cursor-pointer"
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