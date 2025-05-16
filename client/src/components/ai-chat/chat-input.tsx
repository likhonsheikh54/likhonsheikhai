import { useState, useRef, useEffect } from "react";
import { Paperclip, Code, Send, Braces, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAgent } from "@/hooks/use-agent";

export default function ChatInput() {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { sendMessage, isLoading } = useAgent();

  // Auto resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.min(scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    sendMessage(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-dark-border p-4">
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="relative">
            <div className="absolute top-3 left-3 text-muted-foreground">
              <Braces size={18} />
            </div>
            
            <textarea
              ref={textareaRef}
              className="w-full bg-dark-surface border border-dark-border rounded-lg py-3 pl-10 pr-20 text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              placeholder="Ask me anything..."
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
            
            <div className="absolute bottom-3 right-3 flex items-center space-x-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" type="button">
                      <Paperclip size={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Upload file</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" type="button">
                      <Code size={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Format code</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <Button 
                type="submit" 
                size="icon" 
                className="bg-primary hover:bg-primary/90 text-white rounded-md"
                disabled={isLoading || !input.trim()}
              >
                <Send size={18} />
              </Button>
            </div>
          </div>
          
          <div className="mt-2 px-2 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="text-xs rounded-md hover:bg-dark-surface text-muted-foreground hover:text-foreground">
                <Wand2 size={14} className="mr-1" />
                <span>Tools</span>
              </Button>
            </div>
            
            <div className="text-xs text-muted-foreground">
              <span>Messages are processed securely</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
