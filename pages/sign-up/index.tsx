import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Auth } from "aws-amplify";
import Grid from "@mui/material/Grid";

import { useFormik } from "formik";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import * as yup from "yup";
import { CustomButton as Button } from "../../src/components/CustomButton/CustomButton";
import SignUpSkeleton from "./SignUpSkeleton";

import { AlertColor } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
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
};

export type SnackbarProps = {
  open: boolean;
  message: string;
  severity: AlertColor | undefined;
};

type User = {
  email: string,
  password: string,
  companyName: string,
}

function SignUp() {
  let Router = useRouter();
  let [description, setDescription] = React.useState("");
  let [loadingSubmit, setLoadingSubmit] = React.useState(false);

  let [snackBar, setSnackBar] = React.useState<SnackbarProps>({
    open: false,
    message: "",
    severity: "info",
  });

  let handleSubmitUser = async (user:User, description: string) => {
    setLoadingSubmit(true)
    try {
      await Auth.signUp({
        username: user.email,
        password: user.password,
        attributes: {
          'custom:companyName': user.companyName,
          'custom:description': description,
        },
        autoSignIn: {
          enabled: true,
        },
      });
      Router.push("/confirm-code", "/confirm-code", { shallow: false });
      setLoadingSubmit(false)
    } catch (error) {
      setLoadingSubmit(false)
      console.error("error", error);
    }
  };

  let validationSchema = yup.object({
    email: yup.string().required("Email is required").email("Email not valid"),
    password: yup.string().required("Password is required").min(8, "Minimun 8 characters"),
    companyName: yup.string().required("Company name is required").min(1, "Company name too short"),
  });

  let formik = useFormik<yup.InferType<typeof validationSchema>>({
    initialValues: blankUser,
    onSubmit: (user) => handleSubmitUser(user, description),
    validationSchema,
    validateOnMount: validationSchema.isValidSync(blankUser),
  });

  if (loadingSubmit) {
    return (
      <Container maxWidth="md" sx={{ pt: 3, pb: 5 }}>
        <SignUpSkeleton />
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
        <Breadcrumbs>
          <Link href="/" onClick={() => Router.back()}>Go back</Link>
        </Breadcrumbs>
        <h1 className="font-medium text-3xl">Sign up</h1>
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
                    placeholder="Email"
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
                    placeholder="Password"
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
              <br />
              <Grid item xs={12}>
                <Grid item xs={8}>
                  <Label text="Company description" required />
                  <RichTextField placeholder="Tell us about your company" setValue={setDescription} value={description} />
                </Grid>
              </Grid>
            </Grid>
            <Grid paddingTop={1} paddingBottom={1}>
              Already have an account? <Link href="/sign-in" style={{color: "#5091cb"}}>Sign in</Link>
            </Grid>
            <Button text="Submit" disabled={description.length < 100} />
          </Box>
        </form>
      </Container>
    </>
  );
}

export default SignUp;
