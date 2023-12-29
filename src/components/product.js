import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { MdOutlineStar } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { AddToCart } from '../redux/bazarSlice';
import { ToastContainer, toast } from 'react-toastify';
import { UserConsumer } from '../context/userContext';

const Product = () => {
  const dispatch = useDispatch();
  const [details, setDetails] = useState({});
  let [baseQty, setBaseQty] = useState(1);
  const location = useLocation();
  const { accessToken } = UserConsumer();
  useEffect(() => {
    setDetails(location.state.item);
  }, []);
  return (
    <div>
      <div className='max-w-screen-xl mx-auto my-10 flex gap-10'>
        <div className='w-2/5 relative'>
          <img
            className='w-full h-[550px] object-cover'
            src={details.image}
            alt='productImg'
          />
          <div className='absolute top-4 right-0'>
            {details.isNew && (
              <p className='bg-black text-white font-semibold font-poppins px-8 py-1'>
                Sale
              </p>
            )}
          </div>
        </div>
        <div className='w-3/5 flex flex-col justify-center gap-12'>
          <div>
            <h2 className='text-4xl font-semibold'>{details.title}</h2>
            <div className='flex items-center gap-4 mt-3 text-2xl'>
              <p className='line-through text-gray-500'>${details.oldPrice}</p>
              <p className='font-bold'>${details.price}</p>
            </div>
          </div>
          <div className='flex items-center gap-2 text-2xs'>
            <div className='flex '>
              <MdOutlineStar />
              <MdOutlineStar />
              <MdOutlineStar />
              <MdOutlineStar />
              <MdOutlineStar />
            </div>
            <p className='text-xs text-gray-500'>(Customer review)</p>
          </div>
          <p className='text-base text-gray-500 -mt-3'>{details.description}</p>

          <div className='flex gap-4'>
            <div className='w-52 flex items-center justify-between text-gray-500 gap-4 border p-3'>
              <p className='text-1xl'>Quantity</p>
              <div className='flex item-center gap-4 text-sm font-semibold'>
                <button
                  onClick={() =>
                    setBaseQty(baseQty === 1 ? (baseQty = 1) : baseQty - 1)
                  }
                  className='border h-5 font-normal text-lg flex items-center justify-center px-2 hover:bg-gray-700 hover:text-white cursor-pointer duration-300 active:bg-black'
                >
                  -
                </button>
                <span>{baseQty}</span>
                <button
                  onClick={() => setBaseQty(baseQty + 1)}
                  className='border h-5 font-normal text-lg flex items-center justify-center px-2 hover:bg-gray-700 hover:text-white cursor-pointer duration-300 active:bg-black'
                >
                  +
                </button>
              </div>
            </div>

            {accessToken ? (
              <button
                onClick={() =>
                  dispatch(
                    AddToCart({
                      _id: details._id,
                      title: details.title,
                      image: details.image,
                      price: details.price,
                      quantity: baseQty,
                      description: details.description,
                    })
                  ) & toast.success(`${details.title} is added`)
                }
                className='bg-black text-white py-3 px-6 active:bg-gray-800'
              >
                Add to cart
              </button>
            ) : (
              <Link to='/login'>
                <button className='bg-black text-white py-3 px-6 active:bg-gray-800'>
                  Login
                </button>
              </Link>
            )}
          </div>
          <p className='text-1xl font-bold text-gray-500'>
            Category:{' '}
            <span className='font-medium capitalize'>{details.category}</span>
          </p>
        </div>
      </div>
      <ToastContainer
        position='top-left'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        Draggable
        pauseOnHovertheme='dark'
      />
    </div>
  );
};

export default Product;
