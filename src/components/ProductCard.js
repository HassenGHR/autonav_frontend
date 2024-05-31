import React from "react";

import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const renderRatingStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`h-5 w-5 ${
            i < rating ? "text-yellow-300" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <Link
        to={`/product/${product._id}`}
        className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white no-underline"
      >
        <img
          className="w-full h-48 object-cover rounded-t-lg"
          src={product.thumbnail[0]}
          alt={product.name}
        />
      </Link>

      <div className="mt-4">
        <h5>{product.name}</h5>

        <div className="mb-3 mt-1.5 flex items-center">
          {renderRatingStars(product.rating)}
          <span className="ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
            {product.rating == null ? 0.0 : product.rating.toFixed(1)}
          </span>
        </div>
        <div className="mb-3">
          <div className="flex items-center justify-center">
            <div className="flex items-center mr-2">
              <span className="mr-1">دج</span>
              <span className="text-1.5xl font-bold text-gray-900 dark:text-white">
                {product.price}
              </span>
            </div>
            <Link
              to={`/product/${product._id}`}
              className="rounded-lg no-underline bg-cyan-700 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
            >
              أطلب الآن
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
