import React from 'react';
import { ImGithub } from 'react-icons/im';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaHome,
} from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { BsPersonFill, BsPaypal } from 'react-icons/bs';

const Footer = () => {
  return (
    <div className='bg-black text-[#949494] py-20 font-semi-bold'>
      <div
        className='max-w-screen-xl
        mx-auto grid grid-cols-4'
      >
        <div className='flex flex-col gap-7'>
          <h1 className='w-32 text-3xl text-bold text-white underline'>
            Trend-zet
          </h1>
          <p className='text-white text-sm tracking-wide'>React BD.com</p>
          <img
            className='w-56'
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStzzqW0y0veady2VmneswqbUnaMFbGmtUB2g&usqp=CAU'
            alt='paymentLogo'
          />
          <div className='flex gap-5 text-1g text-gray-400'>
            <ImGithub className='hover:text-white duration-300 cursor-pointer' />
            <FaFacebookF className='hover:text-white duration-300 cursor-pointer' />
            <FaTwitter className='hover:text-white duration-300 cursor-pointer' />
            <FaInstagram className='hover:text-white duration-300 cursor-pointer' />
            <FaYoutube className='hover:text-white duration-300 cursor-pointer' />
            <FaHome className='hover:text-white duration-300 cursor-pointer' />
          </div>
        </div>

        <div>
          <h2 className='text-2xl font-semibold text-white mb-4'>Locate Us</h2>
          <div className='text-2xl flex flex-col gap-2 py-3'>
            <p>TDO,Viswi, Villet-Iran</p>
            <p>Mobile: 09050 80407</p>
            <p>phone: 09050 80407</p>
            <p>E-mail: trendzet03@gmail.com</p>
          </div>
        </div>

        <div>
          <h2 className='text-2xl font-semibold text-white mb-4'>Profile</h2>
          <div className='flex flex-col gap-2 text-base'>
            <p className='flex item-center gap-2 hover:text-white duration-300 cursor-pointer py-3'>
              <span className='py-1'>
                <BsPersonFill />
              </span>{' '}
              my account
            </p>

            <p className='flex item-center gap-2 hover:text-white duration-300 cursor-pointer py-3'>
              <span className='py-1'>
                <BsPaypal />
              </span>{' '}
              checkout
            </p>

            <p className='flex item-center gap-2 hover:text-white duration-300 cursor-pointer py-3'>
              <span className='py-1'>
                <FaHome />
              </span>{' '}
              order Tracking
            </p>

            <p className='flex item-center gap-2 hover:text-white duration-300 cursor-pointer py-3'>
              <span className='py-1'>
                <MdLocationOn />
              </span>{' '}
              Help & support
            </p>
          </div>
        </div>

        <div className='flex flex-col justify-center'>
          <input
            className='bg-transparent border px-4 py-2 text-sm'
            placeholder='e-mail'
            type='text'
          />
          <button className='text-sm border text-white border-t-0 hover:bg-gray-900 active:bg-white active:text-black'>
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
