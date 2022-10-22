import React from "react";
import { useRouter } from "next/router";
import { AmplifyS3Image } from "@aws-amplify/ui-react/legacy";
import { withSSRContext } from "aws-amplify";
import { Auth } from "aws-amplify";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { listCompanys } from "../src/graphql/queries";
import styles from "../styles/Home.module.css";

export async function getServerSideProps() {
  const SSR = withSSRContext();
  const { data } = await SSR.API.graphql({ query: listCompanys });
  return {
    props: {
      companies: data?.listCompanys?.items || null,
    },
  };
}
//@ts-ignorets
const Home: NextPage = ({ companies }) => {
  console.log(process.env.NODE_ENV);
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

  let signOut = (e: any) => {
    e.preventDefault();
    Auth.signOut();
    Router.reload();
  };
  return (
    <div className={styles.container}>
      <div>
        <Head>
          <title>Companies hiring</title>
        </Head>
        <div className="container">
          {Boolean(currentUser) && (
            <>
              <Link href="/profile">Profile</Link>
              <Link href="/profile" onClick={signOut}>
                Sig Out
              </Link>
            </>
          )}
          {process.env.NODE_ENV === "development" ? (
            <>
              <h1 className="text-3xl font-bold">
                National Companies <Link href="/create-company">(+)</Link>
              </h1>
              <div className="img-grid">
                {/* @ts-ignorets */}
                {companies?.map((company) => {
                  return (
                    <div key={company.id} className="img-square">
                      <h2>{company.name}</h2>
                      {/* use the AmplifyS3Image component to render the company's image using its S3 key */}
                      <AmplifyS3Image imgKey={company.image.key} />
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <h1>Junior dev Jobs</h1>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
