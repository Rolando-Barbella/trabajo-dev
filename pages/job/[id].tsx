import { withSSRContext } from "aws-amplify";
import { getJob } from "../../src/graphql/queries";
import Location from "@mui/icons-material/PlaceOutlined";

import { Box } from "@mui/material";
import { useRouter } from "next/router";
import CardMedia from "@mui/material/CardMedia";
import { Job } from "../../src/API";

export async function getServerSideProps(context: {query: {id: string}}) {
  let SSR = withSSRContext();
  let { data } = await SSR.API.graphql({ query: getJob, variables: { id: context.query.id } });
  if (!data) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      job: data?.getJob,
    },
  };
}
function Job({ job }: {job: Job}) {
  const Router = useRouter()
  return (
    <Box sx={{ }} className="pt-5">
      <div className="flex container">
        <CardMedia component="img" sx={{ width: 150, borderRadius: 2, maxHeight: 120 }} image={Router?.query?.logo as string} alt={job.companyName} />
        <div className="pl-4">
          <h2 className="font-medium text-xl">{job.title}</h2>
          <p className="text-sm">{job.companyName}</p>
          <div className="flex text-sm pt-1">
            <Location fontSize="small" />
            <p className="mr-2">{job.typeOfWork} - </p>
            <p>{job.timeZone}</p>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="pt-4">
          <p className="text-md font-semibold">Job description</p>
          <div dangerouslySetInnerHTML={{__html: job.description}} />
        </div>
      </div>
    </Box>
  );
}

export default Job;
