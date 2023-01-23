import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function SignUpSkeleton() {
  return (
    <Stack spacing={1} paddingTop={2}>
      <h1 className="font-medium text-3xl">Sign up</h1>
      <Skeleton variant="rectangular" width={500} height={60} />
      <Skeleton variant="rectangular" width={500} height={60} />
      <Skeleton variant="rectangular" width={500} height={60} />
      <br />
      <Skeleton variant="rectangular" width={600} height={70} />
      <br />
      <Skeleton variant="rectangular" width={100} height={50}  />
    </Stack>
  );
}
