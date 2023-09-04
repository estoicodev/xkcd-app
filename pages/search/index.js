import Layout from 'components/Layout.js'
import Searcher from 'components/Searcher.js'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { use18N } from 'context/i18n.js'

import { search } from 'services/search';

export default function Search({ query, results }) {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()
  const { t } = use18N()

  const handleSearch = (e) => {
    router.push(`/search?q=${searchQuery}`)
  }

  return (
    <Layout title={`Resultados de búsqueda para "${query}"`}>
      <Searcher className="w-full max-w-lg mt-6 mx-auto" onSearch={handleSearch} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      {query === '' && <h1 className='text-center text-xl font-semibold mt-10 mb-6 mx-4'>{t("MESSAGE_TO_SEARCH_COMICS")}</h1>}
      {
        query !== '' &&
        <h1 className='text-xl font-semibold mt-10 mb-6 mx-4'>
          {t("SEARCH_RESULTS_TITLE", results.length, query)}
        </h1>
      }
      {
        query !== '' && results.map(result => (
          <Link key={result.id} href={`/comic/${result.id}`} className='flex items-center hover:bg-slate-50 p-5'>
            <Image width={50} height={50} src={result.img} alt={result.alt} className='rounded-full mr-4' />
            {result.title}
          </Link>
        ))
      }
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { query } = context
  const { q = '' } = query

  let results = []

  if (q !== '') {
    const { results: r } = await search({ query: q })
    results = r
  }

  return {
    props: {
      query: q,
      results
    }
  }
}