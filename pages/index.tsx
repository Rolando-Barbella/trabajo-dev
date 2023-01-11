import React from "react";
import Image from 'next/image'
import { withSSRContext } from "aws-amplify";
import Head from "next/head";
import { listJobs } from "../src/graphql/queries";
import Box from '@mui/material/Box';
import JobCard from "../src/components/JobCard/JobCard";
import { Job } from "../src/API";
import { CustomButton as Button } from "../src/components/CustomButton/CustomButton";
import Link from "next/link";


export async function getServerSideProps() {
  const SSR = withSSRContext();
  const { data } = await SSR.API.graphql({ query: listJobs });
  if (!data) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      jobs: data?.listJobs?.items.filter((job: Job) => Boolean(job.hasbeenPaid)) || null,
    },
  };
}

const styles = {
  container: {
    display: 'flex',
    flex: 1,
    minHeight: '100vh',
  },
  noJobs: {
    display: 'flex',
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center', 
    minHeight: '100vh', 
    alignSelf: 'center'
  },
  noJobsMessage: {
    display: 'flex',
    flexDirection: 'column', 
    textAlign: 'center',
    alignItems: 'center', 
    alignSelf: 'center'
  }
}
const Home = ({ jobs }: {jobs: Array<Job>}) => {
  return (
    <Box sx={styles.container}>
      <Head>
        <title>Software development jobs for junior</title>
      </Head>
      <div className="container">
        <h1>
          {process.env.NODE_ENV === "development" ? (
            <>
            </>
          ) : (
            <div>
              <h1 className="font-medium text-4xl p-10">Dev jobs just for juniors</h1>
              <p>Site in progress, stay tuned</p>
            </div>
          )}
        </h1>
        <>
          {
            !jobs?.length ? (
              <Box style={styles.noJobs}>
                <div style={styles.noJobsMessage}>
                  <Image alt="sad face" src="/sad-face.png" width={400} height={400}/>
                  <h1 className="font-light text-2xl pb-4">Nothing here, help us get jobs for junior devs! </h1>
                  <Link href="/create-job">
                    <Button text="Post a job" width={120} />
                  </Link>
                </div>
              </Box>
            ): null
          }
          {jobs?.map((job: Job) => {
            return (
              <div key={job.id} className="pt-7">
                <JobCard id={job.id} updatedAt={job.updatedAt} typeOfWork={job.typeOfWork} title={job.title} timeZone={job.timeZone} logo={job.logo}  skills={job.skills} salary={job.salary} companyName={job.companyName} />
              </div>
            );
          })}
        </>
      </div>
    </Box>
  );
};

export default Home;
