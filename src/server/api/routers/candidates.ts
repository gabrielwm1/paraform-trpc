import { createCandidate } from "@/handlers/createCandidate";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { CandidatePayloadSchema } from "@/types/candidate";

export const candidateRouter = createTRPCRouter({
  create: publicProcedure
    .input(CandidatePayloadSchema)
    .mutation(async ({ input }) => {
      const candidate = await createCandidate({ input });
      console.log(candidate);
      return candidate;
    }),
});
