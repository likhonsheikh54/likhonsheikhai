import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAgent } from '@/hooks/use-agent';

interface ImplementationPlanProps {
  content: string;
}

interface PlanStep {
  id: number;
  text: string;
  completed: boolean;
}

export default function ImplementationPlan({ content }: ImplementationPlanProps) {
  const [steps, setSteps] = useState<PlanStep[]>([]);
  const [approved, setApproved] = useState(false);
  const { approvePlan } = useAgent();

  useEffect(() => {
    // Extract plan steps from content
    const planRegex = /implementation plan/i;
    if (planRegex.test(content)) {
      const listItemRegex = /-\s+(.*?)(?=\n-|\n\n|$)/gs;
      const matches = [...content.matchAll(listItemRegex)];
      
      if (matches.length > 0) {
        const extractedSteps = matches.map((match, index) => ({
          id: index,
          text: match[1].trim(),
          completed: true // Assuming completed since this is already in the plan
        }));
        setSteps(extractedSteps);
      } else {
        // Fallback if no list items are found
        const sentences = content.split(/\.\s+/);
        const extractedSteps = sentences
          .filter(s => s.trim().length > 10)
          .map((sentence, index) => ({
            id: index,
            text: sentence.trim(),
            completed: true
          }));
        setSteps(extractedSteps);
      }
    }
  }, [content]);

  const handleApprovePlan = () => {
    setApproved(true);
    approvePlan();
  };

  if (steps.length === 0) {
    return null;
  }

  return (
    <div className="bg-dark-surface rounded-md p-3 mb-4">
      <div className="text-sm font-medium text-foreground mb-2">Implementation Plan</div>
      <div className="space-y-2">
        {steps.map((step) => (
          <div key={step.id} className="flex items-start">
            <div className="w-5 h-5 rounded-md bg-primary/20 flex items-center justify-center mr-2 mt-0.5">
              <Check size={14} className="text-primary" />
            </div>
            <div className="text-sm text-muted-foreground">
              {step.text}
            </div>
          </div>
        ))}
      </div>
      
      {!approved && (
        <div className="border-t border-dark-border mt-3 pt-3 flex justify-end">
          <Button 
            onClick={handleApprovePlan}
            className="px-3 py-1 bg-primary hover:bg-primary/90 text-white text-sm rounded-md"
          >
            Plan approved. Let's get started!
          </Button>
        </div>
      )}
    </div>
  );
}
