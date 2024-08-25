import Link from "next/link";
import { api, HydrateClient } from "@/trpc/server";
import { NavigationCard, Text } from "@/components/common";

export default async function Home() {
  const jobs = await api.jobs.getJobs();
  console.log(jobs, "from nextjs app");

  return (
    <HydrateClient>
      <main className="container mx-auto mt-10 flex h-full w-full flex-col items-center justify-center space-y-4">
        <Text
          as="h1"
          size="2xl"
          className="text-center lg:text-3xl"
          font="mono"
        >
          Welcome to Gabe&apos;s Amazing kitchen
        </Text>
        <Text as="h2" font="mono">
          Home of the Realest Sauce
        </Text>
        <Link href="/jobs" passHref className="w-full lg:w-1/4">
          <NavigationCard text="Open Roles" />
        </Link>
        <Link href="/applications" passHref className="w-full lg:w-1/4">
          <NavigationCard text="Applications" />
        </Link>
      </main>
    </HydrateClient>
  );
}
