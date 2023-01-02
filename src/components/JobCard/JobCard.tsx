import CardContent from "@mui/material/CardContent";
import Image from 'next/image';
import { Storage } from "aws-amplify";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Job } from "../../API";
import React from "react";

type JobCardProps = {
  logo: Job['logo'],
  title: Job['title'],
  description: Job['description'],
  skills: Job['skills'],
  salary: Job['salary'],
}

export default function JobCard({ logo, title, description, skills, salary }: JobCardProps) {
  const [img, setImg] = React.useState('')
  let getLogo =  React.useCallback(async () => setImg(await Storage.get(logo.key)),[logo.key])
  debugger;
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
          // alt="Live from space album cover"
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto", padding: 1 }}>
            <h2 className="pt-2">{title}</h2>
            <p className="text-left pt-4 text-sm">{description.slice(0, 200)}...</p>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              {
                skills?.map(skill => <Chip key={skill} label={skill} variant="outlined" />)
              }
              <Chip key={`Salary ${salary}`} label={`Salary ${salary}`}  variant="outlined" />
            </Box>
          </CardContent>
        </Box>
      </Card>
    </>
  );
}
