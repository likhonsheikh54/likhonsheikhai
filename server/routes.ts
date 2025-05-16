import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Agent API endpoint
  app.post("/api/agent", async (req, res) => {
    try {
      const { messages, provider = "groq", model, temperature = 0.14, maxTokens = 2048 } = req.body;
      
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: { message: "Messages array is required" } });
      }
      
      // Process the request based on provider
      // This is a simplified version - in a real application, 
      // you would actually call the AI provider APIs
      const responseContent = generateMockResponse(messages);
      
      // Return the generated text with a small delay to simulate network request
      setTimeout(() => {
        res.json({ content: responseContent });
      }, 1000);
      
    } catch (error: any) {
      console.error("Error in agent API:", error);
      res.status(500).json({ 
        error: { message: error.message || "An error occurred during agent processing" }
      });
    }
  });
  
  // Get available models endpoint
  app.get("/api/models", (req, res) => {
    const { provider } = req.query;
    
    if (!provider) {
      return res.status(400).json({ error: { message: "Provider parameter is required" } });
    }
    
    // Return mock models based on provider
    const models = getModelsForProvider(provider as string);
    res.json(models);
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Helper function to generate mock responses - would be replaced with actual AI calls
function generateMockResponse(messages: any[]): string {
  const lastMessage = messages[messages.length - 1];
  
  if (!lastMessage || !lastMessage.content) {
    return "I didn't receive a valid message. Please try again.";
  }
  
  const userMessage = lastMessage.content.toLowerCase();
  
  if (userMessage.includes("hello") || userMessage.includes("hi")) {
    return "Hello! I'm Likhon Sheikh, your AI coding assistant. How can I help you today?";
  }
  
  if (userMessage.includes("react") && userMessage.includes("component")) {
    return `I'd be happy to help you create a React component! Here's an example of a simple button component:

\`\`\`tsx
import React from 'react';

interface ButtonProps {
  primary?: boolean;
  size?: 'small' | 'medium' | 'large';
  label: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  primary = false,
  size = 'medium',
  label,
  onClick,
}) => {
  const baseStyles = 'rounded-md font-medium';
  const sizeStyles = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2',
    large: 'px-6 py-3 text-lg',
  };
  const colorStyles = primary 
    ? 'bg-primary text-white hover:bg-primary/90' 
    : 'bg-gray-200 text-gray-800 hover:bg-gray-300';
  
  return (
    <button
      type="button"
      className={\`\${baseStyles} \${sizeStyles[size]} \${colorStyles}\`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
\`\`\`

This is a reusable button component with TypeScript types that accepts different props to customize its appearance. Would you like me to explain any part of this code in more detail?`;
  }
  
  if (userMessage.includes("approve")) {
    return "Great! I'll start implementing the plan right away. I'll provide you with detailed code and explanations as we go along. Let me begin with the first step...";
  }
  
  return "I'm here to help with your coding tasks. Could you provide more details about what you'd like me to assist you with?";
}

// Helper function to get models for a provider
function getModelsForProvider(provider: string): string[] {
  switch (provider.toLowerCase()) {
    case 'groq':
      return ['compound-beta', 'llama3-8b', 'llama3-70b', 'mixtral-8x7b'];
    case 'openrouter':
      return ['deepseek/deepseek-prover-v2:free', 'anthropic/claude-3-opus:beta', 'meta-llama/llama-3-70b-instruct'];
    default:
      return [];
  }
}
