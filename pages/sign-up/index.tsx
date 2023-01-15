import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Auth } from "aws-amplify";
import Grid from "@mui/material/Grid";
import { Storage } from "aws-amplify";

import { useFormik } from "formik";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import * as yup from "yup";
import { CustomButton as Button } from "../../src/components/CustomButton/CustomButton";
import SkeletonForm from "../../src/components/SkeletonForm";

import { AlertColor } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import config from "../../src/aws-exports";
import Label from "../../src/components/Label/Label";
import SimpleSnackbar from "../../src/components/SimpleSnackBar/SimpleSnackBar";
import TextField from "../../src/components/TextField";
import Link from "next/link";
const RichTextField = dynamic(() => import("../../src/components/RichTextField"), {
  ssr: false,
});

let blankUser = {
  email: "",
  password: "",
  companyName: "",
  logo: "",
};

export type SnackbarProps = {
  open: boolean;
  message: string;
  severity: AlertColor | undefined;
};

function SignIn() {
  let Router = useRouter();
  let [description, setDescription] = React.useState("");

  let [snackBar, setSnackBar] = React.useState<SnackbarProps>({
    open: false,
    message: "",
    severity: "info",
  });

  let handleSubmitUser = async (user, description) => {
    let uploadedImage = await Storage.put(user.logo.files[0].name, user.logo.files[0]);

    try {
      await Auth.signUp({
        username: user.email,
        password: user.password,
        attributes: {
          'custom:companyName': user.companyName,
          'custom:description': description,
          'custom:logo': {
            // use the image's region and bucket (from aws-exports) as well as the key from the uploaded image
            region: config.aws_user_files_s3_bucket_region,
            bucket: config.aws_user_files_s3_bucket,
            key: uploadedImage.key,
          },
        },
        autoSignIn: {
          // optional - enables auto sign in after user is confirmed
          enabled: true,
        },
      });
      Router.push("/create-job", "/create-job", { shallow: false });
    } catch (error) {
      console.error("error", error);
    }
  };

  let validationSchema = yup.object({
    email: yup.string().required("Email is required").email("Email not valid"),
    password: yup.string().required("Password is required").min(6, "Minimun 6 characters"),
    companyName: yup.string().required("Company name is required").min(1, "Company name too short"),
    logo: yup.mixed().test({
      message: "Please provide a supported file type",
      test: (file, context) => {
        let isValid = ["png", "jpg", "jpeg"].includes(file && file.value.split(".").pop());
        if (!isValid) return context?.createError();
        return isValid;
      },
    }),
  });

  let formik = useFormik<yup.InferType<typeof validationSchema>>({
    initialValues: blankUser,
    onSubmit: (user) => handleSubmitUser(user, description),
    validationSchema,
    validateOnMount: validationSchema.isValidSync(blankUser),
  });

  // let desableButton = disableSubmit || description.length < 100;

  // if (disableSubmit) {
  //   return (
  //     <Container maxWidth="md" sx={{ pt: 3, pb: 5 }}>
  //       <SkeletonForm />
  //     </Container>
  //   );
  // }

  return (
    <>
      <Container maxWidth="md" sx={{ pt: 2, pb: 5 }}>
        <SimpleSnackbar
          snackbar={snackBar}
          message={snackBar.message}
          severity={snackBar.severity}
          setOpen={setSnackBar}
        />
        <Breadcrumbs>
          <Link href="/">Go back</Link>
        </Breadcrumbs>
        <h1 className="font-medium text-3xl">Create company profile</h1>
        <form onSubmit={formik.handleSubmit} className="pt-6">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid item xs={6}>
                  <Label text="Email" required />
                  <TextField
                    id="email"
                    name="email"
                    value={formik.values.email}
                    placeholder="Company Name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid item xs={6}>
                  <Label text="Password" required />
                  <TextField
                    id="password"
                    name="password"
                    type="password"
                    value={formik.values.password}
                    placeholder="Company Name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
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
                <Grid item xs={8}>
                  <Label text="Company description" required />
                  <RichTextField setValue={setDescription} value={description} />
                </Grid>
              </Grid>
            </Grid>
            <br />
            <Button text="Submit" disabled={description.length < 100} />
          </Box>
        </form>
      </Container>
    </>
  );
}

export default SignIn;
