import Image from "next/image";

import LogoMarcaIcon from '../../public/Logo.png';
import Link from "next/link";
import { FiGithub, FiLinkedin } from "react-icons/fi";

export default function Foot() {

   return (
      <div className="p-6 lg:flex flex flex-col justify-center gap-8 relative items-center bg-red-400 w-full">

         <div className="flex gap-10 items-center lg:absolute lg:left-20 ">

            <div className="bg-red-600 text-white flex flex-col gap-2 items-center px-4 p-2 rounded-2xl shadow-shadeDark">
               <text className="font-bold">Developed by:</text>

               <text className="font-[Roboto] underline underline-offset-4">Gabriel Possas</text>
            </div>

            <Link href={'https://www.linkedin.com/in/gabriel-possas/'} rel='noreferrer' target='_blank'
               className="bg-red-600 p-3 rounded-full text-white shadow-shadeDark hover:shadow-shadeDarkHover
               hover:bg-red-200 hover:text-red-600 duration-500
            ">
               <FiLinkedin size={26}/>
            </Link>

            <Link href={'https://github.com/Gabrielpossasb'} rel='noreferrer' target='_blank'
               className="bg-red-600 p-3 rounded-full text-white shadow-shadeDark hover:shadow-shadeDarkHover
               hover:bg-red-200 hover:text-red-600 duration-500
            ">
               <FiGithub size={26}/>
            </Link>
         </div>

         <Image alt="" src={LogoMarcaIcon} height={60} width={60} className={'shadow-shadeDark rounded-full'}/>

         <Link href={'https://www.nytimes.com/'} target={'_blank'} 
            className='flex shadow-shadeDark bg-red-600 cel:w-32 w-52 p-2 lg:absolute lg:right-20 text-center text-xs realive 
            font-bold text-gray-50 hover:underline rounded-2xl hover:shadow-shadeDarkHover hover:bg-red-200 hover:text-red-600 duration-500
         '>
            {'Copyright (c) 2022 The New York Times Company. All Rights Reserved.'}
          </Link>
      </div>
   )
}