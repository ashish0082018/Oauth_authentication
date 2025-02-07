"use client"
import Footer from '@/components/home/Footer'
import Link from 'next/link';
import React, { useState } from 'react'

function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const Arr = [
    {
      image: "https://res.cloudinary.com/db9bglamk/image/upload/v1738352612/NODEE/kuxcftu7eny51qxv6asl.png"
    },
    {
      image: ""
    },
    {
      image: ""
    }
  ];

  const openImagePopup = (image: string) => {
    setSelectedImage(image);
    setIsOpen(true);
  };

  const closeImagePopup = () => {
    setIsOpen(false);
    setSelectedImage('');
  };

  return (
    <div className='min-h-screen mx-3'>
      <div className='h-screen container mx-auto mt-10'>
        <span className='font-semibold text-3xl tracking-tighter'>
          Select your custom Profile
          <div className='w-full h-[1px] bg-slate-100 mt-2'></div>
        </span>
        <p className='text-md tracking-tighter'>
          <span className='text-purple-600 tracking-tighter font-semibold text-md mr-4'>Welcome to Your Dashboard! </span>
          Personalize your profile, update your preferences, and make your space truly yours. Start customizing now!
        </p>
        
        {/* Adjusted Flexbox layout for responsiveness */}
        <div className='flex flex-wrap gap-9 h-full justify-center'>
          {
            Arr.map((elem, key) => {
              return (
                <div key={key} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-zinc-600 h-2/5 overflow-hidden mt-6 rounded-xl shadow-xl hover:shadow-purple-600 transition'>
                  <div className='w-full h-4/5 overflow-hidden bg-cover bg-center' style={{ backgroundImage: `url("${elem.image}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                  <div className='mt-4 flex justify-between mx-5 '>
                  
                   { key===0 && <Link href={"/dashboard/style1"}>  <button className='bg-zinc-800 px-3 py-1 rounded-md text-md tracking-tight'>Create</button>  </Link>}
                    <button
                      className='bg-zinc-800 px-3 py-1 rounded-md text-md tracking-tight'
                      onClick={() => openImagePopup(elem.image)}
                    >
                      View
                    </button>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
      
      {/* Popup for Image */}
      {isOpen && (
        <div
          className='fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70 flex justify-center items-center z-50'
          onClick={closeImagePopup}
        >
          <div
            className='relative w-11/12 sm:w-3/4 md:w-3/4 lg:w-3/4 h-auto max-w-4xl'
            onClick={(e) => e.stopPropagation()} // Prevent clicking the image container from closing the popup
          >
            <img src={selectedImage} alt='Selected profile' className='w-full h-full object-contain' />
            <button
              className='absolute top-0 right-0 text-white text-xl font-bold p-2'
              onClick={closeImagePopup}
            >
              x
            </button>
          </div>
        </div>
      )}

      <div><Footer /> </div>
    </div>
  );
}

export default Page;
