import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";

export default function ConfirmCodeSkeleton() {
  return (
    <Container maxWidth="md" sx={{ pt: 2, pb: 12 }}>
      <Stack spacing={1} paddingTop={2}>
        <h1 className="font-medium text-3xl">Sign up</h1>
        <Skeleton variant="rectangular" width={500} height={50} />
        <Skeleton variant="rectangular" width={500} height={50} />
        <br />
        <Skeleton variant="rectangular" width={100} height={50} />
      </Stack>
    </Container>
  );
}
