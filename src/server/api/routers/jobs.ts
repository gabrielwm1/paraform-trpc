import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { getJobs } from "@/handlers/listJobPosts";
import { z } from "zod";
import { getJobById } from "@/handlers/getJobById";
import { getJobPostById } from "@/handlers/getJobPostById";

export const jobsRouter = createTRPCRouter({
  getJobById: publicProcedure.input(z.string()).query(async ({ input }) => {
    const job = await getJobById(input);
    return job;
  }),

  getJobPostById: publicProcedure.input(z.string()).query(async ({ input }) => {
    const job = await getJobPostById(input);
    return job;
  }),

  getJobs: publicProcedure.query(async () => {
    const jobs = await getJobs();
    return jobs;
  }),
});
