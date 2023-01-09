import { useKeenSlider } from "keen-slider/react";
import { useMediaQuery } from "react-responsive";
import { FiArrowRightCircle } from "react-icons/fi";
import { NoticiesData } from "../../pages";

import Link from "next/link";

import "keen-slider/keen-slider.min.css"
import Image from "next/image";

export default function Carroussel({data}: NoticiesData) {

   const isDesktop = useMediaQuery({ query: '(min-width: 640px)'})

   const [sliderRef] = useKeenSlider(
      {
         loop: true,
      },
      [
         (slider) => {
         let timeout:NodeJS.Timeout;
         let mouseOver = false;
         function clearNextTimeout() {
            clearTimeout(timeout)
         }
         function nextTimeout() {
            clearTimeout(timeout)
            if (mouseOver) return
            timeout = setTimeout(() => {
               slider.next()
            }, 4000)
         }
         slider.on("created", () => {
            slider.container.addEventListener("mouseover", () => {
               mouseOver = true
               clearNextTimeout()
            })
            slider.container.addEventListener("mouseout", () => {
               mouseOver = false
               nextTimeout()
            })
            nextTimeout()
         })
         slider.on("dragStarted", clearNextTimeout)
         slider.on("animationEnded", nextTimeout)
         slider.on("updated", nextTimeout)
         },
      ]
   )
   
   return (
      <>
         { (!!data) ? (
            <div className='flex w-full' id={'home'}>
               <div ref={sliderRef} className="keen-slider">
                  { data.results.map((val, index) => { return index <= 8 && (
                     <div key={index} className={`keen-slider__slide number-slide${index + 1}`}>

                        <div className='flex flex-col items-center lg:flex-row flex-1 z-20 rounded-xl overflow-hidden shadow-box m-8 h-[400px] max-h-[460px] sm:h-[500px] sm:max-h-[650px]'>
                           
                           <div className='flex flex-col lg:w-[40%] w-full h-full items-center justify-center shadow-redShadeRight z-20'>
                              <strong className='text-xl text-center p-4 px-10 w-full bg-red-400 text-gray-50 font-semibold shadow-bottomShade'>{val.title}</strong>
                              
                              { isDesktop && (
                                 <text className='font-semibold text-gray-800 m-6'>{val.abstract}</text>
                              )}
                              
                              <Link href={val.url} target={'_blank'} className='hover:bg-gray-100/60 m-6 text-gray-400 p-2 flex gap-2 items-center px-6 sm:mt-auto sm:mr-auto rounded-full text-center duration-300 hover:text-red-600 font-bold underline underline-offset-4'>
                                 Link da Reportagen
                                 <FiArrowRightCircle size={20}/>
                              </Link>
                           </div>

                           {  isDesktop ? (
                              val.multimedia?.map((img, imgIndex) => { return imgIndex === 0 && (
                                 <Image key={index} alt={img.caption} height={520} width={1480} src={img.url} className='shadow-insetFade bg-contain h-auto lg:w-[60%]'/>
                              )})
                           ) : (
                              val.multimedia?.map((img, imgIndex) => { return imgIndex === 1 && (
                                 <Image key={index} alt={img.caption} height={300} width={600} src={img.url} className='shadow-insetFade bg-contain h-auto lg:w-[60%]'/>
                              )})
                           )}

                        </div>
                     </div>
                     
                     )}
                  )}

               </div>
            </div>
         ) : (
            <div className='w-full sm:h-[300px] flex items-center justify-center text-3xl font-semibold animate-bounce'>
               Loading...
            </div>
         )} 
      </>
   )
} 