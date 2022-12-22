import Head from 'next/head'
import { api } from '../services/api'
import { MouseEvent, useEffect, useState } from 'react'
import Link from 'next/link'
import { FiArrowRightCircle, FiRotateCw, FiChevronRight } from "react-icons/fi";
import { useKeenSlider } from "keen-slider/react"

import "keen-slider/keen-slider.min.css"
import { Pagination } from '../components/Pagination/Pagination';

interface Noticias {
  data: {
    totalPages: number,
    nextPage: number,
    previusPages: number,
    page: number,
    count: number,
    items: [
      {
        id: number,
        titulo: string,
        introducao: string,
        imagens: string,
        link: string,
        data_publicacao: string,
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
  
  async function handlePagination(nextPgae: number) {
    const response = await api.post(`/api/source`, {
      headers: {
        nextPage: nextPgae
      }
    })

    setNoticias(response.data)
  }
  
  return (
    <>
      <Head>
        <title>Home | Gest News</title>
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

          { (!!noticias.data) ? (
            <div className='flex w-full'>
              <div ref={sliderRef} className="keen-slider">
                { noticias.data.items.map((val, index) => { 
                    const linkImage = ( 
                      `https://agenciadenoticias.ibge.gov.br/`
                      + 
                      `${val.imagens.slice( val.imagens.search('image_fulltext') + 17, val.imagens.search('float_fulltext') - 3 )}`
                    ); 
                                  
                  return (
                  <div key={val.id} className={`keen-slider__slide number-slide${index + 1}`}>
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
          ) : (
            <div className='w-full h-[300px] flex items-center justify-center text-3xl font-semibold animate-bounce'>
              Loading...
            </div>
          )} 

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

          <Pagination 
            totalCountOfRegisters={noticias.data.totalPages}
            currentPage={noticias.data.page}
            onPageChange={(e) => handlePagination(e)} 
            registersPerPage={10}
          />

          <div className='grid grid-cols-2 gap-28 mt-10'>
            { noticias.data?.items?.map((val) => { 
              const linkImage = ( 
                `https://agenciadenoticias.ibge.gov.br/`
                + 
                `${val.imagens.slice( val.imagens.search('image_fulltext') + 17, val.imagens.search('float_fulltext') - 3 )}`
              ); 

              return (
              <div className='flex flex-col gap-4 pb-4 items-center shadow-box rounded-xl bg-gray-50 overflow-hidden' key={val.id}>
                <text className='text-xl text-center p-4 px-10 bg-red-700 text-gray-50 font-semibold shadow-bottomShade'>{val.titulo}</text>
                <text className='font-medium text-gray-800 px-8 my-2'>{val.introducao}</text>
                
                <button className='flex gap-2 p-2 rounded-full items-center font-bold text-red-600 hover:bg-gray-100/60 duration-300'>
                  Ver mais
                  <FiChevronRight size={20}/>
                </button>

                <img src={linkImage} className='w-full mt-auto shadow-redShade'/>
                
                <div className='flex w-full px-8 justify-between items-center text-gray-400'>
                  <Link href={val.link} target={'_blank'} className='hover:bg-gray-100/60 p-2 flex gap-2 items-center px-6 rounded-full text-center duration-300 hover:text-red-600 font-semibold underline underline-offset-4'>
                    Link da Reportagen
                    <FiArrowRightCircle size={20}/>
                  </Link>
                  <text className='font-bold text-xl text-red-500 [textShadow:_1px_1px_2px_#be6868]'>{val.data_publicacao}</text>
                </div>
              </div>
            )})}
          </div>
        </div>
      </div>
    </>
  )
}
