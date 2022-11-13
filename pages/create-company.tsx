import { withAuthenticator } from "@aws-amplify/ui-react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button, InputLabel } from "@material-ui/core";
import Grid from "@mui/material/Grid";
import { CognitoUser } from "amazon-cognito-identity-js";
import { API, Storage } from "aws-amplify";
import cookie from "cookie";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";

import TextField from "../src/components/TextField";
import { checkout } from "../checkout";
import { CreateJobInput } from "../src/API";
import config from "../src/aws-exports";
import { createJob } from "../src/graphql/mutations";
import SimpleSelect from "../src/components/SimpleSelect/SimpleSelect";
import TagInput from "../src/components/TagInput/TagInput";

type createCompanyProps = {
  user: CognitoUser | any;
  initialJob: Omit<CreateJobInput, "userId">;
};

let blankJob = {
  companyName: "",
  title: "",
  logo: null,
  description: "",
  salary: "",
  hiringSteps: 2,
  hiringStepDescription: "",
  typeOfCodingChallenge: "",
  typeOfWork: "",
  timeZone: "",
  role: "",
  skills: [],
};

function CreateCompany({ initialJob = blankJob, user }: createCompanyProps) {
  const Router = useRouter();
  const cookies = parseCookies("");

  const [job, setJob] = React.useState<Omit<CreateJobInput, "userId">>(initialJob);
  const [data, setData] = React.useState(null);

  const handleSubmitJob = React.useCallback(async () => {
    // upload the image to S3
    const formateJob = JSON.parse(cookies.job);
    const uploadedImage = await Storage.put(formateJob.logo, { name: formateJob.logo });
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
  }, [cookies.job, user.username]);

  React.useEffect(() => {
    const resolveUrl = async () => {
      let url = new URLSearchParams(window.location.search);
      let clientSecret = url.get("session_id");
      if (!clientSecret) {
        return;
      }
      await handleSubmitJob();
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

  const validationSchema = yup.object({
    title: yup.string().required("Job title is required"),
    companyName: yup.string().required("Company name is required"),
    logo: yup
      .mixed()
      .test({
        message: "Please provide a supported file type",
        test: (file, context) => {
          const isValid = ["png", "jpg"].includes(file && file.split(".").pop());
          if (!isValid) return context?.createError();
          return isValid;
        },
      })
      .test({
        message: `File too big, can't exceed ${20000}`,
        test: (file) => {
          const isValid = file?.size < 20000;
          return isValid;
        },
      }),
    description: yup.string().required("Job title is required").min(100, "minimun 100 characters"),
    hiringSteps: yup.number(),
    hiringStepDescription: yup.string(),
    typeOfCodingChallenge: yup.string(),
    typeOfWork: yup.string(),
    timeZone: yup.string(),
    skills: yup.array()
  });

  let formik = useFormik<yup.InferType<typeof validationSchema>>({
    initialValues: blankJob,
    onSubmit: stipeCheckOut,
    validationSchema,
  });

  React.useEffect(() => {
    Cookie.set("job", JSON.stringify(formik.values));
  }, [formik.values]);
  console.log(formik.errors.logo);

  let typeOfdeveloper = ['Take away test', 'Algorithm puzzle', 'Live coding challange'];
  let typeOfWork = ['Remote', 'Hybrid', 'Office base']
  let timeZone = ['Europe', 'LATAM', 'UK', 'South Asia', 'East Asia', 'Africa', 'USA - Central Standard Time', 'USA - Pacific Standard Time', 'USA - Hawaii-Aleutian Standard Time']
  let role = ['Front end dev', 'Back end dev', 'Full stack dev', 'Cloud Enginer', 'QA', 'Mobile dev', 'Dev Ops']
  let skills = [{id: '', text: ''}]
  return (
    <Container maxWidth="md">
      <h1>Add a Job</h1>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid item xs={6}>
                <label htmlFor="image">Company Name</label>
                <TextField
                  id="companyName"
                  name="companyName"
                  value={formik.values.companyName}
                  placeholder="Company Name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.companyName && Boolean(formik.errors.companyName)}
                  helperText={formik.touched.companyName && formik.errors.companyName}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid item xs={4}>
                <label htmlFor="image">Company Logo</label>
                <input type="file" id="logo" onChange={formik.handleChange} />
                {Boolean(formik.errors.logo) && <p>{formik.errors.logo?.toString()}</p>}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid item xs={6}>
                <label htmlFor="image">Job Title</label>
                <TextField
                  id="title"
                  name="title"
                  value={formik.values.title}
                  placeholder="Job Title"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid item xs={8}>
                <label htmlFor="image">Job Description</label>
                <TextField
                  id="description"
                  name="description"
                  value={formik.values.description}
                  placeholder="Expalin what is the job about"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                  variant="outlined"
                  multiline
                  minRows={10}
                />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid item xs={6}>
                <SimpleSelect
                  defaultValue={2}
                  label="Number of hiring steps"
                  options={[1, 2, 3, 4]}
                  onChange={(e) => formik.setFieldValue("hiringSteps", e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid item xs={8}>
                <label htmlFor="image">Hiring steps description</label>
                <TextField
                  id="hiringStepDescription"
                  name="hiringStepDescription"
                  value={formik.values.hiringStepDescription}
                  placeholder="Please explain the hiring process step by step"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.hiringStepDescription && Boolean(formik.errors.hiringStepDescription)}
                  helperText={formik.touched.hiringStepDescription && formik.errors.hiringStepDescription}
                  variant="outlined"
                  multiline
                  minRows={5}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid item xs={10}>
                <SimpleSelect
                  defaultValue={'Take away test'}
                  label="What type of conding challange should the candidate expect"
                  extraStyles={{minWidth: '20%'}}
                  options={typeOfdeveloper}
                  onChange={(e) => formik.setFieldValue("typeOfCodingChallenge", e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid item xs={10}>
                <SimpleSelect
                  defaultValue={'Remote'}
                  label="Type of work"
                  extraStyles={{minWidth: '20%'}}
                  options={typeOfWork}
                  onChange={(e) => formik.setFieldValue("typeOfWork", e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid item xs={10}>
                <SimpleSelect
                  defaultValue='LATAM'
                  label="Time zone"
                  extraStyles={{minWidth: '20%'}}
                  options={timeZone}
                  onChange={(e) => formik.setFieldValue("timeZone", e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid item xs={10}>
                <SimpleSelect
                  defaultValue='Front end dev'
                  label="Type of role"
                  extraStyles={{minWidth: '20%'}}
                  options={role}
                  onChange={(e) => formik.setFieldValue("role", e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid item xs={10}>
                {/* @ts-ignore} */}
                <TagInput tags={formik.values.skills} setTags={(e) => formik.setFieldValue("skills", e)} />
              </Grid>
            </Grid>
          </Grid>
          <Button type="submit">Submit</Button>
        </Box>
      </form>
    </Container>
  );
}

function parseCookies(req: any) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
}

CreateCompany.getInitialProps = ({ req }: any) => {
  const cookies = parseCookies(req);

  return {
    initialJob: cookies.initialJob,
  };
};
//@ts-ignorets
export default withAuthenticator(CreateCompany);
