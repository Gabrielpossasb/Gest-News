import { useMediaQuery } from 'react-responsive';

import Image from 'next/image';

import LogoMarca from '../assets/Group 1.png';
import LogoMarcaIcon from '../../public/Logo.png';
import Link from 'next/link';

export default function Header() {

   const isDesktop = useMediaQuery({ query: '(min-width: 640px)'})

   return (
      <header className='flex gap-6 p-2 px-8 relative sm:px-20 bg-red-600 justify-between items-center shadow-redShade'>
          
          { isDesktop ? (
              <Image src={LogoMarca} width='180' height='80' alt='' className='flex self-start'/>
            ) : (
              <Image src={LogoMarcaIcon} width='80' height='40' alt='' className='flex self-start'/>
          )}

          <div className='flex items-center gap-6'>
            <button className='flex p-2 px-6 text-xl font-semibold text-gray-50 hover:bg-red-700 duration-300 rounded-full'>
              Home
              
            </button>

            <button className='flex p-2 px-6 text-xl font-semibold text-gray-50 hover:bg-red-700 duration-300 rounded-full'>
              About Us
              
            </button>

            <Link href={'https://www.nytimes.com/'} target={'_blank'} className='flex p-2 px-6 text-xs absolute bottom-0 right-6 font-semibold text-gray-50 hover:underline duration-300 rounded-full'>
              {'Copyright (c) 2022 The New York Times Company. All Rights Reserved.'}
              
            </Link>

          </div>
      </header>
   )
}