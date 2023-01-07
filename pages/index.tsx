import React from "react";
import Grid from "@mui/material/Grid";
import { withSSRContext } from "aws-amplify";
import Head from "next/head";
import { listJobs } from "../src/graphql/queries";
import JobCard from "../src/components/JobCard/JobCard";
import { Job } from "../src/API";

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
      jobs: data?.listJobs?.items,
    },
  };
}
const Home = ({ jobs }: {jobs: Array<Job>}) => {
  return (
    <>
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
        <div>
          {
            !jobs?.length && <>No jobs</>
          }
          {jobs?.map((job: Job) => {
            return (
              <div key={job.id} className="pt-7">
                <JobCard id={job.id} updatedAt={job.updatedAt} typeOfWork={job.typeOfWork} title={job.title} timeZone={job.timeZone} logo={job.logo}  skills={job.skills} salary={job.salary} companyName={job.companyName} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
