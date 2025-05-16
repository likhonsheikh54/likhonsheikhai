import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format date to a readable string
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

// Format time to a readable string
export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);
}

// Parse code blocks from markdown
export function parseCodeBlocks(markdown: string): { language: string; code: string }[] {
  const codeBlockRegex = /```(?:(\w+)\s*\n)?([\s\S]*?)```/g;
  const blocks = [];
  let match;

  while ((match = codeBlockRegex.exec(markdown)) !== null) {
    blocks.push({
      language: match[1] || "plaintext",
      code: match[2].trim(),
    });
  }

  return blocks;
}

// Extract the first code block from markdown
export function extractFirstCodeBlock(markdown: string): string | null {
  const codeBlockRegex = /```(?:\w+\s*\n)?([\s\S]*?)```/;
  const match = codeBlockRegex.exec(markdown);
  return match ? match[1].trim() : null;
}

// Detect if a message contains a code block
export function hasCodeBlock(markdown: string): boolean {
  const codeBlockRegex = /```(?:\w+\s*\n)?[\s\S]*?```/;
  return codeBlockRegex.test(markdown);
}

// Safely handle streaming text updates
export function safeJsonParse<T>(text: string): T | null {
  try {
    return JSON.parse(text) as T;
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return null;
  }
}

// Highlight a line of code to draw attention
export function highlightCode(code: string, lineToHighlight: number): string {
  const lines = code.split("\n");
  return lines
    .map((line, index) => {
      if (index === lineToHighlight - 1) {
        return `* ${line}`;
      }
      return line;
    })
    .join("\n");
}
