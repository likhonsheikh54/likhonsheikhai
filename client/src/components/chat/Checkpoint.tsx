import { User } from "lucide-react";

interface CheckpointProps {
  label: string;
}

export default function Checkpoint({ label }: CheckpointProps) {
  return (
    <div className="flex items-center gap-2 py-2 px-4 bg-secondary/50 rounded-lg max-w-max mx-auto">
      <User className="h-4 w-4 text-primary" />
      <span className="text-sm text-muted-foreground">
        Checkpoint created • <span className="text-primary">{label}</span>
      </span>
    </div>
  );
}
