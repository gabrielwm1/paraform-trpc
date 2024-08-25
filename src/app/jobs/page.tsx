import { Text } from "@/components/common";
import { RoleCard } from "@/components/common/RoleCard";
import { api } from "@/trpc/server";
import Link from "next/link";

export default async function Page() {
  const jobs = await api.jobs.getJobs();

  if (jobs) {
    return (
      <main className="mx-auto mt-10 flex h-full w-full max-w-sm flex-col items-center justify-center space-y-4">
        <Text size="2xl" font="mono">
          Open Roles
        </Text>
        {jobs?.map((job) => {
          return (
            <Link
              className="w-full"
              key={job.id}
              href={{
                pathname: `/jobs/${job.id}`,
              }}
            >
              <RoleCard>{job.name}</RoleCard>
            </Link>
          );
        })}
      </main>
    );
  }
}
