import '../styles/globals.css'
import Head from "next/head";
import {NextUIProvider} from "@nextui-org/react";
import { I18NProvider } from 'context/i18n.js';

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <Head>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <I18NProvider>
        <Component {...pageProps} />
      </I18NProvider>
    </NextUIProvider>
  )
}

export default MyApp
