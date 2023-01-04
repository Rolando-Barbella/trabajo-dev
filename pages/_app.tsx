import Amplify from 'aws-amplify'
import config from '../src/aws-exports'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Poppins } from '@next/font/google'
import ErrorBoundary from '../src/components/error'
import Header from '../src/components/Header'
import Link from 'next/link'

const inter = Poppins({ subsets: ['latin'], weight: ['300','400','500','900'], })

Amplify.configure({ ...config, ssr: true })

function MyApp({ Component, pageProps }: AppProps) {
  if (pageProps.error) {
    <ErrorBoundary error={pageProps.error.statusCode} reset={() => null} />
  }
  return (
    <main className={inter.className}>
      
      <Header/>
      <Component {...pageProps} />
    </main>
  )
}

export default MyApp
