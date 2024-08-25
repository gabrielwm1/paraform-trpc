// this function retrieves all jobs for the dashboard

import { Job } from "@/types/jobs";

export async function getJobs() {
  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Basic ${process.env.NEXT_PUBLIC_GREENHOUSE_API_KEY}`,
  );
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const response = await fetch(
      "https://harvest.greenhouse.io/v1/jobs",
      requestOptions,
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result: Job[] = (await response.json()) as Job[];
    return result;
  } catch (error) {
    console.error("Error fetching job posts:", error);
  }
}
