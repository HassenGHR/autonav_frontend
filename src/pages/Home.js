import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productAction";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import Message from "../components/Message";

const Home = () => {
  const dispatch = useDispatch();
  const [visibleProducts, setVisibleProducts] = useState(8);

  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const handleSeeMore = () => {
    setVisibleProducts((prevVisible) => prevVisible + 4);
  };

  return (
    <div>
      <section className="bg-white py-8 p-3 mt-5 mb-20">
        <div>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <div className="flex flex-col items-center">
              <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {products.slice(0, visibleProducts).map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              {visibleProducts < products.length && (
                <button
                  onClick={handleSeeMore}
                  className="mt-5 px-4 py-2 bg-blue-500 text-white rounded"
                >
                  عرض المزيد
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
