import { AmplifyS3Image } from "@aws-amplify/ui-react/legacy";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Job } from "../../API";


export default function JobCard({ logo, title }: Job) {
  return (
    <Grid item xs={6}>
      <Card sx={{ display: "flex" }}>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={logo.key}
          alt="Live from space album cover"
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <h2>{title}</h2>
            <AmplifyS3Image imgKey={logo.key} />
          </CardContent>
        </Box>
      </Card>
    </Grid>
  );
}
