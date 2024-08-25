import { Text } from "@/components/common";
import { RoleCard } from "@/components/common/RoleCard";
import { api } from "@/trpc/server";
import Link from "next/link";

export default async function Page() {
  const applications = await api.applications.getApplications();

  if (applications) {
    return (
      <main className="mx-auto mt-10 flex h-full w-full max-w-sm flex-col items-center justify-center space-y-4">
        <Text size="2xl" font="mono">
          Applications
        </Text>
        {applications?.map((application) => {
          return (
            <Link
              className="w-full"
              key={application.id}
              href={{
                pathname: `/applications/${application.id}`,
              }}
            >
              <RoleCard>{application.jobs[0]?.name}</RoleCard>
            </Link>
          );
        })}
      </main>
    );
  }
}
