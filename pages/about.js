import Layout from 'components/Layout'

export default function About() {
  return (
    <Layout title="xkcd - About">
      <h1 className='text-xl font-semibold mt-4 mb-6 mx-4'>About</h1>
      <p className='mx-4'>
        You can see the code in 
        <a href="https://github.com/estoicodev" target="_blank" className="text-black text-lg font-semibold no-underline hover:underline mx-1">
          github
        </a>.
      </p>
    </Layout>
  )
}