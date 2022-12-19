import Head from 'next/head'
import { api } from '../services/api'

export default function Home() {

  async function handleRe() {
    const response = await api.get(`/source`)

    console.log(response.data)
  }
  
  return (
    <>
      <Head>
        <title>HOME | GEST FULL</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className=''>
        oi

        <button onClick={() => handleRe()} 
          className='p-4 rounded-full px-8 hover:brightness-50 duration-300 bg-blue-600 text-xl font-semibold text-gray-50'>
          CLique em min
        </button>
      </div>
    </>
  )
}

