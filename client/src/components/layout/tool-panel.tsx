import { X, Code, Edit, Terminal, Camera, Brain, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ToolPanelProps {
  open?: boolean;
  onClose?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

export default function ToolPanel({ open, onClose, className, style }: ToolPanelProps) {
  const tools: Tool[] = [
    {
      id: "code-generation",
      name: "Code Generation",
      description: "Generate code snippets or complete files",
      icon: <Code className="text-primary" size={16} />,
    },
    {
      id: "code-editing",
      name: "Code Editing",
      description: "Suggest edits to existing code",
      icon: <Edit className="text-primary" size={16} />,
    },
    {
      id: "shell-commands",
      name: "Shell Commands",
      description: "Execute shell commands",
      icon: <Terminal className="text-primary" size={16} />,
    },
    {
      id: "screenshot",
      name: "Take Screenshot",
      description: "Capture the current interface state",
      icon: <Camera className="text-primary" size={16} />,
    },
    {
      id: "extended-thinking",
      name: "Extended Thinking",
      description: "Perform complex reasoning tasks",
      icon: <Brain className="text-primary" size={16} />,
    },
    {
      id: "deep-search",
      name: "Deep Search",
      description: "Research specific topics in depth",
      icon: <Search className="text-primary" size={16} />,
    },
  ];

  const useTool = (toolId: string) => {
    console.log(`Using tool: ${toolId}`);
    // Additional logic for tool usage
  };

  return (
    <div
      className={cn(
        "w-80 border-l border-dark-border bg-dark-surface h-full overflow-y-auto scrollbar-thin",
        className
      )}
      style={style}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-foreground">Available Tools</h3>
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-foreground p-1.5"
              onClick={onClose}
            >
              <X size={16} />
            </Button>
          )}
        </div>
        
        <div className="space-y-3">
          {tools.map((tool) => (
            <div key={tool.id} className="bg-dark-card rounded-md p-3">
              <div className="flex items-center space-x-2 mb-2">
                {tool.icon}
                <span className="text-sm font-medium text-foreground">{tool.name}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{tool.description}</p>
              <div className="border-t border-dark-border pt-2">
                <Button
                  variant="ghost"
                  className="w-full text-left px-2 py-1.5 text-xs rounded hover:bg-dark-surface text-primary justify-start"
                  onClick={() => useTool(tool.id)}
                >
                  Use Tool
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
