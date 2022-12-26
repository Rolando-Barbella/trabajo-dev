import CardContent from "@mui/material/CardContent";
import { Storage } from "aws-amplify";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Job } from "../../API";
import React from "react";

export default function JobCard({ logo, title, description }: Job) {
  const [img, setImg] = React.useState('')
  let getLogo =  React.useCallback(async () => setImg(await Storage.get(logo.key)),[])
  React.useEffect(() => {
    getLogo()
  },[getLogo])
  console.log(img)
  return (
    <>
      <Card sx={{ display: "flex" }}>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={img}
          alt="Live from space album cover"
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto", padding: 1 }}>
            <h2 className="pt-2">{title}</h2>
            <p className="text-left pt-4">{description.slice(0, 200)}...</p>
          </CardContent>
        </Box>
      </Card>
    </>
  );
}
