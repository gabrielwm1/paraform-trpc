import { CandidatePayload } from "@/types/candidate";

export async function createCandidate({ input }: { input: CandidatePayload }) {
  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Basic ${process.env.NEXT_PUBLIC_GREENHOUSE_API_KEY}`,
  );
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "On-Behalf-Of",
    `${process.env.NEXT_PUBLIC_GREENHOUSE_USER_ID}`,
  );

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ ...input }),
  };

  try {
    const response = await fetch(
      `https://harvest.greenhouse.io/v1/candidates`,
      requestOptions,
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result: CandidatePayload =
      (await response.json()) as CandidatePayload;
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error fetching job posts:", error);
  }
}
