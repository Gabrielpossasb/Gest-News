import Head from 'next/head'
import { api } from '../services/api'
import { MouseEvent, useEffect, useState } from 'react'
import Link from 'next/link'
import { FiArrowRightCircle, FiRotateCw, FiChevronRight } from "react-icons/fi";
import { useKeenSlider } from "keen-slider/react"

import "keen-slider/keen-slider.min.css"

interface Noticias {
  data: {
    items: [
      {
        id: number,
        titulo: string,
        introducao: string,
        imagens: string,
        link: string,
      },
    ]
  }
}

export default function Home() {

  const [ noticias, setNoticias ] = useState<Noticias>({} as Noticias)

  const [ category, setCategory ] = useState(['Agricultura', 'Games', 'Entreterimento', 'Cinema', 'Mundo'])

  const [selectCategory, setSelectCategory ] = useState('')

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

  useEffect(() => {
    const apiRe = async () => {
      const response = await api.get(`/api/source`)
      setNoticias(response.data)
    }

    apiRe().catch(console.error)
  }, [])

  async function handleRe(e: MouseEvent) {
    e.preventDefault()
    const response = await api.get(`/api/source`)

    setNoticias(response.data)
  }
  
  return (
    <>
      <Head>
        <title>HOME | GEST FULL</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='flex flex-col'>
        <header className='flex gap-6 p-6 bg-red-600 justify-center shadow-redShade'>
          <button className='flex p-2 px-6 text-xl font-semibold text-gray-50 hover:bg-red-700 duration-300 rounded-full'>
            Home
            
          </button>
          <button className='flex p-2 px-6 text-xl font-semibold text-gray-50 hover:bg-red-700 duration-300 rounded-full'>
            Sobre Nós
            
          </button>
          <button className='flex p-2 px-6 text-xl font-semibold text-gray-50 hover:bg-red-700 duration-300 rounded-full'>
            Publique sua notícia
            
          </button>
        </header>

        <div className='flex flex-col px-20 py-10'>
          

          <div className='flex w-full'>
            <div ref={sliderRef} className="keen-slider">
              { noticias.data?.items?.map((val, index) => { 
                  const linkImage = ( 
                    `https://agenciadenoticias.ibge.gov.br/`
                    + 
                    `${val.imagens.slice( val.imagens.search('image_fulltext') + 17, val.imagens.search('float_fulltext') - 3 )}`
                  ); 
                                
                return (
                <div className={`keen-slider__slide number-slide${index + 1}`}>
                  <div className='flex flex-1 bg-red-50 z-20 rounded-xl overflow-hidden shadow-box m-4'>
                    <div className='flex flex-col w-[40%] shadow-redShadeRight z-20'>
                      <text className='text-xl text-center p-4 px-10 bg-red-700 text-gray-50 font-semibold shadow-bottomShade'>{val.titulo}</text>
                      <text className='font-medium text-gray-800 px-8 my-6'>{val.introducao}</text>
                    </div>

                    <img src={linkImage} className='shadow-insetFade w-[60%]'/>
                  </div>
                </div>
                
              )})}
            </div>
          </div>

          <div className='flex gap-6 p-8 w-full relative items-center'>
            <button onClick={(e) => handleRe(e)} 
              className='p-4 shadow-boxSm rounded-full hover:brightness-75 group duration-500 bg-red-600 text-xl font-semibold text-gray-50 '>
              <FiRotateCw size={28} className='group-hover:animate-spin'/>
            </button>
            { category.map(val => (
              <button key={val} onClick={() => selectCategory === val ? setSelectCategory('') : setSelectCategory(val)} 
                className={`p-2 px-4 border-2 w-36 border-gray-400 rounded-full hover:bg-gray-100/50 hover:text-red-600 font-semibold duration-500 hover:border-red-600 text-center transition-all shadow-boxSm
                  ${selectCategory===val?'absolute right-4 bg-red-600 border-transparent text-gray-50':'relative text-gray-400'}
                `}>
                {val}
              </button>
            ))
            }
            
          </div>

          <div className='grid grid-cols-2 gap-28 mt-10'>
            { noticias.data?.items?.map((val) => { 
              const linkImage = ( 
                `https://agenciadenoticias.ibge.gov.br/`
                + 
                `${val.imagens.slice( val.imagens.search('image_fulltext') + 17, val.imagens.search('float_fulltext') - 3 )}`
              ); 

              return (
              <div className='flex flex-col gap-4 items-center shadow-box rounded-xl bg-gray-50 overflow-hidden' key={val.id}>
                <text className='text-xl text-center p-4 px-10 bg-red-700 text-gray-50 font-semibold shadow-bottomShade'>{val.titulo}</text>
                <text className='font-medium text-gray-800 px-8 my-2'>{val.introducao}</text>
                
                <button className='flex gap-2 p-2 rounded-full items-center font-bold text-red-600 hover:bg-gray-100/60 duration-300'>
                  Ver mais
                  <FiChevronRight size={20}/>
                </button>

                <img src={linkImage} className='w-full mt-auto shadow-redShade'/>
                
                <Link href={val.link} target={'_blank'} className='hover:bg-gray-100/60 text-gray-400 p-2 flex gap-2 items-center px-6 rounded-full text-center mb-4 duration-300 hover:text-red-600 font-semibold underline underline-offset-4'>
                  Link da Reportagen
                  <FiArrowRightCircle size={20}/>
                </Link>
              </div>
            )})}
          </div>
        </div>
      </div>
    </>
  )
}

function Arrow(props: {
  disabled: boolean
  left?: boolean
  onClick: (e: any) => void
}) {
  const disabeld = props.disabled ? " arrow--disabled" : ""
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? "arrow--left" : "arrow--right"
      } ${disabeld}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  )
}