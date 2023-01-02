import CardContent from "@mui/material/CardContent";
import Link from "next/link";
import Money from "@mui/icons-material/PlaceOutlined";
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
  description: Job["description"];
  skills: Job["skills"];
  salary: Job["salary"];
  companyName: Job["companyName"];
  timeZone: Job["timeZone"];
};

export default function JobCard({ logo, title, description, skills, salary, companyName, timeZone }: JobCardProps) {
  const [img, setImg] = React.useState("");
  let getLogo = React.useCallback(async () => setImg(await Storage.get(logo.key)), [logo.key]);
  React.useEffect(() => {
    getLogo();
  }, [getLogo]);
  return (
    <div style={{ boxShadow: "0 2px 10px 0 rgb(116 129 141 / 20%)", width: "95%" }}>
      <Link href={""}>
        <Card sx={{ display: "flex", boxShadow: 0 }}>
          <CardMedia component="img" sx={{ width: 151 }} image={img} alt={companyName} />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto", padding: 1 }}>
              <h2 className="pt-2 font-medium text-lg">{title}</h2>
              <p className="font-light font-sm" style={{ fontSize: 14 }}>
                {description.slice(0, 200)}...
              </p>
              <Box sx={{ display: "flex" }} paddingTop={2}>
                <div style={{ flex: 1 }}>
                  {skills?.map((skill) => (
                    <Chip style={{ marginRight: 5 }} key={skill} label={skill} variant="outlined" />
                  ))}
                </div>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Chip
                    key={timeZone}
                    style={{ marginRight: 5 }}
                    icon={<Money />}
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
