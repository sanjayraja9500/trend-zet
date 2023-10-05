import React from 'react';
import { githubLogo, googleLogo } from '../assets';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { addUser, removeUser } from '../redux/bazarSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithPopup(
      auth,
      provider.setCustomParameters({ prompt: 'select_account' })
    )
      .then((result) => {
        const user = result.user;
        dispatch(
          addUser({
            _id: user.uid,
            name: user.displayName,
            email: user.email,
            image: user.photoURL,
          })
        );
        setTimeout(() => {
          navigate('/');
        }, 1500);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        toast.success('Log Out Successfully!');
        dispatch(removeUser());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const githubLogin = (e) => {
    e.preventDefault();
  };

  return (
    <div className='w-full flex flex-col items-center justify-center gap-10 py-22'>
      <div className='w-full flex items-center justify-center gap-10'>
        <div
          onClick={handleLogin}
          className='text-base w-60 h-12 tracking-wide border-[1px] border-gray-400 rounded-md flex items-center justify-center gap-2 hover:border-blue-600 cursor-pointer duration-300'
        >
          <img className='w-8' src={googleLogo} alt='googlehubLogo' />
          <span className='text-sm text-gray-900'>Sign in with Google</span>
        </div>
        <button
          onClick={handleSignOut}
          className='bg-black text-white text-base py-3 px-8 tracking-wide rounded-md hover:bg-gray-800 duration-300'
        >
          Sign Out
        </button>
      </div>
      <div className='w-full flex items-center justify-center gap-10'>
        <div
          onClick={githubLogin}
          className='text-base w-60 h-12 tracking-wide border-[1px] border-gray-400 rounded-md flex items-center justify-center gap-2 hover:border-blue-600 cursor-pointer duration-300'
        >
          <img className='w-8' src={githubLogo} alt='githubImg' />
          <span className='text-sm text-gray-900'>Sign in with GitHub</span>
        </div>
        <button
          onClick={handleSignOut}
          className='bg-black text-white text-base py-3 px-8 tracking-wide rounded-md hover:bg-gray-800 duration-300'
        >
          Sign Out
        </button>
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

export default Login;
