import React from "react";
import Head from "next/head";
import { API } from "aws-amplify";
import { CognitoUser } from "amazon-cognito-identity-js";
import { listJobs } from "../../src/graphql/queries";
import { Auth } from "aws-amplify";
import Container from "@mui/material/Container";
import { CustomButton as Button } from "../../src/components/CustomButton/CustomButton";
import { Job } from "../../src/API";
import JobCard from "../../src/components/JobCard/JobCard";
import ProfileSkeleton from "./Profile-Skeleton";
import { useRouter } from "next/router";
import Link from "next/link";

const Profile = () => {
  let Router = useRouter();
  let [userJobs, setuUserJobs] = React.useState<{ listJobs: { items: [Job] | undefined } }>({
    listJobs: { items: undefined },
  });
  let [loading, setLoading] = React.useState(false);
  let [currentUser, setCurrentUser] = React.useState<CognitoUser | any>({});

  React.useEffect(() => {
    let getUser = async () => {
      try {
        let user = await Auth.currentAuthenticatedUser();
        if (!user) {
          Router.push("/", "/", { shallow: false });
        }
        setCurrentUser(user);
      } catch (e) {
        console.error(e);
      }
    };
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleJobs = React.useCallback(async () => {
    async function fetchListOfJobs() {
      const mainDetails = await API.graphql({
        query: listJobs,
        variables: {
          filter: {
            userId: {
              eq: currentUser.username,
            },
          },
        },
      });
      const { data }: any = mainDetails;
      setLoading(false);
      setuUserJobs(data);
    }
    fetchListOfJobs();
  }, [currentUser.username]);

  React.useEffect(() => {
    handleJobs();
  }, [handleJobs]);

  if (loading || !currentUser?.attributes) {
    return (
      <Container maxWidth="md" sx={{ pt: 3, pb: 5 }}>
        <ProfileSkeleton />
      </Container>
    );
  }
  console.log(userJobs?.listJobs);
  return (
    <Container maxWidth="lg" sx={{ pt: 2, pb: 20 }}>
      <Head>
        <title>Companies Hiring</title>
      </Head>
      <div className="container">
        <h1 className="font-medium text-2xl">About {currentUser?.attributes["custom:companyName"]}</h1>
        <div className="pt-2" dangerouslySetInnerHTML={{ __html: currentUser?.attributes["custom:description"] }} />
        <div className="pt-2">
          {Boolean(userJobs?.listJobs.items?.length) && <h2 className="font-medium text-2xl">List of jobs</h2>}
          {!Boolean(userJobs?.listJobs.items?.length) && (
            <>
              <hr />
              <div className="pt-10 text-center">
                <h1 className="font-medium text-2xl">You do not have any jobs listed</h1>
                <div className="pt-2">
                  <p className="pb-2">Help aspiring dev find their first job!</p>
                  <Link href="/sign-in">
                    <Button text="Post a job" width={120} />
                  </Link>
                </div>
              </div>
            </>
          )}
          {userJobs?.listJobs?.items?.map((job: Job) => {
            return (
              <div key={job.id} className="pt-4">
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
      </div>
    </Container>
  );
};
export default Profile;
