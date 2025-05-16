import { cn } from "@/lib/utils";

interface TypingIndicatorProps {
  className?: string;
}

export default function TypingIndicator({ className }: TypingIndicatorProps) {
  return (
    <div className={cn("typing-indicator p-4 bg-secondary", className)}>
      <span className="bg-primary"></span>
      <span className="bg-primary"></span>
      <span className="bg-primary"></span>
    </div>
  );
}
