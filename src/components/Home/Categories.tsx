import { useState } from "react";
import { FiChevronRight, FiRotateCw } from "react-icons/fi";

interface CategoryProps {
   setCategorySelect: (arg: string) => void,
   categorySelect: string,
}

export default function Categories({categorySelect, setCategorySelect}: CategoryProps) {

   const [ category, setCategory ] = useState(['home', 'arts', 'automobiles', 'books', 'business', 'fashion', 'food', 'health', 'insider', 'movies', 'nyregion', 'obituaries', 'opinion', 'politics', 'realestate', 'science', 'sports', 'sundayreview', 'technology', 'travel', 'us', 'world'])

   const [ openCategories, setOpenCategories ] = useState(false)

   return (
      <div className={`flex-wrap flex gap-6 p-8 pb-12 w-full relative items-center overflow-hidden duration-700 transition-all shadow-boxSm  border-b-4 rounded-3xl border-gray-400/50 ${openCategories?'h-80' :'h-28'}`}>
         <button onClick={() => setOpenCategories(!openCategories)} className='p-2 shadow-boxSm rounded-full hover:brightness-75 group duration-500 bg-red-600 text-xl font-semibold text-gray-50 '>
            <FiChevronRight size={36} className={` duration-300 ${openCategories?'rotate-90':'hover:rotate-12'}`}/>
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