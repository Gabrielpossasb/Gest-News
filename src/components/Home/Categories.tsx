import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";

interface CategoryProps {
   setCategorySelect: (arg: string) => void,
   categorySelect: string,
   loading: boolean,
}

export default function Categories({categorySelect, setCategorySelect, loading}: CategoryProps) {

   const [ category, setCaregory ] = useState(['home', 'arts', 'automobiles', 'books', 'business', 'fashion', 'food', 'health', 'insider', 'movies', 'nyregion', 'obituaries', 'opinion', 'politics', 'realestate', 'science', 'sports', 'sundayreview', 'technology', 'travel', 'us', 'world'])

   const [ openCategories, setOpenCategories ] = useState(false)
   
   function selectCategory(id:string) {
      setCategorySelect(id)
      let backupCategory: string[] = category.filter(val => val !== id)
      backupCategory.unshift(id)
      setCaregory(backupCategory)
   }

   return (
      <div className="flex flex-col gap-8 items-center" id={'categories'}>
         <strong className="text-4xl text-red-500 font-[jura] text-shadow-md">{'-  CATEGORIES  -'}</strong>

         <div className='flex h-3 w-64 shadow-shadeDark bg-red-400 rounded-full'></div>

         <div className={`flex p-6 sm:pl-10 items-start justify-center w-full relative overflow-hidden duration-700 transition-all shadow-boxSm border-b-4 rounded-3xl border-gray-400/50 
            ${openCategories?'h-80' :'h-24'}
         `}>
            <button onClick={() => setOpenCategories(!openCategories)} className='p-2 shadow-boxSm rounded-full hover:brightness-75 group duration-500 bg-red-500 text-xl font-semibold text-gray-50 '>
               <FiChevronRight size={36} className={` duration-300 ${openCategories?'rotate-90':'hover:rotate-12'}`}/>
            </button>

            <div className={`flex-wrap flex items-start justify-center gap-6 pb-2 px-6 h-full 2xl:h-auto 
               ${openCategories?'overflow-scroll scrollbar-thin scrollbar-thumb-red-700/50 scrollbar-track-gray-300 scrollbar-corner-inherit':''}
            `}>
            { category.map(val => (
               <button key={val} onClick={() => selectCategory(val)} disabled={categorySelect===val && true}
                  className={`p-2 border-2 w-36 border-gray-400 rounded-full enabled:hover:bg-red-200/50 enabled:hover:text-red-600 
                  font-semibold duration-500 enabled:hover:border-red-600 text-center transition-all shadow-boxSm
                  ${categorySelect===val?'bg-red-500 border-red-500 text-gray-50':'relative text-gray-400'}
               `}>
                  { loading ? (
                     <div className="flex items-center justify-center ">
                        <div className={`w-6 h-6 border-y-2 rounded-full animate-spin ${categorySelect===val?'border-white':'border-red-500'}`}></div>
                     </div>
                  ): (
                     val.charAt(0).toUpperCase() + val.slice(1)
                  )}
               </button>
            ))
            }
            </div>
            
         </div>
      </div>
   )
} 