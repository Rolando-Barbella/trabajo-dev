import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";

export default function IndexSkeleton() {
  return (
    <Container maxWidth="md" sx={{ pt: 2, pb: 12 }}>
      <Stack spacing={1} paddingTop={2}>
        <Skeleton variant="rectangular" width={800} height={120} />
        <br />
        <Skeleton variant="rectangular" width={800} height={120} />
        <br />
        <Skeleton variant="rectangular" width={800} height={120} /> 
        <br />
        <Skeleton variant="rectangular" width={800} height={120} />
        <br />
        <Skeleton variant="rectangular" width={800} height={120} />
      </Stack>
    </Container>
  );
}
