import { Terminal, MessageSquareDot, X, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function Sidebar({ open, onClose, className, style }: SidebarProps) {
  const chatHistory = [
    { id: '1', title: 'AI Coding Agent Chat', active: true },
    { id: '2', title: 'Web Scraper Project', active: false },
    { id: '3', title: 'React Component Library', active: false },
  ];

  return (
    <div 
      className={cn(
        "w-64 bg-dark-surface border-r border-dark-border flex flex-col",
        className
      )}
      style={style}
    >
      {/* Logo Area */}
      <div className="h-14 px-4 flex items-center border-b border-dark-border">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
            <Terminal size={16} className="text-white" />
          </div>
          <span className="font-semibold text-foreground">Likhon AI Agent</span>
        </div>
        
        <div className="ml-auto flex items-center space-x-1">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground p-1.5 h-7 w-7">
            <Terminal size={14} />
          </Button>
          {onClose && (
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground md:hidden p-1.5 h-7 w-7" onClick={onClose}>
              <X size={14} />
            </Button>
          )}
        </div>
      </div>
      
      {/* Chat History */}
      <div className="flex-1 overflow-y-auto scrollbar-thin py-4 space-y-1">
        <div className="px-2">
          <div className="text-xs uppercase text-muted-foreground font-medium px-3 mb-2">Recent Chats</div>
          
          <div className="px-2 space-y-1">
            {chatHistory.map((chat) => (
              <div 
                key={chat.id}
                className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-md",
                  chat.active 
                    ? "bg-primary/20 text-foreground" 
                    : "hover:bg-dark-card text-muted-foreground"
                )}
              >
                <MessageSquareDot size={16} className={chat.active ? "text-primary" : "text-muted-foreground"} />
                <div className="flex-1 truncate">
                  <span>{chat.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* User Profile */}
      <div className="h-14 px-4 flex items-center border-t border-dark-border">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-sm font-medium text-white">LS</span>
          </div>
          <span className="text-sm text-muted-foreground">Likhon Sheikh</span>
        </div>
        <Button variant="ghost" size="icon" className="ml-auto text-muted-foreground hover:text-foreground p-1.5 h-7 w-7">
          <Settings size={14} />
        </Button>
      </div>
    </div>
  );
}
