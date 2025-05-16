import { useState, useEffect } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeBlockProps {
  content: string;
  language?: string;
  filename?: string;
}

export default function CodeBlock({ content, language, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [codeContent, setCodeContent] = useState("");
  const [lang, setLang] = useState(language || "typescript");
  
  useEffect(() => {
    // Extract code from markdown code blocks
    const codeRegex = /```(\w+)?\s*([^```]+)```/gs;
    const matches = [...content.matchAll(codeRegex)];
    
    if (matches.length > 0) {
      const match = matches[0];
      if (match[1] && !language) {
        setLang(match[1]);
      }
      setCodeContent(match[2].trim());
    } else {
      setCodeContent(content);
    }
    
    // Try to extract filename from comments
    if (!filename) {
      const filenameRegex = /\/\/\s+([a-zA-Z0-9_.-]+\.[a-zA-Z0-9]+)/;
      const filenameMatch = content.match(filenameRegex);
      if (filenameMatch && filenameMatch[1]) {
        setFilename(filenameMatch[1]);
      }
    }
  }, [content, language, filename]);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="mb-4">
      {filename && (
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm font-medium text-foreground">Implementation</div>
          <div className="text-xs text-muted-foreground">{filename}</div>
        </div>
      )}
      
      <div className="relative">
        <pre className="code-font text-xs bg-dark-surface p-3 rounded-md overflow-x-auto scrollbar-thin">
          <code className={`language-${lang}`} dangerouslySetInnerHTML={{ __html: codeContent }} />
        </pre>
        <div className="absolute top-3 right-3">
          <Button
            size="sm"
            variant="outline"
            className="h-7 px-2 bg-dark-border hover:bg-dark-border/80 text-foreground border-none"
            onClick={copyToClipboard}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </Button>
        </div>
      </div>
    </div>
  );
}
