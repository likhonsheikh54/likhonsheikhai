import { useState, useEffect } from "react";
import { Bot } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Message } from "@/lib/types";
import CodeBlock from "./code-block";
import ImplementationPlan from "./implementation-plan";
import { AnimatePresence, motion } from "framer-motion";

interface AgentMessageProps {
  message: Message;
  isTyping?: boolean;
}

export default function AgentMessage({ message, isTyping = false }: AgentMessageProps) {
  const [content, setContent] = useState(isTyping ? "" : message.content);
  const [isCodeBlock, setIsCodeBlock] = useState(false);
  const [isPlan, setIsPlan] = useState(false);

  // Process content to detect code blocks and implementation plans
  useEffect(() => {
    if (message.content) {
      setIsCodeBlock(message.content.includes("```"));
      setIsPlan(message.content.toLowerCase().includes("implementation plan"));
    }
  }, [message.content]);

  // Simulate typing effect when isTyping is true
  useEffect(() => {
    if (isTyping && message.content) {
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < message.content.length) {
          setContent(message.content.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, 30);

      return () => clearInterval(typingInterval);
    } else {
      setContent(message.content);
    }
  }, [isTyping, message.content]);

  const renderContent = () => {
    if (isCodeBlock) {
      return <CodeBlock content={content} />;
    } else if (isPlan) {
      return <ImplementationPlan content={content} />;
    } else {
      return (
        <div 
          className={cn(
            "prose prose-sm prose-invert max-w-none",
            isTyping && "typing-animation"
          )}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <AnimatePresence>
        <motion.div 
          className="flex items-start space-x-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-8 h-8 rounded bg-primary flex-shrink-0 flex items-center justify-center">
            <Bot size={18} className="text-white" />
          </div>
          <div className="flex-1">
            <Card className="bg-dark-card text-foreground rounded-lg p-4 shadow-lg">
              {renderContent()}
            </Card>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
