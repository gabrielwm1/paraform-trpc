import { getApplicationById } from "@/handlers/getApplicationById";
import { listApplications } from "@/handlers/listApplications";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const applicationsRouter = createTRPCRouter({
  getApplicationById: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const application = await getApplicationById(input);
      return application;
    }),

  getApplications: publicProcedure.query(async () => {
    const applications = await listApplications();
    return applications;
  }),
});
