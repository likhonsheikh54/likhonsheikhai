import { useEffect, useRef } from "react";
import { useChat } from "@/hooks/use-chat";
import ChatMessage from "./ChatMessage";
import MessageInput from "./MessageInput";
import AgentToolCard from "./AgentToolCard";
import { Separator } from "@/components/ui/separator";

export default function ChatInterface() {
  const { messages, isLoading, input, setInput, handleSubmit, handleInputChange } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col max-h-screen overflow-hidden">
      {/* Chat messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scroll-thin">
        {/* Welcome message if no messages */}
        {messages.length === 0 && (
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/20 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-primary"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-2">Welcome to the Likhon Sheikh AI Coding Agent</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              I'm your autonomous AI coding assistant specialized in full-stack development, Web3, and cybersecurity. How can I help you today?
            </p>
            
            <Separator className="my-8 max-w-3xl mx-auto" />
            
            {/* Tool suggestion card */}
            <AgentToolCard />
          </div>
        )}

        {/* Render all messages */}
        {messages.map((message, index) => (
          <ChatMessage 
            key={index} 
            message={message} 
            isLastMessage={index === messages.length - 1 && isLoading}
          />
        ))}

        {/* Invisible element to scroll to */}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <MessageInput
        input={input}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}
