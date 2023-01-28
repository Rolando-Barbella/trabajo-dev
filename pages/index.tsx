import React, { CSSProperties } from "react";
import Image from "next/image";
// import { Auth } from "aws-amplify";
import { withSSRContext } from "aws-amplify";
import Head from "next/head";
import { listJobs } from "../src/graphql/queries";
import Box from "@mui/material/Box";
import JobCard from "../src/components/JobCard/JobCard";
import { Job } from "../src/API";
// import { CustomButton as Button } from "../src/components/CustomButton/CustomButton";
// import Link from "next/link";



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
const Home = ({ jobs }: { jobs: Array<Job> }) => {
  let [currentUser, setCurrentUser] = React.useState("");

  // React.useEffect(() => {
  //   if (jobs?.length) {
  //     return;
  //   }
  //   let getUser = async () => {
  //     try {
  //       let user = await Auth.currentAuthenticatedUser();
  //       setCurrentUser(user);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   };
  //   getUser();
  // }, [jobs?.length]);

  return (
    <Box sx={styles.container}>
      <Head>
        <title>Software developer jobs for juniors, help people get their first job </title>
      </Head>
      <div className="container">
        <h1>HELLO</h1>
      </div>
    </Box>
  );
};

export default Home;
