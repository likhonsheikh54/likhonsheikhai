import { apiRequest } from "./queryClient";

interface MessageInput {
  role: "user" | "assistant" | "system";
  content: string;
}

interface AgentResponse {
  content: string;
}

/**
 * Sends messages to the agent API
 * @param messages Array of messages to send to the agent
 * @returns Promise with the agent's response
 */
export async function sendMessageToAgent(messages: MessageInput[]): Promise<AgentResponse> {
  try {
    const response = await apiRequest("POST", "/api/agent", {
      messages,
      provider: "groq", // Default provider
      model: "compound-beta", // Default model
      temperature: 0.14,
      maxTokens: 2048,
    });
    
    return await response.json();
  } catch (error) {
    console.error("Error calling agent API:", error);
    throw new Error("Failed to communicate with the AI agent");
  }
}

/**
 * Gets available AI models for a specific provider
 * @param provider The provider name (e.g., "groq", "openrouter")
 * @returns Promise with available models
 */
export async function getAvailableModels(provider: string): Promise<string[]> {
  try {
    const response = await apiRequest("GET", `/api/models?provider=${provider}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching available models:", error);
    throw new Error("Failed to fetch available models");
  }
}
