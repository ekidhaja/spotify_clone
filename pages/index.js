import Head from 'next/head'
import Image from 'next/image'
import Dashboard from '../components/Dashboard'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Spotify clone</title>
        <meta name="description" content="spotify clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Dashboard />
    </div>
  )
}
