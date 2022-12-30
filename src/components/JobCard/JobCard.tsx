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
          // alt="Live from space album cover"
        />
      <img src={img} alt="" width={100} height={100}/>

        {/* <Image src="https://photopark90bbc6ba3bab463e84ae00dc7e8f0a7605313-dev.s3.us-east-1.amazonaws.com/public/Screenshot%202022-06-11%20at%2021.59.53.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZL54CF35DRXBH77L%2F20221230%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20221230T022752Z&X-Amz-Expires=900&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLWVhc3QtMSJGMEQCIC3HldRVW2clsnUoYzXl%2B6PhFSDPugbGSChQ1yWHLvBVAiADNCbt8fNhHYoL2v%2BIj%2F0wSYMyQAz1qARtd%2B6RUwdT3SrEBAhsEAAaDDY0NDEwMjYzMTE2MiIMhI01pPNasQLIV3HsKqEEmjUTFesKE4%2FJ9wM3p5VRYb9EpzJzHQkRK2aAg8h7ZN7NoZMXijbyv0YdfUqJGkiRp2hFHWdtC4GaRiwXUXNMZcNSVnzCja4tDIzY%2FaDsS%2BNhDlPwjo0CtBaOLB56r2XEW7lhRb8rKY7BjwZX4bOu%2BqDonvRWLey1zWd8sqmf8SruylsbUfc4TelhZg7d%2BCq7m4TdyIe2eVAElRSLcf88gO3YS1J6sKNVW1aJcCRbLwsyjqW4xyykxTiD3Yxdl1cy2FVDFw%2B8RYtYabIHjYUlnuNBtGt1Bi2oDoSAK%2F%2BAIwQcRudpW7zSR4U7%2BfhN5I28Qg6mdafSMyH8juMA0rKwygkVnT6plse5z2MFrVi7hUGzioZE9SoLyYbdmVfC95B%2B%2BPK1GlolhinO0FBR6uHGfZRWpu2S%2FqLc5s2afMnoruNCbEW2ckZfqBWcOBywMAjTWsQx6jQdUDELjCVQKKuL4FwOIB8zpSiBTii0k1YNBT8y%2Fm6l1lJJVWKtciHyNr5LcCCG2x%2B%2FIxEjJ8rEcdmBK319pVGO7V41bKocc0VDYNieFUjNGLdqXs2OHHh%2B22%2Bn6MH1PpAHbiMNfcDmFalk1WBzuqYKAfXThxSORdeKA1hkCBaIlMoH6YHh2p1%2BSthOeFvWVqhIFR%2BCrHt4kGdYj1sXbiHkkatUTYtUpuVkshJEn2OT58J%2BpINqsq%2F3tAxSQVH8x7uTFFxGC4HX79Uy5P0wqJm5nQY6hgLEQRboBzOSdsrW%2BI5KfxopgTxq2h81P9bwxXzmSp9RglgzkggZ%2FjZL3TIq6pkswHBVyOLSJfCLmYiRhLzwwwN1nLUPS57zomhYy%2F66AgSJkBBHK5Mxy8VgTximKETlCVF9wBH8SEnZJnCxhwFJFQAWCajCrrymk2wg6wqJudmPSPIpXKwv9jk4RtGpl2wZ0XvMTAL6HDmCb4jRHdLgSt8BP6n6hWJg9Y7gyUQ%2Fo8JHD6HGH1nGHjRmYZ3pVyNiBojDNLFSePZ1C3ce8kWxRu92cI9jS9u56FCHrDQYdSM4j%2BRuXtwB9SOH4iLZbknWEtX%2BaLJos2O59g50HDXJ6U6kfWL0DM6I&X-Amz-Signature=b1babebbb0946df12225d8bb877b0184ac8e5ee800838c8d2725d2a5f621d4e2&X-Amz-SignedHeaders=host&x-amz-user-agent=aws-sdk-js%2F3.6.1%20os%2FmacOS%2F10.15.7%20lang%2Fjs%20md%2Fbrowser%2FChrome_108.0.0.0%20api%2Fs3%2F3.6.1%20aws-amplify%2F4.7.12_js&x-id=GetObject" alt="yo" width={200} height={200} /> */}
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
