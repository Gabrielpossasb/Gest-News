import { useMediaQuery } from 'react-responsive';

import Image from 'next/image';

import LogoMarca from '../assets/Group 1.png';

export default function Header() {

   const isDesktop = useMediaQuery({ query: '(min-width: 1100px)'})

   return (
      <header className='flex justify-center gap-2 sm:gap-16 h-20 px-4 relative md:px-20 bg-red-400 items-center shadow-redShade'>
          
         { isDesktop && (
            <Image src={LogoMarca} width='180' height='80' alt='' className='flex absolute left-10'/>
         )}         
         
         <a href='#categories' className='flex p-1 px-4 cel:max-w-[110px] cel:text-base h-full text-lg md:text-2xl items-center justify-center font-bold font-[jura] hover:bg-red-600/30 bg-red-400 border-b-8 hover:shadow-insetFoot border-transparent hover:border-red-600 duration-300 text-gray-50
         '>
            Categories    
         </a>   

         <a href='#home' className='flex p-1 px-4 h-full items-center text-2xl sm:text-4xl font-bold justify-center  font-[jura] bg-red-400 hover:bg-red-600/30 text-gray-50 duration-300 border-b-8 hover:shadow-insetFoot border-transparent hover:border-red-600'>
            Home    
         </a>    

         <div className='min-w-[100px] min-w-[100px] h-full flex items-center justify-start'>
            <a href='#news' className='flex p-1 px-2 sm:px-4 h-full cel:text-base text-lg md:text-2xl items-center justify-center font-bold font-[jura] hover:bg-red-600/30 bg-red-400 border-b-8 hover:shadow-insetFoot border-transparent hover:border-red-600 duration-300 text-gray-50
            '>
               News    
            </a>
         </div>      
      </header>
   )
}