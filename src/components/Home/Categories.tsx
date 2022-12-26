import { useState } from "react";
import { FiRotateCw } from "react-icons/fi";

interface CategoryProps {
   setCategorySelect: (arg: string) => void,
   categorySelect: string,
}

export default function Categories({categorySelect, setCategorySelect}: CategoryProps) {

   const [ category, setCategory ] = useState(['arts', 'automobiles', 'books', 'business', 'fashion', 'food', 'health', 'home', 'insider', 'movies', 'nyregion', 'obituaries', 'opinion', 'politics', 'realestate', 'science', 'sports', 'sundayreview', 'technology', 'travel', 'us', 'world'])


   return (
      <div className='flex-wrap flex gap-6 p-8 w-full relative items-center'>
         <button className='p-4 shadow-boxSm rounded-full hover:brightness-75 group duration-500 bg-red-600 text-xl font-semibold text-gray-50 '>
            <FiRotateCw size={28} className='group-hover:animate-spin'/>
         </button>
         { category.map(val => (
            <button key={val} onClick={() => categorySelect === val ? setCategorySelect('home') : setCategorySelect(val)} 
               className={`p-2 px-4 border-2 w-36 border-gray-400 rounded-full hover:bg-gray-100/50 hover:text-red-600 
               font-semibold duration-500 hover:border-red-600 text-center transition-all shadow-boxSm
               ${categorySelect===val?'bg-red-600 border-transparent text-gray-50':'relative text-gray-400'}
            `}>
               {val.charAt(0).toUpperCase() + val.slice(1)}
            </button>
         ))
         }
         
      </div>
   )
} 