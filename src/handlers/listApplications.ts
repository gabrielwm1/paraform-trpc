// this function retrieves all jobs for the dashboard

import { Application } from "@/types/application";

export async function listApplications() {
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
      "https://harvest.greenhouse.io/v1/applications",
      requestOptions,
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result: Application[] = (await response.json()) as Application[];
    return result;
  } catch (error) {
    console.error("Error fetching job posts:", error);
  }
}
