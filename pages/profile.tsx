import React from "react";
import Head from "next/head";
import { API } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { CognitoUser } from "amazon-cognito-identity-js";
import { listCompanys } from "../src/graphql/queries";

import styles from "../styles/Home.module.css";
import { stringify } from "querystring";

const Profile = ({ user }: CognitoUser | any) => {
  let [userCompanies, setUserCompanies] = React.useState({ listCompanys: {items: [{id: '', name: ''}]} });
  let [loading, setLoading] = React.useState(false);

  const handleJobs = React.useCallback(async () => {
    async function fetchListOfJobs() {
      const mainDetails = await API.graphql({
        query: listCompanys,
        variables: {
          filter: {
            userId: {
              eq: user.username,
            },
          },
        },
      });
      const { data }: any = mainDetails;
      setLoading(false)
      setUserCompanies(data);
    }
    fetchListOfJobs();
  }, [user.username]);

  React.useEffect(() => {
    handleJobs();
  }, [handleJobs]);

  console.log(userCompanies?.listCompanys);

  return (
    <div className={styles.container}>
      <Head>
        <title>Companies Hiring</title>
      </Head>
      <div className="container">
        <h1>My Profile</h1>
        {
          loading ? <p>...</p> : (
            userCompanies?.listCompanys.items.map((job) : any => {
              return(
                <div key={job.id}>
                  <p>{job.name}</p>
                </div>
              )
            })
          )
        }
      </div>
    </div>
  );
};
//@ts-ignorets
export default withAuthenticator(Profile);
