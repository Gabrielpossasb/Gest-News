import Head from 'next/head'
import { api } from '../services/api'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive';

import "keen-slider/keen-slider.min.css"
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

  const [ noticies, setNoticies ] = useState<NoticiesData>({} as NoticiesData)

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

    setNoticies(response.data)
    setCategorySelect(category)
  }
  
  return (
    <>
      <Head>
        <title>Home | Gest News</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='flex flex-col w-full'>
        
        <Header/>

        <div className='flex flex-col items-center gap-10 lg:px-20 py-10'>
          
          <Carroussel data={noticies.data}/>

          <Categories setCategorySelect={(category) => handleCategory(category)} categorySelect={categorySelect}/>

          <Notices data={noticies.data}/>
        </div>
      </div>
    </>
  )
}
