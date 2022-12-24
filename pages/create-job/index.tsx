import { withAuthenticator } from "@aws-amplify/ui-react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { CognitoUser } from "amazon-cognito-identity-js";
import { API, Storage } from "aws-amplify";
import cookie from "cookie";
import { useFormik } from "formik";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import React from "react";
import * as yup from "yup";
import { CustomButton as Button } from "../../src/components/CustomButton/CustomButton";

import { AlertColor } from "@mui/material";
import { checkout } from "../../checkout";
import config from "../../src/aws-exports";
import Label from "../../src/components/Label/Label";
import Select from "../../src/components/Select/Select";
import SimpleSnackbar from "../../src/components/SimpleSnackBar/SimpleSnackBar";
import TagInput from "../../src/components/TagInput/TagInput";
import TextField from "../../src/components/TextField";
import { createJob, updateJob } from "../../src/graphql/mutations";

let blankJob = {
  companyName: "",
  title: "",
  logo: "",
  description: "",
  salary: "",
  hiringSteps: 0,
  hiringStepDescription: "",
  typeOfCodingChallenge: "",
  typeOfWork: "",
  timeZone: "",
  role: "",
  skills: [],
};

export type SnackbarProps = {
  open: boolean;
  message: string;
  severity: AlertColor | undefined;
};

