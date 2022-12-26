import { useMediaQuery } from 'react-responsive';

import Image from 'next/image';

import LogoMarca from '../assets/Group 1.png';
import LogoMarcaIcon from '../../public/Logo.png';
import Link from 'next/link';

export default function Header() {

   const isDesktop = useMediaQuery({ query: '(min-width: 640px)'})

   return (
      <header className='flex justify-between sm:gap-20 p-2 px-8 relative sm:px-20 bg-red-600 items-center shadow-redShade'>
          
          { isDesktop ? (
              <Image src={LogoMarca} width='180' height='80' alt='' className='flex'/>
            ) : (
              <Image src={LogoMarcaIcon} width='80' height='40' alt='' className='flex'/>
          )}

          
          <button className='flex p-1 px-6 text-3xl font-semibold text-gray-50 hover:bg-red-700 duration-300 rounded-full'>
            Home
            
          </button>

          <Link href={'https://www.nytimes.com/'} target={'_blank'} className='flex p-2 text-center text-xs realive sm:absolute sm:bottom-0 sm:right-6 font-semibold text-gray-50 hover:underline duration-300 rounded-full'>
            {'Copyright (c) 2022 The New York Times Company. All Rights Reserved.'}
            
          </Link>
          
      </header>
   )
}