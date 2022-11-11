import { withAuthenticator } from "@aws-amplify/ui-react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button, InputLabel, makeStyles, MenuItem, Select } from "@material-ui/core";
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
import SimpleSelect from './../src/components/SimpleSelect';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  select: {
    border: 'solid 1px #e5e7eb',
    padding: 4,
    borderRadius: 2,
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'red',
    },
  },
}));

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
  const styles = useStyles();
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
    hiringSteps: yup.array()
  });

  const formik = useFormik<yup.InferType<typeof validationSchema>>({
    initialValues: blankJob,
    onSubmit: stipeCheckOut,
    validationSchema,
  });

  React.useEffect(() => {
    Cookie.set("job", JSON.stringify(formik.values));
  }, [formik.values]);
  console.log(formik.errors.logo);
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
                  placeholder="Job description"
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
          </Grid>
          <Grid item xs={12}>
            <Grid item xs={6}>
              <InputLabel id="demo-simple-select-label">Number of hiring steps</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={2}
                value={formik.values.hiringSteps}
                label="Steps"
                className={styles.select}
                onChange={(e) => formik.setFieldValue('hiringSteps', e.target.value)}
                disableUnderline
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
              </Select>
            </Grid>
          </Grid>
          <Button type="submit">submit</Button>
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
