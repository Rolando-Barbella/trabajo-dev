import React from "react";
import { useRouter } from "next/router";
import { AmplifyS3Image } from "@aws-amplify/ui-react/legacy";
import { withSSRContext } from "aws-amplify";
import { Auth } from "aws-amplify";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { listJobs } from "../src/graphql/queries";
import styles from "../styles/Home.module.css";
import JobCard from "../src/components/JobCard/JobCard";

export async function getServerSideProps() {
  const SSR = withSSRContext();
  const { data } = await SSR.API.graphql({ query: listJobs });
  return {
    props: {
      jobs: data?.listJobs?.items || null,
    },
  };
}
//@ts-ignorets
const Home: NextPage = ({ jobs }) => {
  const Router = useRouter();
  let [currentUser, setCurrentUser] = React.useState("");

  React.useEffect(() => {
    let getUser = async () => {
      try {
        let user = await Auth.currentAuthenticatedUser();
        setCurrentUser(user);
      } catch (e) {
        console.error(e);
      }
    };
    getUser();
  }, []);

  let signOut = async (e: any) => {
    e.preventDefault();
    await Auth.signOut();
    Router.push("/", "/", { shallow: false });
    Router.reload();
  };
  return (
    <>
      <Head>
        <title>Software development jobs for junior</title>
      </Head>
      <nav className="navbar navbar-expand-lg shadow-sm py-2 relative  flex w-full justify-between">
        <div className="w-full flex flex-wrap container">
          <div className="flex items-center flex-shrink-0 text-white mr-6 pr-4">
            <span className="font-lightbold text-xl tracking-tight text-gray-600">Junior Web Devs</span>
          </div>
          <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <ul className="navbar-nav mr-auto lg:flex lg:flex-row justify-between py-2">
              <Link href="/create-job" className="pr-4  text-gray-700 hover:text-gray-800 focus:text-gray-800">Post a job</Link>
              {Boolean(currentUser) && <Link href="/profile" className="pr-4  text-gray-700 hover:text-gray-700 focus:text-gray-700">Profile</Link>}
            </ul>
            <div>
              {Boolean(currentUser) && (
                <Link href="/profile" onClick={signOut} className="text-gray-700 hover:text-gray-800 focus:text-gray-800">
                  Log out
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
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
        <div className="img-grid">
          {/* @ts-ignorets */}
          {jobs?.map((job) => {
            console.log(job)
            return (
              <div className="pt-7" key={job.id}>
                <JobCard title={job.title} logo={job.logo}/>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
