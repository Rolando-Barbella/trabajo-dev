import React, { CSSProperties, SetStateAction } from "react";
import Image from "next/image";
import { Auth } from "aws-amplify";
import Head from "next/head";
import { listJobs } from "../src/graphql/queries";
import Box from "@mui/material/Box";
import JobCard from "../src/components/JobCard/JobCard";
import { Job, ListJobsQuery } from "../src/API";
import { CustomButton as Button } from "../src/components/CustomButton/CustomButton";
import Link from "next/link";
import { API } from 'aws-amplify';
import IndexSkeleton from './indexSceleton'

const styles = {
  container: {
    display: "flex",
    flex: 1,
    minHeight: "100vh",
  },
  noJobs: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    alignSelf: "center",
  },
  noJobsMessage: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center",
    alignSelf: "center",
  },
};
const Home = () => {
  let [currentUser, setCurrentUser] = React.useState("");
  let [jobs, setJobs] = React.useState<Job[]>([]);
  let [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchListMainDetailss().then((response: any) => response).catch((error: { error: { data: undefined; errors: Array<string> } }) => {
      setLoading(false);
      console.error(error);
      return;
    });
  },[])

  async function fetchListMainDetailss() {
    const jobList = await API.graphql({
      query: listJobs
    }) as {data: ListJobsQuery};
    setLoading(false);
    const { data  } = jobList;
    setJobs(data?.listJobs?.items as Job[]);
  }

  React.useEffect(() => {
    if (jobs.length) {
      return;
    }
    let getUser = async () => {
      try {
        let user: SetStateAction<string> = await Auth.currentAuthenticatedUser();
        setCurrentUser(user);
      } catch (e) {
        console.error(e);
      }
    };
    getUser();
  }, [jobs?.length]);

  return (
    <Box sx={styles.container}>
      <Head>
        <title>Software developer jobs for juniors, help people get their first job </title>
      </Head>
      <div className="container">
        {
          loading && <IndexSkeleton />
        }
        {!jobs.length && !loading ? (
          <Box style={styles.noJobs as CSSProperties}>
            <div style={styles.noJobsMessage as CSSProperties}>
              <Image alt="sad face" src="/sad-face.png" width={300} height={250} />
              <h1 className="font-light text-2xl pb-4">Nothing here, help us get jobs for Junior devs! </h1>
              <Link href={Boolean(currentUser) ? "/create-job" : "/sign-in"}>
                <Button text="Post a job" width={120} />
              </Link>
            </div>
          </Box>
        ) : null}
        {jobs?.map((job) => {
          return (
            <div key={job.id} className="pt-7">
              <JobCard
                id={job.id}
                updatedAt={job.updatedAt}
                typeOfWork={job.typeOfWork}
                title={job.title}
                timeZone={job.timeZone}
                logo={job.logo}
                skills={job.skills}
                salary={job.salary}
                companyName={job.companyName}
              />
            </div>
          );
        })}
      </div>
    </Box>
  );
};

export default Home;
