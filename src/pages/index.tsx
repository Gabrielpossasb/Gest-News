import Head from 'next/head'
import { api } from '../services/api'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive';

import "keen-slider/keen-slider.min.css"
import Header from '../components/Header';
import Categories from '../components/Home/Categories';
import Notices from '../components/Home/Notices';
import Carroussel from '../components/Home/Carrossel';
import Foot from '../components/Foot';

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

  const [ loading, setLoading ] = useState(false)

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
    setLoading(true)
    setCategorySelect(category)
    const response = await api.post(`/api/source`, {
      headers: {
        category: category
      }
    })
    
    setNoticies(response.data)
    setLoading(false)
  }
  
  return (
    <>
      <Head>
        <title>Home | Gest News</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='flex flex-col w-full '>
        
        <Header/>

        <div className='flex flex-col items-center gap-32 lg:px-20 py-10 scroll-smooth '>
          
          <Carroussel data={noticies.data}/>

          <Categories setCategorySelect={(category) => handleCategory(category)} categorySelect={categorySelect} loading={loading}/>

          <Notices data={noticies.data}/>

        </div>

        <Foot/>
      </div>
    </>
  )
}
