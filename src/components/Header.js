import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { removeUser } from '../redux/bazarSlice';
import { signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { auth } from '../firebase.config';
import { RiAccountPinCircleLine } from 'react-icons/ri';
import { UserConsumer } from '../context/userContext';

import { CgLogIn } from 'react-icons/cg';
import { TbLogout2 } from 'react-icons/tb';
import { resetCart } from '../redux/bazarSlice';

const Header = () => {
  const productData = useSelector((state) => state.bazar.productData);
  const userInfo = useSelector((state) => state.bazar.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(userInfo);

  const {
    userName,
    setUserName,
    email,
    setEmail,
    number,
    setNumber,
    city,
    setCity,
    imageURL,
    setImageURL,
    getImageUrl,
    id,
    setId,
    userProfile,
    profileData,
    setProfileData,
    fetchProfileData,
    accessToken,
    setAccessToken,
  } = UserConsumer();

  const logOut = () => {
    signOut(auth);
    setProfileData(null);
    setAccessToken(null);
    clearFormInput();
    dispatch(resetCart());
    setTimeout(() => {
      navigate('/login');
    }, 1000);
    // setTimeout(() => {
    //   window.location.reload();
    // }, 2000);
  };

  const clearFormInput = () => {
    setId('');
    setUserName('');
    setEmail('');
    setCity('');
    setNumber('');
    setImageURL('');
  };

  return (
    <div className='w-full h-20 bg-white border-b-[1px] border-b-gray-800 sticky top-0 z-50'>
      <div className='max-w-screen-xl h-full mx-auto md:mx-auto flex items-center justify-between'>
        <div>
          {accessToken ? (
            <Link to='/'>
              <h1 className='w-50  text-xl md:text-3xl font-bold md:font-bold underline m-0 md:m-10 p-2 bg-transparent hover:text-orange-700 '>
                Trend-Zet
              </h1>
            </Link>
          ) : (
            <Link to='/login'>
              <h1 className='w-50  text-xl md:text-3xl font-bold md:font-bold underline m-0 md:m-10 p-2 bg-transparent hover:text-orange-700 '>
                Trend-Zet
              </h1>
            </Link>
          )}
        </div>

        {accessToken ? (
          <Link
            t0='/'
            className=' text-black text-lg font-bold hover:text-orange-700 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300 hidden md:block '
          >
            WELCOME ...!
          </Link>
        ) : (
          ''
        )}

        <div className='flex items-center gap-8 p-8'>
          <ul className='flex items-center gap-14 md:gap-16 p-8'>
            {accessToken ? (
              <Link to='/'>
                <li className='text-xl text-black font-bold hover:text-orange-700 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300'>
                  Home
                </li>
              </Link>
            ) : (
              <Link to='/login'>
                <li className='text-xl text-black font-bold hover:text-orange-700 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300'>
                  Home
                </li>
              </Link>
            )}

            <Link to='/cart'>
              {' '}
              <li className='text-xl text-black font-bold hover:text-orange-700 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300'>
                <h2 className='w-6 relative '>Cart</h2>
                <span className='absolute w-6 top-2 left-150 text-2xl -mt-2 ml-2 flex item-center justify-center font-semibold'>
                  {productData.length}
                </span>
              </li>
            </Link>

            <li className='text-xl text-black font-bold hover:text-orange-700 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300'>
              <Link to='/profile'>
                <span className='absolute w-6 top-2 left-150  ml-3 text-xl flex item-center justify-center font-semibold'>
                  <RiAccountPinCircleLine className='text-black hover:text-orange-700 text-2xl ' />
                </span>
                <h2 className='w-6 relative'> Profile</h2>
              </Link>
            </li>

            <li className='text-xl text-black font-bold hover:text-orange-700 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300  '>
              <Link to='/login'>
                <div>
                  {accessToken ? (
                    <h2
                      className='w-6 text-xl md:text-xl relative underline flex flex-row mr-2     '
                      onClick={logOut}
                    >
                      Logout{' '}
                      <span>
                        <TbLogout2 className=' mt-2' />
                      </span>
                    </h2>
                  ) : (
                    <>
                      <h2 className='w-6 text-xl relative underline flex flex-row  mr-0 md:text-xl '>
                        Login{' '}
                        <span>
                          <CgLogIn className=' mt-2' />
                        </span>
                      </h2>
                    </>
                  )}
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
