import Amplify from 'aws-amplify'
import config from '../src/aws-exports'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

Amplify.configure({ ...config, ssr: true })

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
