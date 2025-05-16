import { Menu, Share, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TopNavProps {
  onSidebarToggle: () => void;
  onToolsToggle: () => void;
}

export default function TopNav({ onSidebarToggle, onToolsToggle }: TopNavProps) {
  return (
    <div className="h-14 border-b border-dark-border flex items-center px-4">
      <Button 
        variant="ghost" 
        size="icon" 
        className="md:hidden text-muted-foreground hover:text-foreground"
        onClick={onSidebarToggle}
      >
        <Menu size={18} />
      </Button>
      
      <div className="flex items-center space-x-2 mx-4">
        <span className="text-primary font-semibold">AI Coding Agent</span>
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs">
          Active
        </Badge>
      </div>
      
      <div className="ml-auto flex items-center space-x-3">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-muted-foreground hover:text-foreground" 
          title="Share"
        >
          <Share size={18} />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-muted-foreground hover:text-foreground" 
          title="Settings"
        >
          <Settings size={18} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground md:hidden"
          onClick={onToolsToggle}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          </svg>
        </Button>
      </div>
    </div>
  );
}
