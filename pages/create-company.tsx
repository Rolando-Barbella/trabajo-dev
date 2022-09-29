import React from "react";
import { useState } from "react";
import { API, Storage } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import cookie from "cookie";

import { createCompany } from "../src/graphql/mutations";
import config from "../src/aws-exports";
import { checkout } from "../checkout";

type createCompanyProps = {
  initialJobName: string;
  initialImgName: { name: string }
} 

function CreateCompany({ initialJobName = "", initialImgName = { name: "" } } : createCompanyProps) {
  const Router = useRouter();
  const cookies = parseCookies("");

  const [name, setName] = useState(initialJobName);
  const [image, setImage] = useState(initialImgName);

  React.useEffect(() => {
    Cookie.set("name", name);
    Cookie.set("image", image.name);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(cookies.name);
  console.log(cookies.image);

  const handleSubmit = React.useCallback(async () => {
    // upload the image to S3
    const uploadedImage = await Storage.put(cookies.image, { name: cookies.image });
    // submit the GraphQL query
    await API.graphql({
      query: createCompany,
      variables: {
        input: {
          name: cookies.name,
          image: {
            // use the image's region and bucket (from aws-exports) as well as the key from the uploaded image
            region: config.aws_user_files_s3_bucket_region,
            bucket: config.aws_user_files_s3_bucket,
            key: uploadedImage.key,
          },
        },
      },
    });
  }, [cookies.image, cookies.name]);

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
      <h2>Create a Company</h2>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
      <label htmlFor="image">Image</label>
      <input type="file" id="image" onChange={(e) => setImage(!e.target.files ? { name: "" } : e.target.files[0])} />
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
    initialJobName: cookies.name,
    initialImgName: cookies.initialImgName,
  };
};
//@ts-ignorets
export default withAuthenticator(CreateCompany);
