import { z } from "zod";

const EmailAddressSchema = z.object({
  type: z.union([z.literal("personal"), z.literal("work"), z.literal("other")]),
  value: z.string().email(),
});

const WebsiteAddressSchema = z.object({
  type: z.union([
    z.literal("personal"),
    z.literal("company"),
    z.literal("portfolio"),
    z.literal("blog"),
    z.literal("other"),
  ]),
  url: z.string().url(),
});

export const CandidatePayloadSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  company: z.string().optional(),
  phone_numbers: z
    .array(
      z.object({
        value: z.string(),
        type: z.string(),
      }),
    )
    .optional(),
  title: z.string().optional(),
  email_addresses: z.array(EmailAddressSchema).optional(),
  website_addresses: z.array(WebsiteAddressSchema).optional(),
  tags: z.array(z.string()).optional(),
  applications: z.array(
    z.object({
      job_id: z.number(),
    }),
  ),
});

export type CandidatePayload = z.infer<typeof CandidatePayloadSchema>;
