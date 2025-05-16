import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import fetch from "node-fetch";

export async function registerRoutes(app: Express): Promise<Server> {
  // AI Agent API endpoint
  app.post("/api/agent", async (req, res) => {
    try {
      const { messages, provider = "groq", model, temperature = 0.14, maxTokens = 2048 } = req.body;
      
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ 
          error: { message: "Invalid request: messages must be an array" } 
        });
      }
      
      // Logic for different providers
      let apiUrl, headers, body;
      
      if (provider === "groq") {
        apiUrl = "https://api.groq.com/openai/v1/chat/completions";
        headers = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.GROQ_API_KEY || "demo-key"}`,
        };
        body = JSON.stringify({
          model: model || "llama3-70b-8192",
          messages,
          temperature,
          max_tokens: maxTokens,
        });
      } else if (provider === "openrouter") {
        apiUrl = "https://openrouter.ai/api/v1/chat/completions";
        headers = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY || "demo-key"}`,
          "HTTP-Referer": "https://replit.com",
        };
        body = JSON.stringify({
          model: model || "anthropic/claude-3-opus:beta",
          messages,
          temperature,
          max_tokens: maxTokens,
        });
      } else {
        return res.status(400).json({ 
          error: { message: "Unsupported provider" } 
        });
      }
      
      // Make request to the AI provider
      try {
        const apiResponse = await fetch(apiUrl, {
          method: "POST",
          headers,
          body,
        });
        
        if (!apiResponse.ok) {
          const errorData = await apiResponse.text();
          console.error(`Provider error (${provider}):`, errorData);
          return res.status(apiResponse.status).json({
            error: { 
              message: `Error from ${provider}: ${apiResponse.statusText}`,
              details: errorData
            }
          });
        }
        
        const data = await apiResponse.json() as any;
        const content = data.choices?.[0]?.message?.content || "";
        
        return res.json({ content });
      } catch (error) {
        console.error(`API request error (${provider}):`, error);
        return res.status(500).json({
          error: { message: `Failed to communicate with ${provider}` }
        });
      }
    } catch (error) {
      console.error("Agent API error:", error);
      return res.status(500).json({
        error: { message: "Internal server error" }
      });
    }
  });
  
  // Streaming API endpoint for real-time responses
  app.post("/api/agent/stream", async (req, res) => {
    const { messages, provider = "groq", model, temperature = 0.14, maxTokens = 2048 } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ 
        error: { message: "Invalid request: messages must be an array" } 
      });
    }
    
    // Set headers for SSE
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    
    // Logic for different providers - using non-streaming for demo
    let apiUrl, headers, body;
    
    if (provider === "groq") {
      apiUrl = "https://api.groq.com/openai/v1/chat/completions";
      headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY || "demo-key"}`,
      };
      body = JSON.stringify({
        model: model || "llama3-70b-8192",
        messages,
        temperature,
        max_tokens: maxTokens,
      });
    } else if (provider === "openrouter") {
      apiUrl = "https://openrouter.ai/api/v1/chat/completions";
      headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY || "demo-key"}`,
        "HTTP-Referer": "https://replit.com",
      };
      body = JSON.stringify({
        model: model || "anthropic/claude-3-opus:beta",
        messages,
        temperature,
        max_tokens: maxTokens,
      });
    } else {
      return res.status(400).json({ 
        error: { message: "Unsupported provider" } 
      });
    }
    
    try {
      const apiResponse = await fetch(apiUrl, {
        method: "POST",
        headers,
        body,
      });
      
      if (!apiResponse.ok) {
        const errorData = await apiResponse.text();
        console.error(`Provider error (${provider}):`, errorData);
        res.write(`Error from ${provider}: ${apiResponse.statusText}`);
        res.end();
        return;
      }
      
      const data = await apiResponse.json() as any;
      const content = data.choices?.[0]?.message?.content || "";
      
      // Simulate streaming by sending the response in chunks
      const chunks = content.match(/.{1,20}/g) || [];
      
      for (const chunk of chunks) {
        res.write(chunk);
        // Add a small delay to simulate streaming
        await new Promise(resolve => setTimeout(resolve, 50));
      }
      
      res.end();
    } catch (error) {
      console.error(`API request error (${provider}):`, error);
      res.write(`Failed to communicate with ${provider}`);
      res.end();
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
