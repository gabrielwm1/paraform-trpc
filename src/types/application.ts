export type ApplicationPayload = {
  job_id: number;
  //   answers: [{ question: string; answer: string }];
  //   attachments?: [Attachment];
};

export type Application = {
  id: number;
  candidate_id: number;
  prospect: boolean;
  applied_at: string; // ISO 8601 date string
  rejected_at: string; // ISO 8601 date string
  last_activity_at: string; // ISO 8601 date string
  location: string | null;
  attachments: Attachment[]; // Define the `Attachment` type if you have details
  source: {
    id: number;
    public_name: string;
  };
  credited_to: string | null;
  rejection_reason: {
    id: number;
    name: string;
    type: {
      id: number;
      name: string;
    };
  };
  rejection_details: RejectionDetails; // Define the `RejectionDetails` type if you have details
  jobs: Job[];
  job_post_id: number | null;
  status: string; // Consider using a union type if there are predefined statuses
  current_stage: {
    id: number;
    name: string;
  };
  answers: Answer[]; // Define the `Answer` type if you have details
  prospective_department: string | null;
  prospective_office: string | null;
  prospect_detail: {
    prospect_pool: string | null;
    prospect_stage: string | null;
    prospect_owner: string | null;
  };
};

// Define the `Attachment` type if known
type Attachment = {
  id: number; // Replace with actual properties if known
  file_name: string;
  file_type: string;
  url: string;
};

// Define the `RejectionDetails` type if known
type RejectionDetails = {
  reason: string; // Replace with actual properties if known
};

// Define the `Job` type
type Job = {
  id: number;
  name: string;
};

// Define the `Answer` type if known
type Answer = {
  question_id: number; // Replace with actual properties if known
  response: string;
};
