"use client";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/common";
import { api } from "@/trpc/react";
import { CandidatePayload } from "@/types/candidate";
import { Job } from "@/types/jobs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ApplicationFormProps {
  job: Job;
}

const formSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  resume: z.any(),
  coverletter: z.any(),
});

export function ApplicationForm({ job }: ApplicationFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      email: "",
    },
  });

  const { getValues } = form;
  //  we need to construct a ts interface out of the questions property within jobPost with the react hook form validation
  // for now the formSchema is set to the known and expected kinds of questions
  const resumeFileRef = form.register("resume");
  const coverLetterRef = form.register("coverletter");

  const createCandidate = api.candidates.create.useMutation({
    onSuccess: async (candidate) => {
      console.log(candidate, "RESOURCE CREATED");

      const applicationId = candidate?.applications[0];
      // extract resume and cover letter from refs
      // convert them to base 64
      // add these attachements

      // await addAttachemnt({
      //   application_id: application_id,
      //   attachmentPayload: {
      //     content: base64SFileString,
      //     type: "resume",
      //     filename: values.resume[0]?.name,
      //     content_type: values.resume[0].type,
      //   },
      // });
    },
    onError: (error) => {
      console.log(error, "ERROR");
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const candidatePayload: CandidatePayload = {
      first_name: values.first_name,
      last_name: values.last_name,
      title: job.name,
      phone_numbers: [
        {
          type: "mobile",
          value: values.phone,
        },
      ],
      email_addresses: [{ type: "personal", value: values.email }],

      applications: [
        {
          job_id: job.id,
        },
      ],
    };
    console.log(JSON.stringify(candidatePayload));

    createCandidate.mutate(candidatePayload);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* todo: programattically render a form based on the questions an application has, and allow this to have propper error handling  */}

        {/* {questions.map((question, index) => (
          <FormField
            key={index}
            control={form.control}
            name={question.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{question.label}</FormLabel>
                <FormControl>
                  {question.type === "short_text" ? (
                    <Input
                      placeholder={question.description || ""}
                      {...field}
                      type={question.type}
                    />
                  ) : question.type === "attachment" ? (
                    <Input
                      placeholder={question.description || ""}
                      {...field}
                      type="file"
                    />
                  ) : null}
                </FormControl>
              </FormItem>
            )}
          />
        ))} */}

        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="resume"
          render={() => (
            <FormItem>
              <FormLabel>Resume</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  placeholder=""
                  className="text-sm"
                  {...resumeFileRef}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="coverletter"
          render={() => (
            <FormItem>
              <FormLabel>Cover Letter</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  placeholder=""
                  className="text-sm"
                  {...coverLetterRef}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={createCandidate.isPending}>
          {createCandidate.isPending ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
