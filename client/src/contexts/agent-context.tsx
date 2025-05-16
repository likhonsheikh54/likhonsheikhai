import { createContext, useReducer, useCallback, ReactNode, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Message, Checkpoint } from "@/lib/types";
import { sendMessageToAgent } from "@/lib/agent-api";

interface AgentState {
  messages: Message[];
  checkpoints: Checkpoint[];
  isLoading: boolean;
  currentConversationId: string;
  error: string | null;
}

type AgentAction =
  | { type: "SET_MESSAGES"; payload: Message[] }
  | { type: "ADD_MESSAGE"; payload: Message }
  | { type: "START_LOADING" }
  | { type: "FINISH_LOADING" }
  | { type: "CREATE_CHECKPOINT"; payload: { id: string; timestamp: string; afterMessageId: string } }
  | { type: "ROLLBACK_TO_CHECKPOINT"; payload: string }
  | { type: "SET_ERROR"; payload: string }
  | { type: "CLEAR_ERROR" }
  | { type: "RESET_CONVERSATION" };

interface AgentContextType extends AgentState {
  sendMessage: (content: string) => Promise<void>;
  approvePlan: () => void;
  rollbackToCheckpoint: (checkpointId: string) => void;
  resetConversation: () => void;
}

const initialState: AgentState = {
  messages: [],
  checkpoints: [],
  isLoading: false,
  currentConversationId: uuidv4(),
  error: null,
};

export const AgentContext = createContext<AgentContextType>({
  ...initialState,
  sendMessage: async () => {},
  approvePlan: () => {},
  rollbackToCheckpoint: () => {},
  resetConversation: () => {},
});

function agentReducer(state: AgentState, action: AgentAction): AgentState {
  switch (action.type) {
    case "SET_MESSAGES":
      return {
        ...state,
        messages: action.payload,
      };
    case "ADD_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case "START_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "FINISH_LOADING":
      return {
        ...state,
        isLoading: false,
      };
    case "CREATE_CHECKPOINT":
      return {
        ...state,
        checkpoints: [...state.checkpoints, action.payload],
      };
    case "ROLLBACK_TO_CHECKPOINT": {
      const checkpoint = state.checkpoints.find(cp => cp.id === action.payload);
      if (!checkpoint) return state;
      
      // Find the index of the message after which the checkpoint was created
      const messageIndex = state.messages.findIndex(m => m.id === checkpoint.afterMessageId);
      if (messageIndex === -1) return state;
      
      // Keep messages up to and including the checkpoint message
      const messages = state.messages.slice(0, messageIndex + 1);
      
      // Also keep checkpoints up to that point
      const checkpoints = state.checkpoints.filter(cp => {
        const cpMessageIndex = messages.findIndex(m => m.id === cp.afterMessageId);
        return cpMessageIndex !== -1;
      });
      
      return {
        ...state,
        messages,
        checkpoints,
      };
    }
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    case "RESET_CONVERSATION":
      return {
        ...initialState,
        currentConversationId: uuidv4(),
      };
    default:
      return state;
  }
}

export function AgentProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(agentReducer, initialState);

  // Load conversation from local storage
  useEffect(() => {
    const savedConversation = localStorage.getItem("agentConversation");
    if (savedConversation) {
      try {
        const { messages, checkpoints, conversationId } = JSON.parse(savedConversation);
        if (messages && Array.isArray(messages)) {
          dispatch({ type: "SET_MESSAGES", payload: messages });
        }
        
        if (checkpoints && Array.isArray(checkpoints) && conversationId) {
          dispatch({ type: "SET_MESSAGES", payload: messages });
        }
      } catch (error) {
        console.error("Failed to load conversation from localStorage:", error);
      }
    }
  }, []);

  // Save conversation to local storage
  useEffect(() => {
    const conversationData = {
      messages: state.messages,
      checkpoints: state.checkpoints,
      conversationId: state.currentConversationId,
    };
    localStorage.setItem("agentConversation", JSON.stringify(conversationData));
  }, [state.messages, state.checkpoints, state.currentConversationId]);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    // Create a user message
    const userMessage: Message = {
      id: uuidv4(),
      role: "user",
      content,
      timestamp: new Date().toISOString(),
    };

    // Add message to state
    dispatch({ type: "ADD_MESSAGE", payload: userMessage });
    dispatch({ type: "START_LOADING" });

    try {
      // Create a placeholder for the agent's response
      const agentMessageId = uuidv4();
      const agentMessage: Message = {
        id: agentMessageId,
        role: "assistant",
        content: "",
        timestamp: new Date().toISOString(),
      };
      
      dispatch({ type: "ADD_MESSAGE", payload: agentMessage });

      // Send the message to the agent API
      const response = await sendMessageToAgent(
        state.messages.map(m => ({ role: m.role, content: m.content })).concat([{ role: "user", content }])
      );

      // Update agent message with the response
      const updatedAgentMessage: Message = {
        ...agentMessage,
        content: response.content,
      };

      dispatch({ type: "SET_MESSAGES", payload: [
        ...state.messages.filter(m => m.id !== agentMessageId),
        updatedAgentMessage
      ]});

      // Create a checkpoint after receiving the agent's response
      const checkpointId = uuidv4();
      dispatch({
        type: "CREATE_CHECKPOINT",
        payload: {
          id: checkpointId,
          timestamp: new Date().toISOString(),
          afterMessageId: updatedAgentMessage.id,
        },
      });
      
      dispatch({ type: "FINISH_LOADING" });
    } catch (error) {
      console.error("Error sending message:", error);
      dispatch({ type: "SET_ERROR", payload: "Failed to send message. Please try again." });
    }
  }, [state.messages]);

  const approvePlan = useCallback(() => {
    sendMessage("I approve this plan. Please proceed with the implementation.");
  }, [sendMessage]);

  const rollbackToCheckpoint = useCallback((checkpointId: string) => {
    dispatch({ type: "ROLLBACK_TO_CHECKPOINT", payload: checkpointId });
  }, []);

  const resetConversation = useCallback(() => {
    dispatch({ type: "RESET_CONVERSATION" });
  }, []);

  return (
    <AgentContext.Provider
      value={{
        ...state,
        sendMessage,
        approvePlan,
        rollbackToCheckpoint,
        resetConversation,
      }}
    >
      {children}
    </AgentContext.Provider>
  );
}
