import { useState, useCallback } from "react";
import { Message, sendAgentRequest, streamAgentResponse } from "@/lib/agent";
import { useToast } from "@/hooks/use-toast";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = useCallback((value: string) => {
    setInput(value);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!input.trim() || isLoading) return;
      
      const userMessage: Message = {
        role: "user",
        content: input,
        timestamp: new Date().toISOString(),
        id: `user-${Date.now()}`
      };
      
      // Add user message immediately
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsLoading(true);
      
      // Add an empty assistant message that will be updated
      const assistantMessageId = `assistant-${Date.now()}`;
      setMessages((prev) => [
        ...prev, 
        { 
          role: "assistant", 
          content: "",
          timestamp: new Date().toISOString(),
          id: assistantMessageId
        }
      ]);
      
      try {
        // Call the streaming endpoint
        let streamedContent = "";
        
        await streamAgentResponse(
          { messages: [...messages, userMessage] },
          (chunk) => {
            streamedContent += chunk;
            // Update the assistant message content as chunks come in
            setMessages((prev) => {
              const updatedMessages = [...prev];
              updatedMessages[updatedMessages.length - 1] = {
                role: "assistant",
                content: streamedContent,
              };
              return updatedMessages;
            });
          }
        );
      } catch (error) {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to communicate with agent",
          variant: "destructive",
        });
        
        // Update the empty assistant message with error info
        setMessages((prev) => {
          const updatedMessages = [...prev];
          updatedMessages[updatedMessages.length - 1] = {
            role: "assistant",
            content: "I'm sorry, I encountered an error while processing your request. Please try again.",
          };
          return updatedMessages;
        });
      } finally {
        setIsLoading(false);
      }
    },
    [input, isLoading, messages, toast]
  );

  // Handler for plan approval
  const approvePlan = useCallback(() => {
    const approvalMessage = "I approve this plan. Please proceed.";
    setInput(approvalMessage);
    setMessages((prev) => [
      ...prev,
      { role: "user", content: approvalMessage },
    ]);
    
    // Simulate submit event
    handleSubmit(new Event("submit") as unknown as React.FormEvent);
  }, [handleSubmit]);

  // Handler for suggesting changes to plan
  const suggestChanges = useCallback(() => {
    const suggestMessage = "I'd like to suggest some changes to the plan.";
    setInput(suggestMessage);
  }, []);

  return {
    messages,
    isLoading,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    approvePlan,
    suggestChanges,
  };
}
