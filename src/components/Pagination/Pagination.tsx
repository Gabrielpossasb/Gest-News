import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
   totalCountOfRegisters: number;
   registersPerPage ? : number;
   currentPage ? : number;
   onPageChange : (page: number) => void;
   positionTop: boolean;
}

const siblingsCount = 2;

function generatPagesArray(from: number, to: number) {
   return [...new Array(to - from)]
      .map( (data, index) => {
         return from + index + 1;
      })
      .filter( page => page > 0)
}

export function Pagination({
   totalCountOfRegisters,
   registersPerPage = 10,
   currentPage = 3,
   onPageChange,
   positionTop
}: PaginationProps) {
   const lastPage = Math.floor(totalCountOfRegisters / registersPerPage);

   const previusPages = currentPage > 1
      ? generatPagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      :[]

   const nextPages = currentPage < lastPage
      ? generatPagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
      : []

   return(
      <div className={`flex gap-5 justify-center overflow-hidden w-full max-w-xl items-center text-gray-800  shadow-boxSm rounded-full `}>
         <div className={`flex gap-4 p-4 w-full justify-center text-red-400 font-semibold items-center shadow-smInsetFadeRed`}>

            { currentPage > (1 + siblingsCount) && (
               <>
                  <PaginationItem onPageChange={onPageChange} number={1} />
                  { currentPage > (2 + siblingsCount) && (
                     <text className="text-gray-300 w-8 text-center">...</text>
                  )}
               </>
            )}

            { previusPages.length > 0 && previusPages.map( page => {
               return <PaginationItem onPageChange={onPageChange} key={page} number={page}/>
            })}

            <PaginationItem onPageChange={onPageChange} number={currentPage} isCurrent/>

            { nextPages.length > 0 && nextPages.map( page => {
               return <PaginationItem onPageChange={onPageChange} key={page} number={page} />
            })}

            { (currentPage + siblingsCount) < lastPage && (
               <>
                  { (currentPage + 1 + siblingsCount) < lastPage && (
                     <text className="text-gray-300 text-3xl w-8 text-center">...</text>
                  )}
                  <PaginationItem onPageChange={onPageChange} number={lastPage}/>
               </>
            )}
            
            
         </div>
      </div>
   );
}