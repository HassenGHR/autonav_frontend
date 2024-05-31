import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProducts } from '../actions/productAction';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const ProductCategoryScreen = () => {
  const dispatch = useDispatch();
  const { category } = useParams();

  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;

  useEffect(() => {
    dispatch(listProducts(category));
  }, [dispatch, category]);

  const filteredProducts = products.filter(
    (product) => product.category === decodeURIComponent(category.trim())
  );


  return (
    <div>
      <section className="bg-white py-8">
        <div className="container mx-auto flex  pt-4 pb-12 justify-center">
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-3 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {filteredProducts.length === 0 ? (
                <Message variant="info">No products found in this category.</Message>
              ) : (
                filteredProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />                ))
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductCategoryScreen;
