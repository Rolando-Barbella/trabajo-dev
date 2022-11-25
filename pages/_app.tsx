import Amplify from 'aws-amplify'
import config from '../src/aws-exports'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })

Amplify.configure({ ...config, ssr: true })

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
          html {
            font-family: ${inter.style.fontFamily};
          } 
        `}</style>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
