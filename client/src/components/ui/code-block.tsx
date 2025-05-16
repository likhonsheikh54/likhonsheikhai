import React, { useState } from "react";
import { Copy, Check, FileCode } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  children?: React.ReactNode;
}

export function CodeBlock({
  code,
  language = "typescript",
  filename,
  children,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Split code into lines for display
  const codeLines = code.trim().split("\n");

  return (
    <div className="mt-4 bg-secondary rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-muted">
        <div className="flex items-center">
          <FileCode className="h-4 w-4 mr-2 text-blue-400" />
          <span className="text-sm font-mono text-muted-foreground">
            {filename || language}
          </span>
        </div>
        <button
          onClick={copyToClipboard}
          className="text-muted-foreground hover:text-foreground p-1"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>
      <div className="relative">
        <pre
          className={cn(
            "hljs p-4 overflow-x-auto text-sm m-0 rounded-none font-mono scroll-thin",
            language
          )}
        >
          <code>
            {codeLines.map((line, index) => (
              <span key={index} className="code-line">
                {line || " "}
              </span>
            ))}
          </code>
        </pre>
        {children}
      </div>
    </div>
  );
}
