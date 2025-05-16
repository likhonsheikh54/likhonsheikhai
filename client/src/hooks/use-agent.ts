import { useContext } from "react";
import { AgentContext } from "@/contexts/agent-context";

export function useAgent() {
  const context = useContext(AgentContext);
  
  if (!context) {
    throw new Error("useAgent must be used within an AgentProvider");
  }
  
  return context;
}
