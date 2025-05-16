import { Share, Copy, RotateCcw, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function CodeActions() {
  const [saved, setSaved] = useState(false);
  
  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      <Button
        variant="secondary"
        size="sm"
        className="px-3 py-1 h-auto flex items-center gap-1"
      >
        <Share className="h-4 w-4" />
        Share
      </Button>
      <Button
        variant="secondary"
        size="sm"
        className="px-3 py-1 h-auto flex items-center gap-1"
      >
        <Copy className="h-4 w-4" />
        Copy code
      </Button>
      <Button
        variant="secondary"
        size="sm"
        className="px-3 py-1 h-auto flex items-center gap-1"
      >
        <RotateCcw className="h-4 w-4" />
        Regenerate
      </Button>
      <Button
        onClick={handleSave}
        size="sm"
        className="px-3 py-1 h-auto flex items-center gap-1"
      >
        {saved ? (
          <Check className="h-4 w-4" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
        {saved ? "Saved" : "Save to workspace"}
      </Button>
    </div>
  );
}
