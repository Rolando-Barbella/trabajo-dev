import { withSSRContext } from "aws-amplify";
import { getJob } from "../../src/graphql/queries";
import Container from "@mui/material/Container";
import Location from "@mui/icons-material/PlaceOutlined";
import Chip from "@mui/material/Chip";

import { useRouter } from "next/router";
import CardMedia from "@mui/material/CardMedia";
import { Job } from "../../src/API";
import { CustomButton as Button } from "../../src/components/CustomButton/CustomButton";
import Link from "next/link";

export async function getServerSideProps(context: { query: { id: string } }) {
  let SSR = withSSRContext();
  let { data } = await SSR.API.graphql({ query: getJob, variables: { id: context.query.id } });
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      job: data?.getJob,
    },
  };
}
function Job({ job }: { job: Job }) {
  const Router = useRouter();
  let date = new Date(job.updatedAt);

  return (
    <Container maxWidth="lg" sx={{ pt: 2, pb: 15 }}>
      <div className="flex container">
        <CardMedia
          component="img"
          sx={{ width: 150, borderRadius: 2, maxHeight: 120 }}
          image={Router?.query?.logo as string}
          alt={job.companyName}
        />
        <div className="pl-4">
          <h2 className="font-medium text-xl">{job.title}</h2>
          <p className="text-sm">{job.companyName}</p>
          <p className="text-light text-gray-400" style={{ fontSize: 14, color: "rgb(156 163 175)" }}>
            {date.toLocaleDateString("en-UK", { month: "short", year: "numeric" })}
          </p>
        </div>
      </div>
      <div className="container">
          <div className="flex text-sm pt-3 pb-2">
            <Location fontSize="small" />
            <p className="mr-2">{job.typeOfWork} -</p>
            <p>{job.timeZone}</p>
          </div>
        <div className="pt-0">
          <p className="text-md font-semibold">Salary</p>
          <span style={{ marginRight: 5 }}>{job.salary}</span>
        </div>
        <div className="pt-2">
          <p className="text-md font-semibold">Job description</p>
          <div dangerouslySetInnerHTML={{ __html: job.description }} />
        </div>
        <p className="text-lg font-semibold pt-4">Hiring process </p>
        <div className="pt-2 flex">
          <p className="text-md mr-2 font-medium">Number of hiring steps: </p>
          <span>{job.hiringSteps}</span>
        </div>
        <div
          className="text-md pt-2"
          dangerouslySetInnerHTML={{ __html: job.hiringStepDescription || "No description was added" }}
        />
        <div className="pt-2 flex">
          <p className="text-md font-semibold mr-2">Type of coding challange: </p>
          <span>{job.typeOfCodingChallenge || ""}</span>
        </div>
        <div className="pt-4">
          <p className="text-md font-semibold mr-2 pb-4">Main skills need it for the job</p>
          {job.skills?.map((skill) => (
            <Chip style={{ marginRight: 5 }} key={skill} label={skill} variant="outlined" />
          ))}
        </div>
        <br />
        <Link href={"https://twitter.com/mysurfislife"} target="_blank">
          <Button text="Apply" width={200} height={50} />
        </Link>
      </div>
    </Container>
  );
}

export default Job;
