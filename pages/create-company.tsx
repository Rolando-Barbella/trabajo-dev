import React from "react";
import { useState } from "react";
import { API, Storage } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { CognitoUser } from 'amazon-cognito-identity-js';
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import cookie from "cookie";

import { createJob } from "../src/graphql/mutations";
import config from "../src/aws-exports";
import { checkout } from "../checkout";
import { CreateJobInput } from "../src/API";

type createCompanyProps = {
  initialJobName: string;
  initialImgName: { name: string }
  user: CognitoUser | any
  initialJob: CreateJobInput
} 

let blankJob = {
  companyName: '',
  title: '',
  logo: null,
  description: '',
  userId: '',
  salary: '',
  hiringSteps: 0,
  hiringStepDescription: '',
  typeOfCodingChallenge: '',
  typeOfWork: '',
  timeZone: '',
  role: '',
  skills: [],
}

function CreateCompany({ initialJob = blankJob, initialImgName = { name: "" }, user } : createCompanyProps) {
  const Router = useRouter();
  const cookies = parseCookies("");

  const [job, setJob] = useState<CreateJobInput>(initialJob);
  const [image, setImage] = useState(initialImgName);

  React.useEffect(() => {
    Cookie.set("job", JSON.stringify(job));
  }, [image.name, job]);
  
  const handleSubmit = React.useCallback(async () => {
    // upload the image to S3
    const uploadedImage = await Storage.put(cookies.image, { name: cookies.image });
    const formateJob = JSON.parse((cookies.job))
    // submit the GraphQL query
    await API.graphql({
      query: createJob,
      variables: {
        input: {
          ...formateJob,
          userId: user.username,
          logo: {
            // use the image's region and bucket (from aws-exports) as well as the key from the uploaded image
            region: config.aws_user_files_s3_bucket_region,
            bucket: config.aws_user_files_s3_bucket,
            key: uploadedImage.key,
          },
        },
      },
    });
  }, [cookies.image, cookies.job, user.username]);

  React.useEffect(() => {
    const resolveUrl = async () => {
      let url = new URLSearchParams(window.location.search);
      let clientSecret = url.get("session_id");
      if (!clientSecret) {
        return;
      }
      await handleSubmit();
    };
    resolveUrl();
    Router.push("/create-company", "/create-company", { shallow: false });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stipeCheckOut = (e: any) => {
    e.preventDefault();
    checkout({
      lineItems: [
        {
          price: "price_1LkrT4A2mGW4hJ0CEDy4QtZG",
          quantity: 1,
        },
      ],
    });
  };

  return (
    <form onSubmit={stipeCheckOut}>
      <h2>Create a Job</h2>
      <label htmlFor="name">Company Name</label>
      <input type="text" id="name" value={job.title} onChange={(e) => setJob({...job, companyName:e.target.value})} />
      <label htmlFor="image">Logo</label>
      <input type="file" id="image" onChange={(e) => setImage(!e.target.files ? { name: "" } : e.target.files[0])} />
      <div className="relative">
        <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
          <option>New Mexico</option>
          <option>Missouri</option>
          <option>Texas</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
      <input type="submit" value="create" />
    </form>
  );
}

function parseCookies(req: any) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
}

CreateCompany.getInitialProps = ({ req }: any) => {
  const cookies = parseCookies(req);

  return {
    initialImgName: cookies.initialImgName,
    initialJob: cookies.initialJob,
  };
};
//@ts-ignorets
export default withAuthenticator(CreateCompany);
