import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {
  const productData = useSelector((state) => state.bazar.productData);
  const userInfo = useSelector((state) => state.bazar.userInfo);
  console.log(userInfo);
  return (
    <div className='w-full h-20 bg-white border-b-[1px] border-b-gray-800 sticky top-0 z-50'>
      <div className='max-w-screen-xl h-full mx-auto flex items-center justify-between'>
        <Link to='/'>
          <div>
            <h1 className='w-30 text-3xl font-bold underline m-10'>
              Trend-Zet
            </h1>
          </div>
        </Link>
        <div className='flex items-center gap-8 p-8'>
          <ul className='flex items-center gap-8 p-8'>
            <li className='text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300'>
              Home
            </li>
            <li className='text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300'>
              Pages
            </li>
            <li className='text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300'>
              Shop
            </li>
            <li className='text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300'>
              Element
            </li>
            <li className='text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 cursor-pointer duration-300'>
              Blog
            </li>
          </ul>
          <Link to='/cart'>
            <div>
              <h2 className='w-6 relative '>cart</h2>
              <span className='absolute w-6 top-2 left-150 text-sm flex item-center justify-center font-semibold'>
                {productData.length}
              </span>
            </div>
          </Link>
          <Link to='login'>
            <img
              className='w-8 h-8 rounded-full '
              src={
                userInfo
                  ? userInfo.image
                  : 'https://e7.pngegg.com/pngimages/343/677/png-clipart-computer-icons-user-profile-login-my-account-icon-heroes-black-thumbnail.png'
              }
              alt='logo'
            />
          </Link>
          {userInfo && (
            <p className='text-base font-2xl font-semibold underline underline-offset-2'>
              {userInfo.name}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
