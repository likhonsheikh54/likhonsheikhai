import { Check, Share, Copy, RotateCcw } from "lucide-react";
import { CodeBlock } from "@/components/ui/code-block";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import TypingIndicator from "./TypingIndicator";
import PlanApproval from "./PlanApproval";
import CodeActions from "./CodeActions";
import { Message } from "@/lib/agent";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: Message;
  isLastMessage?: boolean;
}

export default function ChatMessage({ message, isLastMessage = false }: ChatMessageProps) {
  const isUser = message.role === "user";
  const hasPlan = message.content.includes("Here's my plan:") && !isUser;
  const hasCode = message.content.includes("```") && !isUser;
  
  // Extract code blocks if present
  const [codeBlocks, setCodeBlocks] = useState<{code: string, filename?: string}[]>(() => {
    if (!hasCode) return [];
    
    const codeBlockRegex = /```(?:(\w+)\s*(?:\n)?)?([\s\S]*?)```/g;
    const filenameRegex = /(\S+\.\w+)/;
    let match;
    const blocks = [];
    
    let content = message.content;
    while ((match = codeBlockRegex.exec(content)) !== null) {
      const lang = match[1] || "typescript";
      const code = match[2].trim();
      
      // Try to extract filename from preceding text
      let filename;
      const lines = content.substring(0, match.index).split('\n');
      for (let i = lines.length - 1; i >= 0; i--) {
        const fileMatch = filenameRegex.exec(lines[i]);
        if (fileMatch) {
          filename = fileMatch[1];
          break;
        }
      }
      
      blocks.push({ code, filename });
    }
    
    return blocks;
  });
  
  // Render content (excluding code blocks for agent messages)
  const renderContent = () => {
    if (isUser) {
      return message.content;
    } else {
      if (hasCode) {
        // Replace code blocks with empty string
        let contentWithoutCode = message.content.replace(/```(?:\w+\s*(?:\n)?)?[\s\S]*?```/g, "");
        return contentWithoutCode;
      }
      return message.content;
    }
  };
  
  return (
    <div className={cn(
      "flex items-start gap-2 sm:gap-3 mb-4 md:mb-6",
      isUser ? "max-w-[95%] sm:max-w-3xl ml-auto" : "max-w-[95%] sm:max-w-3xl"
    )}>
      {!isUser && (
        <Avatar className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center">
          <AvatarFallback>LS</AvatarFallback>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Avatar>
      )}
      
      <div className={cn("flex-1", isUser && "order-2")}>
        {isUser ? (
          <div className="bg-primary/20 rounded-2xl rounded-tr-sm px-3 py-2 sm:px-4 sm:py-2 inline-block">
            <p className="text-sm sm:text-base">{message.content}</p>
            <div className="text-xs opacity-70 text-right select-none mt-1">
              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ) : (
          <div className="prose prose-xs sm:prose-sm dark:prose-invert max-w-none break-words">
            <div className="bg-muted/50 rounded-2xl rounded-tl-sm px-3 py-2 sm:px-4 sm:py-3">
              <p dangerouslySetInnerHTML={{ __html: renderContent().replace(/\n/g, '<br/>') }} />
              
              <div className="text-xs opacity-70 text-right select-none mt-1">
                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
            
            {hasPlan && <PlanApproval />}
            
            {/* Code blocks */}
            {codeBlocks.map((block, index) => (
              <div className="mt-3" key={index}>
                <CodeBlock 
                  code={block.code} 
                  filename={block.filename}
                >
                  {isLastMessage && index === codeBlocks.length - 1 && (
                    <TypingIndicator />
                  )}
                </CodeBlock>
              </div>
            ))}
            
            {isLastMessage && !hasCode && <TypingIndicator />}
            
            {/* Action buttons for agent messages with code */}
            {hasCode && <CodeActions />}
          </div>
        )}
      </div>
      
      {isUser && (
        <Avatar className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-muted flex-shrink-0 overflow-hidden order-1">
          <AvatarFallback>U</AvatarFallback>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-full text-muted-foreground"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
        </Avatar>
      )}
    </div>
  );
}
