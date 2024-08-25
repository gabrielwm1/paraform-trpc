//this page displays the job information

import { ApplicationForm } from "@/components/candidates";
import { JobCard } from "@/components/jobs/JobCard";
import { JobDetails } from "@/components/jobs/JobDetails";
import { api } from "@/trpc/server";
import { Job } from "@/types/jobs";

export default async function JobPage({
  params: { jobId },
}: {
  params: { jobId: string };
}) {
  const job: Job | undefined = await api.jobs.getJobById(jobId);

  if (job) {
    return (
      <div className="my-10 space-y-8">
        <JobCard job={job} />
        <JobDetails jobId={jobId} />
        <ApplicationForm job={job} />
      </div>
    );
  }
}
