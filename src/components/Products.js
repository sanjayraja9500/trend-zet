import React from 'react';
import ProductsCard from '../components/ProductsCard';

const Products = ({ products }) => {
  return (
    <div className='py-10 '>
      <div className='flex flex-col items-center gap-4'>
        <h1 className='text-2xl bg-black text-white py-2 w-80 text-center'>
          Shopping Everyday
        </h1>
        <span className='w-20 h-[7px]  bg-black '></span>
        <p className='max-w-[700px] text-gray-600 text-center text-1xl'>
          Dresses, one of the most loved attires by women, add a subtle feminine
          touch to any casual, formal, or festive ensemble. They come in an
          astonishing array of styles, fabrics, and lengths, ensuring that
          there's a proper choice for every occasion and personality.
        </p>
      </div>
      <div className='max-w-screen-xl mx-auto py-10 grid grid-cols-2 md:grid-cols-4 gap-10  p-8'>
        {products.map((item) => (
          <ProductsCard key={item._id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default Products;
