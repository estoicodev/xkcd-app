import Layout from "components/Layout.js"
import Link from 'next/link'
import { Button } from '@nextui-org/react'
import { readFile, readdir, stat } from 'node:fs/promises'

export default function Comic({ id, title, src, alt, prevId, nextId, hasPrevious, hasNext }) {
  return (
    <Layout>
      <section className="max-w-lg m-auto">
        <h1 className="text-center text-2xl font-semibold mb-10">{id} - {title}</h1>
        {/* <div className="w-full aspect-video relative mb-6 m-auto">
          <Image layout="fill" objectFit="contain" src={src} alt={alt} className="" />
        </div> */}
        <img src={src} alt={alt} className="mb-6 m-auto"/>
        <p className="w-full max-w-lg">{alt}</p>
        <div className="flex justify-between w-full my-6">
          {hasPrevious && <Link href={`/comic/${prevId}`}><Button className="text-md">Previous</Button></Link>}
          {hasNext && <Link href={`/comic/${nextId}`}><Button className="text-md">Next</Button></Link>}
        </div>
      </section>
    </Layout>
  )
}

export async function getStaticPaths({ locales }) {
  const files = await readdir('./comics')
  let pathsId = []

  locales.forEach(locale => {
    pathsId = pathsId.concat(files.map((file) => {
      const id = file.replace('.json', '')
      return { params: { id }, locale }
    }))
  });

  return {
    paths: pathsId,
    fallback: false // blocking mode
  }
}

export async function getStaticProps({ params }) {
  const { id } = params
  const content = await readFile(`./comics/${id}.json`, 'utf-8')
  const comic = JSON.parse(content)
  const { id: comicId, title, img, alt } = comic

  const idNumber = +id
  const prevId = idNumber - 1
  const nextId = idNumber + 1

  const [prevResult, nextResult] = await Promise.allSettled([
    stat(`./comics/${prevId}.json`),
    stat(`./comics/${nextId}.json`),
  ])

  const hasPrevious = prevResult.status === 'fulfilled'
  const hasNext = nextResult.status === 'fulfilled'

  return {
    props: {
      id: comicId,
      title,
      src: img,
      alt,
      prevId,
      nextId,
      hasPrevious,
      hasNext
    }
  }
}
