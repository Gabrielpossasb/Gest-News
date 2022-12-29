import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import Image from 'next/image';

import LogoMarca from '../assets/Group 1.png';
import LogoMarcaIcon from '../../public/Logo.png';

export default function Header() {

  const isDesktop = useMediaQuery({ query: '(min-width: 640px)'})

  return (
    <header className='flex justify-between gap-4 sm:gap-20 p-2 px-4 relative md:px-20 bg-red-400 items-center shadow-redShade'>
          
          { isDesktop && (
              <Image src={LogoMarca} width='180' height='80' alt='' className='flex'/>
          )}
          { !isDesktop && (
              <Image src={LogoMarcaIcon} width='60' height='60' alt='' className='flex'/>
          )}

          
          <button className='flex p-1 px-6 text-5xl font-bold font-[jura] text-gray-50 hover:bg-red-800 duration-300 rounded-full'>
            Home
            
          </button>

          <Link href={'https://www.nytimes.com/'} target={'_blank'} className='flex cel:w-32 w-44 p-2 text-center text-xs realive self-end font-semibold text-gray-50 hover:underline duration-300 rounded-full'>
            {'Copyright (c) 2022 The New York Times Company. All Rights Reserved.'}
            
          </Link>
          
      </header>
   )
}