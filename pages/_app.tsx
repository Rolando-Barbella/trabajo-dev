import Amplify from 'aws-amplify'
import config from '../src/aws-exports'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
// import { Poppins } from '@next/font/google'

// const inter = Poppins({ subsets: ['latin'], weight: ['400', '900'], })

Amplify.configure({ ...config, ssr: true })

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main>
      <Component {...pageProps} />
    </main>
  )
}

export default MyApp
