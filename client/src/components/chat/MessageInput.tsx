import { FormEvent, useRef, useEffect } from "react";
import { Paperclip, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MessageInputProps {
  input: string;
  onChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
  isLoading: boolean;
}

export default function MessageInput({ 
  input, 
  onChange, 
  onSubmit, 
  isLoading 
}: MessageInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const newHeight = Math.min(textarea.scrollHeight, 200);
      textarea.style.height = `${newHeight}px`;
    }
  }, [input]);

  // Handle textarea key events
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && input.trim()) {
        onSubmit(e);
      }
    }
  };

  return (
    <div className="border-t border-border p-3 sm:p-4 pb-6 md:pb-4">
      <form onSubmit={onSubmit} className="flex items-end gap-2">
        <div className="flex-1">
          <div className="relative">
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full resize-none rounded-lg sm:rounded-xl bg-secondary border border-muted focus:border-primary focus:ring focus:ring-primary/20 focus:outline-none px-3 py-2 sm:px-4 sm:py-3 pr-10 sm:pr-12 text-sm sm:text-base text-foreground placeholder-muted-foreground transition-all scroll-thin"
              placeholder="Ask a question or type '/' for commands..."
              style={{ minHeight: "42px", maxHeight: "200px" }}
              disabled={isLoading}
            />
            <div className="absolute right-2 bottom-1.5 sm:bottom-2">
              <Button 
                type="button" 
                variant="ghost" 
                size="icon"
                className="h-7 w-7 sm:h-8 sm:w-8 text-muted-foreground hover:text-foreground"
              >
                <Paperclip className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </div>
        </div>
        <Button
          type="submit"
          size="icon"
          className="h-9 w-9 sm:h-10 sm:w-10 rounded-full flex-shrink-0"
          disabled={isLoading || !input.trim()}
        >
          <Send className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </form>
      <div className="mt-2 px-1 sm:px-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
        <div className="flex items-center gap-1">
          <Button 
            type="button" 
            variant="ghost" 
            size="sm" 
            className="p-1 h-7 w-7 text-muted-foreground hover:text-foreground"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
            </svg>
          </Button>
          <Button 
            type="button" 
            variant="ghost" 
            size="sm"
            className="p-1 h-7 w-7 text-muted-foreground hover:text-foreground"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4a.5.5 0 01-.5-.5V6.613l3.776 3.769a1 1 0 001.367.04l1.952-1.697 3.535 3.356A.5.5 0 0116 11.5V14.5a.5.5 0 01-.5.5z" clipRule="evenodd" />
              <path d="M5.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
          </Button>
        </div>
        <p className="text-xs text-muted-foreground text-center sm:text-right">
          The agent may produce inaccurate information about people, places, or facts
        </p>
      </div>
    </div>
  );
}
