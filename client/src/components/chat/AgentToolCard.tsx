import { Code, Edit, Terminal, BookOpen } from "lucide-react";

export default function AgentToolCard() {
  return (
    <div className="rounded-lg bg-secondary/50 p-5 mx-auto max-w-3xl">
      <h3 className="text-lg font-medium mb-3">I can help with these tasks:</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <button className="flex items-start p-3 rounded-md hover:bg-muted transition-colors text-left group">
          <div className="h-8 w-8 rounded-md bg-primary/20 text-primary flex items-center justify-center mr-3 flex-shrink-0 group-hover:bg-primary/30">
            <Code className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-medium">Generate Code</h4>
            <p className="text-sm text-muted-foreground">
              Create complete files or snippets for your project
            </p>
          </div>
        </button>

        <button className="flex items-start p-3 rounded-md hover:bg-muted transition-colors text-left group">
          <div className="h-8 w-8 rounded-md bg-blue-600/20 text-blue-400 flex items-center justify-center mr-3 flex-shrink-0 group-hover:bg-blue-600/30">
            <Edit className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-medium">Edit Existing Code</h4>
            <p className="text-sm text-muted-foreground">
              Get suggestions to improve or fix your code
            </p>
          </div>
        </button>

        <button className="flex items-start p-3 rounded-md hover:bg-muted transition-colors text-left group">
          <div className="h-8 w-8 rounded-md bg-green-600/20 text-green-400 flex items-center justify-center mr-3 flex-shrink-0 group-hover:bg-green-600/30">
            <Terminal className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-medium">Run Shell Commands</h4>
            <p className="text-sm text-muted-foreground">
              Execute terminal commands and see results
            </p>
          </div>
        </button>

        <button className="flex items-start p-3 rounded-md hover:bg-muted transition-colors text-left group">
          <div className="h-8 w-8 rounded-md bg-amber-600/20 text-amber-400 flex items-center justify-center mr-3 flex-shrink-0 group-hover:bg-amber-600/30">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-medium">Deep Research</h4>
            <p className="text-sm text-muted-foreground">
              Research topics and technologies in depth
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}
