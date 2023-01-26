import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function SignUpSkeleton() {
  return (
    <Stack spacing={1} paddingTop={2}>
      <Skeleton variant="rectangular" width={500} height={60} />
      <Skeleton variant="rectangular" width={500} height={100} />
      <br />
      <Skeleton variant="rectangular" width={500} height={70} />
      <Skeleton variant="rectangular" width={500} height={70} />
      <Skeleton variant="rectangular" width={500} height={70} />
    </Stack>
  );
}
