import Head from 'next/head'
import Header from './Header.js'
import Footer from './Footer.js'

export default function Layout ({ children, isHome, title = 'xkcd - Comics for developers' }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Head>
      <div className="min-h-screen flex flex-col m-0">
        <Header isHome={isHome}/>

        <main className='mx-auto w-full max-w-3xl flex-grow'>
          {children}
        </main>

        <Footer />
      </div>
    </>
  )
}