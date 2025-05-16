import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useChat } from "@/hooks/use-chat";

export default function PlanApproval() {
  const { approvePlan, suggestChanges } = useChat();

  return (
    <div className="mt-4 flex items-center gap-2">
      <Button onClick={approvePlan} className="px-3 py-1 text-sm h-auto">
        Proceed with plan
      </Button>
      <Button
        variant="secondary"
        onClick={suggestChanges}
        className="px-3 py-1 text-sm h-auto"
      >
        Suggest changes
      </Button>
    </div>
  );
}
