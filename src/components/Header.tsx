import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import Image from 'next/image';

import LogoMarca from '../assets/Group 1.png';
import LogoMarcaIcon from '../../public/Logo.png';

export default function Header() {

  const isDesktop = useMediaQuery({ query: '(min-width: 1100px)'})

  return (
    <header className='flex justify-center gap-6 sm:gap-16 h-20 px-4 relative md:px-20 bg-red-400 items-center shadow-redShade'>
          
          { isDesktop && (
              <Image src={LogoMarca} width='180' height='80' alt='' className='flex absolute left-20'/>
          )}         
          
          <a href='#categories' className='flex p-1 px-4 h-full text-lg sm:text-2xl items-center justify-center font-bold font-[jura] hover:bg-red-600/30 bg-red-400 
            border-b-8 hover:shadow-insetFoot border-transparent hover:border-red-600 duration-300 text-gray-50
          '>
            Categories    
          </a>   

          <a href='#home' className='flex p-1 px-6 h-full items-center  text-3xl sm:text-4xl font-bold justify-center  font-[jura] bg-red-400 hover:bg-red-600/30 text-gray-50 duration-300 border-b-8 hover:shadow-insetFoot border-transparent hover:border-red-600'>
            Home    
          </a>    

          <a href='#news' className='flex p-1 px-6 h-full text-lg sm:text-2xl items-center justify-center font-bold font-[jura] hover:bg-red-600/30 bg-red-400 
            border-b-8 hover:shadow-insetFoot border-transparent hover:border-red-600 duration-300 text-gray-50
          '>
            News    
          </a>      
      </header>
   )
}