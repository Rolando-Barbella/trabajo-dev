import Head from "next/head";

import styles from "../styles/Home.module.css";
import { withAuthenticator } from "@aws-amplify/ui-react";

const Profile = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Companies hiring</title>
      </Head>
      <div className="container">
        <h1>My Profile</h1>
      </div>
    </div>
  );
}

export default withAuthenticator(Profile);