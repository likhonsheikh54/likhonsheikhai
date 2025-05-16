import { Message } from "@/lib/types";
import { AgentMessage } from "./agent-message";
import { UserMessage } from "./user-message";

interface ChatMessageProps {
  message: Message;
  isTyping?: boolean;
}

export default function ChatMessage({ message, isTyping = false }: ChatMessageProps) {
  if (message.role === "user") {
    return <UserMessage message={message} />;
  }
  
  return <AgentMessage message={message} isTyping={isTyping} />;
}
