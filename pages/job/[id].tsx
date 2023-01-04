import { withSSRContext } from "aws-amplify";
import { getJob } from "../../src/graphql/queries";
import Location from "@mui/icons-material/PlaceOutlined";

import { Storage } from "aws-amplify";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import CardMedia from "@mui/material/CardMedia";

export async function getServerSideProps(context) {
  let SSR = withSSRContext();
  let { data } = await SSR.API.graphql({ query: getJob, variables: { id: context.query.id } });
  return {
    props: {
      job: data?.getJob,
      query: context.query,
    },
  };
}
function Job({ query, job }) {
  const Router = useRouter()
  return (
    <Box sx={{ }} className="pt-5">
      <div className="flex container">
        <CardMedia component="img" sx={{ width: 150, borderRadius: 2 }} image={Router?.query?.logo as string} alt={job.companyName} />
        <div className="pl-4">
          <h2 className="font-medium text-xl">{job.title}</h2>
          <p className="text-sm">{job.companyName}</p>
          <div className="flex text-sm pt-2">
            <Location fontSize="small" />
            <p className="mr-2">{job.typeOfWork} - </p>
            <p>{job.timeZone}</p>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="pt-4">
          <p className="text-md font-semibold">Job description</p>
          <p>{job.description}</p>
        </div>
      </div>
    </Box>
  );
}

export default Job;
