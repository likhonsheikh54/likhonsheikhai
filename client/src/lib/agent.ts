export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface AgentRequest {
  messages: Message[];
  provider?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface AgentResponse {
  content: string;
}

export interface ErrorResponse {
  error: {
    message: string;
  };
}

// Default system message for the agent
export const AGENT_SYSTEM_MESSAGE = `You are Likhon Sheikh, an autonomous AI coding agent specialized in full-stack development, Web3, and cybersecurity. You can use special tools to assist users with their development tasks.

Available tools:
1. <generateCode>...</generateCode> - Generate code snippets or complete files
2. <editCode path="file/path">...</editCode> - Suggest edits to existing code
3. <runShell>...</runShell> - Execute shell commands
4. <takeScreenshot/> - Capture the current interface state
5. <ExtendThinking>...</ExtendThinking> - Perform complex reasoning tasks
6. <DeepSearch>...</DeepSearch> - Research specific topics in depth

When using these tools, wrap your commands in the appropriate tags. Format your responses in Markdown with proper syntax highlighting for code blocks. Always provide detailed explanations and follow best practices.`;

export async function sendAgentRequest(request: AgentRequest): Promise<AgentResponse> {
  try {
    // Ensure system message is included
    let messages = [...request.messages];
    if (messages.length === 0 || messages[0].role !== "system") {
      messages = [
        { role: "system", content: AGENT_SYSTEM_MESSAGE },
        ...messages,
      ];
    }

    const response = await fetch("/api/agent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages,
        provider: request.provider || "groq",
        model: request.model,
        temperature: request.temperature || 0.14,
        maxTokens: request.maxTokens || 2048,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json() as ErrorResponse;
      throw new Error(errorData.error?.message || "Failed to communicate with agent");
    }

    return await response.json() as AgentResponse;
  } catch (error) {
    console.error("Error in agent request:", error);
    throw error;
  }
}

export async function streamAgentResponse(
  request: AgentRequest,
  onUpdate: (chunk: string) => void
): Promise<AgentResponse> {
  try {
    // Ensure system message is included
    let messages = [...request.messages];
    if (messages.length === 0 || messages[0].role !== "system") {
      messages = [
        { role: "system", content: AGENT_SYSTEM_MESSAGE },
        ...messages,
      ];
    }

    const response = await fetch("/api/agent/stream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages,
        provider: request.provider || "groq",
        model: request.model,
        temperature: request.temperature || 0.14,
        maxTokens: request.maxTokens || 2048,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json() as ErrorResponse;
      throw new Error(errorData.error?.message || "Failed to communicate with agent");
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error("Stream not available");
    }

    let content = "";
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      
      if (done) {
        break;
      }
      
      const chunk = decoder.decode(value);
      content += chunk;
      onUpdate(chunk);
    }

    return { content };
  } catch (error) {
    console.error("Error in streaming agent request:", error);
    throw error;
  }
}
