import React, { useState } from 'react';
import { HiArrowRight, HiArrowLeft } from 'react-icons/hi';

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const data = [
    'https://marketplace.canva.com/EAFFFuyDxNQ/1/0/1600w/canva-neutral-minimalist-special-sale-banner-z0lRP-gc15o.jpg',
    'https://marketplace.canva.com/EAFYElY5EE4/1/0/1600w/canva-brown-and-white-modern-fashion-banner-landscape-Ap8IU9nEbh8.jpg',
    'https://marketplace.canva.com/EAFGKRRskMs/1/0/1600w/canva-brown-and-beige-minimalist-fashion-banner-lYcbGpUSVGo.jpg',
    'https://marketplace.canva.com/EAFLV0NR7qo/1/0/1600w/canva-white-grey-modern-fashion-new-collection-banner-landscape-YVJdopaRge4.jpg',
  ];

  //amazonproone.vercel.app/static/media/img2.bc1bdb910ead16c65197.jpg?
  //amazonproone.vercel.app/static/media/img5.aa945e25375bfdee385f.jpg
  //amazonproone.vercel.app/static/media/img3.c80809bb40bee5c34372.jpg
  //amazonproone.vercel.app/static/media/img1.efb3d39101f7ef77d616.jpg
  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? 3 : (prev) => prev - 1);
  };
  const nextSlide = () => {
    setCurrentSlide(currentSlide === 3 ? 0 : (prev) => prev + 1);
  };

  return (
    <div className='w-full h-auto md:w-full  overflow-x-hidden'>
      <div className='w-screen h-[750px] relative p-8'>
        <div
          style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
          className='w-[100vw] h-full flex transition-transform duration-1000'
        >
          <img
            className='w-screen h-full object-cover'
            src={data[0]}
            alt='imgOne'
            Loading='priority'
          />
          <img
            className='w-screen h-full object-cover'
            src={data[1]}
            alt='imgTwo'
            Loading='priority'
          />
          <img
            className='w-screen h-full object-cover'
            src={data[2]}
            alt='imgThree'
            Loading='priority'
          />
          <img
            className='w-[400vw] h-full object-cover'
            src={data[3]}
            alt='imgFour'
            Loading='priority'
          />
        </div>
        <div className='absolute w-fit left-0 right-0 mx-auto -mb-24 flex gap-8 bottom-48 px-4   '>
          <div
            onClick={prevSlide}
            className='w-14 h-12 border-2 border-gray-700 flex items-center justify-center hover:cursor-pointer bg-black text-white hover:bg-white hover:text-black  duration-300    '
          >
            <HiArrowLeft className='font-extrabold text-3xl' />
          </div>
          <div
            onClick={nextSlide}
            className='w-14 h-12 border-2 border-gray-700 flex items-center justify-center hover:cursor-pointer text-black bg-white hover:bg-black hover:text-white active:bg-gray-900 duration-300'
          >
            <HiArrowRight className='font-extrabold  text-3xl' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
