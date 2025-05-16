import { Button } from "@/components/ui/button";
import { Rocket, Plug, Database } from "lucide-react";

export default function ActionButtons() {
  return (
    <div className="flex flex-wrap gap-3 mt-8">
      <Button size="lg" className="gap-2">
        <Rocket className="h-4 w-4" />
        Deploy
      </Button>
      
      <Button size="lg" variant="outline" className="gap-2">
        <Plug className="h-4 w-4" />
        Connect to Supabase
      </Button>
      
      <Button size="lg" variant="outline" className="gap-2">
        <Database className="h-4 w-4" />
        Export
      </Button>
    </div>
  );
}