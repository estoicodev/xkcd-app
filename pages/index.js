import Link from "next/link"
import Image from "next/image"
import fs from 'node:fs/promises'
import Layout from "components/Layout"

import { use18N } from "context/i18n"

export default function App({ comics }) {
  const { t } = use18N()

  return (
    <Layout isHome>
      <h1 className="text-3xl text-center font-semibold mt-6 mb-10">{t('LATEST_COMICS')}</h1>
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-8 mx-6 mb-12">
        {comics.map((comic) => (
          <Link 
            href={`/comic/${comic.id}`}
            key={comic.id}
            className="py-8 flex flex-col items-center justify-center rounded-xl bg-slate-50 hover:bg-slate-300 transition-background duration-500 group"
          >
            <div className="origin-center transition-transform group-hover:scale-110">
              <Image src={comic.img} alt={comic.alt} width={300} height={300} className="mb-4" />
              <h2 className="text-xl text-center">{comic.title}</h2>
            </div>
          </Link>
        ))}
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const files = await fs.readdir('./comics')
  const latestComics = files.slice(-8, files.length + 1).reverse()

  const promisesReadFile = latestComics.map(async (file) => {
    const content = await fs.readFile(`./comics/${file}`, 'utf-8')
    return JSON.parse(content)
  })
  const comics = await Promise.all(promisesReadFile)  

  return {
    props: { 
      comics
    },
  }
}