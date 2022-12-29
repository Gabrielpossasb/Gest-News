import Link from "next/link"
import { FiArrowRightCircle, FiChevronRight } from "react-icons/fi"
import { NoticiesData } from "../../pages"
import { Pagination } from "../Pagination/Pagination"
import { useState } from "react"
import Image from "next/image"
import { doesNotMatch } from "assert"

export default function Notices({data}: NoticiesData) {

	const [pagination, setPagination ] = useState(1)

	const [noticeOpen, setNoticeOpen ] = useState<{
		open: boolean,
	}[]>([
		{ open: false},
		{ open: false},
		{ open: false},
		{ open: false},
		{ open: false},
		{ open: false},
		{ open: false},
		{ open: false},
		{ open: false},
		{ open: false},
		{ open: false},
		{ open: false},
		{ open: false},
		{ open: false},
		{ open: false},
		{ open: false},
		{ open: false},
		{ open: false},
		{ open: false},
		{ open: false},
		{ open: false},
		{ open: false},
		{ open: false},
		{ open: false},
		{ open: false},
		{ open: false},
		{ open: false},
		{ open: false},
		{ open: false},
		{ open: false},
		{ open: false},
		{ open: false},
		{ open: false},
		{ open: false},
		{ open: false},
		{ open: false},
		{ open: false},
		{ open: false},
		{ open: false},
		{ open: false},
		{ open: false},
		{ open: false},
		{ open: false},
		{ open: false},
		{ open: false},
		{ open: false},
		{ open: false},
		{ open: false},
		{ open: false},
		{ open: false},
		{ open: false},
	])

  	return (
    	<div className="flex flex-col items-center mt-8 m-4">

		<strong className="font-bold my-8 text-4xl font-[jura] text-red-500 underline underline-offset-8">-  NEWS  -</strong>

		<Pagination 
			totalCountOfRegisters={data?.num_results}
			currentPage={pagination}
			onPageChange={(e) => setPagination(e)} 
			registersPerPage={10}
			positionTop={true}
		/>

  		<div className='flex flex-col gap-14 sm:grid font-bold sm:grid-cols-2 2xl:grid-cols-3 sm:gap-28 my-20'>
			{ data?.results?.map((val, index) => { 

				let open = noticeOpen.map((noticeVal,noticeIndex) => {
					if(noticeIndex === index) { return noticeVal.open} else { return noticeVal.open}
				})

				return ( index < pagination * 10 && (index >= (pagination * 10) - 10)) && (

				<div className={`flex flex-col max-w-xl relative gap-4 pb-8 items-center shadow-boxCard rounded-xl group hover:shadow-boxRed bg-gray-50 duration-300 overflow-hidden ${ open[index] ? 'max-h-[900px] duration-1000' : 'max-h-[300px] '}`} key={index}>
					<text className='absolute left-2 top-2 text-gray-50 font-bold px-2 duration-500 rounded-full group-hover:bg-red-300 bg-red-400/80 shadow-boxSmInset'>{index + 1}</text>
					
					<text className='text-xl text-center p-4 px-10 w-full bg-red-400 text-gray-50 font-bold shadow-bottomShade'>{val.title}</text>
					
					{ val.multimedia?.map((img, imgIndex) => { return imgIndex === 1 && (
						<Image key={index} width={500} height={300} alt={img.caption} src={img.url} className='w-full duration-500 shadow-box group-hover:shadow-redShade h-[300px]'/>
					)})}

					<div className="p-6 gap-4 items-center w-full h-full flex flex-col">
						<text className='w-full text-gray-800'>{val.abstract}</text>

						<div className="self-start flex gap-2 text-base">
							<text className="text-red-500">By:</text>
							<text className="text-gray-400">{val.byline.slice(3)}</text>
						</div>

						<div className='flex w-full justify-between items-center mt-auto text-gray-400'>
							<Link href={val.url} target={'_blank'} className='hover:bg-gray-100 p-2 flex gap-2 items-center px-4 rounded-full text-center duration-300 hover:text-red-500 font-semibold underline underline-offset-4'>
								Link to Notice
								<FiArrowRightCircle size={20}/>
							</Link>

							<div className='flex flex-col sm:flex-row font-bold items-center sm:items-baseline text-xl text-red-500 gap-2 [textShadow:_1px_1px_2px_#adadadb3] '>
								<text>{val.published_date.slice(0,10)}</text>
								<span className="text-lg text-red-300">{val.published_date.slice(11, 16)}</span>
							</div>
						</div>
						
						<button onClick={() => setNoticeOpen(noticeOpen.map((noticeVal,noticeIndex) => { 
							return noticeIndex === index 
							? {open:!noticeVal.open} 
							: noticeVal
						}))} 
							className='flex gap-2 mt-4 w-36 p-1 px-4 absolute bottom-2 bg-gray-50 rounded-full items-center font-bold text-red-500 hover:bg-gray-100 duration-300'
						>
							{ !open[index] ? (
								'View more'
							) : (
								'View less'
							)}
							<FiChevronRight size={20} className={`duration-500 ml-auto ${ open[index] ?'-rotate-90':'rotate-90'}`}/>
						</button>

					</div>
				</div>
			)})}
		</div>

		<Pagination 
			totalCountOfRegisters={data?.num_results}
			currentPage={pagination}
			onPageChange={(e) => setPagination(e)} 
			registersPerPage={10}
			positionTop={false}
		/>

   	</div>
   )
} 