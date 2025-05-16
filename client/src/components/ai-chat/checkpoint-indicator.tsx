import { Flag } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAgent } from "@/hooks/use-agent";

interface CheckpointIndicatorProps {
  id: string;
  timestamp: string;
  className?: string;
}

export default function CheckpointIndicator({ 
  id, 
  timestamp,
  className
}: CheckpointIndicatorProps) {
  const { rollbackToCheckpoint } = useAgent();
  
  // Format relative time
  const getRelativeTime = (timestamp: string) => {
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    
    const elapsed = Date.now() - new Date(timestamp).getTime();
    
    if (elapsed < msPerMinute) {
      return 'just now';
    } else if (elapsed < msPerHour) {
      const minutes = Math.round(elapsed / msPerMinute);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (elapsed < msPerDay) {
      const hours = Math.round(elapsed / msPerHour);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.round(elapsed / msPerDay);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  };
  
  const relativeTime = getRelativeTime(timestamp);
  
  const handleRollback = () => {
    rollbackToCheckpoint(id);
  };
  
  return (
    <div className={cn("max-w-2xl mx-auto px-4 py-2", className)}>
      <div className="flex items-center text-xs text-muted-foreground">
        <div className="flex items-center">
          <Flag size={14} className="mr-1.5 text-primary" />
          <span>Checkpoint made {relativeTime}</span>
        </div>
        <div className="ml-1.5 px-1.5 py-0.5 rounded bg-dark-surface text-xs">
          {id.substring(0, 8)}
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="ml-2 text-xs text-primary hover:text-primary/90"
          onClick={handleRollback}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3 w-3 mr-1"
          >
            <path d="M9 14 4 9l5-5" />
            <path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H10" />
          </svg>
          <span>Rollback to here</span>
        </Button>
      </div>
    </div>
  );
}
