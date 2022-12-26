import Head from 'next/head'
import { api } from '../services/api'
import { MouseEvent, useEffect, useState } from 'react'
import Link from 'next/link'
import { FiArrowRightCircle, FiRotateCw, FiChevronRight } from "react-icons/fi";
import { useKeenSlider } from "keen-slider/react"
import { Pagination } from '../components/Pagination/Pagination';
import { useMediaQuery } from 'react-responsive';

import "keen-slider/keen-slider.min.css"
import Image from 'next/image';
import Header from '../components/Header';
import Categories from '../components/Home/Categories';
import Notices from '../components/Home/Notices';
import Carroussel from '../components/Home/Carrossel';

 export interface NoticiesData {
  data: {
    last_updated: string,
    num_results: number,
    results: [
      {
        byline: string,
        abstract: string,
        created_date: string,
        published_date: string,
        multimedia: [ 
          {
            url: string,
            caption: string,
          }
        ],
        section: string,
        title: string,
        url: string,
      },
    ]
  }
}

export default function Home() {

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

  const [ noticies, setNoticies ] = useState<NoticiesData>({} as NoticiesData)

  const isDesktop = useMediaQuery({ query: '(min-width: 640px)'})

  const [categorySelect, setCategorySelect ] = useState('home')

  useEffect(() => {
    const apiRe = async () => {
      const response = await api.post(`/api/source`, {
        headers: {
          category: 'home'
        }
      })
      setNoticies(response.data)
      console.log(response.data)
    }

    apiRe().catch(console.error)
  }, [])

  async function handleCategory(category:string) {
    const response = await api.post(`/api/source`, {
      headers: {
        category: category
      }
    })

    setCategorySelect(category)
    setNoticies(response.data)
  }
  
  return (
    <>
      <Head>
        <title>Home | Gest News</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='flex flex-col w-full'>
        
        <Header/>

        <div className='flex flex-col px-6 sm:px-20 py-10'>
          
          <Carroussel data={noticies.data}/>

          <Categories setCategorySelect={(category) => handleCategory(category)} categorySelect={categorySelect}/>

          <Notices data={noticies.data}/>
        </div>
      </div>
    </>
  )
}
