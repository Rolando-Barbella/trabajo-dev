import { useTheme, withAuthenticator } from "@aws-amplify/ui-react";
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
import SimpleSelect from "../../src/components/SimpleSelect/SimpleSelect";
import SimpleSnackbar from "../../src/components/SimpleSnackBar/SimpleSnackBar";
import TagInput from "../../src/components/TagInput/TagInput";
import TextField from "../../src/components/TextField";
import { createJob, updateJob } from "../../src/graphql/mutations";
import { useStyles } from "./styles";

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
  const styles = useStyles();

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
      // upload the image to S3
      let uploadedImage = await Storage.put(job.logo.value, { name: job.logo.value });
      // submit the GraphQL query
      const addJob = await API.graphql({
        query: createJob,
        variables: {
          input: {
            ...job,
            hasbeenPaid: false,
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
      const { data } = addJob;
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
    skills: yup.array(),
  });

  let formik = useFormik<yup.InferType<typeof validationSchema>>({
    initialValues: blankJob,
    onSubmit: (job) => handleSubmitJob(job),
    validationSchema,
    validateOnMount: validationSchema.isValidSync(blankJob),
  });

  let typeOfdeveloper = ["Select", "Take away test", "Algorithm puzzle", "Live coding challange"];
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
        <h1 className={styles.h1}>Add a job</h1>
        <form onSubmit={formik.handleSubmit} className={styles.form}>
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
                  <span className={styles.logoError}>
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
                <Grid item xs={6}>
                  <SimpleSelect
                    required
                    defaultValue={formik.values.hiringSteps}
                    label="Number of hiring steps"
                    error={
                      formik.errors.hiringSteps && formik.errors.hiringSteps.length > 0 && formik.touched.hiringSteps
                    }
                    options={[0, 1, 2, 3, 4]}
                    onChange={(e) => formik.setFieldValue("hiringSteps", e.target.value)}
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
              <Grid item xs={12}>
                <Grid item xs={10}>
                  <SimpleSelect
                    defaultValue="Select"
                    label="What type of conding challange should the candidate expect?"
                    extraStyles={{ minWidth: "20%" }}
                    options={typeOfdeveloper}
                    onChange={(e) => formik.setFieldValue("typeOfCodingChallenge", e.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid container item xs={12}>
                <Grid item xs={3}>
                  <SimpleSelect
                    defaultValue="Select"
                    required
                    label="Type of work"
                    extraStyles={{ minWidth: "70%" }}
                    options={typeOfWork}
                    error={formik.errors.typeOfWork && formik.errors.typeOfWork.length > 0 && formik.touched.typeOfWork}
                    onChange={(e) => formik.setFieldValue("typeOfWork", e.target.value)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <SimpleSelect
                    defaultValue="Select"
                    required
                    label="Time zone"
                    extraStyles={{ minWidth: "70%" }}
                    options={timeZone}
                    error={formik.errors.timeZone && formik.errors.timeZone.length > 0 && formik.touched.timeZone}
                    onChange={(e) => formik.setFieldValue("timeZone", e.target.value)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <SimpleSelect
                    required
                    defaultValue="Select"
                    label="Type of role"
                    extraStyles={{ minWidth: "70%" }}
                    options={role}
                    error={formik.errors.typeOfWork && formik.errors.typeOfWork.length > 0 && formik.touched.typeOfWork}
                    onChange={(e) => formik.setFieldValue("role", e.target.value)}
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
        const styles = useStyles();
        return (
          <div className={styles.signUpFooter}>
            <p>We do share any of your data</p>
          </div>
        )
      }
    }
  },
  formFields: {
    signIn: {
      username: {
        placeholder: 'Enter your email',
      },
    },
  }
});
