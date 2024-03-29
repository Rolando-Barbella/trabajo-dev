import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Auth } from "aws-amplify";
import Grid from "@mui/material/Grid";

import { useFormik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import * as yup from "yup";
import { CustomButton as Button } from "../../src/components/CustomButton/CustomButton";

import { AlertColor } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Label from "../../src/components/Label/Label";
import SimpleSnackbar from "../../src/components/SimpleSnackBar/SimpleSnackBar";
import TextField from "../../src/components/TextField";
import Link from "next/link";
import ConfirmCodeSkeleton from "./ConfirmCodeSkeleton";

let blankCode = {
  username: "",
  password: "",
};

export type SnackbarProps = {
  open: boolean;
  message: string;
  severity: AlertColor | undefined;
};

type User = {
  username: string;
  password: string;
};

function SignIn() {
  let Router = useRouter();
  let [loadingSubmit, setLoadingSubmit] = React.useState(false);

  let [snackBar, setSnackBar] = React.useState<SnackbarProps>({
    open: false,
    message: "",
    severity: "info",
  });

  let handleSubmitCode = async (user: User) => {
    setLoadingSubmit(true);
    try {
      await Auth.signIn(user.username.trim(), user.password.trim());
      Router.push("/create-job", "/create-job", { shallow: false });
    } catch (error) {
      console.log("error", error);
      setLoadingSubmit(false);
    }
  };

  let validationSchema = yup.object({
    username: yup.string().required("Email is required").email("Email not valid"),
    password: yup.string().required("Password required").min(6, "Minimun 6 characters"),
  });

  let formik = useFormik<yup.InferType<typeof validationSchema>>({
    initialValues: blankCode,
    onSubmit: (code) => handleSubmitCode(code),
    validationSchema,
    validateOnMount: validationSchema.isValidSync(blankCode),
  });

  if (loadingSubmit) {
    return (
      <Container maxWidth="md" sx={{ pt: 3, pb: 5 }}>
        <ConfirmCodeSkeleton />
      </Container>
    );
  }

  return (
    <>
      <Container maxWidth="md" sx={{ pt: 2, pb: 22 }}>
        <SimpleSnackbar
          snackbar={snackBar}
          message={snackBar.message}
          severity={snackBar.severity}
          setOpen={setSnackBar}
        />
        <Breadcrumbs>
          <Link href="/" onClick={() => Router.back()}>
            Go back
          </Link>
        </Breadcrumbs>
        <h1 className="font-medium text-3xl">Sign in</h1>
        <form onSubmit={formik.handleSubmit} className="pt-6">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid item xs={6}>
                  <Label text="Email" required />
                  <TextField
                    id="username"
                    name="username"
                    value={formik.values.username}
                    placeholder="Email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
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
            </Grid>
            <Grid paddingTop={1} paddingBottom={1}>
              Do not have an account? <Link href="/sign-up" style={{color: "#5091cb"}}>Create one</Link>
            </Grid>
            <Button text="Submit" disabled={false} />
          </Box>
        </form>
      </Container>
    </>
  );
}

export default SignIn;
