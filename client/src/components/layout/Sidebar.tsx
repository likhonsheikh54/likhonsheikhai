import { Monitor, FileCode, Settings, Package, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";

type ProjectItem = {
  id: string;
  name: string;
  active?: boolean;
};

type SnippetItem = {
  id: string;
  name: string;
};

const recentProjects: ProjectItem[] = [
  { id: "web3", name: "Web3 DApp Development", active: true },
  { id: "news", name: "AI News Summarizer Project" },
  { id: "analytics", name: "Product Analytics Dashboard" },
];

const savedSnippets: SnippetItem[] = [
  { id: "nextjs", name: "Next.js API Routes" },
  { id: "react", name: "React Hooks Collection" },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:block w-64 border-r border-border max-h-screen overflow-y-auto p-2 scroll-thin">
      <div className="mb-4">
        <h2 className="px-3 mb-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Recent Projects
        </h2>
        <div className="space-y-1">
          {recentProjects.map((project) => (
            <button
              key={project.id}
              type="button"
              className={cn(
                "w-full text-left flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium",
                project.active
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
              )}
            >
              <FolderOpen
                className={cn(
                  "h-4 w-4",
                  project.active ? "text-primary" : "text-muted-foreground"
                )}
              />
              {project.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h2 className="px-3 mb-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Saved Snippets
        </h2>
        <div className="space-y-1">
          {savedSnippets.map((snippet) => (
            <button
              key={snippet.id}
              type="button"
              className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
            >
              <FileCode className="h-4 w-4 text-muted-foreground" />
              {snippet.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="px-3 mb-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Agent Tools
        </h2>
        <div className="space-y-1">
          <button
            type="button"
            className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
          >
            <Settings className="h-4 w-4 text-muted-foreground" />
            Configure Agent
          </button>
          <button
            type="button"
            className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
          >
            <Package className="h-4 w-4 text-muted-foreground" />
            AI Model Selection
          </button>
          <button
            type="button"
            className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
          >
            <Monitor className="h-4 w-4 text-muted-foreground" />
            Export/Share Code
          </button>
        </div>
      </div>
    </aside>
  );
}
