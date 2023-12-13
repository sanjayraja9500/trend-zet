import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from '../components/CartItem';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { resetCart } from '../redux/bazarSlice';
import { FcOk } from 'react-icons/fc';

const Cart = () => {
  const productData = useSelector((state) => state.bazar.productData);
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.bazar.userInfo);
  const [totalAmt, setTotalAmt] = useState('');
  const [payNow, setPayNow] = useState(false);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    let price = 0;
    productData.map((item) => {
      price += item.price * item.quantity;
      return price;
    });
    setTotalAmt(price.toFixed(2));
  }, [productData]);

  const handleCheckout = () => {
    dispatch(resetCart());

    toast.success('Your Cart order is Placed successfully..! ');

    setTimeout(() => {
      navigate('/');
    }, 5000);
  };

  const payment = async (token) => {
    await axios.post('http://localhost:8000/pay', {
      amount: totalAmt * 100,
      token: token,
    });
  };

  return (
    <div>
      <img
        className='w-full h-60 object-cover'
        src='https://images.pexels.com/photos/1435752/pexels-photo-1435752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        alt='cartImg'
      />
      {productData.length > 0 ? (
        <div className='max-w-screen-xl mx-auto py-20 flex'>
          <CartItem />
          <div className='w-1/3 h-full bg-gray-100 py-6 px-4'>
            <div className='flex flex-col gap-6 border-b-[1px] border-b-gray-700 pb-6'>
              <h2 className='text-2xl font-medium'> cart totals</h2>
              <p className='flex items-center gap-4 text-base font-semibold'>
                Subtotal{''}
                <span className='font-3xl font-bold text-lg'>$ {totalAmt}</span>
              </p>
              <p className='flex items-center gap-4 text-base font-semibold'>
                Shipping{''}
                <span>Deliver to shipping address</span>
              </p>
            </div>
            <p className='font-2xl font-semibold flex justify-between mt-6'>
              Total <span className='text-xl font-bold'>$ {totalAmt}</span>
            </p>
            <button
              onClick={() => setShow(!show)}
              className='text-base bg-black text-white w-full py-3 mt-6 hover:bg-gray-800 duration-300'
            >
              Proceed to checkout
            </button>
            {show ? (
              <div className=' p-1  mt-3 bg-orange-100 border b-2 rounded h-1/4 w-full'>
                <p>
                  <h2 className='font-bold text-base text-left ml-10 mt-5'>
                    Your Cart Order is ready to Place...!
                  </h2>
                </p>
                <p className='-mb-10'>
                  <h2 className='font-bold text-base ml-10 text-start '>
                    Expect delivery in 2 days...to your address...!
                  </h2>
                  <button
                    onClick={handleCheckout}
                    className='text-base bg-black text-white ml-3 md:,l-10  w-[80%] py-3 mt-6 hover:bg-gray-800 duration-300 flex justify-center items-center'
                  >
                    Confirm to Place the Order
                    <FcOk className='mt-1 ml-2' />
                  </button>
                </p>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <div className='max-w-screen-xl mx-auto py-10 flex flex-col items-center gap-2 justify-center'>
          <p className='text-xl text-orange-600 font-titleFont font-semibold'>
            Your Cart is Empty. Please go back to Shopping and add products to
            Cart.
          </p>
          <Link to='/'>
            <button className='flex items-center gap-1 text-gray-400 hover:text-black duration-300'>
              <span>
                <HiOutlineArrowLeft />
              </span>
              go shopping
            </button>
          </Link>
        </div>
      )}

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

export default Cart;
