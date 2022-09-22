import { AmplifyS3Image } from '@aws-amplify/ui-react/legacy'
import { withSSRContext } from 'aws-amplify'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { listCompanys } from '../src/graphql/queries'
import styles from '../styles/Home.module.css'

export async function getServerSideProps () {
  const SSR = withSSRContext()
  const { data } = await SSR.API.graphql({ query: listCompanys })
  console.log(data);
  return {
    props: {
      companies: data?.listCompanys?.items || null,
    }
  }
}
const Home: NextPage = ({ companies }) => {
  return (
    <div className={styles.container}>
      <div>
      <Head>
        <title>National Companies</title>
      </Head>
      <div className='container'>
        <h1>National Companies <Link href='/create-company'>(+)</Link></h1>
        <div className='img-grid'>
            {companies?.map(company => {
            return (
              <div key={company.id} className='img-square'>
                <h2>{company.name}</h2>
                {/* use the AmplifyS3Image component to render the company's image using its S3 key */}
                <AmplifyS3Image imgKey={company.image.key} height='200px' />
              </div>
            )
          })}
        </div>
      </div>
    </div>
    </div>
  )
}

export default Home
