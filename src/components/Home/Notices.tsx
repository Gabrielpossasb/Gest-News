import Link from "next/link"
import { FiArrowRightCircle, FiChevronRight } from "react-icons/fi"
import { NoticiesData } from "../../pages"
import { Pagination } from "../Pagination/Pagination"
import { useState } from "react"
import Image from "next/image"

export default function Notices({data}: NoticiesData) {

	const [pagination, setPagination ] = useState(1)

	const [noticeOpen, setNoticeOpen ] = useState(true)

  	return (
    	<>
		<Pagination 
			totalCountOfRegisters={data?.num_results}
			currentPage={pagination}
			onPageChange={(e) => setPagination(e)} 
			registersPerPage={10}
		/>

  		<div className='flex flex-col gap-14   sm:grid sm:grid-cols-2 sm:gap-28 mt-10'>
			{ data?.results?.map((val, index) => { 
				return ( index < pagination * 10 && (index >= (pagination * 10) - 10)) && (

				<div className={`flex flex-col relative gap-4 pb-12 items-center shadow-boxCard rounded-xl group hover:shadow-boxRed bg-gray-50 duration-300 overflow-hidden ${noticeOpen ? 'max-h-[800px]' : 'max-h-[300px]'}`} key={index}>
					<text className='absolute left-2 top-2 text-gray-50 font-bold px-2 duration-300 rounded-full group-hover:bg-red-400 bg-red-600/80 shadow-boxSmInset'>{index + 1}</text>
					
					<text className='text-xl text-center p-4 px-10 w-full bg-red-700 text-gray-50 font-semibold shadow-bottomShade'>{val.title}</text>
					
					{ val.multimedia.map((img, imgIndex) => { return imgIndex === 1 && (
						<Image width={600} height={400} alt={img.caption} src={img.url} className='w-full duration-500 shadow-box group-hover:shadow-redShade h-[300px]'/>
					)})}

					<text className='font-medium text-gray-800 px-8 my-2'>{val.abstract}</text>

					<div className="p-2 px-6 flex gap-4 text-xl font-medium">
						<text className="text-red-600">By:</text>
						<text className="text-gray-800">{val.byline}</text>
					</div>
				
					<button onClick={() => setNoticeOpen(!noticeOpen)} className='flex gap-2 w-36 p-2 px-4 absolute bottom-2 bg-gray-50 rounded-full items-center font-bold text-red-600 hover:bg-gray-100 duration-300'>
						{ !noticeOpen ? (
							'View more'
						) : (
							'View less'
						)}
						<FiChevronRight size={20} className={`duration-500 ml-auto ${noticeOpen?'-rotate-90':'rotate-90'}`}/>
					</button>

					<div className='flex w-full px-6 justify-between items-center text-gray-400'>
						<Link href={val.url} target={'_blank'} className='hover:bg-gray-100/60 p-2 flex gap-2 items-center px-4 rounded-full text-center duration-300 hover:text-red-600 font-semibold underline underline-offset-4'>
							Link to Notice
							<FiArrowRightCircle size={20}/>
						</Link>

						<div className='flex font-bold items-baseline text-xl text-red-500 gap-2 [textShadow:_1px_1px_2px_#adadadb3] '>
							{val.published_date.slice(0,10)} 
							<span className="text-lg text-red-400">{val.published_date.slice(11, 16)}</span>
						</div>
					</div>
				</div>
			)})}
		</div>

      </>
   )
} 