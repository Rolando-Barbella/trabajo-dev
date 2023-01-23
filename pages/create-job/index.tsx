import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Auth } from "aws-amplify";
import Grid from "@mui/material/Grid";
import { CognitoUser } from "amazon-cognito-identity-js";
import { API, Storage } from "aws-amplify";
import cookie from "cookie";
import { useFormik } from "formik";
import Cookie from "js-cookie";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import * as yup from "yup";
import { CustomButton as Button } from "../../src/components/CustomButton/CustomButton";
import SkeletonForm from "../../src/components/SkeletonForm";

import { AlertColor } from "@mui/material";
import { checkout } from "../../checkout";
import config from "../../src/aws-exports";
import Label from "../../src/components/Label/Label";
import Select from "../../src/components/Select/Select";
import SimpleSnackbar from "../../src/components/SimpleSnackBar/SimpleSnackBar";
import TagInput from "../../src/components/TagInput/TagInput";
import TextField from "../../src/components/TextField";
import { createJob, updateJob } from "../../src/graphql/mutations";

const RichTextField = dynamic(() => import("../../src/components/RichTextField"), {
  ssr: false,
  loading: () => <div>...</div>
});

let blankJob = {
  title: "",
  logo: "",
  salary: "",
  hiringSteps: 0,
  typeOfCodingChallenge: "",
  typeOfWork: "",
  timeZone: "",
  role: "",
  skills: [],
  applyLink: "",
};

export type SnackbarProps = {
  open: boolean;
  message: string;
  severity: AlertColor | undefined;
};

function CreateJob() {
  function parseCookies(req: any) {
    if (typeof window !== 'undefined') {
      return cookie.parse(req ? req.headers.cookie || "" : document.cookie );
    }
  }
  let Router = useRouter();
  let cookies = parseCookies("");

  let [disableSubmit, setDiableSubmit] = React.useState(false);
  let [description, setDescription] = React.useState("");
  let [hiringStepDescription, setHiringStepDescription] = React.useState("");

  let [currentUser, setCurrentUser] = React.useState<CognitoUser | any>({});

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


  let [snackBar, setSnackBar] = React.useState<SnackbarProps>({
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
    async (job: Record<string, any>, description: string, hiringStepDescription: string) => {
      setDiableSubmit(true);
      // upload the image to 3
      let uploadedImage = await Storage.put(job.logo.files[0].name, job.logo.files[0])
      // submit the GraphQL query
      const addJob = await API.graphql({
        query: createJob,
        variables: {
          input: {
            ...job,
            hasbeenPaid: false,
            companyName: currentUser?.attributes['custom:companyName'],
            companyDescription: currentUser?.attributes['custom:companyDescription'],
            description,
            hiringStepDescription,
            userId: currentUser.username,
            skills: job.skills?.map((skill: { id: string; text: string }) => skill.text) || [],
            logo: {
              // use the image's region and bucket (from aws-exports) as well as the key from the uploaded image
              region: config.aws_user_files_s3_bucket_region,
              bucket: config.aws_user_files_s3_bucket,
              key: uploadedImage.key,
            },
          },
        }, 
      })//@ts-ignore
        .then((response: any) => response)
        .catch((error: { error: { data: undefined; errors: Array<string> } }) => {
          setDiableSubmit(false);
          console.error(error);
          return;
        });
      await addJob;
      await Cookie.set("jobId", addJob.data.createJob.id);
      stipeCheckOut();
    },
    [currentUser]
  );

  React.useEffect(() => {
    let resolveUrl = async () => {
      let url = new URLSearchParams(window.location.search);
      let clientSecret = url.get("session_id");
      if (!clientSecret) {
        return;
      }
      const newJob = await API.graphql({
        query: updateJob,
        variables: {
          input: {
            id: cookies?.jobId,
            hasbeenPaid: true,
          },
        },
        //@ts-ignore
      }).catch((error: { error: { data: undefined; errors: Array<string> } }) => {
        setSnackBar({ open: true, message: "Something wrong happend", severity: "error" });
        console.error(error);
        return;
      });
      newJob;
      setSnackBar({ open: true, message: "Job succesfully added", severity: "success" });
    };
    resolveUrl();
    Router.push("/create-job", "/create-job", { shallow: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let validationSchema = yup.object({
    title: yup.string().required("Job title is required").min(5, "Job title too short"),
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
    salary: yup.string().required(),
    hiringSteps: yup.number().moreThan(0).required("Please add the number of phases the recruiment process takes"),
    typeOfCodingChallenge: yup.string(),
    typeOfWork: yup.string().required("Please add type of work"),
    timeZone: yup.string().required("Please add which timezone is need it for this role"),
    role: yup.string().required("Please add type of role"),
    applyLink: yup.string().url().required('Please enter valid url'),
    skills: yup.array().required(),
  });

  let formik = useFormik<yup.InferType<typeof validationSchema>>({
    initialValues: blankJob,
    onSubmit: (job) => handleSubmitJob(job, description, hiringStepDescription),
    validationSchema,
    validateOnMount: validationSchema.isValidSync(blankJob),
  });

  let typeOfCodingChallenge = ["Select", "Take away test", "Algorithm puzzle", "Live coding challange"];
  let typeOfWork = ["Select", "Remote", "Hybrid"];
  let timeZone = [
    "Select",
    "Anywhere",
    "Europe",
    "LATAM",
    "UK",
    "South Asia",
    "East Asia",
    "Africa",
    "USA - Central",
    "USA - Pacific",
    "USA - Hawaii",
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
  let salary = ["Select", "10K - 25K", "25K - 40K", "40K+"];
  let desableButton = disableSubmit || description.length < 100;

  if (disableSubmit) {
    return (
      <Container maxWidth="md" sx={{ pt: 3, pb: 5 }}>
        <SkeletonForm />
      </Container>
    );
  }

  return (
    <>
      <Container maxWidth="md" sx={{ pt: 2, pb: 5 }}>
        <SimpleSnackbar
          snackbar={snackBar}
          message={snackBar.message}
          severity={snackBar.severity}
          setOpen={setSnackBar}
        />
        <h2 className="font-medium text-3xl">{ currentUser?.attributes && currentUser?.attributes['custom:companyName']}</h2>
        <form onSubmit={formik.handleSubmit} className="pt-6">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
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
                  <RichTextField setValue={setDescription} value={description} />
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Label text="Salary" required />
                <Grid item xs={1.5}>
                  <Select
                    options={salary}
                    onChange={(e) => formik.setFieldValue("salary", e.target.value)}
                    error={formik.errors.salary && formik.errors.salary.length > 0 && formik.touched.salary}
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
                  <RichTextField setValue={setHiringStepDescription} value={hiringStepDescription} />
                </Grid>
              </Grid>
              <Grid container item xs={12} spacing={3}>
                <Grid item xs={12}>
                  <Label text="What type of coding challenge should the candidate expect?" />
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
                  <Label text="Main skills for the role" required />
                  {/* @ts-ignore} */}
                  <TagInput tags={formik.values.skills} setTags={(e) => formik.setFieldValue("skills", e)} />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid item xs={6}>
                  <Label text="Apply link" required />
                  <TextField
                    id="applyLink"
                    name="applyLink"
                    value={formik.values.applyLink}
                    placeholder="exp:https:mycompany/apply/role123"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.applyLink && Boolean(formik.errors.applyLink)}
                    helperText={formik.touched.applyLink && formik.errors.applyLink}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Grid>
            <br />
            <Button disabled={desableButton} text="Submit" />
          </Box>
        </form>
      </Container>
    </>
  );
}

export default CreateJob;