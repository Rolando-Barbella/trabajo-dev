import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Grid from "@mui/material/Grid";

export default function SkeletonForm() {
  return (
    <Stack spacing={1} paddingTop={2}>
      <h1 className="font-medium text-4xl">Add a job</h1>
      {/* For other variants, adjust the size with `width` and `height` */}
      <Skeleton variant="rectangular" width={500} height={50} />
      <Skeleton variant="rectangular" width={500} height={85} />
      <Skeleton variant="rectangular" width={150} height={60} />
      <Skeleton variant="rectangular" width={100} height={60} />
      <Skeleton variant="rectangular" width={500} height={180} />
      <Grid paddingTop={1} spacing={1}>
        <Skeleton variant="rectangular" width={500} height={50} />
      </Grid>
      <Skeleton variant="rectangular" width={150} height={40} />
      <br />
      <Skeleton variant="rectangular" width={100} height={50}  />
    </Stack>
  );
}
