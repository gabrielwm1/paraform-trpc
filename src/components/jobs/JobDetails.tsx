"use client";
import { api } from "@/trpc/react";
import { Text } from "../common";

interface JobDetailProps {
  jobId: string;
}
export function JobDetails({ jobId }: JobDetailProps) {
  const [data] = api.jobs.getJobPostById.useSuspenseQuery(jobId);
  // assume its a 1:1 relationship for now, thought its 1:many job to jobPost
  const jobPost = data?.[0];
  if (!jobPost) {
    return <Text>No Job Post Available for this Role</Text>;
  }
  return (
    <>
      <div className="flex flex-col space-y-2">
        <Text size="xl" weight="bold">
          About this Role
        </Text>
        <Text size="base" weight="light">
          {jobPost?.content}
        </Text>
      </div>

      <div className="flex flex-col space-y-2">
        <Text size="xl" weight="bold">
          What we look for
        </Text>
        <Text weight="light">
          We are cultivating the thing that no one can touch.
        </Text>
        <Text weight="light">
          {`It's those
            aha moments that make life worth living, that someone says "I finally get
            it. It's just so simple, so great, it's so real."`}
        </Text>
        <Text weight="light">
          We are looking for somone who will execute and create this experience
          for our customers end to end.{" "}
        </Text>
        <Text weight="light">
          Ideal candidates are self driven, self motivated, lead with a great
          deal of empathy, a collaborative spirit, and simply love what they do.{" "}
        </Text>
      </div>
      <div className="flex flex-col space-y-2">
        <Text size="xl" weight="bold">
          Roles and Responsibiliies
        </Text>
        <Text size="base" weight="light">
          • Make the sauce
        </Text>
        <Text size="base" weight="light">
          • Sell the sauce
        </Text>
        <Text size="base" weight="light">
          • Improve the sauce{""}
        </Text>
      </div>
      <div className="flex flex-col space-y-4">
        <Text size="xl" weight="bold">
          Apply for this role
        </Text>
      </div>
    </>
  );
}
