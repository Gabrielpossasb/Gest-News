import { GetStaticProps } from 'next'
import Head from 'next/head'
import { api } from '../services/api'

export default function Home(data: any) {
  return (
    <>
      <Head>
        <title>HOME | GEST FULL</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className=''>
        oi

        <button onClick={() => console.log(data)} 
          className='p-4 rounded-full px-8 hover:brightness-50 duration-300 bg-blue-600 text-xl font-semibold text-gray-50'>
          CLique em min
        </button>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = api.get(`https://api.apilayer.com/world_news/extract-news?url=${process.env.URL}&analyze=true`, {
    headers: {
      'apikey': process.env.SECRET_API_KEY,
    },
    
  })

  console.log((await response).data)

  const data = (await response).data;

  return {
    props: {
      data: 'oi'
    },
    revalidate: 10,
  }
}
