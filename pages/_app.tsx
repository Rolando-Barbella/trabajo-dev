import Amplify from 'aws-amplify'
import { Analytics } from '@vercel/analytics/react'
import config from '../src/aws-exports'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import ErrorBoundary from '../src/components/error'
import Header from '../src/components/Header'
import StickyFooter from '../src/components/Footer'

Amplify.configure({ ...config, ssr: true })

function MyApp({ Component, pageProps }: AppProps) {
  if (pageProps.error) {
    <ErrorBoundary error={pageProps.error.statusCode} reset={() => null} />
  }
  return (
    <main>
      <Header/>
      <Component {...pageProps} />
      <Analytics />
      <StickyFooter />
    </main>
  )
}

export default MyApp
