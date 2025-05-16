export interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
}

export interface Checkpoint {
  id: string;
  timestamp: string;
  afterMessageId: string;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface AIProvider {
  id: string;
  name: string;
  models: string[];
}

export interface AIModelSettings {
  provider: string;
  model: string;
  temperature: number;
  maxTokens: number;
}