function CreateJob({ user }: CognitoUser | any) {
  let Router = useRouter();
  let cookies = parseCookies("");
  let [disableSubmit, setDiableSubmit] = React.useState(false);
  const [snackBar, setSnackBar] = React.useState<SnackbarProps>({
    open: false,
    message: "",
    severity: "info",
  });

  let stipeCheckOut = () => {
    checkout({
      lineItems: [
        {
          price: "price_1LkrT4A2mGW4hJ0CEDy4QtZG",
          quantity: 1,
        },
      ],
    });
  };

  let handleSubmitJob = React.useCallback(
    async (job: Record<string, any>) => {
      // upload the image to 3
      let uploadedImage = await Storage.put(job.logo.files[0].name, job.logo.files[0].name);
      // submit the GraphQL query
      const addJob = await API.graphql({
        query: createJob,
        variables: {
          input: {
            ...job,
            hasbeenPaid: false,
            // hiringSteps: job.hiringSteps,
            userId: user.username,
            skills: job.skills?.map((skill: { id: string; text: string }) => skill.text) || [],
            logo: {
              // use the image's region and bucket (from aws-exports) as well as the key from the uploaded image
              region: config.aws_user_files_s3_bucket_region,
              bucket: config.aws_user_files_s3_bucket,
              key: uploadedImage.key,
            },
          },
        },
      });
      await addJob;
      //@ts-ignore
      const { data, error } = addJob;
      if (error) {
        console.error(error)
        return;
      }
      await Cookie.set("jobId", data.createJob.id);
      setDiableSubmit(true);
      stipeCheckOut();
    },
    [user.username]
  );

  React.useEffect(() => {
    let resolveUrl = async () => {
      let url = new URLSearchParams(window.location.search);
      let clientSecret = url.get("session_id");
      if (!clientSecret) {
        return;
      }
      // let formateJob = JSON.parse(cookies.job);
      const newJob = await API.graphql({
        query: updateJob,
        variables: {
          input: {
            id: cookies.jobId,
            hasbeenPaid: true,
          },
        },
      });
      newJob;

      //@ts-ignore
      const { _, error } = newJob;
      console.log(error);
      if (error) {
        return setSnackBar({ open: true, message: "Something wrong happend", severity: "error" });
      }
      setSnackBar({ open: true, message: "Job succesfully added", severity: "success" });
    };
    resolveUrl();
    Router.push("/create-job", "/create-job", { shallow: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let validationSchema = yup.object({
    title: yup.string().required("Job title is required").min(5, "Job title too short"),
    companyName: yup.string().required("Company name is required").min(1, "Company name too short"),
    logo: yup
      .mixed()
      .test({
        message: "Please provide a supported file type",
        test: (file, context) => {
          let isValid = ["png", "jpg", "jpeg"].includes(file && file.value.split(".").pop());
          if (!isValid) return context?.createError();
          return isValid;
        },
      })
      .test({
        message: `File too big, can't exceed ${2000} px`,
        test: (file) => {
          let isValid = file?.size < 2000;
          return isValid;
        },
      }),
    description: yup.string().required("Job title is required").min(100, "minimun 100 characters"),
    hiringSteps: yup.number().moreThan(0).required("Please add the number of phases the recruiment process takes"),
    hiringStepDescription: yup.string(),
    typeOfCodingChallenge: yup.string(),
    typeOfWork: yup.string().required("Please add type of work"),
    timeZone: yup.string().required("Please add which timezone is need it for this role"),
    role: yup.string().required("Please add type of role"),
    skills: yup.array(),
  });

  let formik = useFormik<yup.InferType<typeof validationSchema>>({
    initialValues: blankJob,
    onSubmit: (job) => handleSubmitJob(job),
    validationSchema,
    validateOnMount: validationSchema.isValidSync(blankJob),
  });

  let typeOfCodingChallenge = ["Select", "Take away test", "Algorithm puzzle", "Live coding challange"];
  let typeOfWork = ["Select", "Remote", "Hybrid", "Office base"];
  let timeZone = [
    "Select",
    "Europe",
    "LATAM",
    "UK",
    "South Asia",
    "East Asia",
    "Africa",
    "USA - Central Standard Time",
    "USA - Pacific Standard Time",
    "USA - Hawaii-Aleutian Standard Time",
  ];
  let role = [
    "Select",
    "Front end dev",
    "Back end dev",
    "Full stack dev",
    "Cloud Enginer",
    "QA",
    "Mobile dev",
    "Dev Ops",
  ];
  return (
    <>
      <Container maxWidth="md" sx={{ pt: 3, pb: 5 }}>
        <SimpleSnackbar
          snackbar={snackBar}
          message={snackBar.message}
          severity={snackBar.severity}
          setOpen={setSnackBar}
        />
        <h1 className="font-medium text-4xl">Add a job</h1>
        <form onSubmit={formik.handleSubmit} className="pt-6">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid item xs={6}>
                  <Label text="Company name" required />
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
                <Grid item xs={5}>
                  <Label text="Company logo" required />
                  <div className="input_container">
                    <input type="file" id="logo" onChange={(e) => formik.setFieldValue("logo", e.target)} />
                  </div>
                  <span className="pt-6">
                    {formik.touched.logo && Boolean(formik.errors.logo) && <p>{formik.errors.logo?.toString()}</p>}
                  </span>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid item xs={6}>
                  <Label text="Job title" required />
                  <TextField
                    id="title"
                    name="title"
                    value={formik.values.title}
                    placeholder="Job title"
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
                  <Label text="Job description" required />
                  <TextField
                    id="description"
                    name="description"
                    value={formik.values.description}
                    placeholder="Please expalin what is the job about"
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
                <Label text="Number of hiring steps" required />
                <Grid item xs={0.8}>
                  <Select
                    options={[0, 1, 2, 3, 4]}
                    onChange={(e) => formik.setFieldValue("hiringSteps", Number(e.target.value))}
                    error={
                      formik.errors.hiringSteps && formik.errors.hiringSteps.length > 0 && formik.touched.hiringSteps
                    }
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid item xs={8}>
                  <Label text="Hiring steps description" />
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
              <Grid container item xs={12} spacing={3}>
                <Grid item xs={12}>
                  <Label text="What type of conding challange should the candidate expect?" />
                  <Select
                    options={typeOfCodingChallenge}
                    onChange={(e) => formik.setFieldValue("typeOfCodingChallenge", e.target.value)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Label text="Type of work" required />
                  <Select
                    options={typeOfWork}
                    onChange={(e) => formik.setFieldValue("typeOfWork", e.target.value)}
                    error={formik.errors.typeOfWork && formik.errors.typeOfWork.length > 0 && formik.touched.typeOfWork}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Label text="Time zone" required />
                  <Select
                    options={timeZone}
                    onChange={(e) => formik.setFieldValue("timeZone", e.target.value)}
                    error={formik.errors.timeZone && formik.errors.timeZone.length > 0 && formik.touched.timeZone}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Label text="Type of role" required />
                  <Select
                    options={role}
                    onChange={(e) => formik.setFieldValue("role", e.target.value)}
                    error={formik.errors.role && formik.errors.role.length > 0 && formik.touched.role}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid item xs={8}>
                  <Label text="Main skills for the role" />
                  {/* @ts-ignore} */}
                  <TagInput tags={formik.values.skills} setTags={(e) => formik.setFieldValue("skills", e)} />
                </Grid>
              </Grid>
            </Grid>
            <br />
            <Button disabled={disableSubmit} text="Submit" />
          </Box>
        </form>
      </Container>
    </>
  );
}

function parseCookies(req: any) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
}

//@ts-ignorets
export default withAuthenticator(CreateJob, {
  components: {
    SignUp: {
      Footer() {
        return (
          <div className="pb-3 font-normal leading-normal mt-0 mb-4 text-gray-600 text-center">
            <p>*We do not share any of your data</p>
          </div>
        );
      },
    },
  },
  formFields: {
    signIn: {
      username: {
        placeholder: "Enter your email",
      },
    },
  },
});
