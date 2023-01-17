import CardContent from "@mui/material/CardContent";
import Link from "next/link";
import Location from "@mui/icons-material/PlaceOutlined";
import { Storage } from "aws-amplify";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Job } from "../../API";
import React from "react";

type JobCardProps = {
  logo: Job["logo"];
  title: Job["title"];
  skills: Job["skills"];
  salary: Job["salary"];
  companyName: Job["companyName"];
  timeZone: Job["timeZone"];
  id: Job["id"];
  typeOfWork: Job["typeOfWork"]
  updatedAt: string
};

export default function JobCard({ logo, title, skills, salary, companyName, timeZone, id, updatedAt }: JobCardProps) {
  let [img, setImg] = React.useState("");
  let getLogo = React.useCallback(async () => setImg(await Storage.get(logo.key)), [logo.key]);
  let date = new Date(updatedAt);

  React.useEffect(() => {
    getLogo();
  }, [getLogo]);

  return (
    <div style={{ boxShadow: "0 2px 10px 0 rgb(116 129 141 / 20%)", width: "95%" }}>
      <Link href={{
        pathname: `job/${id}`,
        query: {id, logo: img}
      }}
      >
        <Card sx={{ display: "flex", boxShadow: 0 }}>
          <CardMedia component="img" sx={{ width: 151 }} image={img} alt={companyName} />
          <Box sx={{ display: "flex", flex: 1,flexDirection: "column" }}>
            <CardContent sx={{ padding: 1 }}>
              <h2 className="font-medium text-lg">{title}</h2>
              <p className="font-light" style={{ fontSize: 14 }}>
                {companyName}
              </p>
              <p className="text-light text-gray-400" style={{ fontSize: 14,  color: 'rgb(156 163 175)' }}>
                {date.toLocaleDateString('en-UK',{month:'short', year:'numeric'})}
              </p>
              <Box sx={{display: 'flex', flex: 1, justifyContent: 'space-between'}} paddingTop={2}>
                <div>
                  {skills?.slice(0, 4).map((skill) => (
                    <Chip style={{ marginRight: 5 }} key={skill} label={skill} variant="outlined" />
                  ))}
                </div>
                <Box>
                  <Chip
                    key={timeZone}
                    style={{ marginRight: 5 }}
                    icon={<Location />}
                    label={timeZone}
                    variant="outlined"
                  />
                  <Chip
                    key={`${salary}`}
                    style={{ backgroundColor: "black", color: "white" }}
                    label={`Salary ${salary}`}
                    variant="outlined"
                  />
                </Box>
              </Box>
            </CardContent>
          </Box>
        </Card>
      </Link>
    </div>
  );
}
