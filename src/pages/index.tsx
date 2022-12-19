import axios from 'axios'
import { GetStaticProps } from 'next'
import Head from 'next/head'

export default function Home(data: any) {
  return (
    <>
      <Head>
        <title>HOME | GEST FULL</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className=''>
        oi

        <button onClick={() => console.log(data)} 
          className='p-4 rounded-full px-8 hover:brightness-50 duration-300 bg-blue-600 text-xl font-semibold text-gray-50'>
          CLique em min
        </button>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  return {
    props: {
      data: 'oi'
    },
    revalidate: 10,
  }
}
