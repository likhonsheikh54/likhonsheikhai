import { useEffect, useRef } from "react";
import { useAgent } from "@/hooks/use-agent";
import AppLayout from "@/components/layout/app-layout";
import ChatInput from "@/components/ai-chat/chat-input";
import AgentMessage from "@/components/ai-chat/agent-message";
import UserMessage from "@/components/ai-chat/user-message";
import CheckpointIndicator from "@/components/ai-chat/checkpoint-indicator";
import { MessageSquarePlus } from "lucide-react";

export default function Home() {
  const { messages, checkpoints, isLoading } = useAgent();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <AppLayout>
      {/* Chat Messages Container */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-6" id="message-container">
        {messages.length === 0 ? (
          // Welcome Message when no messages
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
              <MessageSquarePlus size={24} className="text-primary" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Welcome to Likhon Sheikh AI Coding Agent</h2>
            <p className="text-muted-foreground max-w-md mb-8">
              I'm your autonomous AI coding assistant specializing in full-stack development, Web3, and cybersecurity. Ask me anything to get started!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-lg">
              <div className="bg-dark-card p-3 rounded-md hover:bg-dark-card/80 cursor-pointer transition-colors">
                <div className="text-sm font-medium mb-1">Generate a React component</div>
                <div className="text-xs text-muted-foreground">Create a fully functional React component with TypeScript support</div>
              </div>
              <div className="bg-dark-card p-3 rounded-md hover:bg-dark-card/80 cursor-pointer transition-colors">
                <div className="text-sm font-medium mb-1">Setup API routes</div>
                <div className="text-xs text-muted-foreground">Create API endpoints with proper error handling and validation</div>
              </div>
              <div className="bg-dark-card p-3 rounded-md hover:bg-dark-card/80 cursor-pointer transition-colors">
                <div className="text-sm font-medium mb-1">Explain code concepts</div>
                <div className="text-xs text-muted-foreground">Get detailed explanations of complex programming concepts</div>
              </div>
              <div className="bg-dark-card p-3 rounded-md hover:bg-dark-card/80 cursor-pointer transition-colors">
                <div className="text-sm font-medium mb-1">Review and debug code</div>
                <div className="text-xs text-muted-foreground">Find and fix bugs in your existing code</div>
              </div>
            </div>
          </div>
        ) : (
          // Display chat history
          <>
            {messages.map((message, index) => (
              <div key={message.id}>
                {message.role === "user" ? (
                  <UserMessage message={message} />
                ) : (
                  <AgentMessage 
                    message={message} 
                    isTyping={isLoading && index === messages.length - 1} 
                  />
                )}
                
                {/* Show checkpoint after agent messages */}
                {checkpoints.some(cp => cp.afterMessageId === message.id) && message.role === "assistant" && (
                  <CheckpointIndicator 
                    id={checkpoints.find(cp => cp.afterMessageId === message.id)!.id}
                    timestamp={checkpoints.find(cp => cp.afterMessageId === message.id)!.timestamp}
                    className="mt-1"
                  />
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
      
      {/* Chat Input */}
      <ChatInput />
    </AppLayout>
  );
}
