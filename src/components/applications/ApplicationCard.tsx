import { Application } from "@/types/application";
import { Text } from "../common";

interface ApplicationCardProps {
  application: Application;
}

export function ApplicationCard({ application }: ApplicationCardProps) {
  return (
    <div className="bg-muted flex flex-col space-y-2 rounded-lg p-4">
      <Text font="mono" className="text-muted-foreground">
        Role
      </Text>
      <Text font="sans">{application.jobs[0]?.name}</Text>
      <Text font="mono" className="text-muted-foreground">
        Candidate ID
      </Text>
      <Text font="mono">{application.candidate_id}</Text>
      <Text font="mono" className="text-muted-foreground">
        Status
      </Text>
      <Text>{application.status}</Text>
    </div>
  );
}
