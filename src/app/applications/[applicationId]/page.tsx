//this page displays the job information

import { ApplicationCard } from "@/components/applications";
import { ApplicationForm } from "@/components/candidates";
import { JobCard } from "@/components/jobs/JobCard";
import { JobDetails } from "@/components/jobs/JobDetails";
import { api } from "@/trpc/server";
import { Application } from "@/types/application";

export default async function ApplicationPage({
  params: { applicationId },
}: {
  params: { applicationId: string };
}) {
  const application: Application | undefined =
    await api.applications.getApplicationById(applicationId);

  if (application) {
    return (
      <div className="my-10 space-y-8">
        <ApplicationCard application={application} />
        {/* <JobCard job={job} />
        <JobDetails jobId={jobId} />
        <ApplicationForm job={job} /> */}
      </div>
    );
  }
}
