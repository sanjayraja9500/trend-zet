import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { removeUser } from '../redux/bazarSlice';
import { signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { auth } from '../firebase.config';
import { RiAccountPinCircleLine } from 'react-icons/ri';
import { UserConsumer } from '../context/userContext';

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
      <div className='max-w-screen-xl h-full mx-auto flex items-center justify-between'>
        <Link to='/'>
          <div>
            <h1 className='w-50  text-xl md:text-3xl font-bold md:font-bold underline m-0 md:m-10 p-2 bg-transparent'>
              Trend-Zet
            </h1>
          </div>
        </Link>
        <div className='flex items-center gap-8 p-8'>
          <ul className='flex items-center gap-10 p-10'>
            <Link to='/'>
              <li className='text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300'>
                Home
              </li>
            </Link>
            <Link to='/banner'>
              {' '}
              <li className='text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300'>
                Pages
              </li>
            </Link>
            <Link to='/cart'>
              {' '}
              <li className='text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300'>
                <h2 className='w-6 relative '>Cart</h2>
                <span className='absolute w-6 top-2 left-150 text-sm flex item-center justify-center font-semibold'>
                  {productData.length}
                </span>
              </li>
            </Link>

            <li className='text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300'>
              <Link to='/profile'>
                <span className='absolute w-6 top-2 left-150 text-sm flex item-center justify-center font-semibold'>
                  {' '}
                  <RiAccountPinCircleLine className='text-black text-2xl ' />
                </span>
                <h2 className='w-6 relative'> Profile</h2>
              </Link>
            </li>

            <li className='text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 cursor-pointer duration-300 flex ml-2 '>
              <Link to='/login'>
                <div>
                  {accessToken ? (
                    <h2 className='w-6 relative  ' onClick={logOut}>
                      Logout
                    </h2>
                  ) : (
                    <h2 className='w-6 relative '>Login</h2>
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

// <div
//   style={{ backgroundColor: '#444' }}
//   className=' flex justify-evenly   h-20 p-2 '
// >
//   <div className=' text-black flex flex-row justify-start items-center '>
//     <Link to='/' className='max-sml:hidden'>
//       <imgbg
//         className='h-10 w-10 p -transparent absolute top-3 left-3'
//         src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDudJst-bD3ls6arZ7My5RUsScphJQXsqlwB3Dl3N6G9SJz8gaHfOL8fuVCqjPQlJMU3c&usqp=CAU'
//         alt='logo'
//       />{' '}
//     </Link>
//   </div>

//   <div className='flex justify-around items-center gap-6 font-semibold text-xl  '>
//     <div className='flex flex-row  justify-around gap-10 max-sml:font-thin max-sml:flex max-sml:gap-2 '>
//       <div>
//         <Link to='/' className='text-white '>
//           Home
//         </Link>
//       </div>
//       <div>
//         <Link className='text-white' to='/addBlog'>
//           Add Blog
//         </Link>
//       </div>
//       <div className=''>
//         <Link to='/about' className='text-white'>
//           About
//         </Link>
//       </div>
//     </div>
//   </div>
//   <div className='flex flex-row'>
//     <div className='flex flex-row justify-center items-center gap-4 font-semibold text-xl  max-sml:font-thin max-sml:flex max-sml:gap-2'>
//       <>
//         <Link to='/profile'>
//           <div className='flex gap-2 justify-center items-center'>
//             <RiAccountPinCircleLine className='text-white text-3xl ' />

//             <p className='text-center mt-3 tracking-wide text-white'>
//               Profile
//             </p>
//           </div>
//         </Link>

//         <Link to='/'>
//           <p
//             className='text-white text-xl mt-3 ml-10 text-end'
//             onClick={handleLogout}
//           >
//             Logout
//           </p>
//         </Link>
//       </>

//       <Link
//         to='/login'
//         style={{
//           color: '#fff',
//           display: 'flex',
//           flexDirection: 'row',
//         }}
//       >
//         Login
//       </Link>
//     </div>
//   </div>
// </div>
