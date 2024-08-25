import { JobPost } from "@/types/jobPost";

export async function getJobPostById(id: string) {
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
      `https://harvest.greenhouse.io/v1/jobs/${id}/job_posts`,
      requestOptions,
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result: JobPost[] = (await response.json()) as JobPost[];
    return result;
  } catch (error) {
    console.error("Error fetching job posts:", error);
  }
}
